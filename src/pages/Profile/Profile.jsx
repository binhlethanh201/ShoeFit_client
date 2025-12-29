import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
      preferred_style: []     
    }
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
            // Map dữ liệu foot_profile, nếu chưa có thì lấy default
            foot_profile: {
              shoe_size: data.foot_profile?.shoe_size || "",
              foot_shape: data.foot_profile?.foot_shape || "standard",
              skin_tone: data.foot_profile?.skin_tone || "medium",
              gender: data.foot_profile?.gender || "unisex",
              preferred_style: data.foot_profile?.preferred_style || []
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Phiên đăng nhập hết hạn.");
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ---  Handlers ---
  // Xử lý thay đổi thông tin cơ bản
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi Foot Profile (Object lồng nhau)
  const handleFootProfileChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      foot_profile: {
        ...prev.foot_profile,
        [name]: value
      }
    }));
  };

  // Xử lý thay đổi Style 
  const handleStyleChange = (e) => {
    const value = e.target.value;
    // Chuyển chuỗi thành mảng
    const styleArray = value.split(",").map(item => item.trim());
    setUserInfo((prev) => ({
      ...prev,
      foot_profile: {
        ...prev.foot_profile,
        preferred_style: styleArray
      }
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
            shoe_size: Number(userInfo.foot_profile.shoe_size) // Đảm bảo size là số
        }
      });

      if (response.success) {
        toast.success("Đã cập nhật hồ sơ thành công!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Cập nhật thất bại.");
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
    <div className="untree_co-section before-footer-section mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            
            <form onSubmit={handleUpdateProfile}>
              <div className="row">
                
                {/* ---  THÔNG TIN CÁ NHÂN --- */}
                <div className="col-md-6 mb-4">
                  <div className="p-4 border rounded bg-light shadow-sm h-100">
                    <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                      <i className="fa-solid fa-user me-2 fs-5"></i>
                      <h4 className="text-black m-0">Thông Tin Cá Nhân</h4>
                    </div>

                    <div className="form-group mb-3">
                      <label className="text-black fw-bold small">Họ Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={userInfo.fullname}
                        onChange={handleChangeInfo}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="text-black fw-bold small">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={userInfo.email}
                        disabled
                        style={{ backgroundColor: "#e9ecef" }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="text-black fw-bold small">Số Điện Thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChangeInfo}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="text-black fw-bold small">Địa Chỉ</label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows="3"
                        value={userInfo.address}
                        onChange={handleChangeInfo}
                        placeholder="Nhập địa chỉ"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* ---  FOOT PROFILE (AI CONFIG) --- */}
                <div className="col-md-6 mb-4">
                  <div className="p-4 border rounded bg-white shadow-sm h-100 border-primary" style={{borderTop: "4px solid #3b5d50"}}>
                    <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                      <i className="fa-solid fa-shoe-prints me-2 fs-5 text-primary"></i>
                      <h4 className="text-black m-0">Hồ Sơ Chân (AI Config)</h4>
                    </div>
                    <p className="small text-muted mb-3">Thông tin này giúp AI tạo ảnh thử giày chính xác hơn với cơ thể bạn.</p>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group mb-3">
                                <label className="text-black fw-bold small">Size Giày (EU)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="shoe_size"
                                    value={userInfo.foot_profile.shoe_size}
                                    onChange={handleFootProfileChange}
                                    placeholder="VD: 42"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group mb-3">
                                <label className="text-black fw-bold small">Giới Tính</label>
                                <select 
                                    className="form-select"
                                    name="gender"
                                    value={userInfo.foot_profile.gender}
                                    onChange={handleFootProfileChange}
                                >
                                    <option value="unisex">Unisex</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group mb-3">
                                <label className="text-black fw-bold small">Dáng Chân</label>
                                <select 
                                    className="form-select"
                                    name="foot_shape"
                                    value={userInfo.foot_profile.foot_shape}
                                    onChange={handleFootProfileChange}
                                >
                                    <option value="standard">Tiêu chuẩn</option>
                                    <option value="narrow">Chân thon</option>
                                    <option value="wide">Chân bè</option>
                                    <option value="flat">Bàn chân bẹt</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group mb-3">
                                <label className="text-black fw-bold small">Màu Da</label>
                                <select 
                                    className="form-select"
                                    name="skin_tone"
                                    value={userInfo.foot_profile.skin_tone}
                                    onChange={handleFootProfileChange}
                                >
                                    <option value="light">Sáng (Light)</option>
                                    <option value="medium">Trung bình (Medium)</option>
                                    <option value="tan">Ngăm (Tan)</option>
                                    <option value="dark">Tối (Dark)</option>
                                    <option value="deep">Rất tối (Deep)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label className="text-black fw-bold small">Phong Cách Ưa Thích</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userInfo.foot_profile.preferred_style.join(", ")}
                            onChange={handleStyleChange}
                            placeholder="VD: streetwear, vintage, sport..."
                        />
                        <small className="text-muted">Nhập các từ khóa cách nhau bằng dấu phẩy.</small>
                    </div>

                  </div>
                </div>

              </div>

              {/* --- ACTION BUTTONS --- */}
              <div className="row mb-5">
                  <div className="col-12 d-flex justify-content-between align-items-center p-4 bg-light rounded shadow-sm">
                      
                      {/* Change Password */}
                      <Link 
                        to="/change-password" 
                        className="btn btn-outline-danger px-4"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fa-solid fa-key me-2"></i>
                        Đổi Mật Khẩu
                      </Link>

                      {/* Save Info */}
                      <button
                        type="submit"
                        className="btn btn-black px-5 py-2"
                        style={{ backgroundColor: "#000", color: "#fff", fontWeight: "bold" }}
                      >
                        <i className="fa-solid fa-floppy-disk me-2"></i>
                        Lưu Tất Cả Thông Tin
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