import React from "react";

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div className="info">
        <h3>{title}</h3>
        <p>Author: {author}</p>
        <p>Category: {category}</p>
      </div>
      <span className={`badge ${available ? "available" : "unavailable"}`}>
        {available ? "Available" : "Not Available"}
      </span>
    </div>
  );
};

export default BookCard;
