import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus, Search, User } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllStudents();
      setStudents(data);
    } catch (error) {
      toast.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await apiService.deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
        toast.success('Student deleted successfully');
      } catch (error) {
        toast.error('Failed to delete student');
        console.error('Error deleting student:', error);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phoneNumber.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <User className="header-icon" />
            <h1>Students Management</h1>
          </div>
          <Link to="/add-student" className="btn btn-primary">
            <Plus size={20} />
            Add Student
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <User size={64} className="empty-icon" />
            <h3>No students found</h3>
            <p>
              {students.length === 0 
                ? "No students have been added yet." 
                : "No students match your search criteria."
              }
            </p>
            {students.length === 0 && (
              <Link to="/add-student" className="btn btn-primary">
                <Plus size={20} />
                Add First Student
              </Link>
            )}
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <div className="student-avatar">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div className="student-info">
                    <h3>{student.firstName} {student.lastName}</h3>
                    <p className="student-email">{student.email}</p>
                  </div>
                </div>
                
                <div className="student-details">
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{student.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Course:</span>
                    <span className="detail-value">{student.course || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gender:</span>
                    <span className="detail-value">{student.gender || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">
                      <span className={`status-badge status-${student.status?.toLowerCase()}`}>
                        {student.status || 'Active'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="student-actions">
                  <Link 
                    to={`/edit-student/${student.id}`} 
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;