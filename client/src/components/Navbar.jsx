import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 👈 ref for dropdown container

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  // 👇 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Project Triangle Logo" className="logo-img" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="auth-buttons">
        {user ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <button className="user-toggle" onClick={toggleDropdown}>
              <FiUser />
              <span>{user.name}</span>
              <FiChevronDown />
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  My Profile
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FiLogOut style={{ marginRight: '6px' }} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              <FiLogIn style={{ marginRight: '6px' }} />
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;