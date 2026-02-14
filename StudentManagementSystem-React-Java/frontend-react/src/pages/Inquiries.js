import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Plus, Eye, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllInquiries();
      setInquiries(data);
    } catch (error) {
      toast.error('Failed to fetch inquiries');
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await apiService.deleteInquiry(id);
        setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
        toast.success('Inquiry deleted successfully');
      } catch (error) {
        toast.error('Failed to delete inquiry');
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await apiService.updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prevInquiries => 
        prevInquiries.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
        )
      );
      toast.success('Inquiry status updated successfully');
    } catch (error) {
      toast.error('Failed to update inquiry status');
      console.error('Error updating inquiry status:', error);
    }
  };

  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedInquiry(null);
    setShowModal(false);
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'status-badge status-open';
      case 'in_progress':
        return 'status-badge status-progress';
      case 'resolved':
        return 'status-badge status-resolved';
      case 'closed':
        return 'status-badge status-closed';
      default:
        return 'status-badge';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="inquiries-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <HelpCircle className="header-icon" />
            <h1>Inquiries Management</h1>
          </div>
          <Link to="/add-inquiry" className="btn btn-primary">
            <Plus size={20} />
            Add Inquiry
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="filters-container">
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="statusFilter" className="filter-label">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="empty-state">
            <HelpCircle size={64} className="empty-icon" />
            <h3>No inquiries found</h3>
            <p>
              {inquiries.length === 0 
                ? "No inquiries have been submitted yet." 
                : "No inquiries match your search criteria."
              }
            </p>
            {inquiries.length === 0 && (
              <Link to="/add-inquiry" className="btn btn-primary">
                <Plus size={20} />
                Add First Inquiry
              </Link>
            )}
          </div>
        ) : (
          <div className="inquiries-table-container">
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="name-cell">{inquiry.name}</td>
                    <td className="email-cell">{inquiry.email}</td>
                    <td className="subject-cell">{inquiry.subject}</td>
                    <td className="date-cell">
                      {new Date(inquiry.inquiryDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(inquiry.status)}>
                        {formatStatus(inquiry.status)}
                      </span>
                    </td>
                    <td>
                      <div className="inquiry-actions">
                        <button
                          onClick={() => openModal(inquiry)}
                          className="btn btn-ghost btn-sm"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Open">Open</option>
                          <option value="In_Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="btn btn-danger btn-sm"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Summary */}
      <div className="content-card inquiry-summary">
        <h3>Inquiry Summary</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="stat-value">
              {inquiries.filter(i => i.status.toLowerCase() === 'open').length}
            </div>
            <div className="stat-label">Open</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              {inquiries.filter(i => i.status.toLowerCase() === 'in_progress').length}
            </div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              {inquiries.filter(i => i.status.toLowerCase() === 'resolved').length}
            </div>
            <div className="stat-label">Resolved</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              {inquiries.length}
            </div>
            <div className="stat-label">Total Inquiries</div>
          </div>
        </div>
      </div>

      {/* Modal for inquiry details */}
      {showModal && selectedInquiry && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Inquiry Details</h3>
              <button onClick={closeModal} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="detail-group">
                <strong>Name:</strong> {selectedInquiry.name}
              </div>
              <div className="detail-group">
                <strong>Email:</strong> {selectedInquiry.email}
              </div>
              <div className="detail-group">
                <strong>Phone:</strong> {selectedInquiry.phone || 'Not provided'}
              </div>
              <div className="detail-group">
                <strong>Subject:</strong> {selectedInquiry.subject}
              </div>
              <div className="detail-group">
                <strong>Message:</strong>
                <div className="message-content">{selectedInquiry.message}</div>
              </div>
              <div className="detail-group">
                <strong>Date:</strong> {selectedInquiry.createdDate ? new Date(selectedInquiry.createdDate).toLocaleDateString() : 'N/A'}
              </div>
              <div className="detail-group">
                <strong>Status:</strong>
                <span className={getStatusBadgeClass(selectedInquiry.status)}>
                  {formatStatus(selectedInquiry.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;