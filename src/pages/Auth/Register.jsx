import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate cơ bản ở frontend
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      // Chuẩn bị data gửi lên server (loại bỏ confirmPassword)
      const dataToSend = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: "user" // Mặc định là user
      };

      const response = await authService.register(dataToSend);

      if (response.success) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate('/login');
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Đăng ký thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="untree_co-section before-footer-section mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h3 className="text-black mb-4 text-center">Đăng Ký Tài Khoản</h3>
              
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label className="text-black">Tên đăng nhập (Username)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-black">Họ và tên (Fullname)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-black">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-black">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="text-black">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-black w-100 py-2"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng Ký"}
                </button>

                <div className="text-center mt-3">
                  <p>Đã có tài khoản? <Link to="/login" className="text-primary">Đăng nhập</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;