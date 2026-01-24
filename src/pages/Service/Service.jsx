import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { servicesData } from "../../data/mockData";

const Service = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="product-section mt-5" style={{ marginBottom: "200px" }}>
        <div className="container">
          <div className="row">
            {servicesData.map((item) => (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center"
              >
                <div className="product-item product-item-full-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid product-thumbnail mb-4"
                  />
                  <Link to={item.link} className="btn btn-blue">
                    {t("home.try_now")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
