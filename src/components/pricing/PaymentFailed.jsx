import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window !== window.top) {
      window.top.location.href = window.location.href;
    }
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#fffaf9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      textAlign: 'center',
    },
    card: {
      background: 'white',
      padding: '50px',
      borderRadius: '24px',
      boxShadow: '0 10px 30px rgba(231, 76, 60, 0.1)',
      maxWidth: '400px',
      border: '1px solid #feeef2',
    },
    icon: {
      fontSize: '60px',
      color: '#e74c3c',
      marginBottom: '20px',
    },
    h2: {
      color: '#1a1a1a',
      marginBottom: '10px',
    },
    p: {
      color: '#666',
      marginBottom: '30px',
      lineHeight: '1.6',
    },
    btn: {
      background: '#15228b',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: '700',
      display: 'inline-block',
      border: 'none',
      cursor: 'pointer',
      transition: '0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✕</div>
        <h2 style={styles.h2}>Giao dịch thất bại</h2>
        <p style={styles.p}>Đã có lỗi xảy ra hoặc bạn đã hủy thanh toán. Vui lòng kiểm tra lại tài khoản hoặc thử lại.</p>
        <button onClick={() => navigate("/pricing")} style={styles.btn}>Quay lại bảng giá</button>
      </div>
    </div>
  );
};

export default PaymentFailed;