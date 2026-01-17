import React from "react";
import SearchProductCard from "./ProductCard";

const SearchResults = ({
  products,
  totalProducts,
  productsPerPage,
  currentPage,
  paginate,
  searchTerm,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <main>
      <div className="results-header">
        <span className="results-count">
          {totalProducts > 0 ? (
            <>
              Hiển thị <b>{products.length}</b> trên tổng <b>{totalProducts}</b>{" "}
              kết quả{" "}
              {searchTerm && (
                <>
                  cho <b>"{searchTerm}"</b>
                </>
              )}
            </>
          ) : (
            <>Không tìm thấy kết quả nào.</>
          )}
        </span>
        <div className="sort-dropdown">
          Sắp xếp: <b>Mới nhất</b> <i className="fas fa-chevron-down ms-1"></i>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <SearchProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pageNumbers.length > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {/* Previous Button */}
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

              {/* Paging Number */}
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

              {/* Next Button */}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link border-0 rounded-circle ms-2 d-flex align-items-center justify-content-center"
                  onClick={() => paginate(currentPage + 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "var(--text-heading)",
                  }}
                  disabled={currentPage === pageNumbers.length}
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
