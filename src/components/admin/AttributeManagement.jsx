import React, { useState, useEffect, useCallback } from "react";
import adminService from "../../services/adminService";
import { toast } from "react-toastify";

const AttributeManagement = () => {
  // State dữ liệu
  const [attributes, setAttributes] = useState([]);
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

  // Form data cho 3 trường: material, color, style
  const [formData, setFormData] = useState({
    material: "",
    color: "",
    style: "",
  });

  // --- 1. CALL API LẤY DANH SÁCH ---
  const fetchAttributes = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await adminService.getAttributes({
          page: page,
          size: pagination.size,
          sortBy: "createdDate",
          isAsc: false,
        });

        if (response && response.data) {
          setAttributes(response.data.items);
          setPagination((prev) => ({
            ...prev,
            page: response.data.page,
            totalPages: response.data.totalPages,
            totalElements: response.data.total,
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải danh sách thuộc tính!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.size],
  );

  useEffect(() => {
    fetchAttributes(pagination.page);
  }, [pagination.page, fetchAttributes]);

  // --- 2. XỬ LÝ FORM ---
  const handleOpenModal = (attr = null) => {
    if (attr) {
      setIsEditMode(true);
      setCurrentId(attr.id);
      setFormData({
        material: attr.material,
        color: attr.color,
        style: attr.style,
      });
    } else {
      setIsEditMode(false);
      setCurrentId(null);
      setFormData({ material: "", color: "", style: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // 1. Clean Data: Trim khoảng trắng
    const material = formData.material.trim();
    const color = formData.color.trim();
    const style = formData.style.trim();

    // Validate
    if (!material && !color && !style) {
      toast.warning("Vui lòng nhập ít nhất một thông tin");
      return;
    }

    // 2. Chuyển chuỗi rỗng thành null (Tránh lỗi backend nếu có)
    const payload = {
      material: material === "" ? null : material,
      color: color === "" ? null : color,
      style: style === "" ? null : style,
    };

    try {
      let res;
      if (isEditMode) {
        res = await adminService.updateAttribute(currentId, payload);
      } else {
        res = await adminService.createAttribute(payload);
      }

      // 3. Kiểm tra response
      if (res) {
        toast.success(
          isEditMode ? "Cập nhật thành công!" : "Tạo mới thành công!",
        );
        setShowModal(false);
        fetchAttributes(pagination.page);
      }
    } catch (error) {
      console.error("--- CHI TIẾT LỖI TỪ SERVER ---");
      console.log(error.response); // Xem log này trong Console (F12)

      // 4. Hiển thị lỗi chi tiết ra Toast để dễ debug
      let errorMessage = "Có lỗi xảy ra!";

      if (error.response) {
        // Trường hợp Server trả về message lỗi cụ thể
        if (error.response.data && typeof error.response.data === "string") {
          errorMessage = error.response.data; // Nếu data là chuỗi
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Nếu data là object có message
        } else {
          errorMessage = `Lỗi Server (${error.response.status}): Vui lòng kiểm tra lại dữ liệu.`;
        }
      } else {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- UI RENDER ---
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Quản lý Thuộc Tính SP</h5>
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
                  <th>Chất Liệu (Material)</th>
                  <th>Màu Sắc (Color)</th>
                  <th>Kiểu Dáng (Style)</th>
                  <th>Ngày tạo</th>
                  <th className="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {attributes.length > 0 ? (
                  attributes.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {(pagination.page - 1) * pagination.size + index + 1}
                      </td>
                      <td>
                        {item.material || (
                          <span className="text-muted fst-italic">--</span>
                        )}
                      </td>
                      <td>
                        {item.color ? (
                          <span className="badge bg-light text-dark border">
                            {item.color}
                          </span>
                        ) : (
                          <span className="text-muted fst-italic">--</span>
                        )}
                      </td>
                      <td>
                        {item.style || (
                          <span className="text-muted fst-italic">--</span>
                        )}
                      </td>
                      <td className="small text-muted">
                        {new Date(item.createdDate).toLocaleString("vi-VN")}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleOpenModal(item)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PHÂN TRANG (Giống Category) --- */}
        {pagination.totalPages > 1 && (
          <nav className="d-flex justify-content-end mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPagination((p) => ({ ...p, page: p.page - 1 }))
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
                      setPagination((p) => ({ ...p, page: i + 1 }))
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
                    setPagination((p) => ({ ...p, page: p.page + 1 }))
                  }
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditMode ? "Cập Nhật Thuộc Tính" : "Thêm Thuộc Tính Mới"}
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
                      Chất liệu (Material)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="material"
                      placeholder="VD: Da bò, Vải Canvas..."
                      value={formData.material}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Màu sắc (Color)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="color"
                      placeholder="VD: Trắng, Đen, Xanh Navy..."
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Kiểu dáng (Style)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="style"
                      placeholder="VD: Cổ thấp, Cổ cao, Slip-on..."
                      value={formData.style}
                      onChange={handleChange}
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
      )}
    </div>
  );
};

export default AttributeManagement;
