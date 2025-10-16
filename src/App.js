import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Contact from "../src/pages/Contact";
import About from "../src/pages/About";
import Blog from "../src/pages/Blog";
import Collection from "../src/pages/Collection";
import Service from "../src/pages/Service";
import Wishlist from "../src/pages/Wishlist";
import Profile from "../src/pages/Profile";
import Login from "../src/components/auths/Login"
import Footer from "../src/components/partials/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/services" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
