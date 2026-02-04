import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  const fetchData = useCallback(async (currentFilters) => {
    setLoading(true);
    try {
      const results = await productService.getProducts("", currentFilters);
      setAllProducts(results);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  const filteredProducts = useMemo(() => {
    const result = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return result;
  }, [allProducts, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams(searchTerm ? { q: searchTerm } : {});
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setSearchParams]);

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
  const currentProductsForDisplay = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", paddingBottom: "50px" }}
    >
      <div style={{ flex: 1, transition: "opacity 0.3s ease" }}>
        <div className="search-layout">
          <SearchFilter
            onFilterChange={handleFilterChange}
            filters={filters}
            onClear={clearAllFilters}
          />

          <div style={{ flex: 1 }}>
            <div className="mb-4 d-flex">
              <input
                type="text"
                className="form-control me-2 rounded-pill px-4"
                placeholder="Tìm kiếm sản phẩm ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  color: "var(--text-main)",
                  borderColor: "var(--border-color)",
                  height: "50px",
                }}
              />
              <div
                className="btn btn-primary rounded-pill px-4 d-flex align-items-center justify-content-center"
                style={{
                  background: "var(--brand-blue)",
                  border: "none",
                  height: "50px",
                  minWidth: "60px",
                }}
              >
                <i className="fas fa-search"></i>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-secondary"
                  role="status"
                ></div>
              </div>
            ) : (
              <div className="results-container">
                <SearchResults
                  products={currentProductsForDisplay}
                  totalProducts={filteredProducts.length}
                  productsPerPage={productsPerPage}
                  currentPage={currentPage}
                  paginate={(num) => {
                    setCurrentPage(num);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  searchTerm={searchTerm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
