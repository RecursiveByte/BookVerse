# BookVerse

BookVerse is a full-stack book review platform where users can discover books, write reviews, and explore community recommendations. Features include authentication, authorization, role-based access control, rate limiting, proper input validation, debouncing, PostgreSQL indexing, virtual list rendering, pagination with client-side caching, responsive design, and an immersive UI/UX — and more.

🔗 **Live Demo:** [https://bookverse-5h53.onrender.com](https://bookverse-5h53.onrender.com)

---

## Features

- JWT authentication with HttpOnly cookies
- Google OAuth2 & Artic GitHub login
- Role-based access control (admin / user)
- Protected routes with auth redirection
- OTP-based password reset via email
- Rate limiting on auth endpoints
- Input validation with Zod
- Debounced backend search with PostgreSQL indexing
- Virtual list rendering for large datasets
- Smart pagination with client-side fetch caching
- Bulk book import via CSV
- Admin dashboard with stats, user management, book management, and review management
- Fully responsive design with immersive UI/UX

---

## Roles

**User**
- Browse and search books
- Write, edit and delete their own reviews
- Login via email, Google or GitHub

**Admin**
- Import books in bulk via CSV
- Edit and delete any book
- Delete any user
- Delete any review
- View platform stats (total users, books, reviews, recent activity)

---

## Tech Stack

**Frontend**
- React, TypeScript, Vite
- Tailwind CSS

**Backend**
- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM

---

## Project Structure
```
BookVerse/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── .env.example
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── services/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── validations/
    │   ├── lib/
    │   └── utils/
    ├── docs/
    │   └── api/
    │       ├── auth.md
    │       ├── admin.md
    │       ├── books.md
    │       └── reviews.md
    └── .env.example
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### 1. Clone the repo
```bash
git clone https://github.com/RecursiveByte/BookVerse.git
cd BookVerse
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npx prisma migrate dev
npx prisma generate
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

---

## Environment Variables

### Backend `.env`
```properties
DATABASE_URL=
PORT=3000
NODE_ENV=development
JWT_SECRET=
FRONTEND_URL=
BACKEND_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

### Frontend `.env`
```properties
VITE_BACKEND_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## API Documentation

Full API documentation is available in [`backend/docs/api`](./backend/docs/api).

| File | Description |
|------|-------------|
| [auth.md](./backend/docs/api/auth.md) | Authentication endpoints |
| [admin.md](./backend/docs/api/admin.md) | Admin management endpoints |
| [books.md](./backend/docs/api/books.md) | Books endpoints |
| [reviews.md](./backend/docs/api/reviews.md) | Review endpoints |

---

## License

MIT
