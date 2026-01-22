import axiosClient from "./axiosClient";

const authService = {
  register: (formData) => {
    return axiosClient.post("/api/v1/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  login: (data) => {
    return axiosClient.post("/api/v1/auth/login", data);
  },

  loginGoogle: (idToken) => {
    return axiosClient.post("/api/v1/auth/login/google", { idToken });
  },

  otp: (data) => {
    return axiosClient.post("/api/v1/auth/otp", data);
  },

  getProfile: () => {
    return axiosClient.get("/api/v1/users/profile");
  },

  updateProfile: (formData) => {
    return axiosClient.post("/api/v1/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authService;
