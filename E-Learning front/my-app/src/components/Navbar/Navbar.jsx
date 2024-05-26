"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogadmin, setIsLogadmin] = useState(false);

  useEffect(() => {
    // Check if student is logged in
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    setIsLoggedIn(token ? true : false);
    setIsLogadmin(admin ? true : false);
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('userID');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
    setIsLogadmin(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link href="/">
        <span className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>eLEARNING</h2>
        </span>
      </Link>
    
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link href="/">
            <span className="nav-item nav-link active">Home</span>
          </Link>
          <Link href="/about">
            <span className="nav-item nav-link">About</span>
          </Link>
          <Link href="/course">
            <span className="nav-item nav-link">Courses</span>
          </Link>
          {!isLoggedIn && (
            <Link href="/Inscription/student">
              <span className="nav-item nav-link active">Inscription</span>
            </Link>
          )}
          {isLogadmin  && (
            <Link href="/admin">
              <span className="nav-item nav-link active">ADMIN</span>
            </Link>
          )}
          <Link href="/contact">
            <span className="nav-item nav-link">Contact</span>
          </Link>
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Deconnecter<i className="fa fa-arrow-right ms-3"></i></button>
        ) : (
          <Link href="/Inscription/login">
            <span className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Connexion<i className="fa fa-arrow-right ms-3"></i></span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
