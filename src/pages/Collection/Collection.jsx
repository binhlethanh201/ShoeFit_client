import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/mockData";
import crossIcon from "../../assets/images/Effects/cross.svg";

const Collection = () => {
  const handleAddToCart = (product) => {
    alert(`Đã thêm ${product.title} vào giỏ hàng!`);
  };

  return (
    <>
      {/* Product Section */}
      <div className="untree_co-section product-section before-footer-section mb-5">
        <div className="container">
          {/* Header của Collection */}
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="section-title">Tất Cả Sản Phẩm</h2>
            </div>
          </div>

          <div className="row" id="product-list">
            {productsData.map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                <Link to={`/product/${product.id}`} className="product-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.title}</h3>
                </Link>
                <span
                  className="icon-cross"
                  onClick={() => handleAddToCart(product)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={crossIcon}
                    alt="Add to cart"
                    className="img-fluid"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
