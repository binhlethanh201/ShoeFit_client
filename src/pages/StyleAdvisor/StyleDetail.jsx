import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styleData, productsData } from "../../data/mockData";
import defaultShoe from "../../assets/images/Shoes/default.png";
import "../../assets/css/styleAdvisor/styleAdvisor.css";

const StyleDetail = () => {
  const { t } = useTranslation();
  const { styleId } = useParams();
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
      <section className="style-detail-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
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
            <div className="col-md-6 text-center">
              <h3 className="fw-semibold mb-3">
                {t("style_advisor.suggested_shoe")}
              </h3>
              <div
                className="shoe-preview text-center p-4 border rounded shadow-sm d-inline-block"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Link
                  to={recommendedShoe ? `/product/${recommendedShoe.id}` : "#"}
                  className="text-decoration-none"
                  style={{ color: "var(--text-heading)" }}
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
                      : t("style_advisor.updating")}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="more-section mt-5">
            <h4 className="fw-semibold mb-4 text-center">
              {t("style_advisor.more_styles")}
            </h4>
            <div className="row g-4 justify-content-center">
              {relatedStyles.map((style, i) => {
                const originalStyles = styleData[gender][occasion];
                const originalIndex = originalStyles.indexOf(style);
                const nextStyleId = `${gender}_${occasion}_${
                  originalIndex + 1
                }`;

                return (
                  <div className="col-6 col-md-3 more-item" key={i}>
                    <Link
                      to={`/styledetail/${nextStyleId}?gender=${gender}&occasion=${occasion}&shoeId=${style.shoeId}`}
                    >
                      <img
                        src={style.src}
                        className="img-fluid shadow-sm rounded"
                        alt={`Related Style ${i + 1}`}
                        loading="lazy"
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
