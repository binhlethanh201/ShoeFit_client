import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phía Frontend
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.warning("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.warning("Mật khẩu mới không được trùng với mật khẩu cũ.");
      return;
    }

    setLoading(true);

    try {
      // Gọi API
      const response = await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success("Đổi mật khẩu thành công!");
        // Reset form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      const msg = error.response?.data?.message || "Đổi mật khẩu thất bại.";

      // Nếu token hết hạn (401), đẩy về login
      if (error.response && error.response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(msg);
      }
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
              <div className="text-center mb-4">
                <h3 className="text-black">Đổi Mật Khẩu</h3>
                <p className="text-muted small">
                  Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
                  người khác.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="currentPassword"
                  >
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>

                <div className="form-group mb-3">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="newPassword"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  />
                </div>

                <div className="form-group mb-4">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="confirmPassword"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => navigate("/profile")}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-black w-100"
                      style={{ backgroundColor: "#000", color: "#fff" }}
                      disabled={loading}
                    >
                      {loading ? "Đang xử lý..." : "Lưu thay đổi"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
