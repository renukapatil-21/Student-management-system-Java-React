import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`navbar ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
        <div className="nav-container">
          {/* Logo/Brand */}
          <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
            <GraduationCap size={32} />
            <span>EduManage</span>
          </Link>

          {/* Navigation links */}
          <div className="nav-menu">
            <Link
              to="/dashboard"
              className={`nav-link ${isActive('/dashboard') || isActive('/')}`}
              onClick={closeMobileMenu}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/students"
              className={`nav-link ${isActive('/students')}`}
              onClick={closeMobileMenu}
            >
              <Users size={20} />
              <span>Students</span>
            </Link>

            <Link
              to="/fees"
              className={`nav-link ${isActive('/fees')}`}
              onClick={closeMobileMenu}
            >
              <CreditCard size={20} />
              <span>Fees</span>
            </Link>

            <Link
              to="/inquiries"
              className={`nav-link ${isActive('/inquiries')}`}
              onClick={closeMobileMenu}
            >
              <MessageSquare size={20} />
              <span>Inquiries</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className={`mobile-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar;