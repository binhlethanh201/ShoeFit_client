import React, { useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/tiny-slider.css";
import "../../assets/css/style.css";
import "../../assets/js/bootstrap.bundle.min.js";
import "../../assets/js/tiny-slider.js";
import "../../assets/js/custom.js";

import Header from "../../components/partials/Header.jsx";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register

  // Dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Giả lập submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Đăng nhập với email: ${formData.email}`);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      alert(`Đăng ký tài khoản: ${formData.name}`);
    }
  };

  return (
    <>
      <Header activePage="login" />

      {/* Login/Register Form Section */}
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <div className="p-4 border rounded bg-light shadow-sm">

                <form onSubmit={handleSubmit}>
                    <h1>{isLogin ? "Login" : "Register"}</h1>
                  {!isLogin && (
                    <div className="form-group mb-3">
                      <label className="text-black">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <div className="form-group mb-3">
                    <label className="text-black">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="form-group mb-4">
                      <label className="text-black">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-black w-100 py-2">
                    {isLogin ? "Login" : "Register"}
                  </button>

                  {isLogin && (
                    <p className="mt-3 text-center">
                      Don’t have an account?{" "}
                      <button
                        href="#"
                        onClick={() => setIsLogin(false)}
                        className="text-decoration-underline"
                      >
                        Register here
                      </button>
                    </p>
                  )}

                  {!isLogin && (
                    <p className="mt-3 text-center">
                      Already have an account?{" "}
                      <button
                        href="#"
                        onClick={() => setIsLogin(true)}
                        className="text-decoration-underline"
                      >
                        Login here
                      </button>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
