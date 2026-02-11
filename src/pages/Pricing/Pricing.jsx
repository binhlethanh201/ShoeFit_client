import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkOutService from "../../services/checkOutService";
import PaymentProcessing from "../../components/pricing/PaymentProcessing";
import "../../assets/css/pricing/pricing.css";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = async (serviceType) => {
    setLoading(true);
    try {
      const response = await checkOutService.createPayment(serviceType);

      console.log("API Response:", response);

      if (response && response.data) {
        navigate("/checkout", {
          state: {
            paymentData: response.data,
            serviceName: serviceType,
          },
        });
      } else {
        alert("Dữ liệu thanh toán không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi khởi tạo thanh toán:", error);
      if (error.response?.status !== 401) {
        alert("Không thể khởi tạo thanh toán. Vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PaymentProcessing />;

  return (
    <div className="pricing-container">
      <h1>Bảng Giá Dịch Vụ ShoeFit</h1>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "main" ? "active" : ""}`}
          onClick={() => setActiveTab("main")}
        >
          Gói Chính
        </button>
        <button
          className={`tab-btn ${activeTab === "addon" ? "active" : ""}`}
          onClick={() => setActiveTab("addon")}
        >
          Gói Mua Thêm
        </button>
      </div>

      <div className={`pricing-grid ${activeTab === "main" ? "active" : ""}`}>
        <div className="pricing-card" onClick={() => handleSelectPlan("Basic")}>
          <div className="plan-name">Basic</div>
          <div className="price">
            19.000 <span>đ / tháng</span>
          </div>
          <p className="description">
            Gói cơ bản để bắt đầu trải nghiệm dịch vụ.
          </p>
          <button className="btn-upgrade">Nâng cấp ngay</button>
          <ul className="features-list">
            <li>3 ảnh + 1 video</li>
            <li>Lưu trữ lịch sử 1 ngày</li>
          </ul>
        </div>

        <div
          className="pricing-card highlight"
          onClick={() => handleSelectPlan("Standard")}
        >
          <div className="badge">PHỔ BIẾN</div>
          <div className="plan-name">Standard</div>
          <div className="price">
            39.000 <span>đ / tháng</span>
          </div>
          <p className="description">Tối ưu cho người dùng thường xuyên.</p>
          <button className="btn-upgrade">Nâng cấp ngay</button>
          <ul className="features-list">
            <li>6 ảnh + 2 video</li>
            <li>Lưu trữ lịch sử 17 ngày</li>
            <li>Ưu tiên xử lý nhanh</li>
          </ul>
        </div>

        <div className="pricing-card" onClick={() => handleSelectPlan("Pro")}>
          <div className="plan-name">Pro</div>
          <div className="price">
            119.000 <span>đ / tháng</span>
          </div>
          <p className="description">Sức mạnh tối đa cho dự án lớn.</p>
          <button className="btn-upgrade">Nâng cấp ngay</button>
          <ul className="features-list">
            <li>22 ảnh + 4 video</li>
            <li>Lưu trữ lịch sử 45 ngày</li>
            <li>Tính năng Agent cao cấp</li>
          </ul>
        </div>
      </div>

      <div className={`pricing-grid ${activeTab === "addon" ? "active" : ""}`}>
        <div
          className="pricing-card"
          onClick={() => handleSelectPlan("ImageOnly")}
        >
          <div className="plan-name">Image Only</div>
          <div className="price">
            29.000 <span>đ</span>
          </div>
          <p className="description">Bổ sung lượt tạo ảnh chất lượng cao.</p>
          <button className="btn-upgrade">Mua ngay</button>
          <ul className="features-list">
            <li>10 ảnh chất lượng cao</li>
            <li>Lưu trữ 1 ngày</li>
          </ul>
        </div>

        <div
          className="pricing-card"
          onClick={() => handleSelectPlan("VideoOnly")}
        >
          <div className="plan-name">Video Only</div>
          <div className="price">
            59.000 <span>đ</span>
          </div>
          <p className="description">Bổ sung lượt tạo video chuyên nghiệp.</p>
          <button className="btn-upgrade">Mua ngay</button>
          <ul className="features-list">
            <li>5 video chuyên nghiệp</li>
            <li>Lưu trữ 7 ngày</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
