import axiosClient from "./axiosClient";

const adminService = {
  // --- USER ---
  getAllUsers: async () => {
    return Promise.resolve({ success: true, data: [{ id: 1, name: "User A" }] });
  },

  // --- CATEGORY ---
  getCategories: (params) => {
    return axiosClient.get("/api/v1/categories", { params });
  },
  createCategory: (data) => {
    return axiosClient.post("/api/v1/categories", data);
  },
  updateCategory: (id, data) => {
    return axiosClient.patch(`/api/v1/categories/${id}`, data);
  },
  getCategoryById: (id) => {
    return axiosClient.get(`/api/v1/categories/${id}`);
  },

  // --- ATTRIBUTE ---
  getAttributes: (params) => {
    return axiosClient.get("/api/v1/attributes", { params });
  },
  createAttribute: (data) => {
    return axiosClient.post("/api/v1/attributes", data);
  },
  updateAttribute: (id, data) => {
    return axiosClient.patch(`/api/v1/attributes/${id}`, data);
  },
  getAttributeById: (id) => {
    return axiosClient.get(`/api/v1/attributes/${id}`);
  },

  // --- PRODUCT (SHOES) - MỚI ---
  getShoes: (params) => {
    // params: { PageNumber, PageSize, Search, Filter }
    return axiosClient.get("/api/v1/shoes", { params });
  },
  
  getShoeById: (id) => {
    return axiosClient.get(`/api/v1/shoes/${id}`);
  },

  createShoe: (data) => {
    // data bao gồm: sku, name, attributeIds[], images[], ...
    return axiosClient.post("/api/v1/shoes", data);
  },

  updateShoe: (id, data) => {
    // PATCH: chỉ update thông tin cơ bản (sku, name, desc...)
    return axiosClient.patch(`/api/v1/shoes/${id}`, data);
  },

  // Các hàm phụ trợ để thêm/xóa attribute và media (dành cho tính năng Edit nâng cao)
  addShoeAttribute: (id, attributeIds) => {
    return axiosClient.post(`/api/v1/shoes/${id}/attribute`, { attributeIds });
  },
  removeShoeAttribute: (id, attributeIds) => {
    return axiosClient.delete(`/api/v1/shoes/${id}/attribute`, { data: { attributeIds } });
  },
  addShoeMedia: (id, urls) => {
    return axiosClient.post(`/api/v1/shoes/${id}/media`, { urls });
  },
  removeShoeMedia: (id, imageIds) => {
    return axiosClient.delete(`/api/v1/shoes/${id}/media`, { data: { imageIds } });
  },

  // --- STATISTICS ---
  getDashboardStats: async () => {
    return Promise.resolve({
      success: true,
      data: { totalUsers: 1204, revenue: 500000000, newOrders: 45 },
    });
  },
};

export default adminService;