import axiosClient from "../axiosClient";

const veoService = {
  getShoes: (pageNumber = 1, pageSize = 100) => {
    return axiosClient.get(
      `/api/v1/shoes?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
  },

  getShoeDetail: (id) => {
    return axiosClient.get(`/api/v1/shoes/${id}`);
  },

  // BƯỚC 1: Tạo ảnh AI 2D với type là Video
  generateTryOnImage: (shoeId, shoeImageId, userImage, name, description) => {
    const formData = new FormData();
    formData.append("ShoeId", shoeId);
    formData.append("ShoeImageId", shoeImageId);
    formData.append("UserImage", userImage);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("GenerateImageType", "Video");

    return axiosClient.post("/api/v1/ai", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // BƯỚC 2: API VEO MỚI - Gửi qua FormData
  generateVeoVideo: (collectId) => {
    const formData = new FormData();
    formData.append("ShoeCollectId", collectId);
    formData.append("Prompt", ""); // Truyền rỗng tương đương null

    return axiosClient.post("/api/v1/ai/generate-veo-video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default veoService;