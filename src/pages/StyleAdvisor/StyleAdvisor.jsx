import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styleData } from "../../data/mockData";
import "../../assets/css/styleAdvisor/styleAdvisor.css";

const StyleAdvisor = () => {
  const { t } = useTranslation();
  const [currentGender, setCurrentGender] = useState("MEN");
  const [currentOccasion, setCurrentOccasion] = useState("everyday");
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const filteredStyles = styleData[currentGender]?.[currentOccasion] || [];
    setStyles(filteredStyles);
  }, [currentGender, currentOccasion]);

  const occasions = [
    { key: "everyday", label: t("style_advisor.occasion_everyday") },
    { key: "party", label: t("style_advisor.occasion_party") },
    { key: "travel", label: t("style_advisor.occasion_travel") },
    { key: "formal", label: t("style_advisor.occasion_formal") },
    { key: "sport", label: t("style_advisor.occasion_sport") },
  ];

  return (
    <>
      <section className="style-session py-5 pb-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">{t("style_advisor.title")}</h2>
            <p className="text-muted">{t("style_advisor.subtitle")}</p>
          </div>
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
                {t("style_advisor.gender_men")}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentGender === "WOMEN" ? "active" : ""
                }`}
                onClick={() => setCurrentGender("WOMEN")}
              >
                {t("style_advisor.gender_women")}
              </button>
            </li>
          </ul>
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
          <div className="pinterest-grid" id="styleGrid">
            {styles.length > 0 ? (
              styles.map((style, index) => {
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
                {t("style_advisor.no_style_found")}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default StyleAdvisor;
