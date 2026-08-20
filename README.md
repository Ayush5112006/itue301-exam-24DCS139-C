# Library Book Management System

## Project Name
Library Book Management System — ITUE301 Set B

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend runs on `http://localhost:5000`

## MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas.
2. Create a `.env` file inside `backend/` with:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Required Environment Variables
| Variable   | Description              |
|------------|--------------------------|
| MONGO_URI  | MongoDB connection string|
| PORT       | Server port (default 5000)|
