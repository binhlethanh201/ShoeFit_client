import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const StoreDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: '#1f32c5' }}>Kênh Người Bán: {user?.fullname}</h2>
            <button className="btn btn-black" onClick={handleLogout} style={{backgroundColor: '#000', color: '#fff'}}>
                Đăng Xuất
            </button>
        </div>
        
        <div className="col-md-12">
            <div className="alert alert-info">
                Đây là khu vực dành riêng cho các cửa hàng đối tác (Store) để đăng bán sản phẩm.
            </div>
        </div>

        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                    <i className="fa-solid fa-plus fs-1 mb-3 text-secondary"></i>
                    <h5 className="card-title">Đăng Sản Phẩm Mới</h5>
                    <button className="btn btn-outline-primary mt-2">Tạo Ngay</button>
                </div>
            </div>
        </div>

        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                    <i className="fa-solid fa-list fs-1 mb-3 text-secondary"></i>
                    <h5 className="card-title">Quản Lý Sản Phẩm</h5>
                    <p className="card-text">Xem và chỉnh sửa 15 sản phẩm đang bán.</p>
                </div>
            </div>
        </div>

         <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                    <i className="fa-solid fa-chart-line fs-1 mb-3 text-secondary"></i>
                    <h5 className="card-title">Thống Kê</h5>
                    <p className="card-text">Lượt xem và lượt click affiliate.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StoreDashboard;