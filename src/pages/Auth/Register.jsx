import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; 

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // const [avatarFile, setAvatarFile] = useState(null); // Tạm thời bỏ dùng state này
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setAvatarFile(e.target.files[0]);
  //   }
  // };

  // --- XỬ LÝ GỬI OTP ---
  const handleSendOtp = async () => {
    if (!formData.email || !formData.username || !formData.phoneNumber) {
      toast.warning("Vui lòng nhập Username, Email và Số điện thoại để lấy OTP");
      return;
    }

    setOtpLoading(true);
    try {
      const payload = {
        email: formData.email,
        username: formData.username,
        phoneNumber: formData.phoneNumber
      };
      
      const response = await authService.otp(payload);
      
      if (response && (response.status === 0 || response.status === 200 || response.status === 201)) {
        toast.success("Mã OTP đã được gửi! Vui lòng kiểm tra email.");
      } else {
        toast.error(response.message || "Không thể gửi OTP.");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Gửi OTP thất bại!";
      toast.error(msg);
    } finally {
      setOtpLoading(false);
    }
  };

  // --- XỬ LÝ ĐĂNG KÝ ---
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.msg_pass_mismatch'));
      return;
    }

    if (!formData.otp) {
      toast.warning("Vui lòng nhập mã OTP đã được gửi đến email.");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();
      
      // Map đúng tên tham số theo Swagger (Viết hoa chữ cái đầu)
      dataToSend.append('Username', formData.username);
      dataToSend.append('Password', formData.password);
      dataToSend.append('Email', formData.email);
      dataToSend.append('FullName', formData.fullname);
      dataToSend.append('PhoneNumber', formData.phoneNumber);
      dataToSend.append('Address', formData.address || ""); // Gửi chuỗi rỗng nếu không nhập
      dataToSend.append('Otp', formData.otp);

      // --- QUAN TRỌNG: KHÔNG GỬI AVATAR ---
      // Việc không append key 'Avatar' đồng nghĩa với việc gửi null cho Backend.
      // if (avatarFile) {
      //   dataToSend.append('Avatar', avatarFile);
      // }

      const response = await authService.register(dataToSend);

      if (response && (response.status === 0 || response.data)) {
        toast.success(t('auth.msg_register_success'));
        navigate('/login');
      } else {
        toast.error(response.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Đăng ký thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="untree_co-section before-footer-section mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h3 className="text-black mb-4 text-center">{t('auth.register_title')}</h3>
              
              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">Username <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">{t('auth.label_fullname')} <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">{t('auth.label_email')} <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">Số điện thoại <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="text-black small fw-bold">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Tạm ẩn phần chọn Avatar để người dùng không bị nhầm lẫn */}
                {/* <div className="form-group mb-3">
                  <label className="text-black small fw-bold">Avatar</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div> 
                */}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">{t('auth.label_password')} <span className="text-danger">*</span></label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-black small fw-bold">{t('auth.label_confirm_pass')} <span className="text-danger">*</span></label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <hr />
                
                <div className="form-group mb-4">
                  <label className="text-black small fw-bold">Mã xác thực OTP <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Nhập mã OTP gửi về email"
                      required
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                    >
                      {otpLoading ? "Đang gửi..." : "Lấy mã OTP"}
                    </button>
                  </div>
                  <small className="text-muted fst-italic">
                    Nhập Username, Email và SĐT trước khi bấm "Lấy mã OTP"
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-black w-100 py-2 fw-bold text-white"
                  style={{ backgroundColor: "#000" }}
                  disabled={loading}
                >
                  {loading ? t('auth.processing') : t('auth.btn_register')}
                </button>

                <div className="text-center mt-3">
                  <p>{t('auth.text_have_account')} <Link to="/login" className="text-primary fw-bold">{t('auth.link_login_now')}</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;