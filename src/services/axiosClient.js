import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9999/api", // URL Backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Tự động thêm Token vào header mỗi khi gọi API
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Xử lý lỗi trả về từ server (Optional)
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data; // Chỉ lấy phần data
    }
    return response;
  },
  (error) => {
    // Xử lý lỗi chung (ví dụ: Token hết hạn -> logout)
    throw error;
  }
);

export default axiosClient;
