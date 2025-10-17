import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/css/home-custom.css"
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";
import Header from "../components/partials/Header.jsx";
import NewProduct from "../components/products/NewProduct";
import ProductList from "../components/products/ProductList";
// import PopularProduct from "../components/products/PopularProduct";
import AIRender from "../components/renders/AIRender";
import Blog from "../components/renders/Blog";


const Home = () => {
  return (
    <>
    <Header activePage="home" />
      <NewProduct />
      <AIRender />
      <ProductList />
      {/* <PopularProduct /> */}
      <Blog />
    </>
  );
};

export default Home;
