import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper to extract data from API response
const extractData = (response) => {
  // If response has success and data properties, extract data
  if (response.success && response.data !== undefined) {
    return response.data;
  }
  // Otherwise return the response as is
  return response;
};

// API service methods
export const apiService = {
  // Dashboard
  getDashboardStats: () => api.get('/dashboard/stats').then(res => extractData(res.data)),
  getRecentActivities: () => api.get('/dashboard/recent-activities').then(res => extractData(res.data)),

  // Students
  getAllStudents: () => api.get('/students').then(res => extractData(res.data)),
  getStudentById: (id) => api.get(`/students/${id}`).then(res => extractData(res.data)),
  addStudent: (data) => api.post('/students', data).then(res => extractData(res.data)),
  updateStudent: (id, data) => api.put(`/students/${id}`, data).then(res => extractData(res.data)),
  deleteStudent: (id) => api.delete(`/students/${id}`).then(res => extractData(res.data)),
  searchStudents: (query) => api.get(`/students/search?q=${query}`).then(res => extractData(res.data)),
  getStudentsByStatus: (status) => api.get(`/students/status/${status}`).then(res => extractData(res.data)),
  getStudentsByCourse: (course) => api.get(`/students/course/${course}`).then(res => extractData(res.data)),

  // Fees
  getAllFees: () => api.get('/fees').then(res => extractData(res.data)),
  getFeeById: (id) => api.get(`/fees/${id}`).then(res => extractData(res.data)),
  addFee: (data) => api.post('/fees', data).then(res => extractData(res.data)),
  updateFee: (id, data) => api.put(`/fees/${id}`, data).then(res => extractData(res.data)),
  deleteFee: (id) => api.delete(`/fees/${id}`).then(res => extractData(res.data)),
  updateFeeStatus: (id, status) => api.put(`/fees/${id}/status`, { status }).then(res => extractData(res.data)),
  getFeesByStudent: (studentId) => api.get(`/fees/student/${studentId}`).then(res => extractData(res.data)),
  getFeesByStatus: (status) => api.get(`/fees/status/${status}`).then(res => extractData(res.data)),
  getFeesByType: (type) => api.get(`/fees/type/${type}`).then(res => extractData(res.data)),
  processPayment: (feeId, paymentData) => api.post(`/fees/${feeId}/payment`, paymentData).then(res => extractData(res.data)),

  // Inquiries
  getAllInquiries: () => api.get('/inquiries').then(res => extractData(res.data)),
  getInquiryById: (id) => api.get(`/inquiries/${id}`).then(res => extractData(res.data)),
  addInquiry: (data) => api.post('/inquiries', data).then(res => extractData(res.data)),
  updateInquiry: (id, data) => api.put(`/inquiries/${id}`, data).then(res => extractData(res.data)),
  deleteInquiry: (id) => api.delete(`/inquiries/${id}`).then(res => extractData(res.data)),
  updateInquiryStatus: (id, status) => api.put(`/inquiries/${id}/status`, { status }).then(res => extractData(res.data)),
  getInquiriesByStatus: (status) => api.get(`/inquiries/status/${status}`).then(res => extractData(res.data)),
  respondToInquiry: (id, response) => api.post(`/inquiries/${id}/respond`, response).then(res => extractData(res.data)),
};

export default apiService;