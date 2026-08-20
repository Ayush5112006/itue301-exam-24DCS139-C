import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-badge">ITUE301 - Advanced Web Development</div>
        <h1>Library Book Management System</h1>
        <p>
          Digitize your college library experience. Browse the catalog, borrow
          books, and manage records — all in one place.
        </p>
        <div className="hero-actions">
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
          <Link to="/borrow" className="btn btn-outline">
            Borrow a Book
          </Link>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">150+</div>
          <div className="stat-label">Books Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">420+</div>
          <div className="stat-label">Registered Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-value">85</div>
          <div className="stat-label">Active Borrows</div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feat-icon">🔍</div>
          <h3>Browse Catalog</h3>
          <p>
            Search and explore the full library catalog with filters by category,
            author, and availability.
          </p>
        </div>
        <div className="feature-card">
          <div className="feat-icon">📝</div>
          <h3>Borrow Books</h3>
          <p>
            Quick and easy borrowing process. Select your book, choose dates, and
            confirm in seconds.
          </p>
        </div>
        <div className="feature-card">
          <div className="feat-icon">📊</div>
          <h3>Track Records</h3>
          <p>
            Keep track of all borrowing records with real-time status updates —
            borrowed, returned, or overdue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
