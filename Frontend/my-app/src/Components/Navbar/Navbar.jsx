import { useState } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useLogin } from "../LoginContext/LoginContext";   // 🔥 added
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useLogin();   // 🔥 get user + logout

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo">LungCare</div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/symptoms">Symptoms</Link></li>
          <li><Link to="/prevention">Prevention</Link></li>
          <li><Link to="/research">Research</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/upload">Upload</Link></li>
        </ul>

        {/* 🔥 SHOW LOGIN ONLY WHEN USER IS NOT LOGGED IN */}
        {!user ? (
          <Link to="/login" className="login-icon">
            <BiUserCircle />
          </Link>
        ) : (
          <div className="user-box">
            <span className="username">Hi, {user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        )}

        <div
          className={`hamburger ${isOpen ? "toggle" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
