import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import authService from '../../../services/authService';
import { toast } from 'react-toastify';

// Import Icons từ thư mục assets
import searchIcon from '../../../assets/images/Effects/search.svg';
import heartIcon from '../../../assets/images/Effects/heart.svg';
import userIcon from '../../../assets/images/Effects/user.svg';
import globeIcon from '../../../assets/images/Effects/globe.svg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập (token tồn tại)
  const isLoggedIn = !!localStorage.getItem('token');

  const isActive = (path) => {
    return location.pathname === path ? "nav-item active" : "nav-item";
  };

  // Hàm xử lý đăng xuất
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await authService.logout();
      toast.success("Đăng xuất thành công!");
      navigate('/');
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <nav 
      className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark py-3" 
      aria-label="ShoeFit navigation bar"
    >
      <div className="container d-flex align-items-center justify-content-between">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarsFurni" 
          aria-controls="navbarsFurni" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            ShoeFit<span>.</span>
          </Link>
          
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 me-4">
            <li className={isActive('/')}>
              <Link className="nav-link" to="/">Khám Phá</Link>
            </li>
            
            <li className={isActive('/tryonar')}>
              <Link className="nav-link" to="/tryonar">Thử Giày Ảo AR</Link>
            </li>
            
            <li className={isActive('/tryon2d')}>
              <Link className="nav-link" to="/tryon2d">Thử Giày AI 2D</Link>
            </li>
            
            <li className={isActive('/styleadvisor')}>
              <Link className="nav-link" to="/styleadvisor">Tư Vấn Phong Cách</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link p-0" to="/search">
              <img src={searchIcon} alt="Search" width="22" />
            </Link>
            <Link className="nav-link p-0" to="/wishlist">
              <img src={heartIcon} alt="Wishlist" width="22" />
            </Link>
            
            {/* User Dropdown */}
            <div className="dropdown custom-dropdown">
              <button
                className="btn dropdown-toggle p-0 bg-transparent border-0"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={userIcon} alt="User" width="24" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fa-regular fa-user me-2"></i> Hồ Sơ
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        <i className="fa-solid fa-gear me-2"></i> Cài Đặt
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger w-100 text-start bg-transparent border-0" 
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i> Đăng Xuất
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fa-solid fa-right-to-bracket me-2"></i> Đăng Nhập
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fa-solid fa-user-plus me-2"></i> Đăng Ký
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Language Dropdown */}
            <div className="dropdown custom-dropdown">
              <button
                className="btn dropdown-toggle p-0 bg-transparent border-0"
                type="button"
                id="langDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={globeIcon} alt="Globe" width="24" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="langDropdown">
                <li><button className="dropdown-item" type="button">Tiếng Việt</button></li>
                <li><button className="dropdown-item" type="button">English</button></li>
              </ul>
            </div>
            
            <Link
              to="/tryonar"
              className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{ background: '#30a5e3', border: 'none', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.background = '#0797e4'}
              onMouseOut={(e) => e.target.style.background = '#30a5e3'}
            >
              Tải Ngay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;