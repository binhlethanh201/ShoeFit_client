import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // --- Styles (Đồng bộ với các trang khác) ---
  const cardStyle = {
    backgroundColor: "var(--bg-card)",
    boxShadow: "0 5px 15px var(--shadow-color)",
    borderRadius: "15px",
    border: "none",
    height: "100%",
    padding: "2rem",
  };

  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-main)",
    borderColor: "var(--border-color)",
    padding: "10px 15px",
  };

  const labelStyle = {
    color: "var(--text-heading)",
    fontWeight: "600",
    fontSize: "0.9rem",
    marginBottom: "5px",
  };

  const headingStyle = {
    color: "var(--text-heading)",
    fontWeight: "bold",
    margin: 0,
  };

  // --- User Info State ---
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    foot_profile: {
      shoe_size: "",
      foot_shape: "standard",
      skin_tone: "medium",
      gender: "unisex",
      preferred_style: [],
    },
  });

  // ---  Fetch Data ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        if (response.success) {
          const data = response.data;
          setUserInfo({
            fullname: data.fullname || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            foot_profile: {
              shoe_size: data.foot_profile?.shoe_size || "",
              foot_shape: data.foot_profile?.foot_shape || "standard",
              skin_tone: data.foot_profile?.skin_tone || "medium",
              gender: data.foot_profile?.gender || "unisex",
              preferred_style: data.foot_profile?.preferred_style || [],
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error(t("auth.msg_session_expired"));
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t]);

  // ---  Handlers ---
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

  // ---  Update Action ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateProfile({
        fullname: userInfo.fullname,
        phone: userInfo.phone,
        address: userInfo.address,
        foot_profile: {
          ...userInfo.foot_profile,
          shoe_size: Number(userInfo.foot_profile.shoe_size),
        },
      });

      if (response.success) {
        toast.success(t("profile.msg_update_success"));
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || t("profile.msg_update_fail")
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
          <h2 className="fw-bold" style={{ color: "var(--text-heading)" }}>
            {t("header.profile")}
          </h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <form onSubmit={handleUpdateProfile}>
              <div className="row g-4">
                {/* Personal Information */}
                <div className="col-md-6">
                  <div style={cardStyle}>
                    <div
                      className="d-flex align-items-center mb-4 border-bottom pb-3"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <i
                        className="fa-solid fa-user me-3 fs-4"
                        style={{ color: "var(--brand-blue)" }}
                      ></i>
                      <h4 style={headingStyle}>
                        {t("profile.title_personal")}
                      </h4>
                    </div>

                    <div className="form-group mb-3">
                      <label style={labelStyle}>
                        {t("profile.label_fullname")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={userInfo.fullname}
                        onChange={handleChangeInfo}
                        style={inputStyle}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={labelStyle}>
                        {t("profile.label_email")}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={userInfo.email}
                        disabled
                        style={{
                          ...inputStyle,
                          opacity: 0.7,
                          cursor: "not-allowed",
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={labelStyle}>
                        {t("profile.label_phone")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChangeInfo}
                        placeholder={t("profile.placeholder_phone")}
                        style={inputStyle}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={labelStyle}>
                        {t("profile.label_address")}
                      </label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows="3"
                        value={userInfo.address}
                        onChange={handleChangeInfo}
                        placeholder={t("profile.placeholder_address")}
                        style={inputStyle}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Foot Profile */}
                <div className="col-md-6">
                  <div
                    style={{
                      ...cardStyle,
                      borderTop: "4px solid var(--primary)",
                    }}
                  >
                    <div
                      className="d-flex align-items-center mb-4 border-bottom pb-3"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <i
                        className="fa-solid fa-shoe-prints me-3 fs-4"
                        style={{ color: "var(--primary)" }}
                      ></i>
                      <h4 style={headingStyle}>
                        {t("profile.title_foot_profile")}
                      </h4>
                    </div>
                    <p
                      className="small mb-4"
                      style={{ color: "var(--text-main)" }}
                    >
                      {t("profile.desc_foot_profile")}
                    </p>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label style={labelStyle}>
                            {t("profile.label_shoe_size")}
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="shoe_size"
                            value={userInfo.foot_profile.shoe_size}
                            onChange={handleFootProfileChange}
                            placeholder={t("profile.placeholder_shoe_size")}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label style={labelStyle}>
                            {t("profile.label_gender")}
                          </label>
                          <select
                            className="form-select"
                            name="gender"
                            value={userInfo.foot_profile.gender}
                            onChange={handleFootProfileChange}
                            style={inputStyle}
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
                          <label style={labelStyle}>
                            {t("profile.label_foot_shape")}
                          </label>
                          <select
                            className="form-select"
                            name="foot_shape"
                            value={userInfo.foot_profile.foot_shape}
                            onChange={handleFootProfileChange}
                            style={inputStyle}
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
                          <label style={labelStyle}>
                            {t("profile.label_skin_tone")}
                          </label>
                          <select
                            className="form-select"
                            name="skin_tone"
                            value={userInfo.foot_profile.skin_tone}
                            onChange={handleFootProfileChange}
                            style={inputStyle}
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
                      <label style={labelStyle}>
                        {t("profile.label_preferred_style")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={userInfo.foot_profile.preferred_style.join(", ")}
                        onChange={handleStyleChange}
                        placeholder={t("profile.placeholder_style")}
                        style={inputStyle}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {t("profile.help_style")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="row mt-3 mb-5">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  {/* Change Password */}
                  <Link
                    to="/change-password"
                    className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-solid fa-key me-2"></i>
                    {t("profile.btn_change_pass")}
                  </Link>

                  {/* Save Info */}
                  <button
                    type="submit"
                    className="btn rounded-pill px-5 py-3 fw-bold shadow-sm"
                    style={{
                      backgroundColor: "var(--brand-blue)",
                      color: "#fff",
                      border: "none",
                    }}
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
