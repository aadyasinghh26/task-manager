# 🚀 Task Manager App

A full-stack Task Manager application with authentication, built using modern web technologies. Users can register, login, and manage their tasks efficiently.

---

## 🔗 Features

* 🔐 User Authentication (Register & Login)
* ✅ Create Tasks
* ✏️ Toggle Task Completion
* 🗑️ Delete Tasks
* 🔒 Protected Routes using JWT
* ⚡ Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL (Neon DB)

---

## 📁 Project Structure

task-manager/
├── frontend/ # Next.js app
├── backend/ # Express + Prisma backend

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/aadyasinghh26/task-manager.git
cd task-manager

---

### 2️⃣ Backend Setup

cd backend
npm install

Create a `.env` file:

DATABASE_URL=your_database_url
JWT_ACCESS_SECRET=your_secret

Run backend:

npm run dev

---

### 3️⃣ Frontend Setup

cd frontend
npm install

Run frontend:

npm run dev

---

### 4️⃣ Open App

Frontend: http://localhost:3000
Backend: http://localhost:5000

---

## 🔐 API Endpoints

### Auth

* POST /auth/register
* POST /auth/login

### Tasks (Protected)

* GET /tasks
* POST /tasks
* PUT /tasks/:id
* DELETE /tasks/:id

---


