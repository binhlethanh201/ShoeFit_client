import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Đang tìm kiếm: ${searchTerm}`);
    } else {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Start Hero Section */}
      <div className="hero m-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3 text-dark">Tìm Kiếm Sản Phẩm</h1>
          <div className="search-bar mx-auto" style={{ maxWidth: "600px" }}>
            <div className="input-group shadow-sm">
              <input
                type="text"
                id="searchInput"
                className="form-control p-3"
                placeholder="Tìm kiếm theo tên giày, thương hiệu, phong cách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn btn-primary px-4"
                style={{ background: "#15228b", border: "none" }}
                id="searchBtn"
                onClick={handleSearch}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Bạn có thể thêm phần hiển thị kết quả tìm kiếm ở đây sau này */}
      <div className="container mb-5" style={{ minHeight: "30vh" }}>
        {/* Placeholder cho kết quả */}
      </div>
    </>
  );
};

export default Search;
