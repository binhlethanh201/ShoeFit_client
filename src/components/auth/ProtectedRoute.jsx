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

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user.role) {
    const userRoleLower = user.role.toLowerCase();
    const allowedRolesLower = allowedRoles.map((r) => r.toLowerCase());

    if (!allowedRolesLower.includes(userRoleLower)) {
      return <Navigate to="/" replace />;
    }
  } else if (allowedRoles && !user.role) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
