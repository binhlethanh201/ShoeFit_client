import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { styleData, productsData } from "../../data/mockData";

// Import ảnh mặc định
import defaultShoe from "../../assets/images/Shoes/default.png";

const StyleDetail = () => {
  // Lấy styleId từ URL path
  const { styleId } = useParams();

  // Lấy các tham số từ Query String
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const occasion = searchParams.get("occasion");
  const shoeId = searchParams.get("shoeId");

  const [currentStyle, setCurrentStyle] = useState(null);
  const [recommendedShoe, setRecommendedShoe] = useState(null);
  const [relatedStyles, setRelatedStyles] = useState([]);

  useEffect(() => {
    if (
      gender &&
      occasion &&
      styleData[gender] &&
      styleData[gender][occasion]
    ) {
      const styles = styleData[gender][occasion];

      let index = 0;
      if (styleId) {
        const match = styleId.match(/_(\d+)$/);
        index = match ? parseInt(match[1], 10) - 1 : 0;
      }

      if (index >= 0 && index < styles.length) {
        setCurrentStyle(styles[index]);
        setRelatedStyles(styles.filter((_, i) => i !== index));
      }
    }

    // Tìm thông tin giày gợi ý
    if (shoeId) {
      const shoe = productsData.find((p) => p.id === shoeId);
      setRecommendedShoe(shoe);
    }
  }, [gender, occasion, shoeId, styleId]);

  if (!currentStyle) {
    return (
      <div
        className="text-center py-5"
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Style Detail Section */}
      <section className="style-detail-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Style Image Preview */}
            <div className="col-md-6">
              <div className="style-preview shadow-sm rounded overflow-hidden">
                <img
                  src={currentStyle.src}
                  alt="Selected Style"
                  className="img-fluid w-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Recommended Shoe Info */}
            <div className="col-md-6 text-center">
              <h3 className="fw-semibold mb-3">Gợi Ý Mẫu Giày</h3>
              <div className="shoe-preview text-center p-4 border rounded shadow-sm bg-white d-inline-block">
                <Link
                  to={recommendedShoe ? `/product/${recommendedShoe.id}` : "#"}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={recommendedShoe ? recommendedShoe.image : defaultShoe}
                    alt="Recommended Shoe"
                    className="img-fluid mb-3"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                  <p className="mt-3 fw-bold fs-5">
                    {recommendedShoe
                      ? recommendedShoe.title
                      : "Đang cập nhật..."}
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* More Styles Section - Layout giống hệt HTML gốc */}
          <div className="more-section mt-5">
            <h4 className="fw-semibold mb-4 text-center">
              Những Phong Cách Khác Mà Bạn Có Thể Thích
            </h4>
            <div className="row g-4 justify-content-center">
              {relatedStyles.map((style, i) => {
                // Tính toán lại ID cho link
                const originalStyles = styleData[gender][occasion];
                const originalIndex = originalStyles.indexOf(style);
                const nextStyleId = `${gender}_${occasion}_${
                  originalIndex + 1
                }`;

                return (
                  // Class layout chuẩn từ HTML: col-6 col-md-3 more-item
                  <div className="col-6 col-md-3 more-item" key={i}>
                    <Link
                      to={`/styledetail/${nextStyleId}?gender=${gender}&occasion=${occasion}&shoeId=${style.shoeId}`}
                    >
                      {/* Class ảnh chuẩn từ HTML: img-fluid shadow-sm rounded */}
                      <img
                        src={style.src}
                        className="img-fluid shadow-sm rounded"
                        alt={`Related Style ${i + 1}`}
                        loading="lazy"
                        // Thêm hiệu ứng fade-in nhẹ bằng CSS inline để mượt mà (tùy chọn)
                        style={{ transition: "opacity 0.5s ease", opacity: 1 }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StyleDetail;
