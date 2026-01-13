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
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.msg_pass_mismatch'));
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: "user" 
      };

      const response = await authService.register(dataToSend);

      if (response.success) {
        toast.success(t('auth.msg_register_success'));
        navigate('/login');
      }
    } catch (error) {
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
          <div className="col-md-8 col-lg-6">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h3 className="text-black mb-4 text-center">{t('auth.register_title')}</h3>
              
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label className="text-black">{t('auth.label_username')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-black">{t('auth.label_fullname')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-black">{t('auth.label_email')}</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-black">{t('auth.label_password')}</label>
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
                  <div className="col-md-6 mb-4">
                    <label className="text-black">{t('auth.label_confirm_pass')}</label>
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

                <button
                  type="submit"
                  className="btn btn-black w-100 py-2"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                  disabled={loading}
                >
                  {loading ? t('auth.processing') : t('auth.btn_register')}
                </button>

                <div className="text-center mt-3">
                  <p>{t('auth.text_have_account')} <Link to="/login" className="text-primary">{t('auth.link_login_now')}</Link></p>
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