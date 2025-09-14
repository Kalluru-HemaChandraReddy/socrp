## SOCRP Certification & Membership System
Phase 1 MVP: registration, profile management, admin panel, temporary profile sharing.
# User Profile Management System

A full-stack **Profile Management Web App** built with **React (frontend)**, **Node.js + Express (backend)**, and **PostgreSQL (database)**.  
Users can register/login, edit their profile, upload profile photos and resumes, add work experience and education, and share their public profile using a shareable link.

---

## 🚀 Features

- **Authentication**
  - JWT-based login & protected routes.
  - Middleware for token validation.

- **Profile Management**
  - Edit personal details (name, phone, gender, DOB, address).
  - Upload **profile photo** and **resume**.
  - Add multiple **work experiences** and **education entries**.

- **File Uploads**
  - Profile photos and resumes stored in `/uploads/` directory.
  - Accessible via static file serving.

- **Profile Sharing**
  - A public URL like:  
    ```
    http://localhost:5000/api/profile/share/:id
    ```
  - Can be copied & shared to view profile without login.

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (pg + connection pool)
- **Auth**: JWT (jsonwebtoken)
- **File Handling**: Multer
- **Other**: Bcrypt (password hashing), dotenv (env variables)

---

## 📂 Project Structure

project-root/
│── backend/
│ ├── config/db.js # Database connection
│ ├── middlewares/
│ │ └── authMiddleware.js # JWT verification
│ ├── routes/
│ │ └── profile.js # Profile routes (CRUD, uploads, share)
│ ├── server.js # Express app entry point
│ └── uploads/ # Uploaded files (photos, resumes)
│
│── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Home.js # Home dashboard
│ │ │ ├── Profile.js # Edit profile page
│ │ │ └── Auth.js # Login/Register
│ │ ├── App.js # Routes
│ │ └── index.js # React entry
│ └── package.json
│
│── README.md
│── Notes.md
└── package.json           NOTE : THIS IS A BASIC STRUCTRE WHERE ONLY SOME FILES ARE LISTED THERE SOME OTHER FILES TOO.


---

## ⚙️ Setup Instructions

### 1️⃣ Backend

```bash
cd backend
npm install

### CREATE .env file 

``` 
PORT=5000
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=your_database
DB_HOST=localhost
JWT_SECRET=your_secret_key


```
Run backend:

npm start
```
2️⃣ Database Setup

Run the following SQL to create the users table:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  membership_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  gender VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  profile_photo TEXT,
  resume TEXT,
  work_experience JSON,
  education JSON
);
```
3️⃣ Frontend
cd frontend
npm install
npm start
```
📌 API Endpoints
Profile Routes (/api/profile)

GET /me → Fetch logged-in user profile

PUT /update → Update profile details (personal info, work experience, education)

POST /upload-photo → Upload profile photo

POST /upload-resume → Upload resume file

GET /share/:id → Public profile by ID
```
🎨 UI Pages

Login/Register Page → Auth flow

Home Page → Displays user profile details, resume, photo, experiences, education, and share button

Profile Edit Page → Update details, add work experience, add education, upload files
```
✅ Future Improvements

Password reset with email verification

Pagination for multiple profiles (admin view)

Cloud storage for uploads (e.g., AWS S3)

Better UI with Material-UI or Tailwind



---
```
## 📝 Notes.md (3-Day Development Log)

```markdown
# Development Notes (3-Day Project)

This project was built in **3 days**.  
Here’s the day-wise breakdown:

---
```
### 🗓 Day 1: Project Setup & Authentication
- Initialized **backend (Express + PostgreSQL)**.
- Created `users` table in PostgreSQL.
- Implemented **JWT authentication**:
  - User registration.
  - Login with hashed password (bcrypt).
  - Middleware to protect routes.
- Tested API routes with Postman.

---
```
### 🗓 Day 2: Profile CRUD + File Uploads
- Added **profile management routes** in `profile.js`.
- Implemented:
  - Fetch profile (`/me`).
  - Update profile (`/update`).
- Configured **Multer** for file uploads:
  - `/upload-photo` for profile pictures.
  - `/upload-resume` for resumes.
- Integrated backend with **React frontend**.
- Built **Profile.js** (edit profile page).
- Built **Home.js** (dashboard to view profile).

---
```
### 🗓 Day 3: Work Experience, Education & Profile Sharing
- Added support for:
  - **Work Experience (JSON array)**.
  - **Education (JSON array)**.
- Updated both backend (`update` route) & frontend (Profile + Home pages).
- Added **profile sharing feature**:
  - Public endpoint: `/api/profile/share/:id`.
  - Button on Home to copy link.
- Finalized **UI styling** (basic responsive layout).
- Wrote README & notes.
```
---

✅ Project completed in 3 days.
