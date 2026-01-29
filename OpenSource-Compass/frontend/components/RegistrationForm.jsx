import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    githubRepo: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const domains = ['Web', 'DSA', 'AI', 'IoT', 'Cybersecurity'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation - required field
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Domain validation - required field
    if (!formData.domain) {
      newErrors.domain = 'Domain is required';
    }

    // GitHub Repository validation - required field and must start with https://github.com/
    if (!formData.githubRepo.trim()) {
      newErrors.githubRepo = 'GitHub repository link is required';
    } else if (!formData.githubRepo.startsWith('https://github.com/')) {
      newErrors.githubRepo = 'GitHub URL must start with https://github.com/';
    } else if (formData.githubRepo === 'https://github.com/' || formData.githubRepo.length < 20) {
      newErrors.githubRepo = 'Please enter a complete GitHub repository URL';
    }

    // Email validation - required field and must follow standard format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form inputs before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // POST data to /api/register endpoint using fetch API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Registration failed: ${response.status} ${response.statusText}`);
      }

      // Parse the successful response
      const data = await response.json();
      console.log('Registration successful:', data);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form to initial state
      setFormData({
        name: '',
        domain: '',
        githubRepo: '',
        email: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: error.message || 'Registration failed. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Join the Initiative
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:mt-4">
            Please fill out the details below to register for the event.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          {/* Success Message */}
          {submitSuccess && (
            <div className="rounded-md bg-green-50 p-4 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Registration successful! We'll contact you soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Name Field */}
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter your full name"
              required
            />

            {/* Domain Field */}
            <SelectField
              label="Domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              error={errors.domain}
              options={domains}
              placeholder="Select your domain"
              required
            />

            {/* GitHub Repository Link Field */}
            <InputField
              label="GitHub Repository Link"
              type="url"
              name="githubRepo"
              value={formData.githubRepo}
              onChange={handleChange}
              error={errors.githubRepo}
              placeholder="https://github.com/username/repository"
              required
            />

            {/* Email Field */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition duration-150 ease-in-out`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By registering, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
