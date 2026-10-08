import { Link } from "react-router-dom";
import { Syringe } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <Syringe size={26} />
        <span>VaxCare</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="navbar-button">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;