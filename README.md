# Library Book Management System

A web application for managing library books, members, and borrowings built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Backend Setup](#-backend-setup)
- [Database Seeding](#-database-seeding)
- [Frontend Setup](#-frontend-setup)
- [Running the Full Application](#-running-the-full-application)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)

---

## ⚡ Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)
- **MongoDB** (running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI)

---

## 📁 Project Structure

```text
examp/
├── backend/
│   ├── models/            # Mongoose Schemas (Book, Member, Borrowing)
│   ├── middleware/        # Custom middleware (requestLogger)
│   ├── server.js          # Express backend entry point
│   ├── seed.js            # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/               # React components and pages
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## ⚙️ Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/library
   ```

4. **Start the backend server**:
   ```bash
   npm start
   # or directly:
   node server.js
   ```

   The backend will start on **`http://localhost:5000`**.

---

## 🌱 Database Seeding (Optional)

To populate MongoDB with sample books, members, and borrowings:

```bash
cd backend
node seed.js
```

---

## 💻 Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will open on **`http://localhost:5173`** (or `http://localhost:5174` if port 5173 is occupied).

---

## 🚀 Running the Full Application

To run both services simultaneously, open two terminal windows:

- **Terminal 1 (Backend)**:
  ```bash
  cd backend
  npm start
  ```

- **Terminal 2 (Frontend)**:
  ```bash
  cd frontend
  npm run dev
  ```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable    | Description                         | Default Value                    |
| ----------- | ----------------------------------- | -------------------------------- |
| `PORT`      | Port for the Express server         | `5000`                           |
| `MONGO_URI` | MongoDB connection URI              | `mongodb://127.0.0.1:27017/library` |

---

## 🌐 API Endpoints Overview

| Method | Endpoint               | Description                             |
| ------ | ---------------------- | --------------------------------------- |
| `GET`  | `/api/v1/books`        | Fetch list of all books                 |
| `GET`  | `/api/v1/members`      | Fetch list of all library members       |
| `GET`  | `/api/v1/borrowings`   | Fetch active borrowing records          |
