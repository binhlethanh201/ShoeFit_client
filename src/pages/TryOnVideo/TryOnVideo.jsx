import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import tryOnVideoService from "../../services/tryon/videoService";
import "../../assets/css/tryonvideo/tryonvideo.css";

import scanIcon from "../../assets/images/Effects/scan.svg";

const DEFAULT_NAME = "My Video Try-on";
const DEFAULT_DESC = "Created with ShoeFit AI Video";

const TryOnVideo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [shoesList, setShoesList] = useState([]);
  const [isLoadingShoes, setIsLoadingShoes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [userImage, setUserImage] = useState(null);
  const [userImageFile, setUserImageFile] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  // const [selectedMotion, setSelectedMotion] = useState("walk");

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để dùng tính năng này!");
      navigate("/login", { state: { from: location.pathname } });
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchShoes = async () => {
      setIsLoadingShoes(true);
      try {
        const response = await tryOnVideoService.getShoes(1, 100);
        const items = response.data?.items || response.data;
        if (Array.isArray(items)) {
          setShoesList(items);
        }
      } catch (error) {
        toast.error("Không tải được danh sách giày!");
      } finally {
        setIsLoadingShoes(false);
      }
    };
    fetchShoes();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImageFile(file);
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleSelectShoe = async (shoe) => {
    try {
      const resDetail = await tryOnVideoService.getShoeDetail(shoe.id);
      const detailData = resDetail.data?.data || resDetail.data;
      const firstImageId = detailData.images?.[0]?.id || null;

      if (!firstImageId) {
        toast.error("Sản phẩm này thiếu ảnh mẫu AI, Hãy chọn đôi khác nhé!");
        return;
      }

      setSelectedShoe({
        ...shoe,
        shoeImageId: firstImageId,
        path: shoe.imageUrl,
      });
      setIsDrawerOpen(false);
      toast.success(`Đã chọn: ${shoe.name}`);
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin ảnh mẫu!");
    }
  };

  const handleGenerate = async () => {
    if (!checkAuth()) return;
    if (!userImageFile || !selectedShoe) {
      toast.warning(t("tryonvideo.alert_missing_input"));
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      toast.info("Đang tạo ảnh AI (Bước 1/2)...");
      const aiRes = await tryOnVideoService.generateTryOnImage(
        selectedShoe.id,
        selectedShoe.shoeImageId,
        userImageFile,
        selectedShoe.name || DEFAULT_NAME,
        DEFAULT_DESC,
      );
      console.log("Full Response từ Bước 1:", aiRes.data);
      const resBody = aiRes.data;
      const collectId = resBody.data?.id || resBody.id;

      if (!collectId) {
        if (typeof resBody.data === "string") {
          setResult(resBody.data);
        }
        console.error("Dữ liệu nhận được không có ID:", resBody);
      }

      toast.info("Ảnh đã xong! Đang dựng Video (Bước 2/2)...");
      const videoRes = await tryOnVideoService.generateTryOnVideo(collectId);

      const finalResult = videoRes.data?.data || videoRes.data;
      setResult(finalResult);
      toast.success("Xong rồi! Video AI đã sẵn sàng.");
    } catch (error) {
      console.error("AI Error:", error);
      const msg =
        error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(msg);
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
      <div className="video-tryon-main">
        <div className="text-center m-5">
          <h2 className="fw-bold mb-3">{t("tryonvideo.title")}</h2>
          <p className="text-muted">{t("tryonvideo.subtitle")}</p>
        </div>

        <div className="video-tryon-content">
          <div className="col">
            <div className="row">
              <section className="video-tryon-section">
                <h2>{t("tryonvideo.step1_title")}</h2>
                <div className="video-upload-container">
                  <input
                    type="file"
                    id="video-user-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="video-user-image"
                    className="video-upload-box"
                  >
                    {userImage && (
                      <div
                        className="video-user-image-preview-mini"
                        style={{ backgroundImage: `url(${userImage})` }}
                      ></div>
                    )}
                    <span className="video-btn-choose-file-fake">
                      {t("tryonvideo.btn_choose_image")}
                    </span>
                    <p className="video-upload-instruction">
                      {t("tryonvideo.upload_instruction")} <br />
                      <span>{t("tryonvideo.upload_note")}</span>
                    </p>
                  </label>
                </div>
              </section>
            </div>

            <div className="row mt-4">
              <section className="video-tryon-section">
                <h2>{t("tryonvideo.step2_title")}</h2>
                <div className="video-input-group">
                  <button
                    className="video-generate-btn btn btn-primary"
                    id="video-open-drawer"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {t("tryonvideo.btn_select_shoe")}
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
                    {!selectedShoe && t("tryonvideo.placeholder_no_shoe")}
                  </div>
                </div>

                {/* <div className="mb-3">
                  <label className="fw-bold mb-2 d-block" style={{ color: "var(--text-heading)" }}>
                    {t("tryonvideo.label_motion")}
                  </label>
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className={`video-motion-base-btn video-motion-walk-btn ${selectedMotion === "walk" ? "active" : ""}`}
                      onClick={() => setSelectedMotion("walk")}
                    >
                      {t("tryonvideo.motion_walk")}
                    </button>
                    <button
                      className={`video-motion-base-btn video-motion-rotate-btn ${selectedMotion === "rotate" ? "active" : ""}`}
                      onClick={() => setSelectedMotion("rotate")}
                    >
                      {t("tryonvideo.motion_rotate")}
                    </button>
                  </div>
                </div> */}

                <button
                  className="video-generate-btn btn"
                  id="video-generate-btn"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? t("tryonvideo.btn_processing")
                    : t("tryonvideo.btn_generate")}
                </button>

                <button
                  className="video-style-advisor-btn btn mt-3"
                  onClick={() => navigate("/styleadvisor")}
                >
                  <i className="fa-solid fa-shirt me-2"></i>{" "}
                  {t("tryonvideo.btn_style_advisor")}
                </button>
              </section>
            </div>
          </div>

          <div className="col">
            <section className="video-tryon-section">
              <h2>{t("tryonvideo.step3_title")}</h2>
              <div className="video-result-display" id="video-result-mock">
                {isProcessing ? (
                  <p style={{ color: "blue", fontWeight: "bold" }}>
                    {t("tryonvideo.result_processing")}
                  </p>
                ) : result ? (
                  <>
                    <div className="video-image-container">
                      {typeof result === "string" &&
                      (result.includes(".mp4") || result.includes("video")) ? (
                        <video
                          src={result}
                          className="video-generated-image fade-in"
                          controls
                          autoPlay
                          loop
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            display: "block",
                          }}
                        />
                      ) : (
                        <img
                          src={result}
                          className="video-generated-image fade-in"
                          alt="AI Result"
                        />
                      )}
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
                      download="ShoeFit_TryOnVideo.mp4"
                      className="video-btn-download"
                      style={{ marginTop: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-download me-2"></i>{" "}
                      {t("tryonvideo.btn_download")}
                    </a>
                  </>
                ) : (
                  <p>{t("tryonvideo.result_placeholder")}</p>
                )}
              </div>
            </section>
          </div>

          <div id="video-shoe-drawer" className={isDrawerOpen ? "active" : ""}>
            <div className="video-drawer-content">
              <h4>{t("tryonvideo.drawer_title")}</h4>
              <span
                id="video-close-drawer"
                onClick={() => setIsDrawerOpen(false)}
              >
                &times;
              </span>
              <div className="drawer-search-container mb-3">
                <input
                  type="text"
                  placeholder="Tìm tên sản phẩm..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="video-shoe-grid">
                {isLoadingShoes ? (
                  <p>Đang tải danh sách giày...</p>
                ) : filteredShoes.length > 0 ? (
                  filteredShoes.map((shoe) => (
                    <div
                      key={shoe.id}
                      className="video-shoe-item"
                      title={shoe.name}
                      onClick={() => handleSelectShoe(shoe)}
                    >
                      <img src={shoe.imageUrl} alt={shoe.name} />
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
                  ))
                ) : (
                  <p>Không tìm thấy giày phù hợp.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        id="video-image-modal"
        onClick={(e) =>
          e.target.className.includes("modal-overlay") && setIsModalOpen(false)
        }
      >
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <div className="modal-content">
          {result && (result.includes(".mp4") || typeof result === "string") ? (
            <video
              src={modalImageSrc}
              controls
              autoPlay
              loop
              className="modal-image"
              style={{ transform: `scale(${zoomScale})` }}
              onWheel={handleWheelZoom}
            />
          ) : (
            <img
              src={modalImageSrc}
              alt="Zoomed"
              className="modal-image"
              style={{ transform: `scale(${zoomScale})` }}
              onWheel={handleWheelZoom}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TryOnVideo;
