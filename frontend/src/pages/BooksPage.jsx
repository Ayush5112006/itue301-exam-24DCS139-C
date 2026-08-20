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
        <h1 className="page-title">Books Catalog</h1>
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="loading-text">Fetching books from server...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Books Catalog</h1>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Failed to Load Books</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Books Catalog</h1>
      <p className="page-subtitle">Browse available books in the library</p>

      <div className="count-badge">
        📚 {data.length} {data.length === 1 ? "book" : "books"} found
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Books Found</h3>
          <p>The library catalog is currently empty.</p>
        </div>
      ) : (
        data.map((book, index) => (
          <div key={book.id} style={{ animationDelay: `${index * 0.06}s` }}>
            <BookCard
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BooksPage;
