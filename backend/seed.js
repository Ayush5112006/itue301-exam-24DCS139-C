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

    // ─── Successful Operations ─────────────────────────────────────
    console.log("=== Successful Operations ===");

    const book1 = await Book.create({
      title: "Data Structures",
      author: "Mark Allen",
      category: "CS",
      isbn: "978-001",
      available: true,
    });
    console.log("Book created:", book1.title);

    const member1 = await Member.create({
      name: "Rahul Sharma",
      email: "rahul@charusat.ac.in",
      phone: "9876543210",
      department: "IT",
    });
    console.log("Member created:", member1.name);

    const borrowing1 = await Borrowing.create({
      memberId: member1._id,
      bookId: book1._id,
      borrowDate: new Date("2026-08-20"),
      returnDate: new Date("2026-09-03"),
      status: "borrowed",
    });
    console.log("Borrowing created:", borrowing1._id);

    // Verify with populate
    const populated = await Borrowing.findById(borrowing1._id)
      .populate("memberId")
      .populate("bookId");
    console.log("Populated borrowing:", JSON.stringify(populated, null, 2));

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
        memberId: member1._id,
        bookId: book1._id,
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

    console.log("\nDone!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
