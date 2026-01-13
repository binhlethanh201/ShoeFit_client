import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Import Icons & Images (Giữ nguyên)
import scanIcon from "../../assets/images/Effects/scan.svg";
import af1Img from "../../assets/images/Shoes/af1.png";
import vansImg from "../../assets/images/Shoes/vans.png";
import jordan4Img from "../../assets/images/Shoes/jordan4cementwhite.png";
import sambaImg from "../../assets/images/Shoes/samba.png";
import converseImg from "../../assets/images/Shoes/converse.png";
import result1 from "../../assets/images/AIGenerate/result1.png";
import result2 from "../../assets/images/AIGenerate/result2.png";
import result3 from "../../assets/images/AIGenerate/result3.png";
import result4 from "../../assets/images/AIGenerate/result4.png";

const TryOnVideo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State
  const [userImage, setUserImage] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  const [selectedMotion, setSelectedMotion] = useState("walk");

  // Mock Data
  const mockShoes = [
    { id: 1, name: "Nike Air Force 1 ’07", path: af1Img, result: result1 || af1Img },
    { id: 2, name: "Vans Old Skool OG", path: vansImg, result: result2 || vansImg },
    { id: 3, name: "Air Jordan 4 Retro OG", path: jordan4Img, result: result3 || jordan4Img },
    { id: 4, name: "Adidas Samba OG", path: sambaImg, result: sambaImg },
    { id: 5, name: "Converse Chuck Taylor", path: converseImg, result: result4 || converseImg },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  const handleSelectShoe = (shoe) => {
    setSelectedShoe(shoe);
    setIsDrawerOpen(false);
  };

  const handleGenerate = () => {
    if (!userImage || !selectedShoe) {
      // Sửa key alert
      alert(t('tryonvideo.alert_missing_input'));
      return;
    }
    
    console.log("Generating video with motion:", selectedMotion);

    setIsProcessing(true);
    setResult(null);
    setTimeout(() => {
      setResult(selectedShoe.result);
      setIsProcessing(false);
    }, 2000);
  };

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
      <div className="video-tryon-main">
        <div className="text-center m-5">
            {/* Sửa key title/subtitle */}
            <h2 className="fw-bold mb-3">{t('tryonvideo.title')}</h2>
            <p className="text-muted">
              {t('tryonvideo.subtitle')}
            </p>
        </div>

        <div className="video-tryon-content">
          <div className="col">
             {/* Step 1: Upload */}
             <div className="row">
              <section className="video-tryon-section">
                {/* Sửa key step 1 */}
                <h2>{t('tryonvideo.step1_title')}</h2>
                <div className="video-upload-container">
                  <input type="file" id="video-user-image" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  <label htmlFor="video-user-image" className="video-upload-box">
                    {userImage && <div className="video-user-image-preview-mini" style={{ backgroundImage: `url(${userImage})` }}></div>}
                    <span className="video-btn-choose-file-fake">{t('tryonvideo.btn_choose_image')}</span>
                    <p className="video-upload-instruction">{t('tryonvideo.upload_instruction')} <br /><span>{t('tryonvideo.upload_note')}</span></p>
                  </label>
                </div>
              </section>
            </div>

            {/* Step 2: Choose Shoe & Motion */}
            <div className="row mt-4">
              <section className="video-tryon-section">
                {/* Sửa key step 2 */}
                <h2>{t('tryonvideo.step2_title')}</h2>
                <div className="video-input-group">
                  <button
                    className="video-generate-btn btn btn-primary"
                    id="video-open-drawer"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {t('tryonvideo.btn_select_shoe')}
                  </button>
                  <div
                    className="video-preview"
                    id="video-shoe-preview"
                    style={{
                      backgroundImage: selectedShoe
                        ? `url(${selectedShoe.path})`
                        : "none",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {!selectedShoe && t('tryonvideo.placeholder_no_shoe')}
                  </div>
                </div>

                {/* Motion Buttons (Đã dịch key) */}
                <div className="mb-3">
                  <label className="fw-bold mb-2 d-block" style={{color: 'var(--text-heading)'}}>{t('tryonvideo.label_motion')}</label>
                  <div className="d-flex gap-2 flex-wrap">
                    <button 
                      className={`video-motion-base-btn video-motion-walk-btn ${selectedMotion === 'walk' ? 'active' : ''}`}
                      onClick={() => setSelectedMotion('walk')}
                    >
                      {t('tryonvideo.motion_walk')}
                    </button>
                    <button 
                      className={`video-motion-base-btn video-motion-rotate-btn ${selectedMotion === 'rotate' ? 'active' : ''}`}
                      onClick={() => setSelectedMotion('rotate')}
                    >
                      {t('tryonvideo.motion_rotate')}
                    </button>
                  </div>
                </div>

                {/* Generate Button (Đã dịch key) */}
                <button
                  className="video-generate-btn btn"
                  id="video-generate-btn"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing ? t('tryonvideo.btn_processing') : t('tryonvideo.btn_generate')}
                </button>

                {/* Style Advisor Button (Đã dịch key) */}
                <button
                  className="video-style-advisor-btn btn mt-3"
                  onClick={() => navigate("/styleadvisor")}
                >
                  <i className="fa-solid fa-shirt me-2"></i> {t('tryonvideo.btn_style_advisor')}
                </button>

              </section>
            </div>
          </div>

          {/* Step 3: Result */}
          <div className="col">
            <section className="video-tryon-section">
              {/* Sửa key step 3 */}
              <h2>{t('tryonvideo.step3_title')}</h2>
              <div className="video-result-display" id="video-result-mock">
                {isProcessing ? (
                  <p style={{ color: "blue" }}>{t('tryonvideo.result_processing')}</p>
                ) : result ? (
                  <>
                    <div className="video-image-container">
                      <img
                        src={result}
                        className="video-generated-image fade-in"
                        alt="AI Result"
                      />
                      <button
                        className="video-zoom-btn"
                        onClick={() => {
                          setModalImageSrc(result);
                          setZoomScale(1);
                          setIsModalOpen(true);
                        }}
                      >
                        <img src={scanIcon} alt="Zoom" />
                      </button>
                    </div>
                    <a
                      href={result}
                      download="ShoeFit_TryOnVideo.png"
                      className="video-btn-download"
                      style={{ marginTop: "10px" }}
                    >
                      <i className="fa fa-download me-2"></i> {t('tryonvideo.btn_download')}
                    </a>
                  </>
                ) : (
                  <p>{t('tryonvideo.result_placeholder')}</p>
                )}
              </div>
            </section>
          </div>
          
          {/* Drawer & Modal (Giữ nguyên logic, sửa key title) */}
          <div id="video-shoe-drawer" className={isDrawerOpen ? "active" : ""}>
             <div className="video-drawer-content">
              <h4>{t('tryonvideo.drawer_title')}</h4>
              <span id="video-close-drawer" onClick={() => setIsDrawerOpen(false)}>&times;</span>
              <div className="video-shoe-grid">
                {mockShoes.map((shoe) => (
                  <div key={shoe.id} className="video-shoe-item" title={shoe.name} onClick={() => handleSelectShoe(shoe)}>
                    <img src={shoe.path} alt={shoe.name} />
                    <p style={{ fontSize: "0.9rem", textAlign: "center", marginTop: "5px" }}>{shoe.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? "active" : ""}`} id="video-image-modal" onClick={(e) => { if (e.target.className.includes("modal-overlay")) setIsModalOpen(false); }}>
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</span>
        <div className="modal-content">
          <img src={modalImageSrc} alt="Zoomed Result" className="modal-image" style={{ transform: `scale(${zoomScale})` }} onWheel={handleWheelZoom} />
        </div>
      </div>
    </>
  );
};

export default TryOnVideo;