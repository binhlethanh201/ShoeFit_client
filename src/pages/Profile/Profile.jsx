import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import checkOutService from "../../services/checkOutService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import "../../assets/css/profile/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [purchasedServices, setPurchasedServices] = useState([]);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, servicesRes] = await Promise.all([
          authService.getProfile(),
          checkOutService.getServices(),
        ]);
        if (profileRes && profileRes.status === 200 && profileRes.data) {
          const apiData = profileRes.data;
          setUserInfo({
            fullName: apiData.fullName || "",
            email: apiData.email || "",
            phoneNumber: apiData.phoneNumber || "",
            address: apiData.address || "",
          });
        }
        if (servicesRes && servicesRes.data) {
          setPurchasedServices(servicesRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
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

    fetchData();
  }, [navigate, t]);

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("FullName", userInfo.fullName);
      formData.append("Address", userInfo.address);
      formData.append("PhoneNumber", userInfo.phoneNumber);

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
        <div className="text-center mb-3">
          <h2 className="profile-heading fs-2">{t("header.profile")}</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <form onSubmit={handleUpdateProfile}>
              <div className="row g-4">
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
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="profile-card purchased-services-card">
                    <div className="profile-section-header">
                      <i className="fa-solid fa-box-open profile-icon-foot"></i>
                      <h4 className="profile-heading">
                        Gói dịch vụ đã đăng ký
                      </h4>
                    </div>

                    <div
                      className="services-list-container mt-3"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      {purchasedServices.length > 0 ? (
                        purchasedServices.map((service) => (
                          <div
                            key={service.id}
                            className={`service-item-card mb-3 p-3 border rounded-3 ${service.isValid ? "border-primary" : "border-secondary opacity-75"}`}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="badge bg-primary fs-6">
                                {service.serviceType}
                              </span>
                              <span
                                className={`badge ${service.isValid ? "bg-success" : "bg-danger"}`}
                              >
                                {service.isValid ? "Đang hiệu lực" : "Hết hạn"}
                              </span>
                            </div>

                            <div
                              className="service-details"
                              style={{ fontSize: "0.9rem" }}
                            >
                              <div className="d-flex justify-content-between">
                                <span className="text-muted">Ngày mua:</span>
                                <span>
                                  {new Date(
                                    service.createdDate,
                                  ).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span className="text-muted">
                                  Thời hạn gói:
                                </span>
                                <span>{service.expirationInDays} ngày</span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex justify-content-around text-center">
                                <div>
                                  <div className="fw-bold text-primary">
                                    {service.imageNumber}
                                  </div>
                                  <div className="small text-muted">Ảnh</div>
                                </div>
                                <div>
                                  <div className="fw-bold text-primary">
                                    {service.videoNumber}
                                  </div>
                                  <div className="small text-muted">Video</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <i className="fa-solid fa-circle-info mb-2 fs-3 text-muted"></i>
                          <p className="text-muted">
                            Bạn chưa đăng ký gói dịch vụ nào.
                          </p>
                          <Link
                            to="/pricing"
                            className="btn btn-sm btn-primary rounded-pill"
                          >
                            Đăng ký ngay
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 mb-5">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  {/* <Link
                    to="/change-password"
                    className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
                  >
                    <i className="fa-solid fa-key me-2"></i>
                    {t("profile.btn_change_pass")}
                  </Link> */}

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
