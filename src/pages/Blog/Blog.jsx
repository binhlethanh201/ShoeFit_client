import React from "react";
import { Link } from "react-router-dom";
import { blogsData } from "../../data/mockData";

const Blog = () => {
  return (
    <>
      {/* Blog Section */}
      <div className="blog-section mt-5">
        <div className="container">
          <div className="row">
            {blogsData.map((blog) => (
              <div key={blog.id} className="col-12 col-sm-6 col-md-4 mb-5">
                <div className="post-entry">
                  <Link to={blog.link} className="post-thumbnail">
                    {/* Sử dụng biến hình ảnh đã import từ mockData */}
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
                        by <Link to="#">{blog.author}</Link>
                      </span>
                      <span>
                        on <Link to="#">{blog.date}</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
