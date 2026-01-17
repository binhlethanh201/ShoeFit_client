import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Import Services & Assets
import productService from "../../services/product/productService";
import "../../assets/css/product/ProductList.css";

// Import Components
import SearchFilter from "../../components/product/productList/ProductFilter";
import SearchResults from "../../components/product/productList/ProductResults";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Paging ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const performSearch = async (term) => {
    setLoading(true);
    try {
      const results = await productService.getProducts(term);
      setAllProducts(results);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialQuery);
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
    performSearch(searchTerm);
  };

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", paddingBottom: "50px" }}
    >
      {/* Mobile Filter Bar */}
      <div className="mobile-filter-bar" style={{ display: "none" }}>
        <div className="m-filter-btn active">Tất cả</div>
        <div className="m-filter-btn">Size</div>
        <div className="m-filter-btn">Màu sắc</div>
        <div className="m-filter-btn">Giá</div>
      </div>

      <div className="search-layout">
        <SearchFilter />

        <div>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-4 d-flex">
            <input
              type="text"
              className="form-control me-2 rounded-pill px-4"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
                height: "50px",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4"
              style={{
                background: "var(--brand-blue)",
                border: "none",
                height: "50px",
                minWidth: "60px",
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </form>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-secondary"
                role="status"
              ></div>
            </div>
          ) : (
            <SearchResults
              products={currentProducts}
              totalProducts={allProducts.length}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
              paginate={paginate}
              searchTerm={initialQuery}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
