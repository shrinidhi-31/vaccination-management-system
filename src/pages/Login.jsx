import { Link, useNavigate } from "react-router-dom";
import { Syringe, Mail, Lock, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/patient/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Syringe size={30} />
        </div>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to manage your vaccination journey.
        </p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign In
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;