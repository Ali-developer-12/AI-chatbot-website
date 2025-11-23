import React, { useState } from 'react';
import '../../styles/bootstrap.min.css';
import '../../styles/auth.css';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    if(!formData.agreeTerms){
      alert("Please agree to terms!");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      alert("🎉 Account created successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <SignupForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Signup;
