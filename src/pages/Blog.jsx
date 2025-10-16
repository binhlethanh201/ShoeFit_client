import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header.jsx";

import af1Img from "../assets/images/samba.png";
import post1 from "../assets/images/blog1.avif";
import post2 from "../assets/images/blog2.avif";
import post3 from "../assets/images/blog3.avif";

const Blog = () => {
  const posts = [
    {
      img: post1,
      title: "Hot Picks for Holiday: As Seen on The TODAY Show",
      author: "Kristin Watson",
      date: "October 9, 2025",
    },
    {
      img: post2,
      title: "Most Anticipated Sneaker Drops of 2025",
      author: "Kyle Delaney",
      date: "February 12, 2025",
    },
    {
      img: post3,
      title: "The Buyer's Guide: Jordan 1 Sneakers",
      author: "Thomas Banner",
      date: "April 8, 2024",
    },
  ];

  return (
    <>
      <Header activePage="blog" />

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Blog</h1>
                <p className="mb-4">
                  News and Editorials from ShoeFit.
                </p>
                <p>
                  <a href="/" className="btn btn-secondary me-2">
                    Shop Now
                  </a>
                  <a href="/" className="btn btn-white-outline">
                    Explore
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={af1Img} alt="Blog Hero" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="container">
          <div className="row">
            {Array(3)
              .fill(posts)
              .flat()
              .map((post, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 mb-5">
                  <div className="post-entry">
                    <a href="/" className="post-thumbnail">
                      <img src={post.img} alt={post.title} className="img-fluid" />
                    </a>
                    <div className="post-content-entry">
                      <h3>
                        <a href="/">{post.title}</a>
                      </h3>
                      <div className="meta">
                        <span>
                          by <a href="/">{post.author}</a>
                        </span>{" "}
                        <span>
                          on <a href="/">{post.date}</a>
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
