import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const CategoryManagement = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState({
    page: parseInt(pageNumber) || 1,
    size: 10,
    totalPages: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((cat) => cat.name?.toLowerCase().includes(term));
  }, [searchTerm, categories]);

  const fetchCategories = useCallback(
    async (page) => {
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
    const page = parseInt(pageNumber) || 1;
    fetchCategories(page);
  }, [pageNumber, fetchCategories]);

  const handlePageChange = (newPage) => {
    navigate(`/admin/dashboard/categories/page/${newPage}`);
  };

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
        <div className="card-header bg-white py-3 border-bottom">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-auto">
              <h5 className="mb-0 fw-bold text-dark text-uppercase">
                Quản lý Danh mục
              </h5>
            </div>
            <div className="col-12 col-md-5">
              <div className="input-group input-group-sm shadow-sm">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm tên danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-dark btn-sm px-3"
                onClick={() => handleOpenModal(null)}
              >
                <i className="fa-solid fa-plus me-2"></i>Thêm mới
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4" style={{ width: "10%" }}>
                      #
                    </th>
                    <th>Tên danh mục</th>
                    <th className="text-end pe-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((item, index) => (
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-5 text-muted italic"
                      >
                        Không tìm thấy dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!searchTerm && pagination.totalPages > 1 && (
          <div className="card-footer bg-white border-top py-3 d-flex justify-content-end">
            <div className="btn-group shadow-sm">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Sau
              </button>
              <button className="btn btn-outline-secondary btn-sm disabled text-dark fw-bold">
                {pagination.page} / {pagination.totalPages}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Tiếp
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
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {isEditMode ? "Đổi tên danh mục" : "Tạo danh mục mới"}
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
                    <label className="form-label small fw-bold">
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
                <div className="modal-footer border-top-0">
                  <button
                    type="button"
                    className="btn btn-light"
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
