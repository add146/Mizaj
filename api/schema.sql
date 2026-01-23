-- Database schema for Mizaj BioFITRA screening application
-- SQLite (Cloudflare D1)

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  question_text TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  shuffle_options INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Options table (4 options per question, one for each Mizaj type)
CREATE TABLE IF NOT EXISTS options (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL,
  mizaj_type TEXT NOT NULL CHECK(mizaj_type IN ('panas_lembab', 'dingin_lembab', 'panas_kering', 'dingin_kering')),
  option_text TEXT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Mizaj result descriptions
CREATE TABLE IF NOT EXISTS mizaj_results (
  id TEXT PRIMARY KEY,
  mizaj_type TEXT UNIQUE NOT NULL CHECK(mizaj_type IN ('panas_lembab', 'dingin_lembab', 'panas_kering', 'dingin_kering')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  characteristics TEXT,
  dietary_recommendations TEXT,
  lifestyle_recommendations TEXT,
  image_url TEXT,
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Participants table
CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK(gender IN ('male', 'female')),
  email TEXT,
  phone TEXT,
  result_mizaj_type TEXT,
  needs_interview INTEGER DEFAULT 0,
  answer_counts TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Individual answers table
CREATE TABLE IF NOT EXISTS answers (
  id TEXT PRIMARY KEY,
  participant_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected_mizaj TEXT NOT NULL CHECK(selected_mizaj IN ('panas_lembab', 'dingin_lembab', 'panas_kering', 'dingin_kering')),
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(is_active);
CREATE INDEX IF NOT EXISTS idx_options_question ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_participants_created ON participants(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_answers_participant ON answers(participant_id);
CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);

-- Site content for editable landing page
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_site_content_type ON site_content(type);
