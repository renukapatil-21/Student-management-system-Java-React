import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const AddInquiry = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
    status: 'Open'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await apiService.addInquiry(formData);
      toast.success('Inquiry submitted successfully');
      navigate('/inquiries');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit inquiry';
      toast.error(errorMessage);
      console.error('Error adding inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-inquiry-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <button 
              onClick={() => navigate('/inquiries')}
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft size={20} />
              Back to Inquiries
            </button>
            <div className="title-content">
              <HelpCircle className="header-icon" />
              <h1>Submit New Inquiry</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Open">Open</option>
                <option value="In_Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label required">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              placeholder="Brief description of your inquiry"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label required">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-input"
              rows="6"
              placeholder="Please provide detailed information about your inquiry..."
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/inquiries')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner-sm"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Inquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="content-card inquiry-info">
        <h3>Contact Information</h3>
        <div className="contact-details">
          <p><strong>Response Time:</strong> We typically respond within 24-48 hours</p>
          <p><strong>Priority Inquiries:</strong> Mark as "In Progress" for urgent matters</p>
          <p><strong>Follow-up:</strong> You can track your inquiry status in the inquiries section</p>
        </div>
      </div>
    </div>
  );
};

export default AddInquiry;