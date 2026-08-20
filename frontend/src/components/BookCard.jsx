import React from "react";

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div className="book-body">
        <div className="book-icon">B</div>
        <div className="info">
          <h3>{title}</h3>
          <p>
            <span>by</span> {author}
          </p>
          <p>
            <span>Category:</span> {category}
          </p>
        </div>
      </div>
      <span className={`badge ${available ? "available" : "unavailable"}`}>
        {available ? "Available" : "Not Available"}
      </span>
    </div>
  );
};

export default BookCard;
