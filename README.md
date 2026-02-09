# 🚀 SmartSaaS Backend

AI-powered Multi-Tenant Project Management SaaS built with Node.js, Express, Prisma, PostgreSQL, and OpenAI.

This backend supports authentication, role-based access control, project & task management, and AI-generated project breakdown.

---

## 🧠 Features

- 🔐 JWT Authentication
- 🏢 Multi-tenant Company System
- 👑 Role-Based Access Control (OWNER / MEMBER)
- 📁 Project Management
- 📌 Task Management
- 🤖 AI Project Generator (OpenAI Integration)
- 🛡 Protected Routes
- ✅ Validation Layer (Zod)
- 🗄 Prisma ORM with PostgreSQL

---

## 🏗 Architecture

Clean modular architecture:

src/
├── config/
├── middlewares/
├── modules/
│ ├── auth/
│ ├── project/
│ ├── task/
│ ├── ai/
├── utils/
├── app.js
└── server.js

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Zod Validation
- OpenAI API
- Docker-ready (optional)

---

## 🔑 Environment Setup

Copy `.env.example` to `.env`:

Then fill in your values.

---

## 🗄 Database Setup

Create database:

```sql
CREATE DATABASE smartsaas;

Run migration:

npx prisma migrate dev --name init

Run Project

Install dependencies:

npm install


Run development:

npm run dev


Server runs on:

http://localhost:5000

📡 API Endpoints
🔐 Auth

POST /api/auth/register
POST /api/auth/login

📁 Project

POST /api/projects
GET /api/projects
GET /api/projects/:id
DELETE /api/projects/:id

📌 Task

POST /api/tasks/:projectId
GET /api/tasks/:projectId
PATCH /api/tasks/status/:id
DELETE /api/tasks/:id

🤖 AI

POST /api/ai/generate-tasks
POST /api/ai/generate-project

🤖 AI Auto Project Generator

Automatically:

Creates project

Generates task breakdown using OpenAI

Saves tasks to database

📌 Future Improvements

Pagination

Activity Log

AI Usage Quota

Subscription Plan (FREE / PRO)

Swagger Documentation

Docker Deployment
