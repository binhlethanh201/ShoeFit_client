import React from "react";

const SearchFilter = () => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-group">
        <span className="filter-title">Danh mục</span>
        <div className="filter-opt">
          <div className="checkbox"></div>
          Giày Nam
        </div>
        <div className="filter-opt">
          <div className="checkbox"></div>
          Giày Nữ
        </div>
        <div className="filter-opt">
          <div className="checkbox"></div>
          Trẻ em
        </div>
      </div>

      {/* Size Filter */}
      <div className="filter-group">
        <span className="filter-title">Kích cỡ (US)</span>
        <div className="filter-size-grid">
          {[7, 8, 8.5, 9, 9.5, 10, 11, 12].map((size) => (
            <div
              key={size}
              className={`filter-size-item ${size === 9 ? "active" : ""}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <span className="filter-title">Khoảng giá</span>
        <div className="filter-opt">
          <div className="checkbox"></div>
          Dưới 2tr
        </div>
        <div className="filter-opt">
          <div className="checkbox"></div>
          2tr - 5tr
        </div>
        <div className="filter-opt">
          <div className="checkbox"></div>
          Trên 5tr
        </div>
      </div>
    </aside>
  );
};

export default SearchFilter;
