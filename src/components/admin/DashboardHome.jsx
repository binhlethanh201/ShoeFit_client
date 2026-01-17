import React from "react";

const DashboardHome = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Tổng User</div>
          <div className="card-body">
            <h5 className="card-title">1,204</h5>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-success mb-3">
          <div className="card-header">Doanh Thu</div>
          <div className="card-body">
            <h5 className="card-title">500M VNĐ</h5>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-warning mb-3">
          <div className="card-header">Đơn Hàng Mới</div>
          <div className="card-body">
            <h5 className="card-title">45</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;
