import React, { useEffect, useState, useCallback } from "react";
import shoeCollectService from "../../services/shoeCollectService";
import productService from "../../services/product/productService";
import { toast } from "react-toastify";
import "../../assets/css/profile/shoeCollect.css";

const ShoeCollect = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ items: [], totalPages: 1, page: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [shoeDetails, setShoeDetails] = useState({});

  const [categories, setCategories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: null,
    styleId: null,
  });

  const fetchCollections = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await shoeCollectService.getShoeCollect(page, 10);
      if (response.status === 200) {
        const items = response.data.items || [];
        setData(response.data);

        const uniqueShoeIds = [...new Set(items.map((item) => item.shoeId))];

        await Promise.all(
          uniqueShoeIds.map(async (id) => {
            setShoeDetails((prev) => {
              if (prev[id]) return prev;
              productService.getById(id).then((detail) => {
                if (detail) {
                  setShoeDetails((current) => ({ ...current, [id]: detail }));
                }
              });
              return prev;
            });
          }),
        );
      }
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [cats, styls] = await Promise.all([
          productService.getCategories(),
          productService.getStyles(),
        ]);
        setCategories(cats);
        setStyles(styls);
        await fetchCollections(1);
      } catch (e) {
        console.error("Error metadata", e);
      }
    };
    loadMetadata();
  }, [fetchCollections]);

  const handleToggleFilter = (key, id) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === id ? null : id,
    }));
  };

  const clearFilters = () => {
    setFilters({ categoryId: null, styleId: null });
    setSearchTerm("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa kết quả này?")) {
      try {
        await shoeCollectService.deleteShoeCollect(id);
        toast.success("Đã xóa");
        fetchCollections(data.page);
      } catch (e) {
        toast.error("Lỗi xóa");
      }
    }
  };

  const filteredItems = data.items.filter((item) => {
    const sDetail = shoeDetails[item.shoeId];

    const isTabMatch =
      activeTab === "image" ? !item.resultVideo : !!item.resultVideo;

    const nameToSearch = (sDetail?.title || item.name || "").toLowerCase();
    const isSearchMatch = nameToSearch.includes(searchTerm.toLowerCase());

    const isCategoryMatch =
      !filters.categoryId || sDetail?.categoryId === filters.categoryId;
    const isStyleMatch =
      !filters.styleId || sDetail?.styleId === filters.styleId;

    return isTabMatch && isSearchMatch && isCategoryMatch && isStyleMatch;
  });

  return (
    <div className="shoe-collect-container">
      <div className="sc-tabs">
        <button
          onClick={() => setActiveTab("image")}
          className={`sc-tab-btn ${activeTab === "image" ? "active" : ""}`}
        >
          Ảnh AI
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`sc-tab-btn ${activeTab === "video" ? "active" : ""}`}
        >
          Video AI
        </button>
      </div>

      <header className="sc-header">
        <div>
          <h1 className="sc-title">AI Gallery</h1>
          <button onClick={clearFilters} className="sc-clear-btn">
            Làm mới bộ lọc
          </button>
        </div>
        <div className="sc-search-wrap">
          <input
            type="text"
            placeholder="Tìm tên sản phẩm..."
            className="sc-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="sc-search-btn">Tìm kiếm</button>
        </div>
      </header>

      <div className="sc-main-layout">
        <aside className="sc-sidebar">
          <div className="filter-group">
            <span className="sc-filter-label">Danh mục</span>
            <div className="sc-filter-list">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`sc-filter-item ${filters.categoryId === cat.id ? "active" : ""}`}
                  onClick={() => handleToggleFilter("categoryId", cat.id)}
                >
                  <div
                    className={`sc-checkbox ${filters.categoryId === cat.id ? "checked" : ""}`}
                  ></div>
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="sc-filter-label">Kiểu dáng</span>
            <div className="sc-filter-list">
              {styles.map((s) => (
                <div
                  key={s.id}
                  className={`sc-filter-item ${filters.styleId === s.id ? "active" : ""}`}
                  onClick={() => handleToggleFilter("styleId", s.id)}
                >
                  <div
                    className={`sc-checkbox ${filters.styleId === s.id ? "checked" : ""}`}
                  ></div>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-grow">
          {loading && Object.keys(shoeDetails).length === 0 ? (
            <div className="text-center py-20 opacity-50 italic">
              Đang tải dữ liệu...
            </div>
          ) : (
            <div className="sc-grid">
              {filteredItems.map((item) => {
                const sDetail = shoeDetails[item.shoeId];
                const shoeImg = sDetail?.image || item.shoeImage;

                return (
                  <div key={item.id} className="sc-card shadow-sm">
                    <div className="sc-card-body">
                      <div className="sc-card-left">
                        <img src={item.resultImage} alt="AI Result" />
                        <div className="sc-badge">Bản thử AI</div>
                      </div>
                      <div className="sc-card-right">
                        <div className="sc-shoe-header">
                          <span className="sc-brand-tag">
                            {sDetail?.brand || "ShoeFit"}
                          </span>
                          <p
                            className="sc-shoe-name"
                            title={sDetail?.title || item.name}
                          >
                            {sDetail?.title || item.name || "Sản phẩm AI"}
                          </p>
                        </div>
                        <div className="sc-shoe-img-wrap">
                          <img src={shoeImg} alt="Shoe" />
                        </div>
                        <div className="sc-user-img-wrap">
                          <img src={item.userImage} alt="User" />
                          <div className="sc-user-label">Input</div>
                        </div>
                      </div>
                    </div>
                    <div className="sc-card-footer">
                      <div className="sc-info">
                        <p className="sc-desc" title={item.description}>
                          {item.description || "Created with AI"}
                        </p>
                        <span className="sc-date">
                          {new Date(item.createdDate).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>
                      <div className="sc-status-box">
                        <span className="sc-status">
                          <span className="sc-dot"></span>
                          {item.status}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="sc-delete-btn"
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShoeCollect;
