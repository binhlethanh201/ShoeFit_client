import axios from "axios";
const API_URL = "http://localhost:9999/api/admin";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const adminService = {
  // --- USER ---
  getAllUsers: async () => {
    // return axios.get(`${API_URL}/users`, getAuthHeader());
    // Mock data
    return Promise.resolve({
      success: true,
      data: [
        { id: 1, name: "User A" },
        { id: 2, name: "User B" },
      ],
    });
  },

  // --- PRODUCT ---
  getPendingProducts: async () => {
    // return axios.get(`${API_URL}/products/pending`, getAuthHeader());
    return Promise.resolve({ success: true, data: [] });
  },

  // --- ORDER ---
  getAllOrders: async () => {
    return Promise.resolve({ success: true, data: [] });
  },

  // --- STATS ---
  getDashboardStats: async () => {
    return Promise.resolve({
      success: true,
      data: { totalUsers: 1204, revenue: 500000000, newOrders: 45 },
    });
  },
};

export default adminService;
