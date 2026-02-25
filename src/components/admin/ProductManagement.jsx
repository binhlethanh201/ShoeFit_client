import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const ProductManagement = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState({
    PageNumber: parseInt(pageNumber) || 1,
    PageSize: 10,
    totalPages: 1,
    totalElements: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    size: "",
    color: "",
    imageUrl: "",
    categoryId: "",
    attributeIds: [],
    imagesInput: "",
  });

  const [existingImages, setExistingImages] = useState([]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term),
    );
  }, [searchTerm, products]);

  const fetchDependencies = async () => {
    try {
      const [catRes, attrRes] = await Promise.all([
        adminService.getAllCategories(1, 100),
        adminService.getAllAttributes(1, 100),
      ]);
      if (catRes?.data) setCategories(catRes.data.items || []);
      if (attrRes?.data) setAttributes(attrRes.data.items || []);
    } catch (error) {
      console.error("Error loading dependencies", error);
    }
  };

  const fetchProducts = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await adminService.getAllShoes(
          page,
          pagination.PageSize,
        );
        if (response && response.data) {
          setProducts(response.data.items || []);
          setPagination((prev) => ({
            ...prev,
            PageNumber: response.data.page,
            totalPages: response.data.totalPages,
            totalElements: response.data.total,
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải danh sách sản phẩm!");
      } finally {
        setLoading(false);
      }
    },
    [pagination.PageSize],
  );

  useEffect(() => {
    fetchDependencies();
  }, []);

  useEffect(() => {
    const page = parseInt(pageNumber) || 1;
    fetchProducts(page);
  }, [pageNumber, fetchProducts]);

  const handlePageChange = (newPage) => {
    navigate(`/admin/dashboard/products/page/${newPage}`);
  };

  const handleOpenModal = async (product = null) => {
    setTempImages([]);
    if (product) {
      setIsEditMode(true);
      setCurrentId(product.id);
      try {
        const detailRes = await adminService.getShoeById(product.id);
        const detail = detailRes.data;
        const currentAttrIds = detail.attributes
          ? detail.attributes.map((a) => a.id)
          : [];
        setFormData({
          sku: detail.sku || "",
          name: detail.name || "",
          brand: detail.brand || "",
          description: detail.description || "",
          size: detail.size || "",
          color: detail.color || "",
          imageUrl: detail.imageUrl || "",
          categoryId: detail.categories?.[0]?.id || "",
          attributeIds: currentAttrIds,
          imagesInput: "",
        });
        setExistingImages(detail.images || []);
      } catch (error) {
        toast.error("Không thể tải chi tiết sản phẩm");
      }
    } else {
      setIsEditMode(false);
      setCurrentId(null);
      setExistingImages([]);
      setFormData({
        sku: "",
        name: "",
        brand: "",
        description: "",
        size: "",
        color: "",
        imageUrl: "",
        categoryId: "",
        attributeIds: [],
        imagesInput: "",
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = async () => {
    const url = formData.imagesInput.trim();
    if (!url) return;
    if (isEditMode) {
      try {
        await adminService.addShoeMedia(currentId, [url]);
        toast.success("Đã thêm ảnh");
        setFormData((prev) => ({ ...prev, imagesInput: "" }));
        const detailRes = await adminService.getShoeById(currentId);
        setExistingImages(detailRes.data.images || []);
      } catch (error) {
        toast.error("Thêm ảnh thất bại");
      }
    } else {
      setTempImages((prev) => [...prev, url]);
      setFormData((prev) => ({ ...prev, imagesInput: "" }));
    }
  };

  const handleRemoveTempImage = (index) => {
    setTempImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteMedia = async (imageId) => {
    if (!window.confirm("Xóa ảnh này?")) return;
    try {
      await adminService.deleteShoeMedia(currentId, [imageId]);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      toast.success("Đã xóa ảnh");
    } catch (error) {
      toast.error("Xóa ảnh thất bại");
    }
  };

  const handleAttributeCheck = async (id) => {
    if (isEditMode) {
      const exists = formData.attributeIds.includes(id);
      try {
        if (exists) {
          await adminService.deleteShoeAttributes(currentId, [id]);
          setFormData((prev) => ({
            ...prev,
            attributeIds: prev.attributeIds.filter((a) => a !== id),
          }));
        } else {
          const attrObj = attributes.find((a) => a.id === id);
          await adminService.addShoeAttributes(currentId, {
            attributes: [
              {
                materialId: attrObj.materialId,
                styleId: attrObj.styleId,
                price: attrObj.price,
              },
            ],
          });
          setFormData((prev) => ({
            ...prev,
            attributeIds: [...prev.attributeIds, id],
          }));
        }
        toast.success("Cập nhật thuộc tính thành công");
      } catch (error) {
        toast.error("Thao tác thất bại");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        attributeIds: prev.attributeIds.includes(id)
          ? prev.attributeIds.filter((a) => a !== id)
          : [...prev.attributeIds, id],
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      sku: formData.sku,
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      size: formData.size,
      imageUrl: formData.imageUrl,
      categoryIds: formData.categoryId ? [formData.categoryId] : [],
    };
    try {
      if (isEditMode) {
        await adminService.updateShoe(currentId, payload);
        toast.success("Cập nhật thành công!");
      } else {
        const createPayload = {
          ...payload,
          attributeIds: formData.attributeIds,
          images: tempImages,
        };
        await adminService.createShoe(createPayload);
        toast.success("Tạo sản phẩm thành công!");
      }
      setShowModal(false);
      fetchProducts(pagination.PageNumber);
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white py-3 border-bottom">
        <div className="row align-items-center justify-content-between g-3">
          <div className="col-auto">
            <h5 className="mb-0 fw-bold text-dark text-uppercase">
              Quản lý Sản phẩm
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
                placeholder="Tìm theo tên, SKU, hiệu..."
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
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Ảnh</th>
                  <th>SKU</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Thương hiệu</th>
                  <th className="text-end pe-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        <img
                          src={item.imageUrl || "https://placehold.co/50"}
                          alt="Thumbnail"
                          className="rounded border"
                          style={{
                            width: "45px",
                            height: "45px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td className="small font-monospace text-muted">
                        {item.sku}
                      </td>
                      <td className="fw-bold">{item.name}</td>
                      <td>
                        <span className="badge bg-light text-dark border fw-normal">
                          {item.brand}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleOpenModal(item)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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

      <div className="card-footer bg-white border-top py-3 d-flex justify-content-end">
        <div className="btn-group shadow-sm">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={pagination.PageNumber <= 1 || searchTerm !== ""}
            onClick={() => handlePageChange(pagination.PageNumber - 1)}
          >
            Sau
          </button>
          <button className="btn btn-outline-secondary btn-sm disabled text-dark fw-bold">
            {pagination.PageNumber} / {pagination.totalPages}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={
              pagination.PageNumber >= pagination.totalPages ||
              searchTerm !== ""
            }
            onClick={() => handlePageChange(pagination.PageNumber + 1)}
          >
            Tiếp
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom py-3">
                <h5 className="modal-title fw-bold text-dark text-uppercase">
                  {isEditMode ? "Thông tin chi tiết" : "Tạo sản phẩm mới"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body p-0 bg-light">
                <form id="productForm" onSubmit={handleSave}>
                  <div className="row g-0">
                    <div className="col-lg-8 p-4 bg-white border-end">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small fw-bold text-secondary">
                            TÊN SẢN PHẨM *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small fw-bold text-secondary">
                            THƯƠNG HIỆU *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small fw-bold text-secondary">
                            SKU *
                          </label>
                          <input
                            type="text"
                            className="form-control font-monospace"
                            name="sku"
                            value={formData.sku}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-bold text-secondary">
                            DANH MỤC *
                          </label>
                          <select
                            className="form-select"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small fw-bold text-secondary">
                            SIZE
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            placeholder="VD: 40,41,42"
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label small fw-bold text-secondary">
                            MÔ TẢ SẢN PHẨM
                          </label>
                          <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="col-12 mt-4">
                          <label className="form-label small fw-bold text-secondary">
                            DANH SÁCH ẢNH PHỤ
                          </label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Dán URL ảnh..."
                              name="imagesInput"
                              value={formData.imagesInput}
                              onChange={handleInputChange}
                            />
                            <button
                              className="btn btn-dark"
                              type="button"
                              onClick={handleAddImage}
                            >
                              Thêm ảnh
                            </button>
                          </div>
                          <div className="d-flex flex-wrap gap-3 p-3 border rounded bg-light min-vh-10">
                            {isEditMode
                              ? existingImages.map((img) => (
                                  <div
                                    key={img.id}
                                    className="position-relative"
                                    style={{ width: "80px", height: "80px" }}
                                  >
                                    <img
                                      src={img.url}
                                      alt="Product media"
                                      className="w-100 h-100 object-fit-cover border rounded shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle"
                                      style={{ width: "20px", height: "20px" }}
                                      onClick={() => handleDeleteMedia(img.id)}
                                    >
                                      &times;
                                    </button>
                                  </div>
                                ))
                              : tempImages.map((url, index) => (
                                  <div
                                    key={index}
                                    className="position-relative"
                                    style={{ width: "80px", height: "80px" }}
                                  >
                                    <img
                                      src={url}
                                      alt="Temp product media"
                                      className="w-100 h-100 object-fit-cover border rounded shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle"
                                      style={{ width: "20px", height: "20px" }}
                                      onClick={() =>
                                        handleRemoveTempImage(index)
                                      }
                                    >
                                      &times;
                                    </button>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 p-4 bg-white border-start">
                      <label className="form-label small fw-bold text-secondary mb-3">
                        ẢNH ĐẠI DIỆN CHÍNH
                      </label>
                      <div className="ratio ratio-1x1 bg-light border rounded mb-3 overflow-hidden d-flex align-items-center justify-content-center shadow-inner">
                        {formData.imageUrl ? (
                          <img
                            src={formData.imageUrl}
                            className="w-100 h-100 object-fit-cover"
                            alt="Main product"
                          />
                        ) : (
                          <i className="fa-solid fa-image text-muted fa-3x"></i>
                        )}
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-sm mb-4"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="URL ảnh chính..."
                        required
                      />
                      <div className="border-top pt-4">
                        <label className="form-label small fw-bold text-secondary mb-3">
                          BIẾN THỂ (ATTRIBUTES)
                        </label>
                        <div
                          className="border rounded bg-light overflow-auto"
                          style={{ maxHeight: "300px" }}
                        >
                          {attributes.map((attr) => (
                            <div
                              key={attr.id}
                              className="form-check border-bottom p-2 ps-5 m-0 small"
                            >
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id={`attr-${attr.id}`}
                                checked={formData.attributeIds.includes(
                                  attr.id,
                                )}
                                onChange={() => handleAttributeCheck(attr.id)}
                              />
                              <label
                                className="form-check-label w-100"
                                htmlFor={`attr-${attr.id}`}
                              >
                                <span className="fw-bold">
                                  {attr.materialName}
                                </span>{" "}
                                • {attr.styleName}{" "}
                                <div className="text-primary fw-bold">
                                  {attr.price?.toLocaleString()}đ
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top bg-white px-4 py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary border-0"
                  onClick={() => setShowModal(false)}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  form="productForm"
                  className="btn btn-dark px-5 shadow-sm"
                >
                  {isEditMode ? "Lưu thay đổi" : "Tạo sản phẩm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
