import React from "react";
import product1 from "../../assets/images/jordan4cementwhite.png";
import product2 from "../../assets/images/samba.png";
import product3 from "../../assets/images/af1.png";

const PopularProduct = () => {
  const products = [
    { img: product1, title: "Jordan 4 Retro" },
    { img: product2, title: "adidas Samba OG" },
    { img: product3, title: "Nike Air Force 1 Low" },
  ];

  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">
          {products.map((item, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail">
                  <img src={item.img} alt={item.title} className="img-fluid" />
                </div>
                <div className="pt-3">
                  <h3>{item.title}</h3>
                  <p>
                   Popular Sneakers
                  </p>
                  <p>
                    <a
                      href={`/products/${item.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      Read More
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
