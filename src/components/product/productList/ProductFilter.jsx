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
      </div>
      <div className="filter-group">
        <span className="filter-title">Kích cỡ (VN)</span>
        <div className="filter-size-grid">
          {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
            <div
              key={size}
              className={`filter-size-item ${size === 9 ? "active" : ""}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

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
