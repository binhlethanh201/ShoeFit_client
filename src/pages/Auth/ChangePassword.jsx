import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.warning(t("auth.msg_fill_info"));
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.warning(t("auth.msg_pass_length"));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(t("auth.msg_pass_mismatch"));
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.warning(t("auth.msg_pass_same"));
      return;
    }

    setLoading(true);

    try {
      const response = await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success(t("auth.msg_change_pass_success"));
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      const msg = error.response?.data?.message || "Đổi mật khẩu thất bại.";

      if (error.response && error.response.status === 401) {
        toast.error(t("auth.msg_session_expired"));
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
                <h3 className="text-black">{t("auth.change_pass_title")}</h3>
                <p className="text-muted small">{t("auth.change_pass_desc")}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="currentPassword"
                  >
                    {t("auth.label_current_pass")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder={t("auth.label_current_pass")}
                  />
                </div>

                <div className="form-group mb-3">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="newPassword"
                  >
                    {t("auth.label_new_pass")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder={t("auth.placeholder_new_pass")}
                  />
                </div>

                <div className="form-group mb-4">
                  <label
                    className="text-black fw-bold small mb-1"
                    htmlFor="confirmPassword"
                  >
                    {t("auth.label_confirm_pass")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t("auth.label_confirm_pass")}
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => navigate("/profile")}
                    >
                      {t("auth.btn_cancel")}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-black w-100"
                      style={{ backgroundColor: "#000", color: "#fff" }}
                      disabled={loading}
                    >
                      {loading
                        ? t("auth.processing")
                        : t("auth.btn_save_change")}
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
