import axiosClient from "./axiosClient";

const authService = {
  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  forgotPassword: (data) => {
    return axiosClient.post("/auth/forgot-password", data);
  },

  getProfile: () => {
    return axiosClient.get("/auth/me");
  },

  updateProfile: (data) => {
    return axiosClient.put("/auth/me", data);
  },

  changePassword: (data) => {
    return axiosClient.put("/auth/password", data);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return axiosClient.post("/auth/logout");
  },
};

export default authService;
