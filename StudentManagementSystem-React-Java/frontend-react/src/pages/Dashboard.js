import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  HelpCircle,
  Eye,
  Plus,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { apiService } from '../services/apiService';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load dashboard stats and activities in parallel
      const [statsData, activitiesData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getRecentActivities()
      ]);

      setStats(statsData);
      setActivities(activitiesData || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
      // Set default values to prevent crashes
      setStats({
        totalStudents: 0,
        newAdmissions: 0,
        feesCollected: 0,
        pendingInquiries: 0
      });
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'admission':
        return <UserPlus size={16} />;
      case 'payment':
        return <DollarSign size={16} />;
      case 'inquiry':
        return <HelpCircle size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="container">
        <div className="error">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadDashboardData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Student Management Dashboard</h1>
          <p>Overview of your student management system</p>
        </header>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Students</h3>
              <p className="stat-number">{stats?.totalStudents || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon admissions">
              <UserPlus size={24} />
            </div>
            <div className="stat-content">
              <h3>New Admissions</h3>
              <p className="stat-number">{stats?.newAdmissions || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon fees">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>Fees Collected</h3>
              <p className="stat-number">
                ${(stats?.feesCollected || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon inquiries">
              <HelpCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>Pending Inquiries</h3>
              <p className="stat-number">{stats?.pendingInquiries || 0}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/add-student" className="action-card">
              <div className="action-icon">
                <Plus size={24} />
              </div>
              <div className="action-content">
                <h3>Add New Student</h3>
                <p>Register a new student to the system</p>
              </div>
            </Link>

            <Link to="/students" className="action-card">
              <div className="action-icon">
                <Eye size={24} />
              </div>
              <div className="action-content">
                <h3>View Students</h3>
                <p>Browse and manage existing students</p>
              </div>
            </Link>

            <Link to="/fees" className="action-card">
              <div className="action-icon">
                <CreditCard size={24} />
              </div>
              <div className="action-content">
                <h3>Manage Fees</h3>
                <p>Handle fee collections and payments</p>
              </div>
            </Link>

            <Link to="/inquiries" className="action-card">
              <div className="action-icon">
                <MessageSquare size={24} />
              </div>
              <div className="action-content">
                <h3>Handle Inquiries</h3>
                <p>Respond to student inquiries</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <h2>Recent Activities</h2>
          <div className="card">
            {activities.length > 0 ? (
              <div className="activities-list">
                {activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-activities">No recent activities available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;