import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import tryOn2DService from "../../services/tryon/2dService";
import "../../assets/css/tryon2d/tryon2d.css";

import scanIcon from "../../assets/images/Effects/scan.svg";

const DEFAULT_NAME = "My Custom Try-on Image";
const DEFAULT_DESC = "Created with ShoeFit AI";

const TryOn2D = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [shoesList, setShoesList] = useState([]);
  const [isLoadingShoes, setIsLoadingShoes] = useState(false);

  const [userImage, setUserImage] = useState(null);
  const [userImageFile, setUserImageFile] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBefore, setShowBefore] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để sử dụng tính năng thử giày AI!");
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 1500);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const shoeFromState = location.state?.selectedShoeFromDetail;
    if (shoeFromState) {
      const autoSelectShoe = async () => {
        try {
          const resDetail = await tryOn2DService.getShoeDetail(
            shoeFromState.id,
          );
          const detailData = resDetail.data;
          const firstImageId = detailData.images?.[0]?.id || null;

          setSelectedShoe({
            ...shoeFromState,
            shoeImageId: firstImageId,
            path: shoeFromState.imageUrl,
          });
          toast.success(`Đã chọn: ${shoeFromState.name}`);
        } catch (error) {
          console.error("Lỗi tự động chọn giày:", error);
        }
      };
      autoSelectShoe();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchShoes = async () => {
      setIsLoadingShoes(true);
      try {
        const response = await tryOn2DService.getShoes(1, 100);
        if (response.status === 200) {
          setShoesList(response.data.items);
        }
      } catch (error) {
        toast.error("Không thể tải danh sách giày từ máy chủ");
      } finally {
        setIsLoadingShoes(false);
      }
    };
    fetchShoes();
  }, []);

  const handleImageUploadTrigger = (e) => {
    if (!checkAuth()) {
      e.preventDefault();
      return;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImageFile(file);
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleSelectShoe = async (shoe) => {
    try {
      const resDetail = await tryOn2DService.getShoeDetail(shoe.id);
      const detailData = resDetail.data;
      const firstImageId = detailData.images?.[0]?.id || null;

      setSelectedShoe({
        ...shoe,
        shoeImageId: firstImageId,
        path: shoe.imageUrl,
      });
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin ảnh mẫu của giày");
    }
  };

  const handleGenerate = async () => {
    if (!checkAuth()) return;

    if (!userImageFile || !selectedShoe) {
      toast.warning(t("tryon2d.alert_missing_input"));
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await tryOn2DService.generateTryOn(
        selectedShoe.id,
        selectedShoe.shoeImageId,
        userImageFile,
        selectedShoe.name || DEFAULT_NAME,
        DEFAULT_DESC,
      );

      if (response.status === 200 || response.status === 201) {
        setResult(response.data);
        toast.success("AI đã tạo ảnh thành công!");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("AI Error:", error);
        toast.error("Có lỗi xảy ra trong quá trình xử lý AI.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWheelZoom = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) setZoomScale((prev) => Math.min(prev + 0.1, 3));
    else setZoomScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const filteredShoes = shoesList.filter((shoe) =>
    shoe.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="tryon-main">
        <div className="text-center m-5">
          <h2 className="fw-bold mb-3">{t("tryon2d.title")}</h2>
          <p className="text-muted">{t("tryon2d.subtitle")}</p>
        </div>

        <div className="tryon-content">
          <div className="col">
            <div className="row">
              <section className="tryon-section">
                <h2>{t("tryon2d.step1_title")}</h2>
                <div className="upload-container">
                  <input
                    type="file"
                    id="user-image"
                    accept="image/*"
                    onClick={handleImageUploadTrigger}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="user-image" className="upload-box">
                    {userImage && (
                      <div
                        className="user-image-preview-mini"
                        style={{ backgroundImage: `url(${userImage})` }}
                      ></div>
                    )}
                    <span className="btn-choose-file-fake">
                      {t("tryon2d.btn_choose_image")}
                    </span>
                    <p className="upload-instruction">
                      {t("tryon2d.upload_instruction")} <br />
                      <span>{t("tryon2d.upload_note")}</span>
                    </p>
                  </label>
                </div>
              </section>
            </div>

            <div className="row mt-4">
              <section className="tryon-section">
                <h2>{t("tryon2d.step2_title")}</h2>
                <div className="input-group">
                  <button
                    className="generate-btn btn btn-primary"
                    id="open-drawer"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {t("tryon2d.btn_select_shoe")}
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
                    {!selectedShoe && t("tryon2d.placeholder_no_shoe")}
                  </div>
                </div>

                <button
                  className="generate-btn btn"
                  id="generate-mock"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? t("tryon2d.btn_processing")
                    : t("tryon2d.btn_generate")}
                </button>

                <button
                  className="generate-btn btn mt-2"
                  id="go-style-advisor"
                  onClick={() => navigate("/styleadvisor")}
                >
                  <i className="fa-solid fa-shirt me-2"></i>{" "}
                  {t("tryon2d.btn_style_advisor")}
                </button>
              </section>
            </div>
          </div>

          <div className="col">
            <section className="tryon-section">
              <h2>{t("tryon2d.step3_title")}</h2>
              <div className="result-display" id="result-mock">
                {isProcessing ? (
                  <p style={{ color: "blue", fontWeight: "bold" }}>
                    {t("tryon2d.result_processing")}
                  </p>
                ) : result ? (
                  <>
                    <div className="image-container">
                      <img
                        src={showBefore ? userImage : result}
                        className={`generated-image fade-in ${showBefore ? "viewing-before" : ""}`}
                        alt="Result"
                      />
                      <div
                        className="comparison-badge"
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "rgba(0,0,0,0.5)",
                          color: "white",
                          padding: "2px 10px",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      >
                        {showBefore ? "ẢNH GỐC" : "ẢNH AI"}
                      </div>
                      <button
                        className="zoom-btn"
                        onClick={() => {
                          setModalImageSrc(result);
                          setZoomScale(1);
                          setIsModalOpen(true);
                        }}
                      >
                        <img src={scanIcon} alt="Zoom" />
                      </button>
                    </div>

                    <button
                      className="btn-compare w-100 mt-2"
                      style={{
                        background: "#34495e",
                        color: "white",
                        border: "none",
                        padding: "8px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                      onMouseDown={() => setShowBefore(true)}
                      onMouseUp={() => setShowBefore(false)}
                      onMouseLeave={() => setShowBefore(false)}
                      onTouchStart={() => setShowBefore(true)}
                      onTouchEnd={() => setShowBefore(false)}
                    >
                      GIỮ ĐỂ XEM ẢNH GỐC
                    </button>

                    <a
                      href={result}
                      download="ShoeFit_TryOn2D.png"
                      className="btn-download"
                      style={{ marginTop: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-download me-2"></i>{" "}
                      {t("tryon2d.btn_download")}
                    </a>
                  </>
                ) : (
                  <p>{t("tryon2d.result_placeholder")}</p>
                )}
              </div>
            </section>
          </div>

          <div id="shoe-drawer" className={isDrawerOpen ? "active" : ""}>
            <div className="drawer-content">
              <h4>{t("tryon2d.drawer_title")}</h4>
              <span id="close-drawer" onClick={() => setIsDrawerOpen(false)}>
                &times;
              </span>
              <div className="drawer-search-container">
                <input
                  type="text"
                  placeholder="Tìm tên sản phẩm..."
                  className="drawer-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="shoe-grid">
                {isLoadingShoes ? (
                  <p>Đang tải...</p>
                ) : filteredShoes.length > 0 ? (
                  filteredShoes.map((shoe) => (
                    <div
                      key={shoe.id}
                      className="shoe-item"
                      title={shoe.name}
                      onClick={() => handleSelectShoe(shoe)}
                    >
                      <img src={shoe.imageUrl} alt={shoe.name} />
                      <p>{shoe.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-result-text">
                    Không tìm thấy sản phẩm phù hợp.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        id="image-modal"
        onClick={(e) =>
          e.target.className.includes("modal-overlay") && setIsModalOpen(false)
        }
      >
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <div className="modal-content">
          <img
            src={modalImageSrc}
            alt="Zoomed"
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
