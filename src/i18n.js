import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file json vừa tạo
import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';

// Lấy ngôn ngữ đã lưu, nếu không có thì mặc định là 'vi'
const savedLanguage = localStorage.getItem('app-language') || 'vi';

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Ngôn ngữ khởi tạo
    fallbackLng: "vi", // Nếu không tìm thấy ngôn ngữ thì dùng tiếng Việt
    interpolation: {
      escapeValue: false // React đã tự xử lý XSS nên không cần escape
    }
  });

export default i18n;