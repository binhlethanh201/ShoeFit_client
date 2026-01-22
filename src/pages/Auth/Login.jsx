import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// --- IMPORT FIREBASE ---
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../configs/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const brandColor = "#263bdfff";

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [isForgotView, setIsForgotView] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HÀM GIẢI MÃ TOKEN ---
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // --- HÀM XỬ LÝ CHUNG SAU KHI CÓ RESPONSE TỪ BACKEND ---
  // (Dùng chung cho cả Login thường và Google Login để tránh lặp code)
  const processLoginSuccess = (response) => {
    if (response && response.data && response.data.accessToken) {
      const token = response.data.accessToken;
      const decodedToken = parseJwt(token);

      const userToSave = {
        ...response.data,
        role: decodedToken?.role,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userToSave));

      toast.success(response.message || t("auth.msg_login_success"));

      if (decodedToken && decodedToken.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(response.message || t("auth.msg_login_fail"));
    }
  };

  // --- 1. LOGIN THƯỜNG ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiPayload = {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      };
      const response = await authService.login(apiPayload);
      processLoginSuccess(response);
    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || t("auth.msg_login_fail");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. LOGIN GOOGLE (MỚI) ---
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // A. Mở popup Google
      const result = await signInWithPopup(auth, provider);
      
      // B. Lấy ID Token từ Firebase
      const idToken = await result.user.getIdToken();

      // C. Gửi ID Token về Backend
      const response = await authService.loginGoogle(idToken);
      
      // D. Xử lý kết quả từ Backend
      processLoginSuccess(response);

    } catch (error) {
      console.error("Google Login Error:", error);
      // Xử lý lỗi cụ thể
      let msg = "Đăng nhập Google thất bại.";
      if (error.code === 'auth/popup-closed-by-user') {
        msg = "Bạn đã đóng cửa sổ đăng nhập.";
      } else if (error.response?.data?.message) {
        msg = error.response.data.message;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- XỬ LÝ QUÊN MẬT KHẨU ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.warning(t("auth.msg_enter_email"));
      return;
    }
    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email: resetEmail });
      if (response.status === 0 || response.status === 200) {
        toast.success(response.message || t("auth.msg_sent_email"));
        setIsForgotView(false);
        setResetEmail("");
      } else {
        toast.error(response.message || "Lỗi không xác định");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gửi yêu cầu thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="untree_co-section before-footer-section m-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div
              className="p-5 border-0 rounded bg-white shadow"
              style={{ borderRadius: "15px" }}
            >
              {!isForgotView ? (
                <>
                  <h3
                    className="mb-4 text-center fw-bold"
                    style={{ color: brandColor }}
                  >
                    {t("auth.login_title")}
                  </h3>
                  <p className="text-center text-muted mb-4 small">
                    {t("auth.login_subtitle")}
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label className="text-secondary small fw-bold mb-1">
                        {t("auth.label_username_or_email") || "Username / Email"}
                      </label>
                      <input
                        type="text"
                        className="form-control py-2"
                        name="usernameOrEmail"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        required
                        placeholder={t("auth.placeholder_username_or_email")}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label className="text-secondary small fw-bold mb-1">
                        {t("auth.label_password")}
                      </label>
                      <input
                        type="password"
                        className="form-control py-2"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder={t("auth.placeholder_pass")}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="d-flex justify-content-end mb-4">
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 text-decoration-none fw-bold small"
                        style={{ color: brandColor, cursor: "pointer" }}
                        onClick={() => setIsForgotView(true)}
                      >
                        {t("auth.btn_forgot_pass")}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-bold text-white shadow-sm"
                      style={{ backgroundColor: brandColor, border: "none" }}
                      disabled={loading}
                    >
                      {loading ? t("auth.processing") : t("auth.btn_login")}
                    </button>

                    {/* --- BUTTON GOOGLE LOGIN --- */}
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          backgroundColor: "#fff", 
                          border: "1px solid #ddd", 
                          color: "#333",
                          transition: "0.3s"
                        }}
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                         {/* Icon Google SVG */}
                         <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                         </svg>
                         Đăng nhập bằng Google
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <p className="small text-muted">
                        {t("auth.text_no_account")}{" "}
                        <Link
                          to="/register"
                          className="text-decoration-none fw-bold"
                          style={{ color: brandColor }}
                        >
                          {t("auth.link_register_now")}
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                // --- PHẦN FORGOT PASSWORD (Giữ nguyên) ---
                <>
                  <h3
                    className="mb-3 text-center fw-bold"
                    style={{ color: brandColor }}
                  >
                    {t("auth.forgot_pass_title")}
                  </h3>
                  <form onSubmit={handleForgotPassword}>
                    <div className="form-group mb-4">
                      <label className="text-secondary small fw-bold mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder={t("auth.placeholder_email")}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 py-2 mb-3 fw-bold text-white"
                      style={{ backgroundColor: brandColor }}
                    >
                      {loading
                        ? t("auth.sending")
                        : t("auth.btn_send_new_pass")}
                    </button>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2 small"
                        onClick={() => setIsForgotView(false)}
                      >
                        {t("auth.btn_back_login")}
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