require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

const MONGO_URI = process.env.MONGO_URI;

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB\n");

    // ─── Clear existing data ───────────────────────────────────────
    await Book.deleteMany({});
    await Member.deleteMany({});
    await Borrowing.deleteMany({});
    console.log("Cleared existing data\n");

    // ─── Seed Books ────────────────────────────────────────────────
    console.log("=== Seeding Books ===");
    const books = await Book.insertMany([
      { title: "Data Structures", author: "Mark Allen", category: "CS", isbn: "978-01", available: true },
      { title: "Operating Systems", author: "Silberschatz", category: "CS", isbn: "978-02", available: false },
      { title: "DBMS", author: "Korth", category: "CS", isbn: "978-03", available: true },
      { title: "Computer Networks", author: "Tanenbaum", category: "CS", isbn: "978-04", available: true },
      { title: "Web Development", author: "Jon Duckett", category: "IT", isbn: "978-05", available: false },
    ]);
    console.log(`Inserted ${books.length} books`);
    books.forEach((b) => console.log(`  - ${b.title} (${b.available ? "Available" : "Not Available"})`));

    // ─── Seed Members ──────────────────────────────────────────────
    console.log("\n=== Seeding Members ===");
    const members = await Member.insertMany([
      { name: "Rahul Sharma", email: "rahul@charusat.ac.in", phone: "9876543210", department: "IT" },
      { name: "Priya Patel", email: "priya@charusat.ac.in", phone: "9876543211", department: "CS" },
      { name: "Amit Kumar", email: "amit@charusat.ac.in", phone: "9876543212", department: "CE" },
    ]);
    console.log(`Inserted ${members.length} members`);
    members.forEach((m) => console.log(`  - ${m.name} (${m.department})`));

    // ─── Seed Borrowings ───────────────────────────────────────────
    console.log("\n=== Seeding Borrowings ===");
    const borrowings = await Borrowing.insertMany([
      {
        memberId: members[0]._id,
        bookId: books[1]._id,
        borrowDate: new Date("2026-08-01"),
        returnDate: new Date("2026-08-15"),
        status: "borrowed",
      },
      {
        memberId: members[1]._id,
        bookId: books[4]._id,
        borrowDate: new Date("2026-08-05"),
        returnDate: new Date("2026-08-12"),
        status: "overdue",
      },
      {
        memberId: members[2]._id,
        bookId: books[0]._id,
        borrowDate: new Date("2026-07-20"),
        returnDate: new Date("2026-08-03"),
        status: "returned",
      },
    ]);
    console.log(`Inserted ${borrowings.length} borrowings`);

    // Verify with populate
    const populated = await Borrowing.find().populate("memberId").populate("bookId");
    populated.forEach((b) => {
      console.log(`  - ${b.memberId.name} borrowed "${b.bookId.title}" [${b.status}]`);
    });

    // ─── Validation Failures ───────────────────────────────────────
    console.log("\n=== Validation Failures ===");

    // Missing required field - member name
    try {
      await Member.create({ email: "test@test.com", department: "CSE" });
    } catch (err) {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        console.log("Validation Error (missing name):", messages.join(", "));
      }
    }

    // Missing required field - book title
    try {
      await Book.create({ author: "Someone", category: "CS" });
    } catch (err) {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        console.log("Validation Error (missing title):", messages.join(", "));
      }
    }

    // Invalid borrowing status
    try {
      await Borrowing.create({
        memberId: members[0]._id,
        bookId: books[0]._id,
        borrowDate: new Date(),
        returnDate: new Date(),
        status: "invalid_status",
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        console.log("Validation Error (invalid status):", messages.join(", "));
      }
    }

    console.log("\nDone! All data seeded successfully.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
