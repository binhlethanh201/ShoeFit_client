import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import { toast } from "sonner";

const UserManagement = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bannedIds, setBannedIds] = useState([]);

  const [pagination, setPagination] = useState({
    PageNumber: parseInt(pageNumber) || 1,
    PageSize: 10,
    totalPages: 1,
    totalElements: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;

    return users.filter(
      (u) =>
        u.username?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.fullName?.toLowerCase().includes(term) ||
        u.phoneNumber?.toLowerCase().includes(term),
    );
  }, [searchTerm, users]);

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await adminService.getAllUsers(
          page,
          pagination.PageSize,
        );
        if (response?.data) {
          setUsers(response.data.items || []);
          setPagination((prev) => ({
            ...prev,
            PageNumber: response.data.page || page,
            totalPages: response.data.totalPages || 1,
            totalElements: response.data.total || 0,
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải danh sách người dùng!");
      } finally {
        setLoading(false);
      }
    },
    [pagination.PageSize],
  );

  useEffect(() => {
    const page = parseInt(pageNumber) || 1;
    fetchUsers(page);
  }, [pageNumber, fetchUsers]);

  const handlePageChange = (newPage) => {
    navigate(`/admin/dashboard/users/page/${newPage}`);
  };

  const handleOpenModal = async (user) => {
    try {
      const res = await adminService.getUserById(user.id);
      setSelectedUser(res.data);
      setShowModal(true);
    } catch (error) {
      toast.error("Không thể tải chi tiết người dùng");
    }
  };

  const handleToggleBan = (userId, username) => {
    const isBanned = bannedIds.includes(userId);
    const confirmMsg = isBanned
      ? `Bạn muốn MỞ KHÓA tài khoản của "${username}"?`
      : `Bạn có chắc chắn muốn KHÓA tài khoản "${username}"? Người này sẽ không thể đăng nhập.`;

    if (!window.confirm(confirmMsg)) return;

    if (isBanned) {
      setBannedIds((prev) => prev.filter((id) => id !== userId));
      toast.success(`Đã khôi phục hoạt động cho ${username}`);
    } else {
      setBannedIds((prev) => [...prev, userId]);
      toast.success(`Tài khoản ${username} đã bị vô hiệu hóa!`, {
        style: {
          background: "#fff0f0",
          color: "#dc3545",
          borderColor: "#dc3545",
        },
      });
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white py-3 border-bottom">
        <div className="row align-items-center justify-content-between g-3">
          <div className="col-auto">
            <h5 className="mb-0 fw-bold text-dark text-uppercase">
              Danh sách Người dùng
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
                placeholder="Tìm kiếm..."
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
              className="btn btn-light btn-sm px-3 border"
              onClick={() => fetchUsers(pagination.PageNumber)}
            >
              <i className="fa-solid fa-rotate-right me-2"></i> Làm mới
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
                  <th className="ps-4">Người dùng</th>
                  <th>Username</th>
                  <th>Liên hệ</th>
                  <th>Trạng thái / Try-on</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item) => {
                    const isBanned = bannedIds.includes(item.id);

                    return (
                      <tr key={item.id} className={isBanned ? "bg-light" : ""}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                item.avatarUrl ||
                                "https://ui-avatars.com/api/?name=" +
                                  (item.fullName || item.username)
                              }
                              alt="Avatar"
                              className="rounded-circle border me-3"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                filter: isBanned
                                  ? "grayscale(100%) opacity(60%)"
                                  : "none",
                                transition: "all 0.3s",
                              }}
                            />
                            <div>
                              <div
                                className={`fw-bold ${isBanned ? "text-muted text-decoration-line-through" : ""}`}
                              >
                                {item.fullName || "Chưa cập nhật"}
                              </div>
                              {isBanned && (
                                <span
                                  className="badge bg-danger bg-opacity-10 text-danger border border-danger mt-1"
                                  style={{ fontSize: "10px" }}
                                >
                                  <i className="fa-solid fa-ban me-1"></i>VÔ
                                  HIỆU HÓA
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td
                          className={`small font-monospace ${isBanned ? "text-muted" : "text-dark"}`}
                        >
                          {item.username}
                        </td>
                        <td>
                          <div
                            className={`small ${isBanned ? "text-muted" : ""}`}
                          >
                            {item.email}
                          </div>
                          <div className="small text-muted">
                            {item.phoneNumber || "N/A"}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${isBanned ? "bg-secondary" : "bg-dark"} text-white rounded-pill`}
                          >
                            {item.freeServiceCount} lượt
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <button
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => handleOpenModal(item)}
                            title="Xem chi tiết"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${isBanned ? "btn-success" : "btn-outline-danger"}`}
                            onClick={() =>
                              handleToggleBan(item.id, item.username)
                            }
                            title={
                              isBanned ? "Mở khóa tài khoản" : "Khóa tài khoản"
                            }
                            style={{ width: "32px" }}
                          >
                            <i
                              className={`fa-solid ${isBanned ? "fa-unlock" : "fa-lock"}`}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-5 text-muted fst-italic"
                    >
                      {searchTerm
                        ? `Không tìm thấy người dùng nào khớp với "${searchTerm}"`
                        : "Không có dữ liệu"}
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
            disabled={pagination.PageNumber <= 1 || searchTerm.trim() !== ""}
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
              searchTerm.trim() !== ""
            }
            onClick={() => handlePageChange(pagination.PageNumber + 1)}
          >
            Tiếp
          </button>
        </div>
      </div>

      {showModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom py-3">
                <h5 className="modal-title fw-bold text-dark text-uppercase">
                  Hồ sơ Người dùng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4 bg-light">
                {bannedIds.includes(selectedUser.id) && (
                  <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-4">
                    <i className="fa-solid fa-triangle-exclamation me-2 fa-lg"></i>
                    Tài khoản này đang bị khóa và không thể truy cập hệ thống.
                  </div>
                )}

                <div className="text-center mb-4">
                  <img
                    src={
                      selectedUser.avatarUrl ||
                      "https://ui-avatars.com/api/?name=" +
                        (selectedUser.fullName || selectedUser.username)
                    }
                    alt="Avatar"
                    className="rounded-circle border shadow-sm mb-3"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      filter: bannedIds.includes(selectedUser.id)
                        ? "grayscale(100%)"
                        : "none",
                    }}
                  />
                  <h5 className="fw-bold mb-0">
                    {selectedUser.fullName || "Chưa cập nhật"}
                  </h5>
                  <div className="text-muted font-monospace small">
                    @{selectedUser.username}
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <div className="row mb-2">
                    <div className="col-4 text-muted small fw-bold">ID:</div>
                    <div className="col-8 small font-monospace text-truncate">
                      {selectedUser.id}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small fw-bold">Email:</div>
                    <div className="col-8 small">
                      {selectedUser.email || "N/A"}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small fw-bold">
                      Điện thoại:
                    </div>
                    <div className="col-8 small">
                      {selectedUser.phoneNumber || "N/A"}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small fw-bold">
                      Địa chỉ:
                    </div>
                    <div className="col-8 small">
                      {selectedUser.address || "N/A"}
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="row">
                    <div className="col-4 text-muted small fw-bold">
                      Lượt Try-on:
                    </div>
                    <div className="col-8 small fw-bold text-success">
                      {selectedUser.freeServiceCount} lượt
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top bg-white px-4 py-3 d-flex justify-content-between">
                <button
                  type="button"
                  className={`btn ${bannedIds.includes(selectedUser.id) ? "btn-outline-success" : "btn-outline-danger"}`}
                  onClick={() =>
                    handleToggleBan(selectedUser.id, selectedUser.username)
                  }
                >
                  <i
                    className={`fa-solid ${bannedIds.includes(selectedUser.id) ? "fa-unlock" : "fa-lock"} me-2`}
                  ></i>
                  {bannedIds.includes(selectedUser.id)
                    ? "Mở khóa"
                    : "Khóa tài khoản"}
                </button>
                <button
                  type="button"
                  className="btn btn-dark shadow-sm px-4"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
