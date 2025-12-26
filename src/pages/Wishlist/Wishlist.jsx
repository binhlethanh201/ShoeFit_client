import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import hình ảnh
import adidas from "../../assets/images/Shoes/adidasgazelle.png";
import birkenstock from "../../assets/images/Shoes/birkenstock.png";
import nike from "../../assets/images/Shoes/nikeairjordan1lowog.png";

const Wishlist = () => {
  // Giả lập dữ liệu wishlist ban đầu
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "adidasgazelle",
      name: "Adidas Gazelle",
      image: adidas,
      link: "/collection",
    },
    {
      id: "birkenstock",
      name: "Birkenstock Arizona",
      image: birkenstock,
      link: "/collection",
    },
    {
      id: "nikeairjordan1lowog",
      name: "Nike Air Jordan 1 Low OG",
      image: nike,
      link: "/collection",
    },
  ]);

  // Hàm xử lý xoá sản phẩm
  const handleRemove = (id, name) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xoá "${name}" khỏi danh sách yêu thích?`
    );
    if (confirmed) {
      // Cập nhật state để loại bỏ item
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <>
      <section
        className="product-section py-5"
        style={{ minHeight: "60vh", marginBottom: "200px" }}
      >
        <div className="container">
          <h3 className="mb-4">Danh Sách Yêu Thích</h3>

          <div id="wishlistContainer" className="row g-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item.id} className="col-12 col-sm-6 col-md-4">
                  <div className="card border-0 shadow-sm h-100 position-relative wishlist-card fade-in">
                    <Link
                      to={item.link}
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                      />
                      <div className="card-body text-center">
                        <h5 className="fw-bold mb-3">{item.name}</h5>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-center gap-2 pb-4">
                      <button
                        className="btn btn-outline-danger btn-sm remove-btn"
                        onClick={() => handleRemove(item.id, item.name)}
                      >
                        <i className="fas fa-trash-alt me-1"></i> Xoá
                      </button>
                      <Link to="/tryon2d" className="btn btn-success btn-sm">
                        <i className="fas fa-shoe-prints me-1"></i> Thử
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p id="emptyWishlistMsg" className="text-muted text-center mt-4">
                Bạn chưa có đôi giày nào trong danh sách yêu thích cả.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
