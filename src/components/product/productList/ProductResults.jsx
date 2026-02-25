import React from "react";
import SearchProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const SearchResults = ({
  products,
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  loading,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main>
      <div className="results-header" style={{ marginBottom: "20px" }}>
        {totalProducts === 0 && (
          <span className="results-count">Không tìm thấy kết quả nào.</span>
        )}
      </div>

      <div className="product-grid">
        {loading
          ? Array(productsPerPage)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : products.map((product) => (
              <div className="p-card-animate" key={product.id}>
                <SearchProductCard product={product} />
              </div>
            ))}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle me-2 d-flex align-items-center justify-content-center"
                  onClick={() => paginate(currentPage - 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "var(--text-heading)",
                  }}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>

              {pageNumbers.map((number) => (
                <li key={number} className="page-item mx-1">
                  <button
                    onClick={() => paginate(number)}
                    className="page-link border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor:
                        currentPage === number
                          ? "var(--brand-blue)"
                          : "transparent",
                      color:
                        currentPage === number ? "#fff" : "var(--text-heading)",
                      fontWeight: "600",
                    }}
                  >
                    {number}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle ms-2 d-flex align-items-center justify-content-center"
                  onClick={() => paginate(currentPage + 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "var(--text-heading)",
                  }}
                  disabled={currentPage === totalPages}
                >
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
