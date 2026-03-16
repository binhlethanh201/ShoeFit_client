import axiosClient from "./axiosClient";

const wishlistService = {
  getAll: async (page = 1, size = 10, search = "") => {
    try {
      const response = await axiosClient.get("/api/v1/favorite-shoe", {
        params: {
          PageNumber: Number(page),
          PageSize: Number(size),
          ...(search ? { Search: search } : {}),
        },
      });
      return response.data?.data?.items || response.data?.items || [];
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  },

  addToWishlist: async (shoeId) => {
    try {
      const response = await axiosClient.post("/api/v1/favorite-shoe", {
        shoeId: shoeId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (shoeId) => {
    try {
      const response = await axiosClient.post("/api/v1/favorite-shoe", {
        shoeId: shoeId,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling (removing) item:", error);
      throw error;
    }
  },
};

export default wishlistService;
