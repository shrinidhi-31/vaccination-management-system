import { Link, useNavigate } from "react-router-dom";
import {
  Syringe,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="register-card">
        <div className="auth-logo">
          <Syringe size={30} />
        </div>

        <h1>Create Your Account</h1>

        <p className="auth-subtitle">
          Register to book appointments and manage your vaccination records.
        </p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-wrapper">
                <Phone size={18} />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Your email address"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>

              <input type="date" required />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select required defaultValue="">
                <option value="" disabled>
                  Select gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>

            <input
              type="text"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;