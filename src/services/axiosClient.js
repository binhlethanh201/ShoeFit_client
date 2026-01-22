import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.shoefit.com.vn", // URL Backend
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
      return response.data; 
    }
    return response;
  },
  (error) => {
   if (error.response && error.response.status === 401) {
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       window.location.href = "/login"; 
      }
    throw error;
  }
);

export default axiosClient;
