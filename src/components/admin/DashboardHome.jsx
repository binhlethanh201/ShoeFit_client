import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalAttributes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const statsResponse = await adminService.getDashboardStats();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 py-5">
        <div className="spinner-border text-dark"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div
            className="card border-0 shadow-sm h-100 py-3 text-decoration-none"
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onClick={() => navigate("/admin/dashboard/users/page/1")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col me-2">
                  <div className="small fw-bold text-muted text-uppercase mb-2">
                    Người Dùng
                  </div>
                  <div className="h3 mb-0 fw-bold text-dark">
                    {stats.totalUsers.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="fa-solid fa-users fa-lg text-dark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div
            className="card border-0 shadow-sm h-100 py-3 text-decoration-none"
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onClick={() => navigate("/admin/dashboard/products/page/1")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col me-2">
                  <div className="small fw-bold text-muted text-uppercase mb-2">
                    Sản Phẩm
                  </div>
                  <div className="h3 mb-0 fw-bold text-dark">
                    {stats.totalProducts.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="fa-solid fa-box-open fa-lg text-dark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div
            className="card border-0 shadow-sm h-100 py-3 text-decoration-none"
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onClick={() => navigate("/admin/dashboard/categories/page/1")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col me-2">
                  <div className="small fw-bold text-muted text-uppercase mb-2">
                    Danh Mục
                  </div>
                  <div className="h3 mb-0 fw-bold text-dark">
                    {stats.totalCategories.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="fa-solid fa-layer-group fa-lg text-dark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div
            className="card border-0 shadow-sm h-100 py-3 text-decoration-none"
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onClick={() => navigate("/admin/dashboard/attributes/page/1")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col me-2">
                  <div className="small fw-bold text-muted text-uppercase mb-2">
                    Biến Thể
                  </div>
                  <div className="h3 mb-0 fw-bold text-dark">
                    {stats.totalAttributes.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="fa-solid fa-tags fa-lg text-dark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 border-bottom-0 d-flex justify-content-between align-items-center">
              <h6 className="m-0 fw-bold text-dark">
                Phân tích Lưu lượng Truy cập & Hành vi{" "}
              </h6>
              <span className="badge bg-light text-dark border">
                Cập nhật Real-time
              </span>
            </div>
            <div className="card-body p-0">
              <div
                style={{
                  width: "100%",
                  height: "800px",
                  overflow: "hidden",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://lookerstudio.google.com/embed/reporting/d8bae8ad-a017-4aae-9aff-7dc04d17082a/page/aLMsF"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Google Analytics Dashboard"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
