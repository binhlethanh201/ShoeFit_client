import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window !== window.top) {
      window.top.location.href = window.location.href;
    }
  }, []);

  const styles = {
    container: { 
      fontFamily: "'Inter', sans-serif",
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      textAlign: 'center',
      backgroundColor: '#f8fffb'
    },
    card: { 
      background: 'white', 
      padding: '50px', 
      borderRadius: '24px', 
      boxShadow: '0 10px 30px rgba(46,204,113,0.1)', 
      maxWidth: '400px',
      border: '1px solid #eefef5'
    },
    icon: { fontSize: '60px', color: '#2ecc71', marginBottom: '20px' },
    h2: { color: '#1a1a1a', marginBottom: '10px' },
    p: { color: '#666', marginBottom: '30px', lineHeight: '1.6' },
    btn: { 
      background: '#15228b', 
      color: 'white', 
      padding: '12px 25px', 
      borderRadius: '10px', 
      fontWeight: '700', 
      border: 'none', 
      cursor: 'pointer',
      transition: '0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h2 style={styles.h2}>Thanh toán thành công!</h2>
        <p style={styles.p}>Cảm ơn bạn! Gói dịch vụ đã được kích hoạt thành công. Bạn có thể sử dụng các tính năng cao cấp ngay bây giờ.</p>
        <button onClick={() => navigate("/")} style={styles.btn}>Trải nghiệm ngay</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;