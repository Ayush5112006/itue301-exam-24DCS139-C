require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requestLogger = require("./middleware/requestLogger");

const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// In-memory data for Task 3
const books = [
  { id: 1, title: "Data Structures", author: "Mark Allen", category: "CS", available: true },
  { id: 2, title: "Operating Systems", author: "Silberschatz", category: "CS", available: false },
  { id: 3, title: "DBMS", author: "Korth", category: "CS", available: true },
];

const borrowings = [
  { id: 1, memberId: "M001", bookId: 2, borrowDate: "2026-08-01", returnDate: "2026-08-15", status: "borrowed" },
];

// ─── Task 3: REST Endpoints ────────────────────────────────────────

// GET /api/v1/books
app.get("/api/v1/books", (req, res) => {
  res.status(200).json({ success: true, count: books.length, data: books });
});

// GET /api/v1/borrowings
app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({ success: true, count: borrowings.length, data: borrowings });
});

// POST /api/v1/borrowings
app.post("/api/v1/borrowings", (req, res) => {
  const { memberId, bookId, borrowDate, returnDate, status } = req.body;
  if (!memberId || !bookId || !borrowDate || !returnDate) {
    return res.status(400).json({ success: false, message: "Please provide memberId, bookId, borrowDate and returnDate" });
  }
  const newBorrowing = {
    id: borrowings.length + 1,
    memberId,
    bookId,
    borrowDate,
    returnDate,
    status: status || "borrowed",
  };
  borrowings.push(newBorrowing);
  res.status(201).json({ success: true, data: newBorrowing });
});

// ─── Task 5: MongoDB Endpoints (when connected) ────────────────────

// GET all books from MongoDB
app.get("/api/v1/mongo/books", async (req, res, next) => {
  try {
    const mongoBooks = await Book.find();
    res.status(200).json({ success: true, count: mongoBooks.length, data: mongoBooks });
  } catch (err) {
    next(err);
  }
});

// POST a book to MongoDB
app.post("/api/v1/mongo/books", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    next(err);
  }
});

// GET all members from MongoDB
app.get("/api/v1/mongo/members", async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (err) {
    next(err);
  }
});

// POST a member to MongoDB
app.post("/api/v1/mongo/members", async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    next(err);
  }
});

// GET all borrowings from MongoDB
app.get("/api/v1/mongo/borrowings", async (req, res, next) => {
  try {
    const mongoBorrowings = await Borrowing.find().populate("memberId").populate("bookId");
    res.status(200).json({ success: true, count: mongoBorrowings.length, data: mongoBorrowings });
  } catch (err) {
    next(err);
  }
});

// POST a borrowing to MongoDB
app.post("/api/v1/mongo/borrowings", async (req, res, next) => {
  try {
    const borrowing = await Borrowing.create(req.body);
    res.status(201).json({ success: true, data: borrowing });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    next(err);
  }
});

// ─── Global Error Handler (must be last middleware) ──────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ─── MongoDB Connection + Server Start ──────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      seedDatabase();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      app.listen(PORT, () => console.log(`Server running on port ${PORT} (without MongoDB)`));
    });
} else {
  console.log("MONGO_URI not set. Running without MongoDB.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Seed database with sample data
async function seedDatabase() {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      await Book.insertMany([
        { title: "Data Structures", author: "Mark Allen", category: "CS", isbn: "978-01", available: true },
        { title: "Operating Systems", author: "Silberschatz", category: "CS", isbn: "978-02", available: false },
        { title: "DBMS", author: "Korth", category: "CS", isbn: "978-03", available: true },
      ]);
      console.log("Books seeded");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}
