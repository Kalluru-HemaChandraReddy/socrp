import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import authRoutes from "./routes/auth.js"; 

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Ensure users table exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        membership_id VARCHAR(50) UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        photo_url TEXT,
        resume_url TEXT,
        is_verified BOOLEAN DEFAULT false
      )
    `);
    console.log("✅ Users table ready");
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
})();

// ✅ Create test Ethereal account
let testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const membershipId = `SOCRP-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    const result = await pool.query(
      "INSERT INTO users (membership_id, name, email, phone, password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [membershipId, name, email, phone, hashedPassword]
    );

    // Create verification link
    const verifyLink = `http://localhost:${process.env.PORT}/verify/${membershipId}`;

    // Send test email
    let info = await transporter.sendMail({
      from: '"SOCRP" <no-reply@socrp.com>',
      to: email,
      subject: "Verify your SOCRP account",
      html: `<p>Hello ${name},</p><p>Please verify your account by clicking the link: <a href="${verifyLink}">${verifyLink}</a></p>`,
    });

    console.log("📧 Preview URL: " + nodemailer.getTestMessageUrl(info));

    res.json({ message: "User registered. Verification email sent!" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Verification endpoint
app.get("/verify/:membershipId", async (req, res) => {
  try {
    const { membershipId } = req.params;
    await pool.query("UPDATE users SET is_verified = true WHERE membership_id=$1", [membershipId]);
    res.send("✅ Account verified!");
  } catch (err) {
    res.status(500).send("❌ Verification failed.");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
);
