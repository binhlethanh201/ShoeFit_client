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

  // --- USERS ---
  getAllUsers: (page = 1, size = 10) => {
    return axiosClient.get(`/api/v1/users`, { params: { page, size } });
  },

  getUserById: (id) => {
    return axiosClient.get(`/api/v1/users/${id}`);
  },

  // --- STATISTICS ---
  getDashboardStats: async () => {
    try {
      const [usersRes, shoesRes, catRes, attrRes] = await Promise.all([
        axiosClient.get(`/api/v1/users`, { params: { page: 1, size: 1 } }),
        axiosClient.get(`/api/v1/shoes`, {
          params: { PageNumber: 1, PageSize: 1 },
        }),
        axiosClient.get(`/api/v1/categories`, { params: { page: 1, size: 1 } }),
        axiosClient.get(`/api/v1/attributes`, { params: { page: 1, size: 1 } }),
      ]);

      return {
        success: true,
        data: {
          totalUsers: usersRes.data?.data?.total || usersRes.data?.total || 0,
          totalProducts:
            shoesRes.data?.data?.total || shoesRes.data?.total || 0,
          totalCategories: catRes.data?.data?.total || catRes.data?.total || 0,
          totalAttributes:
            attrRes.data?.data?.total || attrRes.data?.total || 0,
        },
      };
    } catch (error) {
      console.error("Lỗi khi tải thống kê:", error);
      return {
        success: false,
        data: {
          totalUsers: 0,
          totalProducts: 0,
          totalCategories: 0,
          totalAttributes: 0,
        },
      };
    }
  },
};

export default adminService;
