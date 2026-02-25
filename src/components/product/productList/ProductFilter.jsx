import React, { useEffect, useState } from "react";
import productService from "../../../services/product/productService";

const SearchFilter = ({ onFilterChange, filters, onClear }) => {
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [cats, mats, styls] = await Promise.all([
          productService.getCategories(),
          productService.getMaterials(),
          productService.getStyles(),
        ]);
        if (isMounted) {
          setCategories(cats || []);
          setMaterials(mats || []);
          setStyles(styls || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu filter:", error);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = (key, id) => {
    const currentSelectedId = filters[key];
    const isSelected = String(currentSelectedId) === String(id);
    const newValue = isSelected ? null : id;
    onFilterChange({ [key]: newValue });
  };

  return (
    <aside className={`filter-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="filter-header-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <div className="d-flex align-items-center gap-2">
          <i className="fas fa-filter icon-main"></i>
          <span className="filter-main-title">BỘ LỌC</span>
        </div>
        <div className="header-actions">
          <button
            className="desktop-clear-text"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            Làm mới
          </button>
          <i
            className={`fas fa-chevron-down transition-icon mobile-chevron ${isOpen ? "rotate-180" : ""}`}
          ></i>
        </div>
      </div>

      <div className={`filter-body-content ${isOpen ? "show" : ""}`}>
        <div className="filter-inner-scroll">
          <div className="filter-section">
            <span className="filter-section-label">Thương hiệu</span>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="filter-item-row"
                onClick={() => handleToggle("categoryId", cat.id)}
              >
                <div
                  className={`custom-checkbox ${String(filters.categoryId) === String(cat.id) ? "is-checked" : ""}`}
                >
                  {String(filters.categoryId) === String(cat.id) && (
                    <i className="fas fa-check"></i>
                  )}
                </div>
                <span className="item-name">{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <span className="filter-section-label">Kiểu dáng</span>
            {styles.map((s) => (
              <div
                key={s.id}
                className="filter-item-row"
                onClick={() => handleToggle("styleId", s.id)}
              >
                <div
                  className={`custom-checkbox ${String(filters.styleId) === String(s.id) ? "is-checked" : ""}`}
                >
                  {String(filters.styleId) === String(s.id) && (
                    <i className="fas fa-check"></i>
                  )}
                </div>
                <span className="item-name">{s.name}</span>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <span className="filter-section-label">Chất liệu</span>
            {materials.map((m) => (
              <div
                key={m.id}
                className="filter-item-row"
                onClick={() => handleToggle("materialId", m.id)}
              >
                <div
                  className={`custom-checkbox ${String(filters.materialId) === String(m.id) ? "is-checked" : ""}`}
                >
                  {String(filters.materialId) === String(m.id) && (
                    <i className="fas fa-check"></i>
                  )}
                </div>
                <span className="item-name">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mobile-action-footer">
          <button className="btn-reset-mobile" onClick={onClear}>
            Xóa tất cả
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SearchFilter;
