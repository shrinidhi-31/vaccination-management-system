import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Syringe,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Create Supabase Auth account
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setError("Account creation failed.");
      setLoading(false);
      return;
    }

   
    // 3. Create patient record
    const { error: patientError } = await supabase.from("patients").insert({
      user_id: user.id,
      full_name: formData.fullName,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
    });

    if (patientError) {
      setError(patientError.message);
      setLoading(false);
      return;
    }

    // 4. Registration successful
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

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
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
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
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
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight size={18} />}
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