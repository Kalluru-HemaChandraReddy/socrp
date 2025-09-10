-- Users table (main profile info)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    membership_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    address TEXT,
    profile_photo TEXT,  -- URL or file path
    resume_url TEXT,     -- URL if stored in cloud
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Education entries
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    degree VARCHAR(100) NOT NULL,
    university VARCHAR(150),
    year_of_completion INT,
    marks_cgpa VARCHAR(20)
);

-- Work Experience entries
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100),
    from_date DATE,
    to_date DATE,
    responsibilities TEXT
);

-- Skills and Languages
CREATE TABLE skills_languages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    skill_or_language VARCHAR(100) NOT NULL
);

-- Shareable Profile Links
CREATE TABLE share_links (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Logs of Employer Views
CREATE TABLE profile_views (
    id SERIAL PRIMARY KEY,
    share_link_id INT REFERENCES share_links(id) ON DELETE CASCADE,
    viewer_ip VARCHAR(50),
    viewed_at TIMESTAMP DEFAULT NOW()
);
