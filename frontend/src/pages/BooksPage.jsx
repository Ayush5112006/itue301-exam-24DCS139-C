import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

const BooksPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1>Books</h1>
        <p className="loading">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>Books</h1>
        <p className="error-msg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Books</h1>
      {data.length === 0 ? (
        <p>No books found.</p>
      ) : (
        data.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            category={book.category}
            available={book.available}
          />
        ))
      )}
    </div>
  );
};

export default BooksPage;
