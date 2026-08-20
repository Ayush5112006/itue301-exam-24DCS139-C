import React, { useState } from "react";

const BorrowPage = () => {
  const [formData, setFormData] = useState({
    memberName: "",
    bookTitle: "",
    borrowDate: "",
    returnDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/borrowings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: formData.memberName,
          bookId: formData.bookTitle,
          borrowDate: formData.borrowDate,
          returnDate: formData.returnDate,
          status: "borrowed",
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error creating borrowing:", err);
    }
  };

  return (
    <div className="page">
      <h1>Borrow a Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Member Name</label>
          <input
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            placeholder="Enter member name"
            required
          />
        </div>
        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>
        <div className="form-group">
          <label>Borrow Date</label>
          <input
            type="date"
            name="borrowDate"
            value={formData.borrowDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Borrow Book
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: 20, padding: 12, background: "#c8e6c9", borderRadius: 6 }}>
          <p><strong>Booking Confirmed!</strong></p>
          <p>Member: {formData.memberName}</p>
          <p>Book: {formData.bookTitle}</p>
          <p>Borrow Date: {formData.borrowDate}</p>
          <p>Return Date: {formData.returnDate}</p>
        </div>
      )}

      {formData.memberName && !submitted && (
        <div style={{ marginTop: 16, padding: 12, background: "#e3f2fd", borderRadius: 6 }}>
          <p>Preview — Member: <strong>{formData.memberName}</strong> is borrowing <strong>{formData.bookTitle || "..."}</strong></p>
        </div>
      )}
    </div>
  );
};

export default BorrowPage;
