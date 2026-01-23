# Mizaj BioFITRA® - Screening Application

Aplikasi screening Mizaj (karakter tubuh) berbasis web menggunakan React + Cloudflare Workers.

## 🏗️ Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers + Hono
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (untuk gambar)

## 📁 Project Structure

```
quizoner/
├── web/          # Frontend React application
├── api/          # Backend Cloudflare Workers
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Frontend Setup

```bash
cd web
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Backend Setup

```bash
cd api
npm install

# Setup D1 database
npx wrangler d1 create mizaj-db
# Copy database_id to wrangler.jsonc

# Apply schema
npx wrangler d1 execute mizaj-db --local --file=schema.sql
npx wrangler d1 execute mizaj-db --local --file=seed.sql

# Start dev server
npm run dev
```

Backend akan berjalan di `http://localhost:8787`

## 🗄️ Database

Schema database terdapat di `api/schema.sql` dengan tabel:
- `admins` - Admin users
- `questions` - Quiz questions
- `options` - Question options (4 per question)
- `mizaj_results` - Mizaj type descriptions
- `participants` - Participant data
- `answers` - Individual quiz answers

## 🔐 Admin Access

Default admin credentials (dari seed data):
- Email: `admin@mizaj.com`
- Password: `admin123`

## 📝 Development

### Frontend
- Edit components di `web/src/pages/`
- Styling dengan Tailwind CSS
- Routing dengan React Router

### Backend
- Edit routes di `api/src/routes/`
- Database queries menggunakan D1 binding
- JWT authentication untuk admin

## 🚢 Deployment

### Frontend (Cloudflare Pages)

```bash
cd web
npm run build
# Deploy dist/ folder to Cloudflare Pages
```

### Backend (Cloudflare Workers)

```bash
cd api

# Create production D1 database
npx wrangler d1 create mizaj-db

# Update wrangler.jsonc with production database_id

# Apply schema to production
npx wrangler d1 execute mizaj-db --file=schema.sql
npx wrangler d1 execute mizaj-db --file=seed.sql

# Deploy
npm run deploy
```

## 📖 API Routes

- `GET /api/questions` - Get all active questions
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/participants/:id` - Get participant result
- `POST /api/auth/login` - Admin login
- Admin routes (requires auth):
  - `GET/POST/PUT/DELETE /api/questions` - Manage questions
  - `GET /api/participants` - List all participants
  - `GET/PUT /api/mizaj/:type` - Manage Mizaj content

## 📄 License

© 2024 BioFITRA. All rights reserved.
