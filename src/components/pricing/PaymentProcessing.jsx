import React from 'react';

const PaymentProcessing = () => {
  const styles = {
    container: {
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', textAlign: 'center',
      backgroundColor: 'var(--bg-body)'
    },
    loader: {
      width: '50px', height: '50px', border: '5px solid var(--border-color)',
      borderBottomColor: 'var(--brand-blue)', borderRadius: '50%',
      animation: 'rotation 1s linear infinite',
    },
    text: { marginTop: '20px', color: 'var(--text-heading)', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      <style>{`@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      <div style={styles.loader}></div>
      <p style={styles.text}>Đang khởi tạo cổng thanh toán bảo mật...</p>
    </div>
  );
};

export default PaymentProcessing;