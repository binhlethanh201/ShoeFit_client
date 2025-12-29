import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar giả lập */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100 py-3">
          <div className="position-sticky">
            <h4 className="px-3" style={{ color: "#1f32c5" }}>
              Admin Panel
            </h4>
            <ul className="nav flex-column mt-4">
              <li className="nav-item mb-2">
                <button
                  className="nav-link active bg-transparent border-0 text-start w-100"
                  type="button"
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="nav-link text-dark bg-transparent border-0 text-start w-100"
                  type="button"
                >
                  Quản lý User
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="nav-link text-dark bg-transparent border-0 text-start w-100"
                  type="button"
                >
                  Duyệt Sản Phẩm
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="nav-link text-dark bg-transparent border-0 text-start w-100"
                  type="button"
                >
                  Báo Cáo
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Xin chào, {user?.username || "Admin"}</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Đăng Xuất
            </button>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header">Tổng User</div>
                <div className="card-body">
                  <h5 className="card-title">1,204</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Doanh Thu</div>
                <div className="card-body">
                  <h5 className="card-title">500.000.000 VNĐ</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
