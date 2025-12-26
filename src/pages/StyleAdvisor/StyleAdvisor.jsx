import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styleData } from "../../data/mockData";

const StyleAdvisor = () => {
  const [currentGender, setCurrentGender] = useState("MEN");
  const [currentOccasion, setCurrentOccasion] = useState("everyday");
  const [styles, setStyles] = useState([]);

  // Cập nhật danh sách styles mỗi khi gender hoặc occasion thay đổi
  useEffect(() => {
    const filteredStyles = styleData[currentGender]?.[currentOccasion] || [];
    setStyles(filteredStyles);
  }, [currentGender, currentOccasion]);

  // Các tùy chọn Occasion
  const occasions = [
    { key: "everyday", label: "Hàng ngày - Đơn giản" },
    { key: "party", label: "Tiệc tùng - Lễ hội" },
    { key: "travel", label: "Du lịch" },
    { key: "formal", label: "Trang trọng - Lịch sự" },
    { key: "sport", label: "Năng động - Thể thao" },
  ];

  return (
    <>
      {/* Style Session Section */}
      <section className="style-session py-5 pb-5">
        <div className="container">
          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Khám Phá Phong Cách Của Bạn</h2>
            <p className="text-muted">
              Chọn giới tính và bối cảnh để khám phá các trang phục phù hợp với
              đôi giày yêu thích của bạn.
            </p>
          </div>

          {/* Gender Selection */}
          <ul
            className="nav nav-pills justify-content-center mb-4"
            id="genderTabs"
          >
            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentGender === "MEN" ? "active" : ""
                }`}
                onClick={() => setCurrentGender("MEN")}
              >
                Nam
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentGender === "WOMEN" ? "active" : ""
                }`}
                onClick={() => setCurrentGender("WOMEN")}
              >
                Nữ
              </button>
            </li>
          </ul>

          {/* Occasion Tabs */}
          <ul
            className="nav nav-pills justify-content-center mb-4"
            id="occasionTabs"
          >
            {occasions.map((occ) => (
              <li className="nav-item" key={occ.key}>
                <button
                  className={`nav-link ${
                    currentOccasion === occ.key ? "active" : ""
                  }`}
                  onClick={() => setCurrentOccasion(occ.key)}
                >
                  {occ.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Pinterest-style Grid */}
          <div className="pinterest-grid" id="styleGrid">
            {styles.length > 0 ? (
              styles.map((style, index) => {
                // Tạo ID unique cho style detail (nếu cần)
                const styleId = `${currentGender}_${currentOccasion}_${
                  index + 1
                }`;

                return (
                  <Link
                    key={index}
                    to={`/styledetail/${styleId}?gender=${currentGender}&occasion=${currentOccasion}&shoeId=${style.shoeId}`}
                    className={`grid-item ${
                      index % 3 === 1 ? "tall" : index % 3 === 2 ? "wide" : ""
                    }`}
                  >
                    <img
                      src={style.src}
                      alt={`Style ${index + 1}`}
                      loading="lazy"
                      style={{ transition: "opacity 0.6s ease", opacity: 1 }}
                    />
                  </Link>
                );
              })
            ) : (
              <p className="text-center text-muted w-100">
                Không tìm thấy phong cách nào cho{" "}
                {currentGender === "MEN" ? "Nam" : "Nữ"} -{" "}
                {occasions.find((o) => o.key === currentOccasion)?.label}.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default StyleAdvisor;
