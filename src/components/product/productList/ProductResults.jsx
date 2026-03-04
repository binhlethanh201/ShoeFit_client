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

  const btnStyle = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.3s",
  };

  return (
    <main>
      <div className="results-header" style={{ marginBottom: "20px" }}>
        {!loading && totalProducts === 0 ? (
          <span className="results-count">Không tìm thấy kết quả nào.</span>
        ) : (
          !loading && (
            <span className="results-count">
              Tìm thấy <strong>{totalProducts}</strong> sản phẩm
            </span>
          )
        )}
      </div>

      <div className="product-grid">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : products.map((product) => (
              <div className="p-card-animate" key={product.id}>
                <SearchProductCard product={product} />
              </div>
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation">
            <ul className="pagination d-none d-md-flex">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle me-2"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ ...btnStyle, color: "var(--text-heading)" }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>

              {pageNumbers.map((number) => (
                <li key={number} className="page-item mx-1">
                  <button
                    onClick={() => paginate(number)}
                    className="page-link border-0 rounded-circle"
                    style={{
                      ...btnStyle,
                      backgroundColor:
                        currentPage === number
                          ? "var(--brand-blue)"
                          : "transparent",
                      color:
                        currentPage === number ? "#fff" : "var(--text-heading)",
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
                  className="page-link border-0 rounded-circle ms-2"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ ...btnStyle, color: "var(--text-heading)" }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>

            <ul className="pagination d-flex d-md-none gap-2">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle"
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  style={{
                    ...btnStyle,
                    color: "var(--text-heading)",
                    backgroundColor: "var(--bg-section)",
                  }}
                >
                  <i className="fas fa-angle-double-left"></i>
                </button>
              </li>

              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    ...btnStyle,
                    color: "var(--text-heading)",
                    backgroundColor: "var(--bg-section)",
                  }}
                >
                  <i className="fas fa-angle-left"></i>
                </button>
              </li>

              <li className="page-item">
                <button
                  className="page-link border-0 rounded-circle"
                  style={{
                    ...btnStyle,
                    backgroundColor: "var(--brand-blue)",
                    color: "#fff",
                  }}
                >
                  {currentPage}
                </button>
              </li>

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...btnStyle,
                    color: "var(--text-heading)",
                    backgroundColor: "var(--bg-section)",
                  }}
                >
                  <i className="fas fa-angle-right"></i>
                </button>
              </li>

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link border-0 rounded-circle"
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...btnStyle,
                    color: "var(--text-heading)",
                    backgroundColor: "var(--bg-section)",
                  }}
                >
                  <i className="fas fa-angle-double-right"></i>
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
