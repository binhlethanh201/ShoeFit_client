import React from "react";
import product1 from "../../assets/images/jordan4cementwhite.png";
import product2 from "../../assets/images/samba.png";
import product3 from "../../assets/images/af1.png";
import crossIcon from "../../assets/images/cross.svg";

const ProductList = () => {
  const products = [
    { img: product1, title: "Jordan 4 Retro", price: "$172" },
    { img: product2, title: "Adidas Samba OG", price: "$44" },
    { img: product3, title: "Nike Air Force 1 Low", price: "$71" },
  ];

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Trending Sneakers</h2>
            <p className="mb-4">
              'Trending' products are a curated collection of our best selling items
            </p>
            <p><a href="/shop" className="btn">See All</a></p>
          </div>

          {products.map((p, i) => (
            <div key={i} className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <a className="product-item" href="/cart">
                <img src={p.img} className="img-fluid product-thumbnail" alt={p.title} />
                <h3 className="product-title">{p.title}</h3>
                <strong className="product-price">{p.price}</strong>
                <span className="icon-cross">
                  <img src={crossIcon} className="img-fluid" alt="Add" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
