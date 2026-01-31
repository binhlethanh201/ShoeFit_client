import React, { useState, useEffect, useCallback } from "react";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const fetchCategories = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await adminService.getAllCategories(
          page,
          pagination.size,
        );
        if (response?.data) {
          setCategories(response.data.items || []);
          setPagination((prev) => ({
            ...prev,
            page: response.data.page,
            totalPages: response.data.totalPages,
          }));
        }
      } catch (e) {
        toast.error("Không thể tải danh sách danh mục");
      } finally {
        setLoading(false);
      }
    },
    [pagination.size],
  );

  useEffect(() => {
    fetchCategories(pagination.page);
  }, [pagination.page, fetchCategories]);

  const handleOpenModal = (cat) => {
    setShowModal(true);
    setIsEditMode(!!cat);
    setCurrentId(cat?.id);
    setFormData({ name: cat?.name || "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.warning("Nhập tên danh mục");
    try {
      let res = isEditMode
        ? await adminService.updateCategory(currentId, { name: formData.name })
        : await adminService.createCategory({ name: formData.name });

      if (res) {
        toast.success(
          isEditMode ? "Cập nhật thành công" : "Thêm mới thành công",
        );
        setShowModal(false);
        fetchCategories(pagination.page);
      }
    } catch (e) {
      toast.error("Lỗi khi lưu dữ liệu");
    }
  };

  return (
    <div className="h-100">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-white py-3">
          <h5 className="mb-0 fw-bold text-dark">Quản lý Danh mục</h5>
          <button
            className="btn btn-dark"
            onClick={() => handleOpenModal(null)}
          >
            <i className="fa-solid fa-plus"></i> Thêm mới
          </button>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th className="ps-4" style={{ width: "10%" }}>
                      #
                    </th>
                    <th>Tên danh mục</th>
                    <th className="text-end pe-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, index) => (
                    <tr key={item.id}>
                      <td className="ps-4 text-muted">
                        {(pagination.page - 1) * pagination.size + index + 1}
                      </td>
                      <td className="fw-bold">{item.name}</td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleOpenModal(item)}
                        >
                          <i className="fa-solid fa-pen"></i> Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {pagination.totalPages > 1 && (
          <div className="card-footer bg-white py-3 border-top-0 d-flex justify-content-end">
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page - 1 }))
                }
              >
                Prev
              </button>
              <button className="btn btn-outline-secondary btn-sm disabled text-dark fw-bold">
                {pagination.page}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page + 1 }))
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {isEditMode ? "Đổi tên danh mục" : "Tạo danh mục"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Tên danh mục <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      placeholder="VD: Giày chạy bộ"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-0"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-dark px-4">
                    Lưu lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
