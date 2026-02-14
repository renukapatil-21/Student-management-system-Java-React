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
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
          <GraduationCap size={24} />
          <span>Student Management</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation links */}
        <div className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') || isActive('/')}`}
            onClick={closeMobileMenu}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/students" 
            className={`nav-link ${isActive('/students')}`}
            onClick={closeMobileMenu}
          >
            <Users size={18} />
            <span>Students</span>
          </Link>

          <Link 
            to="/fees" 
            className={`nav-link ${isActive('/fees')}`}
            onClick={closeMobileMenu}
          >
            <CreditCard size={18} />
            <span>Fees</span>
          </Link>

          <Link 
            to="/inquiries" 
            className={`nav-link ${isActive('/inquiries')}`}
            onClick={closeMobileMenu}
          >
            <MessageSquare size={18} />
            <span>Inquiries</span>
          </Link>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu}></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;