import React, { useState, useEffect, useCallback } from "react";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const AttributeManagement = () => {
  const [activeTab, setActiveTab] = useState("attributes");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 1,
  });

  const [shoes, setShoes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    shoeId: "",
    materialId: "",
    styleId: "",
    price: 0,
    name: "",
  });

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        let res;
        if (activeTab === "attributes") {
          res = await adminService.getAllAttributes(page, pagination.size);
        } else if (activeTab === "materials") {
          res = await adminService.getAllMaterials(page, pagination.size);
        } else {
          res = await adminService.getAllStyles(page, pagination.size);
        }

        if (res?.data) {
          setData(res.data.items || []);
          setPagination((prev) => ({
            ...prev,
            page: res.data.page,
            totalPages: res.data.totalPages,
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    },
    [activeTab, pagination.size],
  );

  const loadDeps = async () => {
    try {
      const [s, m, st] = await Promise.all([
        adminService.getAllShoes(1, 100),
        adminService.getAllMaterials(1, 100),
        adminService.getAllStyles(1, 100),
      ]);
      setShoes(s.data.items || []);
      setMaterials(m.data.items || []);
      setStyles(st.data.items || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData(pagination.page);
  }, [pagination.page, fetchData]);
  useEffect(() => {
    if (showModal) loadDeps();
  }, [showModal]);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setIsEditMode(!!item);
    setCurrentId(item?.id || null);

    if (type === "attribute") {
      setFormData({
        shoeId: item?.shoeId || "",
        materialId: item?.materialId || "",
        styleId: item?.styleId || "",
        price: item?.price || 0,
      });
    } else {
      setFormData({ name: item?.name || "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (modalType === "attribute") {
        res = isEditMode
          ? await adminService.updateAttribute(currentId, {
              price: formData.price,
            })
          : await adminService.createAttribute(formData);
      } else if (modalType === "material") {
        res = await adminService.createMaterial({ name: formData.name });
      } else {
        res = await adminService.createStyle({ name: formData.name });
      }

      if (res) {
        toast.success("Thao tác thành công");
        setShowModal(false);
        fetchData(pagination.page);
      }
    } catch (e) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleDelete = async (item) => {
    const confirmMsg =
      activeTab === "materials"
        ? `Bạn có chắc muốn xóa chất liệu "${item.name}"?`
        : `Bạn có chắc muốn xóa phong cách "${item.name}"?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      let res;
      if (activeTab === "materials") {
        res = await adminService.deleteMaterial(item.id);
      } else {
        res = await adminService.deleteStyle(item.id);
      }

      if (res) {
        toast.success("Xóa thành công!");
        fetchData(pagination.page);
      }
    } catch (error) {
      toast.error(
        "Không thể xóa. Mục này có thể đang được sử dụng trong một sản phẩm.",
      );
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex gap-2 mb-3 bg-white p-2 rounded shadow-sm">
        <button
          className={`btn btn-sm ${activeTab === "attributes" ? "btn-dark" : "btn-light"}`}
          onClick={() => {
            setActiveTab("attributes");
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          Biến thể sản phẩm
        </button>
        <button
          className={`btn btn-sm ${activeTab === "materials" ? "btn-dark" : "btn-light"}`}
          onClick={() => {
            setActiveTab("materials");
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          Chất liệu
        </button>
        <button
          className={`btn btn-sm ${activeTab === "styles" ? "btn-dark" : "btn-light"}`}
          onClick={() => {
            setActiveTab("styles");
            setPagination((p) => ({ ...p, page: 1 }));
          }}
        >
          Phong cách
        </button>
      </div>

      <div className="card border-0 shadow-sm flex-grow-1">
        <div className="card-header d-flex justify-content-between align-items-center bg-white py-3">
          <h5 className="mb-0 fw-bold">
            {activeTab === "attributes"
              ? "Danh sách Biến thể"
              : activeTab === "materials"
                ? "Quản lý Chất liệu"
                : "Quản lý Phong cách"}
          </h5>
          <button
            className="btn btn-dark"
            onClick={() =>
              handleOpenModal(
                activeTab === "attributes"
                  ? "attribute"
                  : activeTab === "materials"
                    ? "material"
                    : "style",
              )
            }
          >
            <i className="fa-solid fa-plus me-2"></i>Thêm mới
          </button>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border spinner-border-sm"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  {activeTab === "attributes" ? (
                    <tr>
                      <th className="ps-4">Sản phẩm</th>
                      <th>Chất liệu</th>
                      <th>Phong cách</th>
                      <th>Giá bán</th>
                      <th className="text-end pe-4">Thao tác</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="ps-4" style={{ width: "20%" }}>
                        #
                      </th>
                      <th>Tên gọi</th>
                      <th className="text-end pe-4">Thao tác</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        {activeTab === "attributes" ? (
                          <div className="fw-bold text-dark">
                            {item.shoeName || (
                              <span className="text-muted fw-normal">
                                Chưa gán giày
                              </span>
                            )}
                          </div>
                        ) : (
                          (pagination.page - 1) * pagination.size + idx + 1
                        )}
                      </td>
                      <td>
                        {activeTab === "attributes" ? (
                          item.materialName ? (
                            <span className="badge bg-light text-dark border fw-normal">
                              {item.materialName}
                            </span>
                          ) : (
                            <span className="text-muted small">N/A</span>
                          )
                        ) : (
                          <span className="fw-bold">{item.name}</span>
                        )}
                      </td>
                      {activeTab === "attributes" && (
                        <>
                          <td>
                            <span className="badge bg-light text-dark border fw-normal">
                              {item.styleName}
                            </span>
                          </td>
                          <td className="fw-bold text-primary">
                            {item.price?.toLocaleString()}đ
                          </td>
                        </>
                      )}
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-secondary border-0"
                          onClick={() =>
                            handleOpenModal(activeTab.slice(0, -1), item)
                          }
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        {activeTab !== "attributes" && (
                          <button
                            className="btn btn-sm btn-outline-danger border-0"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-header border-bottom-0">
                <h5 className="fw-bold">
                  {isEditMode ? "Cập nhật" : "Tạo mới"} {modalType}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body p-4">
                  {modalType === "attribute" ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          Chọn sản phẩm Giày
                        </label>
                        <select
                          className="form-select"
                          value={formData.shoeId}
                          onChange={(e) =>
                            setFormData({ ...formData, shoeId: e.target.value })
                          }
                          disabled={isEditMode}
                          required
                        >
                          <option value="">-- Chọn giày --</option>
                          {shoes.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-bold d-flex justify-content-between">
                            Chất liệu{" "}
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => setModalType("material")}
                            >
                              + Mới
                            </span>
                          </label>
                          <select
                            className="form-select"
                            value={formData.materialId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                materialId: e.target.value,
                              })
                            }
                            disabled={isEditMode}
                            required
                          >
                            <option value="">-- Chọn --</option>
                            {materials.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-bold d-flex justify-content-between">
                            Phong cách{" "}
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => setModalType("style")}
                            >
                              + Mới
                            </span>
                          </label>
                          <select
                            className="form-select"
                            value={formData.styleId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                styleId: e.target.value,
                              })
                            }
                            disabled={isEditMode}
                            required
                          >
                            <option value="">-- Chọn --</option>
                            {styles.map((st) => (
                              <option key={st.id} value={st.id}>
                                {st.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          Giá bán (VNĐ)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          required
                        />
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Tên gọi {modalType}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="VD: Da bò, Cổ cao..."
                        required
                      />
                      {modalType !== "attribute" && (
                        <div className="form-text mt-2 small">
                          Sau khi lưu, bạn có thể chọn mục này trong phần tạo
                          Biến thể.
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="modal-footer border-top-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      modalType === "attribute"
                        ? setShowModal(false)
                        : setModalType("attribute")
                    }
                  >
                    {modalType === "attribute" ? "Hủy bỏ" : "Quay lại"}
                  </button>
                  <button type="submit" className="btn btn-dark px-4">
                    Lưu dữ liệu
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
