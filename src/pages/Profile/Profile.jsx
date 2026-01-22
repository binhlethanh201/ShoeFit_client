import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Import CSS
import "../../assets/css/profile/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // --- State ---
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    foot_profile: {
      shoe_size: "",
      foot_shape: "standard",
      skin_tone: "medium",
      gender: "unisex",
      preferred_style: [],
    },
  });

  // --- Fetch Data ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        // console.log("Fetch Profile Response:", response);

        if (response && response.status === 200 && response.data) {
          const apiData = response.data;

          // Xử lý dữ liệu foot_profile (nếu chưa có thì dùng object rỗng)
          const fpData = apiData.footProfile || apiData.foot_profile || {};

          setUserInfo({
            fullName: apiData.fullName || "",
            email: apiData.email || "",
            phoneNumber: apiData.phoneNumber || "",
            address: apiData.address || "",

            foot_profile: {
              shoe_size: fpData.shoeSize || fpData.shoe_size || "",
              foot_shape: fpData.footShape || fpData.foot_shape || "standard",
              skin_tone: fpData.skinTone || fpData.skin_tone || "medium",
              gender: fpData.gender || "unisex",
              preferred_style:
                fpData.preferredStyle || fpData.preferred_style || [],
            },
          });
        } else {
          toast.error(response?.message || "Không thể tải thông tin.");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error.response && error.response.status === 401) {
          toast.error(t("auth.msg_session_expired"));
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t]);

  // --- Handlers ---
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFootProfileChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      foot_profile: {
        ...prev.foot_profile,
        [name]: value,
      },
    }));
  };

  const handleStyleChange = (e) => {
    const value = e.target.value;
    const styleArray = value.split(",").map((item) => item.trim());
    setUserInfo((prev) => ({
      ...prev,
      foot_profile: {
        ...prev.foot_profile,
        preferred_style: styleArray,
      },
    }));
  };

  // --- Update Action ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("FullName", userInfo.fullName);
      formData.append("Address", userInfo.address);
      formData.append("PhoneNumber", userInfo.phoneNumber);

      // formData.append("FootProfile", JSON.stringify(userInfo.foot_profile));

      const response = await authService.updateProfile(formData);

      if (response && response.status === 200) {
        toast.success(
          t("profile.msg_update_success") || "Cập nhật thành công!",
        );

        const savedUser = JSON.parse(localStorage.getItem("user")) || {};
        savedUser.fullName = userInfo.fullName;
        localStorage.setItem("user", JSON.stringify(savedUser));
      } else {
        toast.error(response?.message || t("profile.msg_update_fail"));
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || t("profile.msg_update_fail"),
      );
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="untree_co-section before-footer-section mt-5 mb-5">
      <div className="container">
        {/* Title Page */}
        <div className="text-center mb-3">
          <h2 className="profile-heading fs-2">{t("header.profile")}</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <form onSubmit={handleUpdateProfile}>
              <div className="row g-4">
                {/* --- Personal Information Column --- */}
                <div className="col-md-6">
                  <div className="profile-card">
                    <div className="profile-section-header">
                      <i className="fa-solid fa-user profile-icon-user"></i>
                      <h4 className="profile-heading">
                        {t("profile.title_personal")}
                      </h4>
                    </div>

                    <div className="form-group mb-3">
                      <label className="profile-label">
                        {t("profile.label_fullname")}
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleChangeInfo}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="profile-label">
                        {t("profile.label_email")}
                      </label>
                      <input
                        type="email"
                        className="form-control profile-input disabled-input"
                        value={userInfo.email}
                        disabled
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="profile-label">
                        {t("profile.label_phone")}
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChangeInfo}
                        placeholder={t("profile.placeholder_phone")}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="profile-label">
                        {t("profile.label_address")}
                      </label>
                      <textarea
                        className="form-control profile-input"
                        name="address"
                        rows="3"
                        value={userInfo.address}
                        onChange={handleChangeInfo}
                        placeholder={t("profile.placeholder_address")}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* --- Foot Profile Column --- */}
                <div className="col-md-6">
                  <div className="profile-card foot-profile-card">
                    <div className="profile-section-header">
                      <i className="fa-solid fa-shoe-prints profile-icon-foot"></i>
                      <h4 className="profile-heading">
                        {t("profile.title_foot_profile")}
                      </h4>
                    </div>

                    <div
                      className="alert alert-warning py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>
                      Tính năng lưu hồ sơ chân đang được cập nhật phía server.
                    </div>

                    <p className="profile-desc">
                      {t("profile.desc_foot_profile")}
                    </p>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="profile-label">
                            {t("profile.label_shoe_size")}
                          </label>
                          <input
                            type="number"
                            className="form-control profile-input"
                            name="shoe_size"
                            value={userInfo.foot_profile.shoe_size}
                            onChange={handleFootProfileChange}
                            placeholder={t("profile.placeholder_shoe_size")}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="profile-label">
                            {t("profile.label_gender")}
                          </label>
                          <select
                            className="form-select profile-input"
                            name="gender"
                            value={userInfo.foot_profile.gender}
                            onChange={handleFootProfileChange}
                          >
                            <option value="unisex">
                              {t("profile.opt_unisex")}
                            </option>
                            <option value="male">
                              {t("profile.opt_male")}
                            </option>
                            <option value="female">
                              {t("profile.opt_female")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="profile-label">
                            {t("profile.label_foot_shape")}
                          </label>
                          <select
                            className="form-select profile-input"
                            name="foot_shape"
                            value={userInfo.foot_profile.foot_shape}
                            onChange={handleFootProfileChange}
                          >
                            <option value="standard">
                              {t("profile.opt_standard")}
                            </option>
                            <option value="narrow">
                              {t("profile.opt_narrow")}
                            </option>
                            <option value="wide">
                              {t("profile.opt_wide")}
                            </option>
                            <option value="flat">
                              {t("profile.opt_flat")}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label className="profile-label">
                            {t("profile.label_skin_tone")}
                          </label>
                          <select
                            className="form-select profile-input"
                            name="skin_tone"
                            value={userInfo.foot_profile.skin_tone}
                            onChange={handleFootProfileChange}
                          >
                            <option value="light">
                              {t("profile.opt_light")}
                            </option>
                            <option value="medium">
                              {t("profile.opt_medium")}
                            </option>
                            <option value="tan">{t("profile.opt_tan")}</option>
                            <option value="dark">
                              {t("profile.opt_dark")}
                            </option>
                            <option value="deep">
                              {t("profile.opt_deep")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="profile-label">
                        {t("profile.label_preferred_style")}
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        value={userInfo.foot_profile.preferred_style.join(", ")}
                        onChange={handleStyleChange}
                        placeholder={t("profile.placeholder_style")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row mt-3 mb-5">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <Link
                    to="/change-password"
                    className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-solid fa-key me-2"></i>
                    {t("profile.btn_change_pass")}
                  </Link>

                  <button
                    type="submit"
                    className="btn rounded-pill px-5 py-3 fw-bold shadow-sm btn-save-profile"
                  >
                    <i className="fa-solid fa-floppy-disk me-2"></i>
                    {t("profile.btn_save_all")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
