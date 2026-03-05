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

  const getPageRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const range = [];
    for (let i = start; i <= end; i++) {
      if (i >= 1 && i <= totalPages) range.push(i);
    }
    return range;
  };

  const visiblePages = getPageRange();

  const btnStyle = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--border-color)",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.3s",
    backgroundColor: "var(--bg-card)",
    color: "var(--text-heading)",
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
            <ul className="pagination d-none d-md-flex align-items-center gap-1">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-double-left"></i>
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-left"></i>
                </button>
              </li>

              {visiblePages.map((number) => (
                <li key={number} className="page-item">
                  <button
                    onClick={() => paginate(number)}
                    className="page-link"
                    style={{
                      ...btnStyle,
                      backgroundColor:
                        currentPage === number
                          ? "var(--brand-blue)"
                          : "var(--bg-card)",
                      color:
                        currentPage === number ? "#fff" : "var(--text-heading)",
                      borderColor:
                        currentPage === number
                          ? "var(--brand-blue)"
                          : "var(--border-color)",
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
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-right"></i>
                </button>
              </li>
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-double-right"></i>
                </button>
              </li>
            </ul>

            <ul className="pagination d-flex d-md-none gap-2">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-double-left"></i>
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-left"></i>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  style={{
                    ...btnStyle,
                    backgroundColor: "var(--brand-blue)",
                    color: "#fff",
                    borderColor: "var(--brand-blue)",
                  }}
                >
                  {currentPage}
                </button>
              </li>
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={btnStyle}
                >
                  <i className="fas fa-angle-right"></i>
                </button>
              </li>
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  style={btnStyle}
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
