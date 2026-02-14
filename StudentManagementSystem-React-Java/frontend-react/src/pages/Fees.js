import React, { useState, useEffect } from 'react';
import { DollarSign, Search, Calendar, User } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feesData, studentsData] = await Promise.all([
        apiService.getAllFees(),
        apiService.getAllStudents()
      ]);
      setFees(feesData);
      setStudents(studentsData);
    } catch (error) {
      toast.error('Failed to fetch fees data');
      console.error('Error fetching fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  const handleStatusChange = async (feeId, newStatus) => {
    try {
      await apiService.updateFeeStatus(feeId, newStatus);
      setFees(prevFees => 
        prevFees.map(fee => 
          fee.id === feeId ? { ...fee, status: newStatus } : fee
        )
      );
      toast.success('Fee status updated successfully');
    } catch (error) {
      toast.error('Failed to update fee status');
      console.error('Error updating fee status:', error);
    }
  };

  const filteredFees = fees.filter(fee => {
    const matchesSearch = getStudentName(fee.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fee.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-badge status-paid';
      case 'pending':
        return 'status-badge status-pending';
      case 'overdue':
        return 'status-badge status-overdue';
      default:
        return 'status-badge';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading fees...</p>
      </div>
    );
  }

  return (
    <div className="fees-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <DollarSign className="header-icon" />
            <h1>Fee Management</h1>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="filters-container">
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by student name or fee type..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {filteredFees.length === 0 ? (
          <div className="empty-state">
            <DollarSign size={64} className="empty-icon" />
            <h3>No fees found</h3>
            <p>
              {fees.length === 0 
                ? "No fees have been recorded yet." 
                : "No fees match your search criteria."
              }
            </p>
          </div>
        ) : (
          <div className="fees-table-container">
            <table className="fees-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Fee Type</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.map((fee) => (
                  <tr key={fee.id}>
                    <td>
                      <div className="student-cell">
                        <User size={20} className="student-icon" />
                        <span>{getStudentName(fee.studentId)}</span>
                      </div>
                    </td>
                    <td className="fee-type">{fee.feeType}</td>
                    <td className="amount">${fee.amount.toFixed(2)}</td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={16} className="date-icon" />
                        <span>{new Date(fee.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(fee.status)}>
                        {fee.status}
                      </span>
                    </td>
                    <td>
                      <div className="fee-actions">
                        {fee.status.toLowerCase() !== 'paid' && (
                          <button
                            onClick={() => handleStatusChange(fee.id, 'Paid')}
                            className="btn btn-success btn-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                        {fee.status.toLowerCase() === 'paid' && (
                          <button
                            onClick={() => handleStatusChange(fee.id, 'Pending')}
                            className="btn btn-secondary btn-sm"
                          >
                            Mark as Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Fee Summary */}
      <div className="content-card fee-summary">
        <h3>Fee Summary</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="stat-value">
              ${fees.filter(f => f.status.toLowerCase() === 'paid')
                    .reduce((sum, f) => sum + f.amount, 0).toFixed(2)}
            </div>
            <div className="stat-label">Total Collected</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              ${fees.filter(f => f.status.toLowerCase() === 'pending')
                    .reduce((sum, f) => sum + f.amount, 0).toFixed(2)}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              ${fees.filter(f => f.status.toLowerCase() === 'overdue')
                    .reduce((sum, f) => sum + f.amount, 0).toFixed(2)}
            </div>
            <div className="stat-label">Overdue</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">
              {fees.length}
            </div>
            <div className="stat-label">Total Fees</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;