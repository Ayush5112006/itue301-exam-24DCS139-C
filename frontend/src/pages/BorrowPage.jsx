import React, { useState } from "react";

const BorrowPage = () => {
  const [formData, setFormData] = useState({
    memberName: "",
    bookTitle: "",
    borrowDate: "",
    returnDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ memberName: "", bookTitle: "", borrowDate: "", returnDate: "" });
    setSubmitted(false);
  };

  const showPreview = (formData.memberName || formData.bookTitle) && !submitted;

  return (
    <div className="page">
      <h1 className="page-title">Borrow a Book</h1>
      <p className="page-subtitle">
        Fill in the details below to create a new borrowing record
      </p>

      {submitted ? (
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h3>Borrowing Confirmed!</h3>
          <p>
            <strong>{formData.memberName}</strong> has successfully borrowed{" "}
            <strong>{formData.bookTitle}</strong>.
          </p>
          <p>
            Due date: <strong>{formData.returnDate}</strong>
          </p>
          <br />
          <button className="btn btn-outline" onClick={handleReset}>
            Borrow Another Book
          </button>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Member Name</label>
              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
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
                placeholder="e.g. Data Structures"
                required
              />
            </div>
            <div className="form-row">
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
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Confirm Borrowing"}
            </button>
          </form>
        </div>
      )}

      {showPreview && (
        <div className="preview-card">
          <div className="preview-title">Live Preview</div>
          <div className="preview-row">
            <span className="label">Member</span>
            <span className="value">{formData.memberName || "---"}</span>
          </div>
          <div className="preview-row">
            <span className="label">Book</span>
            <span className="value">{formData.bookTitle || "---"}</span>
          </div>
          <div className="preview-row">
            <span className="label">Borrow Date</span>
            <span className="value">{formData.borrowDate || "---"}</span>
          </div>
          <div className="preview-row">
            <span className="label">Return Date</span>
            <span className="value">{formData.returnDate || "---"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowPage;
