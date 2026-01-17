import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogsData } from "../../../data/mockData";

const BlogSection = () => {
  const { t } = useTranslation();

  return (
    <div className="blog-section">
      <div className="container">
        <div className="row mb-2 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">{t("home.from_journal")}</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <Link to="/blog" className="more">
              {t("home.view_all_posts")}
            </Link>
          </div>
        </div>
        <div className="row">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
            >
              <div className="post-entry">
                <Link to={blog.link} className="post-thumbnail">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="img-fluid"
                  />
                </Link>
                <div className="post-content-entry">
                  <h3>
                    <Link to={blog.link}>{blog.title}</Link>
                  </h3>
                  <div className="meta">
                    <span>
                      {t("home.written_by")} <Link to="#">{blog.author}</Link>
                    </span>
                    <span>
                      - {t("home.on_date")} <Link to="#">{blog.date}</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
