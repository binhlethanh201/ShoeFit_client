import React, { useState, useEffect, useCallback } from "react";
import adminService from "../../services/adminService";
import { toast } from "react-toastify";

const ProductManagement = () => {
  // --- STATE DỮ LIỆU ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- STATE PHÂN TRANG ---
  const [pagination, setPagination] = useState({
    PageNumber: 1,
    PageSize: 10,
    totalPages: 1,
    totalElements: 0,
  });

  // --- STATE MODAL ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // --- STATE FORM ---
  // Lưu ý: imagesInput là chuỗi text để người dùng nhập link ảnh ngăn cách bởi dấu phẩy
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    size: "", // size hiển thị (text)
    color: "", // color hiển thị (text)
    imageUrl: "", // Ảnh đại diện chính
    categoryId: "",
    attributeIds: [], // Mảng ID các thuộc tính đã chọn
    imagesInput: "",  // Chuỗi URL ảnh phụ (cho form Create)
  });

  // --- 1. LOAD DỮ LIỆU PHỤ TRỢ (Categories & Attributes) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách Category (size lớn để lấy hết)
        const catRes = await adminService.getCategories({ page: 1, size: 100 });
        if (catRes && catRes.data) setCategories(catRes.data.items);

        // Lấy danh sách Attribute
        const attrRes = await adminService.getAttributes({ page: 1, size: 100 });
        if (attrRes && attrRes.data) setAttributes(attrRes.data.items);
      } catch (error) {
        console.error("Error loading dependencies", error);
      }
    };
    fetchData();
  }, []);

  // --- 2. LOAD DANH SÁCH SẢN PHẨM ---
  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await adminService.getShoes({
        PageNumber: page,
        PageSize: pagination.PageSize,
      });

      if (response && response.data) {
        setProducts(response.data.items || []); // Cần check kỹ cấu trúc trả về thực tế
        setPagination((prev) => ({
          ...prev,
          PageNumber: response.data.page || page,
          totalPages: response.data.totalPages || 1,
          totalElements: response.data.total || 0,
        }));
      }
    } catch (error) {
      toast.error("Lỗi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  }, [pagination.PageSize]);

  useEffect(() => {
    fetchProducts(pagination.PageNumber);
  }, [pagination.PageNumber, fetchProducts]);

  // --- 3. XỬ LÝ FORM ---
  const handleOpenModal = (product = null) => {
    if (product) {
      // MODE EDIT
      setIsEditMode(true);
      setCurrentId(product.id);
      setFormData({
        sku: product.sku || "",
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        size: product.size || "",
        color: product.color || "",
        imageUrl: product.imageUrl || "",
        categoryId: product.categoryId || "",
        attributeIds: [], // Edit Attribute phức tạp, tạm thời bỏ qua load lại
        imagesInput: "",  // Edit Image phức tạp, tạm thời bỏ qua load lại
      });
    } else {
      // MODE CREATE
      setIsEditMode(false);
      setCurrentId(null);
      setFormData({
        sku: "", name: "", brand: "", description: "",
        size: "", color: "", imageUrl: "", categoryId: "",
        attributeIds: [], imagesInput: ""
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý tick chọn Attribute
  const handleAttributeCheck = (id) => {
    setFormData((prev) => {
      const exists = prev.attributeIds.includes(id);
      if (exists) {
        return { ...prev, attributeIds: prev.attributeIds.filter((attrId) => attrId !== id) };
      } else {
        return { ...prev, attributeIds: [...prev.attributeIds, id] };
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Clean data
    const payload = {
      sku: formData.sku,
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      size: formData.size,
      color: formData.color,
      imageUrl: formData.imageUrl,
      categoryId: formData.categoryId,
    };

    try {
      let res;
      if (isEditMode) {
        // UPDATE (PATCH): Chỉ update thông tin cơ bản
        // Lưu ý: API PATCH của bạn không nhận attributeIds và images
        res = await adminService.updateShoe(currentId, payload);
      } else {
        // CREATE (POST): Gửi đầy đủ
        const imagesArray = formData.imagesInput
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url !== "");
        
        const createPayload = {
            ...payload,
            attributeIds: formData.attributeIds,
            images: imagesArray
        }
        res = await adminService.createShoe(createPayload);
      }

      if (res) {
        toast.success(isEditMode ? "Cập nhật thành công!" : "Tạo sản phẩm thành công!");
        setShowModal(false);
        fetchProducts(pagination.PageNumber);
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(msg);
    }
  };

  // --- UI RENDER ---
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Quản lý Sản Phẩm</h5>
        <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal(null)}>
          <i className="fa-solid fa-plus me-1"></i> Thêm mới
        </button>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Ảnh</th>
                  <th>SKU</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Thương hiệu</th>
                  <th>Danh mục</th>
                  <th className="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img 
                            src={item.imageUrl || "https://placehold.co/50"} 
                            alt="thumb" 
                            style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px"}}
                            onError={(e) => e.target.src = "https://placehold.co/50"}
                        />
                      </td>
                      <td className="small">{item.sku}</td>
                      <td className="fw-bold">{item.name}</td>
                      <td>{item.brand}</td>
                      {/* Cần map categoryId sang Name nếu API getShoes không trả về tên Category */}
                      <td>{categories.find(c => c.id === item.categoryId)?.name || "---"}</td>
                      <td className="text-end">
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleOpenModal(item)}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="text-center py-4 text-muted">Không có dữ liệu</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        {pagination.totalPages > 1 && (
          <nav className="d-flex justify-content-end mt-3">
             <ul className="pagination">
                {/* Logic phân trang đơn giản - có thể copy từ CategoryManagement */}
                <li className="page-item"><button className="page-link" onClick={() => setPagination(p=>({...p, PageNumber: p.PageNumber - 1}))} disabled={pagination.PageNumber === 1}>Trước</button></li>
                <li className="page-item disabled"><button className="page-link">{pagination.PageNumber} / {pagination.totalPages}</button></li>
                <li className="page-item"><button className="page-link" onClick={() => setPagination(p=>({...p, PageNumber: p.PageNumber + 1}))} disabled={pagination.PageNumber === pagination.totalPages}>Sau</button></li>
             </ul>
          </nav>
        )}
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm Mới"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSave} id="productForm">
                  <div className="row g-3">
                    {/* Hàng 1: SKU & Brand */}
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">SKU</label>
                        <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Thương hiệu</label>
                        <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleInputChange} required />
                    </div>

                    {/* Hàng 2: Tên & Category */}
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Tên sản phẩm</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Danh mục</label>
                        <select className="form-select" name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hàng 3: Size & Color (Text hiển thị) */}
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Size (Hiển thị)</label>
                        <input type="text" className="form-control" name="size" value={formData.size} onChange={handleInputChange} placeholder="VD: 39, 40, 41" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold small">Màu sắc (Hiển thị)</label>
                        <input type="text" className="form-control" name="color" value={formData.color} onChange={handleInputChange} placeholder="VD: Đen, Trắng" />
                    </div>

                    {/* Hàng 4: Ảnh đại diện */}
                    <div className="col-12">
                        <label className="form-label fw-bold small">URL Ảnh đại diện (Main Image)</label>
                        <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." required />
                    </div>
                    
                    {/* Hàng 5: Mô tả */}
                    <div className="col-12">
                        <label className="form-label fw-bold small">Mô tả</label>
                        <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                    </div>

                    {/* Hàng 6: Thuộc tính (Chỉ hiện khi Tạo mới cho đơn giản) */}
                    {!isEditMode && (
                        <div className="col-12">
                            <label className="form-label fw-bold small d-block">Thuộc tính (Chọn nhiều)</label>
                            <div className="border p-2 rounded" style={{maxHeight: '150px', overflowY: 'auto'}}>
                                {attributes.map(attr => (
                                    <div key={attr.id} className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id={`attr-${attr.id}`}
                                            checked={formData.attributeIds.includes(attr.id)}
                                            onChange={() => handleAttributeCheck(attr.id)}
                                        />
                                        <label className="form-check-label small" htmlFor={`attr-${attr.id}`}>
                                            {attr.material} - {attr.color} - {attr.style}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hàng 7: Ảnh phụ (Chỉ hiện khi Tạo mới) */}
                    {!isEditMode && (
                        <div className="col-12">
                            <label className="form-label fw-bold small">URL Ảnh phụ (Phân cách bằng dấu phẩy)</label>
                            <textarea 
                                className="form-control" 
                                name="imagesInput" 
                                rows="2" 
                                value={formData.imagesInput} 
                                onChange={handleInputChange}
                                placeholder="https://img1.com, https://img2.com"
                            ></textarea>
                        </div>
                    )}
                    
                    {isEditMode && (
                        <div className="col-12">
                            <div className="alert alert-info small m-0">
                                <i className="fa-solid fa-circle-info me-1"></i>
                                Để chỉnh sửa Thuộc tính hoặc Ảnh phụ, vui lòng sử dụng chức năng chi tiết (đang phát triển).
                            </div>
                        </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" form="productForm" className="btn btn-primary">{isEditMode ? "Lưu thay đổi" : "Tạo sản phẩm"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;