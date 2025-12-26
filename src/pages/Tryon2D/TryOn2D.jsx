import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Icons
import scanIcon from "../../assets/images/Effects/scan.svg";

// Import Shoes Images
import af1Img from "../../assets/images/Shoes/af1.png";
import vansImg from "../../assets/images/Shoes/vans.png";
import jordan4Img from "../../assets/images/Shoes/jordan4cementwhite.png";
import sambaImg from "../../assets/images/Shoes/samba.png";
import converseImg from "../../assets/images/Shoes/converse.png";

// Import Result Images (Giả lập kết quả AI)
import result1 from "../../assets/images/AIGenerate/result1.png";
import result2 from "../../assets/images/AIGenerate/result2.png";
import result3 from "../../assets/images/AIGenerate/result3.png";
import result4 from "../../assets/images/AIGenerate/result4.png";

const TryOn2D = () => {
  const navigate = useNavigate();

  // State quản lý
  const [userImage, setUserImage] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);

  // Danh sách giày mẫu (Hardcode)
  const mockShoes = [
    {
      id: 1,
      name: "Nike Air Force 1 ’07 ‘Triple White’",
      path: af1Img,
      result: result1 || af1Img, // Fallback nếu chưa có ảnh result
    },
    {
      id: 2,
      name: "Vans Old Skool OG Black White",
      path: vansImg,
      result: result2 || vansImg,
    },
    {
      id: 3,
      name: "Air Jordan 4 Retro OG ‘White Cement’ 2016",
      path: jordan4Img,
      result: result3 || jordan4Img,
    },
    {
      id: 4,
      name: "Adidas Samba OG ‘White Black Gum’",
      path: sambaImg,
      result: sambaImg,
    },
    {
      id: 5,
      name: "Converse Chuck Taylor All-Stars High-top",
      path: converseImg,
      result: result4 || converseImg,
    },
  ];

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  // Xử lý chọn giày
  const handleSelectShoe = (shoe) => {
    setSelectedShoe(shoe);
    setIsDrawerOpen(false); // Đóng drawer sau khi chọn
  };

  // Xử lý tạo ảnh AI (Giả lập)
  const handleGenerate = () => {
    if (!userImage || !selectedShoe) {
      alert("Vui lòng tải lên ảnh của bạn và chọn một mẫu giày.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    // Giả lập thời gian xử lý 2 giây
    setTimeout(() => {
      setResult(selectedShoe.result);
      setIsProcessing(false);
    }, 2000);
  };

  // Xử lý Zoom trong Modal
  const handleWheelZoom = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.1, 3));
    } else {
      setZoomScale((prev) => Math.max(prev - 0.1, 0.5));
    }
  };

  return (
    <>
      <div className="tryon-main">
        <div className="tryon-content">
          <div className="col">
            {/* Step 1: Upload */}
            <div className="row">
              <section className="tryon-section">
                <h2>1. Tải ảnh bản thân</h2>
                <div className="input-group">
                  <label htmlFor="user-image">Ảnh của bạn:</label>
                  <input
                    type="file"
                    id="user-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div
                    className="preview"
                    id="user-preview"
                    style={{
                      backgroundImage: userImage ? `url(${userImage})` : "none",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {!userImage && "Ảnh của bạn"}
                  </div>
                </div>
              </section>
            </div>

            {/* Step 2: Choose Shoe */}
            <div className="row mt-4">
              <section className="tryon-section">
                <h2>2. Chọn đôi giày bạn yêu thích</h2>
                <div className="input-group">
                  <label>Ảnh giày:</label>
                  <button
                    className="generate-btn btn btn-primary"
                    id="open-drawer"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    Chọn mẫu giày
                  </button>
                  <div
                    className="preview"
                    id="shoe-preview"
                    style={{
                      backgroundImage: selectedShoe
                        ? `url(${selectedShoe.path})`
                        : "none",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {!selectedShoe && "Chưa chọn giày"}
                  </div>
                </div>

                <button
                  className="generate-btn btn"
                  id="generate-mock"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : "Tạo ảnh AI 2D"}
                </button>

                <button
                  className="generate-btn btn mt-2"
                  id="go-style-advisor"
                  onClick={() => navigate("/styleadvisor")}
                >
                  <i className="fa-solid fa-shirt me-2"></i> Tư vấn Phong cách
                </button>
              </section>
            </div>
          </div>

          {/* Step 3: Result */}
          <div className="col">
            <section className="tryon-section">
              <h2>3. Kết quả</h2>
              <div className="result-display" id="result-mock">
                {isProcessing ? (
                  <p style={{ color: "blue" }}>Đang xử lý...</p>
                ) : result ? (
                  <>
                    <div className="image-container">
                      <img
                        src={result}
                        className="generated-image fade-in"
                        alt="AI Result"
                      />
                      <button
                        className="zoom-btn"
                        onClick={() => {
                          setModalImageSrc(result);
                          setZoomScale(1);
                          setIsModalOpen(true);
                        }}
                      >
                        <img src={scanIcon} alt="Phóng to" />
                      </button>
                    </div>
                    <a
                      href={result}
                      download="ShoeFit_TryOn2D.png"
                      className="btn-download"
                      style={{ marginTop: "10px" }}
                    >
                      <i className="fa fa-download me-2"></i> Tải ảnh xuống
                    </a>
                  </>
                ) : (
                  <p>Kết quả mô phỏng AI sẽ xuất hiện ở đây.</p>
                )}
              </div>
            </section>
          </div>

          {/* Shoe Drawer (Side Panel) */}
          <div id="shoe-drawer" className={isDrawerOpen ? "active" : ""}>
            <div className="drawer-content">
              <h4>Chọn một mẫu giày</h4>
              <span id="close-drawer" onClick={() => setIsDrawerOpen(false)}>
                &times;
              </span>
              <div className="shoe-grid">
                {mockShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="shoe-item"
                    title={shoe.name}
                    onClick={() => handleSelectShoe(shoe)}
                  >
                    <img src={shoe.path} alt={shoe.name} />
                    <p
                      style={{
                        fontSize: "0.9rem",
                        textAlign: "center",
                        marginTop: "5px",
                      }}
                    >
                      {shoe.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal (Zoom) */}
      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        id="image-modal"
        onClick={(e) => {
          if (e.target.className.includes("modal-overlay"))
            setIsModalOpen(false);
        }}
      >
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <div className="modal-content">
          <img
            src={modalImageSrc}
            alt="Zoomed Result"
            className="modal-image"
            style={{ transform: `scale(${zoomScale})` }}
            onWheel={handleWheelZoom}
          />
        </div>
      </div>
    </>
  );
};

export default TryOn2D;
