import React from "react";
import { Link } from "react-router-dom";
import scratchImg from "../../assets/images/Effects/scratch.png";

const ComingSoon = () => {
  return (
    <div
      className="untree_co-section before-footer-section text-center py-5"
      style={{
        backgroundColor: "var(--bg-body)",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 col-lg-10">
            <img
              src={scratchImg}
              alt="Tính năng đang phát triển"
              className="img-fluid mb-4"
              style={{
                maxWidth: "180px",
                opacity: 0.8,
                filter: "drop-shadow(0px 10px 15px var(--shadow-color))",
              }}
            />

            <h2
              className="fw-bold mb-3"
              style={{ color: "var(--text-heading)", fontSize: "2rem" }}
            >
              A Better Fit is coming...
            </h2>

            <p
              className="fs-5 mb-4 px-md-5"
              style={{
                color: "var(--text-main)",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Chúng tôi đang dành trọn tâm huyết để hoàn thiện những trải nghiệm
              tuyệt vời nhất. Tính năng này sẽ sớm được ra mắt, rất mong nhận
              được sự kiên nhẫn và đón nhận từ bạn nhé!
            </p>

            <div className="mt-4">
              <Link
                to="/"
                className="btn rounded-pill px-5 py-2 fw-semibold shadow-sm text-decoration-none"
                style={{
                  backgroundColor: "var(--brand-blue)",
                  color: "var(--text-inverse)",
                  border: "none",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "var(--brand-blue-hover)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "var(--brand-blue)")
                }
              >
                Quay lại Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
