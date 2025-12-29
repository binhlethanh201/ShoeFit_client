import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const brandColor = "#263bdfff"; // Màu chủ đạo

  // State cho Login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State cho Forgot Password
  const [isForgotView, setIsForgotView] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input Login
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- XỬ LÝ ĐĂNG NHẬP ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(formData);

      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        toast.success("Đăng nhập thành công!");

        if (response.redirectUrl) {
          navigate(response.redirectUrl);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- XỬ LÝ QUÊN MẬT KHẨU ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.warning("Vui lòng nhập email.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email: resetEmail });
      if (response.success) {
        toast.success(
          response.message || "Mật khẩu mới đã được gửi vào email của bạn."
        );
        setIsForgotView(false);
        setResetEmail("");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gửi yêu cầu thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="untree_co-section before-footer-section mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div
              className="p-5 border-0 rounded bg-white shadow"
              style={{ borderRadius: "15px" }}
            >
              {/* --- ĐĂNG NHẬP --- */}
              {!isForgotView ? (
                <>
                  <h3
                    className="mb-4 text-center fw-bold"
                    style={{ color: brandColor }}
                  >
                    Chào Mừng Trở Lại
                  </h3>
                  <p className="text-center text-muted mb-4 small">
                    Vui lòng đăng nhập để tiếp tục trải nghiệm
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label
                        className="text-secondary small fw-bold mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label
                        className="text-secondary small fw-bold mb-1"
                        htmlFor="password"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control py-2"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    {/* NÚT QUÊN MẬT KHẨU */}
                    <div className="d-flex justify-content-end mb-4">
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 text-decoration-none fw-bold small"
                        style={{ color: brandColor, cursor: "pointer" }}
                        onClick={() => setIsForgotView(true)}
                        onMouseOver={(e) =>
                          (e.target.style.textDecoration = "underline")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.textDecoration = "none")
                        }
                      >
                        Quên mật khẩu?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-bold text-white shadow-sm"
                      style={{
                        backgroundColor: brandColor,
                        border: "none",
                        transition: "opacity 0.3s",
                      }}
                      disabled={loading}
                      onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                      onMouseOut={(e) => (e.target.style.opacity = "1")}
                    >
                      {loading ? "Đang xử lý..." : "Đăng Nhập"}
                    </button>

                    <div className="text-center mt-4">
                      <p className="small text-muted">
                        Chưa có tài khoản?{" "}
                        <Link
                          to="/register"
                          className="text-decoration-none fw-bold"
                          style={{ color: brandColor }}
                        >
                          Đăng ký ngay
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                /* --- QUÊN MẬT KHẨU --- */
                <>
                  <h3
                    className="mb-3 text-center fw-bold"
                    style={{ color: brandColor }}
                  >
                    Khôi Phục Mật Khẩu
                  </h3>
                  <p className="text-muted text-center small mb-4">
                    Nhập email đã đăng ký của bạn. Chúng tôi sẽ gửi mật khẩu mới
                    đến email đó.
                  </p>

                  <form onSubmit={handleForgotPassword}>
                    <div className="form-group mb-4">
                      <label
                        className="text-secondary small fw-bold mb-1"
                        htmlFor="resetEmail"
                      >
                        Email của bạn
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 mb-3 fw-bold text-white shadow-sm"
                      style={{ backgroundColor: brandColor, border: "none" }}
                      disabled={loading}
                    >
                      {loading ? "Đang gửi..." : "Gửi Mật Khẩu Mới"}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2 small"
                        style={{
                          border: "1px solid #dee2e6",
                          color: "#6c757d",
                        }}
                        onClick={() => setIsForgotView(false)}
                      >
                        Quay lại Đăng Nhập
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
