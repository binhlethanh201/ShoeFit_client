import React, { useEffect, useState } from "react";
import productService from "../../../services/product/productService";

const SearchFilter = ({ onFilterChange, filters, onClear }) => {
  const [categories, setCategories] = useState([]);
  // const [materials, setMaterials] = useState([]);
  // const [styles, setStyles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [cats] = await Promise.all([
        productService.getCategories(),
        productService.getMaterials(),
        productService.getStyles(),
      ]);
      setCategories(cats);
      // setMaterials(mats);
      // setStyles(styls);
    };
    loadData();
  }, []);

  const handleToggle = (key, id) => {
    const newValue = filters[key] === id ? null : id;
    onFilterChange({ [key]: newValue });
  };

  return (
    <aside className="filter-sidebar">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h5
          className="m-0"
          style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "1px" }}
        >
          BỘ LỌC
        </h5>
        <button
          className="btn btn-sm"
          onClick={onClear}
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "var(--brand-blue)",
            textTransform: "uppercase",
            border: "1px solid var(--border-color)",
            borderRadius: "2px",
            padding: "4px 10px",
            backgroundColor: "transparent",
          }}
        >
          Làm mới
        </button>
      </div>

      <div className="filter-group">
        <span className="filter-title">Danh mục</span>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="filter-opt"
            onClick={() => handleToggle("categoryId", cat.id)}
          >
            <div
              className={`checkbox ${filters.categoryId === cat.id ? "checked" : ""}`}
            >
              {filters.categoryId === cat.id && (
                <i
                  className="fas fa-check"
                  style={{ fontSize: "8px", color: "#fff" }}
                ></i>
              )}
            </div>
            {cat.name}
          </div>
        ))}
      </div>

      {/* <div className="filter-group">
        <span className="filter-title">Kiểu dáng</span>
        <div className="filter-size-grid">
          {styles.map((s) => (
            <div
              key={s.id}
              className={`filter-size-item ${filters.styleId === s.id ? "active" : ""}`}
              onClick={() => handleToggle("styleId", s.id)}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="filter-group">
        <span className="filter-title">Chất liệu</span>
        {materials.map((m) => (
          <div key={m.id} className="filter-opt" onClick={() => handleToggle("materialId", m.id)}>
            <div className={`checkbox ${filters.materialId === m.id ? "checked" : ""}`}>
              {filters.materialId === m.id && <i className="fas fa-check" style={{ fontSize: "8px", color: "#fff" }}></i>}
            </div>
            {m.name}
          </div>
        ))}
      </div> */}
    </aside>
  );
};

export default SearchFilter;
