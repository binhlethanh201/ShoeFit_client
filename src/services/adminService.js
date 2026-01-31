import axiosClient from "./axiosClient";

const adminService = {
  // --- CATEGORIES ---
  getAllCategories: (page = 1, size = 10) => {
    return axiosClient.get(`/api/v1/categories`, { params: { page, size } });
  },

  createCategory: (data) => {
    return axiosClient.post(`/api/v1/categories`, data);
  },

  updateCategory: (id, data) => {
    return axiosClient.patch(`/api/v1/categories/${id}`, data);
  },

  // --- MATERIALS ---
  getAllMaterials: (page = 1, size = 10) => {
    return axiosClient.get(`/api/v1/materials`, { params: { page, size } });
  },

  createMaterial: (data) => {
    return axiosClient.post(`/api/v1/materials`, data);
  },

  deleteMaterial: (id) => {
    return axiosClient.delete(`/api/v1/materials/${id}`);
  },

  // --- STYLES ---
  getAllStyles: (page = 1, size = 10) => {
    return axiosClient.get(`/api/v1/styles`, { params: { page, size } });
  },

  createStyle: (data) => {
    return axiosClient.post(`/api/v1/styles`, data);
  },

  deleteStyle: (id) => {
    return axiosClient.delete(`/api/v1/styles/${id}`);
  },

  // --- SHOES ---
  getAllShoes: (pageNumber = 1, pageSize = 10, search = "") => {
    return axiosClient.get(`/api/v1/shoes`, {
      params: { PageNumber: pageNumber, PageSize: pageSize, Search: search },
    });
  },

  getShoeById: (id) => {
    return axiosClient.get(`/api/v1/shoes/${id}`);
  },

  createShoe: (data) => {
    return axiosClient.post(`/api/v1/shoes`, data);
  },

  updateShoe: (id, data) => {
    return axiosClient.patch(`/api/v1/shoes/${id}`, data);
  },

  addShoeAttributes: (shoeId, data) => {
    return axiosClient.post(`/api/v1/shoes/${shoeId}/attribute`, data);
  },

  deleteShoeAttributes: (shoeId, attributeIds) => {
    return axiosClient.delete(`/api/v1/shoes/${shoeId}/attribute`, {
      data: { attributeIds },
    });
  },

  addShoeMedia: (shoeId, urls) => {
    return axiosClient.post(`/api/v1/shoes/${shoeId}/media`, { urls });
  },

  deleteShoeMedia: (shoeId, imageIds) => {
    return axiosClient.delete(`/api/v1/shoes/${shoeId}/media`, {
      data: { imageIds },
    });
  },

  addShoeCategories: (shoeId, categoryIds) => {
    return axiosClient.post(`/api/v1/shoes/${shoeId}/categories`, {
      categoryIds,
    });
  },

  deleteShoeCategories: (shoeId, categoryIds) => {
    return axiosClient.delete(`/api/v1/shoes/${shoeId}/categories`, {
      data: { categoryIds },
    });
  },

  // --- ATTRIBUTES ---
  getAllAttributes: (page = 1, size = 10) => {
    return axiosClient.get(`/api/v1/attributes`, { params: { page, size } });
  },

  createAttribute: (data) => {
    return axiosClient.post(`/api/v1/attributes`, data);
  },

  getAttributeById: (id) => {
    return axiosClient.get(`/api/v1/attributes/${id}`);
  },

  updateAttribute: (id, data) => {
    return axiosClient.patch(`/api/v1/attributes/${id}`, data);
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
