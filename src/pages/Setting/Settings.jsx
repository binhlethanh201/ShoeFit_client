import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import authService from '../../services/authService'; 

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  // State
  const [language, setLanguage] = useState(i18n.language || 'vi');
  const [shoeSizeStd, setShoeSizeStd] = useState('EU');
  const [notifications, setNotifications] = useState({
    email: true,
    promo: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await authService.getProfile();
        if (response.success && response.data) {
          const user = response.data;
          if (user.preferences) {
            if (user.preferences.shoe_size_unit) setShoeSizeStd(user.preferences.shoe_size_unit);
          }
          if (user.notification_settings) {
            setNotifications({
              email: user.notification_settings.email ?? true,
              promo: user.notification_settings.promo ?? false
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleChangeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        preferences: {
          language: language,
          shoe_size_unit: shoeSizeStd,
          theme: theme
        },
        notification_settings: {
          email: notifications.email,
          promo: notifications.promo
        }
      };

      const response = await authService.updateProfile(dataToSend);
      if (response.success) {
        toast.success(t('common.save_success'));
      }
    } catch (error) {
      console.error("Save settings failed:", error);
      toast.error(t('profile.msg_update_fail', 'Cập nhật thất bại'));
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const SettingItem = ({ icon, title, description, children, danger }) => (
    <div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
      <div className="d-flex align-items-center">
        <div 
          className="d-flex align-items-center justify-content-center rounded-circle me-3" 
          style={{ width: '40px', height: '40px', backgroundColor: danger ? 'rgba(220, 53, 69, 0.1)' : 'var(--bg-section)', color: danger ? '#dc3545' : 'var(--primary)' }}
        >
          <i className={`${icon} fs-5`}></i>
        </div>
        <div>
          <h6 className={`mb-0 fw-semibold ${danger ? 'text-danger' : ''}`} style={{ color: danger ? '' : 'var(--text-heading)' }}>{title}</h6>
          {description && <small className="text-muted" style={{fontSize: '12px'}}>{description}</small>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <h3 className="fw-bold mb-4" style={{ color: 'var(--text-heading)' }}>{t('settings.title')}</h3>

      {/* Block 1: Display */}
      <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
        <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            {t('settings.display_lang')}
        </h6>
        
        <SettingItem icon="fa-solid fa-moon" title={t('settings.theme')}>
            <div className="d-flex gap-2">
                {['light', 'dark', 'coffee'].map((mode) => (
                    <button
                        key={mode}
                        onClick={() => toggleTheme(mode)}
                        className={`btn btn-sm rounded-pill px-3 fw-bold ${theme === mode ? 'btn-primary text-white' : 'btn-light border'}`}
                        style={{ 
                            backgroundColor: theme === mode ? 'var(--primary)' : 'transparent',
                            borderColor: theme === mode ? 'var(--primary)' : 'var(--border-color)',
                            color: theme === mode ? '#fff' : 'var(--text-main)'
                        }}
                    >
                        {t(`common.${mode}`)}
                    </button>
                ))}
            </div>
        </SettingItem>

        <SettingItem icon="fa-solid fa-globe" title={t('settings.language')}>
           <select 
                className="form-select form-select-sm border-0 fw-bold text-end" 
                value={language} 
                onChange={handleChangeLanguage} 
                style={{ backgroundColor: 'transparent', color: 'var(--brand-blue)', cursor: 'pointer', width: 'auto' }}
            >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
            </select>
        </SettingItem>
      </div>

      {/* Block 2: Personalization */}
      <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
        <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            {t('settings.personalization')}
        </h6>

        <SettingItem 
            icon="fa-solid fa-ruler-combined" 
            title={t('settings.unit')} 
            description={t('settings.unit_desc')}
        >
            <select 
                className="form-select form-select-sm border-0 fw-bold text-end" 
                value={shoeSizeStd} 
                onChange={(e) => setShoeSizeStd(e.target.value)}
                style={{ backgroundColor: 'transparent', color: 'var(--brand-blue)', cursor: 'pointer', width: 'auto' }}
            >
                <option value="EU">EU (39, 40)</option>
                <option value="US">US (7, 8)</option>
                <option value="UK">UK (6, 7)</option>
                <option value="VN">VN (cm)</option>
            </select>
        </SettingItem>

        <SettingItem icon="fa-solid fa-bell" title={t('settings.notif_order')}>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" type="checkbox" role="switch"
                    name="email" checked={notifications.email} onChange={handleNotificationChange}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </SettingItem>

        <SettingItem icon="fa-solid fa-tags" title={t('settings.notif_promo')}>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" type="checkbox" role="switch"
                    name="promo" checked={notifications.promo} onChange={handleNotificationChange}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </SettingItem>
      </div>

      {/* Block 3: Account */}
      <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)' }}>
        <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            {t('settings.account')}
        </h6>

        <Link to="/profile" className="text-decoration-none">
            <SettingItem icon="fa-regular fa-id-card" title={t('settings.profile_info')}>
                <i className="fa-solid fa-chevron-right text-muted"></i>
            </SettingItem>
        </Link>

        <Link to="/change-password" class="text-decoration-none">
            <SettingItem icon="fa-solid fa-key" title={t('settings.change_pass')}>
                <i className="fa-solid fa-chevron-right text-muted"></i>
            </SettingItem>
        </Link>
      </div>

      <div className="d-grid mt-5">
        <button 
            className="btn btn-primary btn-lg rounded-pill fw-bold shadow" 
            onClick={handleSave}
            disabled={loading}
        >
            {loading ? t('common.loading') : t('common.save')}
        </button>
      </div>
    </div>
  );
};

export default Settings;