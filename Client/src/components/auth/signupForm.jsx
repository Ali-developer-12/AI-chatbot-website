import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import '../../styles/bootstrap.min.css';
import '../../styles/auth.css';

const SignupForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div className="signup-card">
      <div className="card-header">
        <h2>Create Account</h2>
        <p>Join our community today</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-control"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              className="form-check-input"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="agreeTerms">
              I agree to <a href="#" className="login-link">Terms</a> and <a href="#" className="login-link">Privacy</a>
            </label>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="divider"><span>or continue with</span></div>

          <div className="social-buttons-row">
            <a href="#" className="social-btn btn-google"><FaGoogle className="social-icon"/>Google</a>
            <a href="#" className="social-btn btn-github"><FaGithub className="social-icon"/>GitHub</a>
          </div>
        </form>

        <div className="links-section">
          Already have an account? <a href="#" className="login-link">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
