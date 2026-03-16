import axiosClient from "../axiosClient";

const mapProductApiToUi = (apiData) => {
  if (!apiData) return null;

  let allImages = [];
  if (apiData.imageUrl) allImages.push(apiData.imageUrl);
  if (apiData.images) {
    apiData.images.forEach((img) => allImages.push(img.url));
  }
  if (allImages.length === 0)
    allImages = ["https://placehold.co/600x600?text=No+Image"];

  const displayPrice =
    apiData.attributes && apiData.attributes.length > 0
      ? apiData.attributes[0].price
      : apiData.price || 0;

  return {
    ...apiData,
    title: apiData.name,
    image: apiData.imageUrl,
    images: allImages,
    price: displayPrice,
    brand: apiData.brand || "ShoeFit",
    displaySizes: apiData.size ? apiData.size : "Liên hệ",
    sizes: apiData.size ? apiData.size.split(",").map((s) => s.trim()) : [],
    colors: ["#fff", "#000", "#15228b"],
    specs: [
      { label: "Thương hiệu", value: apiData.brand || "N/A" },
      { label: "SKU", value: apiData.sku || "N/A" },
      {
        label: "Chất liệu",
        value: apiData.attributes?.[0]?.materialName || "Đang cập nhật",
      },
      {
        label: "Kiểu dáng",
        value: apiData.attributes?.[0]?.styleName || "Đang cập nhật",
      },
    ],
    rating: 4.5,
    reviews_count: 120,
    ai_description: "Sản phẩm được đánh giá cao về độ bền và tính thẩm mỹ.",
  };
};

const productService = {
  mapProductApiToUi,
  getProducts: async (searchTerm = "", filters = {}, page = 1, size = 9) => {
    try {
      const params = {
        PageNumber: page,
        PageSize: size,
        Search: searchTerm || undefined,
        MetirialId: filters.materialId || undefined,
        CategoryId: filters.categoryId || undefined,
        StyleId: filters.styleId || undefined,
      };
      const response = await axiosClient.get("/api/v1/shoes", { params });
      const data = response.data?.data || response.data;
      return {
        items: (data.items || []).map(mapProductApiToUi),
        total: data.total || 0,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return { items: [], total: 0, totalPages: 1 };
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosClient.get(`/api/v1/shoes/${id}`);
      const rawData = response.data?.data || response.data;
      return mapProductApiToUi(rawData);
    } catch (error) {
      return null;
    }
  },

  getRelated: async (id) => {
    try {
      const response = await axiosClient.get("/api/v1/shoes", {
        params: { PageNumber: 1, PageSize: 7 },
      });

      const data = response.data?.data || response.data;
      const items = data.items || [];
      return items
        .filter((p) => p.id !== id)
        .slice(0, 6)
        .map(mapProductApiToUi);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm liên quan:", error);
      return [];
    }
  },

  getCategories: async () => {
    try {
      const res = await axiosClient.get("/api/v1/categories?page=1&size=100");
      const data = res.data?.data || res.data;
      return data.items || [];
    } catch (error) {
      return [];
    }
  },

  getMaterials: async () => {
    try {
      const res = await axiosClient.get("/api/v1/materials?page=1&size=100");
      const data = res.data?.data || res.data;
      return data.items || [];
    } catch (error) {
      return [];
    }
  },

  getStyles: async () => {
    try {
      const res = await axiosClient.get("/api/v1/styles?page=1&size=100");
      const data = res.data?.data || res.data;
      return data.items || [];
    } catch (error) {
      return [];
    }
  },
};

export default productService;
