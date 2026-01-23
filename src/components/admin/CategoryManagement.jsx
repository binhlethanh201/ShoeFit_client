import React, { useState, useEffect, useCallback } from "react";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const CategoryManagement = () => {
  // State dữ liệu
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // State phân trang
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 1,
    totalElements: 0,
  });

  // State Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  // --- CALL API LẤY DANH SÁCH ---
  const fetchCategories = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await adminService.getCategories({
          page: page,
          size: pagination.size, // Giá trị này nằm trong dependency của useCallback
          sortBy: "createdDate",
          isAsc: false,
        });

        if (response && response.data) {
          setCategories(response.data.items);
          setPagination((prev) => ({
            ...prev,
            page: response.data.page,
            totalPages: response.data.totalPages,
            totalElements: response.data.total,
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải danh sách danh mục!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.size],
  ); // Chỉ tạo lại hàm khi pagination.size thay đổi

  useEffect(() => {
    fetchCategories(pagination.page);
  }, [pagination.page, fetchCategories]);

  // ---  XỬ LÝ FORM (THÊM / SỬA) ---
  const handleOpenModal = (category = null) => {
    if (category) {
      setIsEditMode(true);
      setCurrentId(category.id);
      setFormData({ name: category.name });
    } else {
      setIsEditMode(false);
      setCurrentId(null);
      setFormData({ name: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.warning("Tên danh mục không được để trống");
      return;
    }

    try {
      let res;
      if (isEditMode) {
        // Gọi API Update (PATCH)
        res = await adminService.updateCategory(currentId, {
          name: formData.name,
        });
      } else {
        // Gọi API Create (POST)
        res = await adminService.createCategory({ name: formData.name });
      }

      if (res) {
        toast.success(
          isEditMode ? "Cập nhật thành công!" : "Tạo mới thành công!",
        );
        setShowModal(false);
        // Gọi lại hàm fetchCategories để load lại danh sách hiện tại
        fetchCategories(pagination.page);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(msg);
    }
  };

  // --- UI RENDER (Giữ nguyên không đổi) ---
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Quản lý Danh Mục</h5>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleOpenModal(null)}
        >
          <i className="fa-solid fa-plus me-1"></i> Thêm mới
        </button>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Tên Danh Mục</th>
                  <th>Ngày tạo</th>
                  <th>Cập nhật lần cuối</th>
                  <th className="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {(pagination.page - 1) * pagination.size + index + 1}
                      </td>
                      <td className="fw-bold">{item.name}</td>
                      <td className="small text-muted">
                        {new Date(item.createdDate).toLocaleString("vi-VN")}
                      </td>
                      <td className="small text-muted">
                        {new Date(item.lastModifiedDate).toLocaleString(
                          "vi-VN",
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleOpenModal(item)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          disabled
                          title="Tính năng đang phát triển"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PHÂN TRANG --- */}
        {pagination.totalPages > 1 && (
          <nav className="d-flex justify-content-end mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                >
                  Trước
                </button>
              </li>
              {[...Array(pagination.totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${pagination.page === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: i + 1 }))
                    }
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${pagination.page === pagination.totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditMode ? "Cập Nhật Danh Mục" : "Thêm Danh Mục Mới"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSave}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tên Danh Mục <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên danh mục (VD: Giày thể thao)"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Hủy bỏ
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryManagement;
