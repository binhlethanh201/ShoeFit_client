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

  // Lấy giá từ thuộc tính đầu tiên nếu có
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
    ai_description:
      "Sản phẩm được đánh giá cao về độ bền và tính thẩm mỹ đường phố.",
  };
};

const productService = {
  getProducts: async (searchTerm = "", filters = {}) => {
    try {
      const params = {
        PageNumber: 1,
        PageSize: 100,
        Search: searchTerm,
        CategoryId: filters.categoryId || undefined,
        MaterialId: filters.materialId || undefined,
        StyleId: filters.styleId || undefined,
      };
      const response = await axiosClient.get("/api/v1/shoes", { params });
      const data = response.data;
      return (data.items || []).map(mapProductApiToUi);
    } catch (error) {
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosClient.get(`/api/v1/shoes/${id}`);

      const rawData = response.data || response;

      return mapProductApiToUi(rawData);
    } catch (error) {
      console.error("Lỗi API getById:", error);

      return null;
    }
  },

  getRelated: async (id) => {
    try {
      const response = await axiosClient.get(
        "/api/v1/shoes?PageNumber=1&PageSize=6",
      );

      const data = response.data || response;

      return (data.items || [])

        .filter((p) => p.id !== id)

        .map(mapProductApiToUi);
    } catch (error) {
      return [];
    }
  },

  getCategories: async () => {
    try {
      const res = await axiosClient.get("/api/v1/categories?page=1&size=100");
      return res.data.items || [];
    } catch (error) {
      return [];
    }
  },

  // API lấy danh sách Chất liệu
  getMaterials: async () => {
    try {
      const res = await axiosClient.get("/api/v1/materials?page=1&size=100");
      return res.data.items || [];
    } catch (error) {
      return [];
    }
  },

  // API lấy danh sách Kiểu dáng
  getStyles: async () => {
    try {
      const res = await axiosClient.get("/api/v1/styles?page=1&size=100");
      return res.data.items || [];
    } catch (error) {
      return [];
    }
  },
};

export default productService;
