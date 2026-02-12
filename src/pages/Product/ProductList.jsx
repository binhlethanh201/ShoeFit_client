import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import productService from "../../services/product/productService";
import "../../assets/css/product/ProductList.css";
import SearchFilter from "../../components/product/productList/ProductFilter";
import SearchResults from "../../components/product/productList/ProductResults";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  
  // Lấy giá trị query từ URL
  const initialQuery = useMemo(() => searchParams.get("q") || "", [searchParams]);
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const currentPage = parseInt(pageNumber) || 1;
  const productsPerPage = 9;

  const [filters, setFilters] = useState({
    categoryId: null,
    materialId: null,
    styleId: null,
  });

  // Đồng bộ searchTerm khi nhấn Back/Forward trên trình duyệt
  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

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
    return allProducts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !filters.categoryId ||
        p.categories?.some((cat) => cat.id === filters.categoryId);
      const matchesStyle =
        !filters.styleId ||
        p.attributes?.some((attr) => attr.styleId === filters.styleId);
      const matchesMaterial =
        !filters.materialId ||
        p.attributes?.some((attr) => attr.materialId === filters.materialId);

      return (
        matchesSearch && matchesCategory && matchesStyle && matchesMaterial
      );
    });
  }, [allProducts, searchTerm, filters]);

  // FIX WARNING: Thêm initialQuery vào dependency array
  useEffect(() => {
    if (searchTerm !== initialQuery) {
        const query = searchTerm ? `?q=${searchTerm}` : "";
        // Khi người dùng gõ, ép về trang 1 để kết quả tìm kiếm chính xác
        navigate(`/collection/page/1${query}`, { replace: true });
    }
  }, [searchTerm, navigate, initialQuery]);

  // Debounce cập nhật searchParams
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
    navigate("/collection/page/1");
  };

  const paginate = (num) => {
    const query = searchTerm ? `?q=${searchTerm}` : "";
    navigate(`/collection/page/${num}${query}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                  paginate={paginate}
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