import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import './auth.css';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    alert("🎉 Account created successfully!");
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="signup-card col-12 col-sm-10 col-md-8 col-lg-6">
        <div className="card-header">
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label" htmlFor="firstName">First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" placeholder="Enter first name" required />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label" htmlFor="lastName">Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" placeholder="Enter last name" required />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label" htmlFor="email">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" required />
            </div>

            <div className="mb-2">
              <label className="form-label" htmlFor="password">Password *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Create password" required />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" placeholder="Confirm password" required />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="form-check-input" id="agreeTerms" required />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to <a href="#" className="login-link">Terms</a> and <a href="#" className="login-link">Privacy</a>
              </label>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>

            <div className="divider"><span>or continue with</span></div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-between">
              <a href="#" className="social-btn btn-google mb-2 mb-md-0"><FaGoogle className="social-icon"/>Google</a>
              <a href="#" className="social-btn btn-github"><FaGithub className="social-icon"/>GitHub</a>
            </div>
          </form>

          <div className="links-section mt-3">
            Already have an account? <a href="#" className="login-link">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
