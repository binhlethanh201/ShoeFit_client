import React from "react";
import SearchProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const SearchResults = ({ products, totalProducts, productsPerPage, currentPage, paginate, loading }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main>
      <div className="results-header" style={{ marginBottom: "20px" }}>
        {!loading && totalProducts === 0 ? (
          <span className="results-count">Không tìm thấy kết quả nào.</span>
        ) : (
          !loading && <span className="results-count">Tìm thấy <strong>{totalProducts}</strong> sản phẩm</span>
        )}
      </div>

      <div className="product-grid">
        {loading ? (
          Array(6).fill(0).map((_, index) => <ProductSkeleton key={index} />)
        ) : (
          products.map((product) => (
            <div className="p-card-animate" key={product.id}>
              <SearchProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link border-0 rounded-circle me-2 d-flex align-items-center justify-content-center" 
                  onClick={() => paginate(currentPage - 1)} style={{ width: "40px", height: "40px" }}>
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li key={number} className="page-item mx-1">
                  <button onClick={() => paginate(number)} className="page-link border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px", height: "40px",
                      backgroundColor: currentPage === number ? "var(--brand-blue)" : "transparent",
                      color: currentPage === number ? "#fff" : "var(--text-heading)",
                      fontWeight: "600"
                    }}>
                    {number}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link border-0 rounded-circle ms-2 d-flex align-items-center justify-content-center" 
                  onClick={() => paginate(currentPage + 1)} style={{ width: "40px", height: "40px" }}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </main>
  );
};

export default SearchResults;