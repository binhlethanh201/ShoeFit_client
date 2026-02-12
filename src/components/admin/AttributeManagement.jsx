import React, { useState, useEffect, useCallback, useMemo } from "react";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const AttributeManagement = () => {
  const [activeTab, setActiveTab] = useState("attributes");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter((item) => {
      if (activeTab === "attributes") {
        return (
          item.shoeName?.toLowerCase().includes(term) ||
          item.materialName?.toLowerCase().includes(term) ||
          item.styleName?.toLowerCase().includes(term)
        );
      }
      return item.name?.toLowerCase().includes(term);
    });
  }, [searchTerm, data, activeTab]);

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
      setShoes(s.data?.items || []);
      setMaterials(m.data?.items || []);
      setStyles(st.data?.items || []);
    } catch (e) {
      console.error("Lỗi load dependencies:", e);
    }
  };

  useEffect(() => {
    fetchData(pagination.page);
  }, [pagination.page, fetchData]);

  useEffect(() => {
    if (showModal) loadDeps();
  }, [showModal]);

  useEffect(() => {
    setSearchTerm("");
    setPagination((p) => ({ ...p, page: 1 }));
  }, [activeTab]);

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
      toast.error("Có lỗi xảy ra khi lưu dữ liệu");
    }
  };

  const handleDelete = async (item) => {
    const confirmMsg = `Bạn có chắc muốn xóa "${item.name || item.shoeName}"?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      let res;
      if (activeTab === "materials")
        res = await adminService.deleteMaterial(item.id);
      else if (activeTab === "styles")
        res = await adminService.deleteStyle(item.id);

      if (res) {
        toast.success("Xóa thành công!");
        fetchData(pagination.page);
      }
    } catch (error) {
      toast.error("Không thể xóa mục này vì đang được liên kết với sản phẩm.");
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex gap-2 mb-3 bg-white p-2 rounded shadow-sm">
        {["attributes", "materials", "styles"].map((tab) => (
          <button
            key={tab}
            className={`btn btn-sm ${activeTab === tab ? "btn-dark" : "btn-light"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "attributes"
              ? "Biến thể sản phẩm"
              : tab === "materials"
                ? "Chất liệu"
                : "Phong cách"}
          </button>
        ))}
      </div>

      <div className="card border-0 shadow-sm flex-grow-1">
        <div className="card-header bg-white py-3 border-bottom">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-auto">
              <h5 className="mb-0 fw-bold text-dark text-uppercase">
                {activeTab === "attributes"
                  ? "Quản lý Biến thể"
                  : activeTab === "materials"
                    ? "Quản lý Chất liệu"
                    : "Quản lý Phong cách"}
              </h5>
            </div>

            <div className="col-12 col-md-5">
              <div className="input-group input-group-sm shadow-sm">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-0"
                  placeholder="Tìm kiếm nhanh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="col-auto">
              <button
                className="btn btn-dark btn-sm px-3"
                onClick={() => handleOpenModal(activeTab.slice(0, -1))}
              >
                <i className="fa-solid fa-plus me-2"></i>Thêm mới
              </button>
            </div>
          </div>
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
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="ps-4">
                          {activeTab === "attributes" ? (
                            <div className="fw-bold text-dark">
                              {item.shoeName || (
                                <span className="text-muted fst-italic small">
                                  Chưa gán
                                </span>
                              )}
                            </div>
                          ) : (
                            (pagination.page - 1) * pagination.size + idx + 1
                          )}
                        </td>
                        <td>
                          {activeTab === "attributes" ? (
                            <span className="badge bg-light text-dark border fw-normal">
                              {item.materialName || "N/A"}
                            </span>
                          ) : (
                            <span className="fw-bold">{item.name}</span>
                          )}
                        </td>
                        {activeTab === "attributes" && (
                          <>
                            <td>
                              <span className="badge bg-light text-dark border fw-normal">
                                {item.styleName || "N/A"}
                              </span>
                            </td>
                            <td className="fw-bold text-primary">
                              {item.price?.toLocaleString()}đ
                            </td>
                          </>
                        )}
                        <td className="text-end pe-4">
                          <button
                            className="btn btn-sm btn-outline-secondary border-0 me-1"
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5 text-muted italic"
                      >
                        Không có dữ liệu phù hợp
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
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page - 1 }))
                }
              >
                Sau
              </button>
              <button className="btn btn-outline-secondary btn-sm disabled text-dark fw-bold">
                {pagination.page} / {pagination.totalPages}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page + 1 }))
                }
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
              <div className="modal-header border-bottom-0">
                <h5 className="fw-bold">
                  {isEditMode ? "Cập nhật" : "Tạo mới"}{" "}
                  {modalType === "attribute"
                    ? "Biến thể"
                    : modalType === "material"
                      ? "Chất liệu"
                      : "Phong cách"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body p-4 pt-0">
                  {modalType === "attribute" ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          Giày mục tiêu
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
                      <div className="row g-2">
                        <div className="col-6 mb-3">
                          <label className="form-label small fw-bold d-flex justify-content-between">
                            Chất liệu{" "}
                            <span
                              className="text-primary pointer"
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
                        <div className="col-6 mb-3">
                          <label className="form-label small fw-bold d-flex justify-content-between">
                            Phong cách{" "}
                            <span
                              className="text-primary pointer"
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
                          Giá bán biến thể (VNĐ)
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
                        Tên{" "}
                        {modalType === "material" ? "chất liệu" : "phong cách"}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nhập tên gọi..."
                        required
                      />
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

export default AttributeManagement;
