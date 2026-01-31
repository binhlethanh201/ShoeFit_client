import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "../../services/product/productService";
import "../../assets/css/product/ProductList.css";
import SearchFilter from "../../components/product/productList/ProductFilter";
import SearchResults from "../../components/product/productList/ProductResults";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const [filters, setFilters] = useState({
    categoryId: null,
    materialId: null,
    styleId: null,
  });

  const performSearch = useCallback(async (term, currentFilters) => {
    setLoading(true);
    try {
      const results = await productService.getProducts(term, currentFilters);
      setAllProducts(results);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(initialQuery, filters);
    setSearchTerm(initialQuery);
  }, [initialQuery, filters, performSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const clearAllFilters = () => {
    setFilters({ categoryId: null, materialId: null, styleId: null });
    setSearchTerm("");
    setSearchParams({});
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", paddingBottom: "50px" }}
    >
      <div className="search-layout">
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={filters}
          onClear={clearAllFilters}
        />

        <div style={{ flex: 1 }}>
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
              paginate={(num) => {
                setCurrentPage(num);
                window.scrollTo(0, 0);
              }}
              searchTerm={initialQuery}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
