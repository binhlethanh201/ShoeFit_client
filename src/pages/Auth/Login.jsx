import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; 

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const brandColor = "#263bdfff";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isForgotView, setIsForgotView] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
        toast.success(t('auth.msg_login_success')); // Dịch toast
        if (response.redirectUrl) {
          navigate(response.redirectUrl);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || t('auth.msg_login_fail');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- XỬ LÝ QUÊN MẬT KHẨU ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.warning(t('auth.msg_enter_email'));
      return;
    }
    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email: resetEmail });
      if (response.success) {
        toast.success(response.message || t('auth.msg_sent_email'));
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
            <div className="p-5 border-0 rounded bg-white shadow" style={{ borderRadius: "15px" }}>
              
              {/* --- ĐĂNG NHẬP --- */}
              {!isForgotView ? (
                <>
                  <h3 className="mb-4 text-center fw-bold" style={{ color: brandColor }}>
                    {t('auth.login_title')}
                  </h3>
                  <p className="text-center text-muted mb-4 small">
                    {t('auth.login_subtitle')}
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label className="text-secondary small fw-bold mb-1" htmlFor="email">
                        {t('auth.label_email')}
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.placeholder_email')}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label className="text-secondary small fw-bold mb-1" htmlFor="password">
                        {t('auth.label_password')}
                      </label>
                      <input
                        type="password"
                        className="form-control py-2"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.placeholder_pass')}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="d-flex justify-content-end mb-4">
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 text-decoration-none fw-bold small"
                        style={{ color: brandColor, cursor: "pointer" }}
                        onClick={() => setIsForgotView(true)}
                        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                      >
                        {t('auth.btn_forgot_pass')}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-bold text-white shadow-sm"
                      style={{ backgroundColor: brandColor, border: "none", transition: "opacity 0.3s" }}
                      disabled={loading}
                      onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                      onMouseOut={(e) => (e.target.style.opacity = "1")}
                    >
                      {loading ? t('auth.processing') : t('auth.btn_login')}
                    </button>

                    <div className="text-center mt-4">
                      <p className="small text-muted">
                        {t('auth.text_no_account')}{" "}
                        <Link to="/register" className="text-decoration-none fw-bold" style={{ color: brandColor }}>
                          {t('auth.link_register_now')}
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                /* --- QUÊN MẬT KHẨU --- */
                <>
                  <h3 className="mb-3 text-center fw-bold" style={{ color: brandColor }}>
                    {t('auth.forgot_pass_title')}
                  </h3>
                  <p className="text-muted text-center small mb-4">
                    {t('auth.forgot_pass_desc')}
                  </p>

                  <form onSubmit={handleForgotPassword}>
                    <div className="form-group mb-4">
                      <label className="text-secondary small fw-bold mb-1" htmlFor="resetEmail">
                         {t('auth.label_email')}
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder={t('auth.placeholder_email')}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 mb-3 fw-bold text-white shadow-sm"
                      style={{ backgroundColor: brandColor, border: "none" }}
                      disabled={loading}
                    >
                      {loading ? t('auth.sending') : t('auth.btn_send_new_pass')}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2 small"
                        style={{ border: "1px solid #dee2e6", color: "#6c757d" }}
                        onClick={() => setIsForgotView(false)}
                      >
                         {t('auth.btn_back_login')}
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