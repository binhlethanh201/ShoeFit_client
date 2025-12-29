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

  // Chưa đăng nhập -> Đá về Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng sai Role -> Đá về Home (hoặc trang 403 Forbidden)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Hợp lệ -> Cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;
