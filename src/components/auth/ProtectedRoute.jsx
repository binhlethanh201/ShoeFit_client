import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;

  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Lỗi parse user data", error);
  }

  // 1. Kiểm tra đăng nhập
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Kiểm tra Role (Cần xử lý viết hoa/thường)
  if (allowedRoles && user.role) {
    // Chuyển cả role của user và list allowedRoles về chữ thường để so sánh
    const userRoleLower = user.role.toLowerCase(); // "Admin" -> "admin"
    const allowedRolesLower = allowedRoles.map(r => r.toLowerCase());

    if (!allowedRolesLower.includes(userRoleLower)) {
      // Sai quyền -> Đá về Home
      return <Navigate to="/" replace />;
    }
  } else if (allowedRoles && !user.role) {
     // Trường hợp có yêu cầu quyền nhưng user không có role -> Đá về Home
     return <Navigate to="/" replace />;
  }

  // Hợp lệ -> Cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;