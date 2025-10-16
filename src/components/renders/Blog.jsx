import React from "react";

// Import ảnh từ thư mục src/assets/images
import post1 from "../../assets/images/blog1.avif";
import post2 from "../../assets/images/blog2.avif";
import post3 from "../../assets/images/blog3.avif";

const Trending = () => {
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

  // Hàm tạo slug an toàn
  const slugify = (text) =>
    text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <div className="blog-section">
      <div className="container">
        {/* Tiêu đề */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">From The Magazine</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <a href="/blog" className="more">
              View All News Articles
            </a>
          </div>
        </div>

        {/* Danh sách bài viết */}
        <div className="row">
          {posts.map((post, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div className="post-entry">
                <a
                  href={`/blog/${slugify(post.title)}`}
                  className="post-thumbnail"
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="img-fluid"
                  />
                </a>
                <div className="post-content-entry">
                  <h3>
                    <a href={`/blog/${slugify(post.title)}`}>{post.title}</a>
                  </h3>
                  <div className="meta">
                    <span>
                      by{" "}
                      <a href={`/author/${slugify(post.author)}`}>
                        {post.author}
                      </a>
                    </span>
                    <span>
                      {" "}
                      on{" "}
                      <a href={`/blog/date/${slugify(post.date)}`}>
                        {post.date}
                      </a>
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

export default Trending;
