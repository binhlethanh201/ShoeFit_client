import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import checkOutService from "../../services/checkOutService";
import "../../assets/css/pricing/pricing.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentData, serviceName } = location.state || {};

  const isProcessed = useRef(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "PAYMENT_SUCCESS" && !isProcessed.current) {
        isProcessed.current = true;
        navigate("/payment-success");
      }
    };
    window.addEventListener("message", handleMessage);
    if (!paymentData?.orderCode) return;

    const checkStatus = async () => {
      if (isProcessed.current) return;
      try {
        const response = await checkOutService.checkPaymentStatus(
          paymentData.orderCode,
        );
        const status = response.data?.status || response.status;
        if (status === "Paid" || status === "Success") {
          isProcessed.current = true;
          navigate("/payment-success");
          return true;
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Polling error:", error);
        }
      }
      return false;
    };
    checkStatus();
    const pollInterval = setInterval(async () => {
      const finished = await checkStatus();
      if (finished) clearInterval(pollInterval);
    }, 1000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(pollInterval);
    };
  }, [paymentData?.orderCode, navigate]);

  if (!paymentData || !paymentData.checkoutUrl) {
    return (
      <div className="pricing-container checkout-page">
        <div className="error-box">
          <p>Thông tin thanh toán không hợp lệ hoặc đã hết hạn.</p>
          <button className="btn-upgrade" onClick={() => navigate("/pricing")}>
            Quay lại bảng giá
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-container checkout-page">
      <div className="checkout-header">
        <h1>Xác Nhận Thanh Toán</h1>
        <div className="checkout-stepper-container">
          <div className="step done">Chọn gói</div>
          <div className="step-line active"></div>
          <div className="step done">Xác nhận</div>
          <div className="step-line active"></div>
          <div className="step active">Thanh toán</div>
        </div>
      </div>

      <div className="checkout-main-layout">
        <div className="order-summary-bar">
          <div className="summary-item">
            <span>Dịch vụ:</span> <strong>{serviceName}</strong>
          </div>
          <div className="summary-item">
            <span>Số tiền:</span>{" "}
            <strong className="amount">
              {paymentData.amount.toLocaleString()}{" "}
              {paymentData.currency || "VND"}
            </strong>
          </div>
          <div className="summary-item">
            <span>Mã đơn:</span> <strong>#{paymentData.orderCode}</strong>
          </div>
          <button
            className="btn-cancel-top"
            onClick={() => {
              toast.warning("Đã hủy giao dịch.");
              navigate("/pricing");
            }}
          >
            Hủy giao dịch
          </button>
        </div>

        <div className="payment-iframe-full-wrapper">
          <iframe
            src={paymentData.checkoutUrl}
            title="Payment Portal"
            className="payment-iframe-full"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
