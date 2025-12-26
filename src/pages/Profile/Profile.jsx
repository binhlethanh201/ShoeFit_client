import React, { useState } from "react";

const Profile = () => {
  // State quản lý thông tin người dùng (giả lập dữ liệu ban đầu)
  const [userInfo, setUserInfo] = useState({
    fullName: "Tran Van Quan",
    email: "tranvanquan@gmail.com",
    phone: "+1 294 3925 3939",
    address: "Hoa Lac Hi-tech Park, km 29 Đại lộ Thăng Long, Hà Nội",
  });

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    alert(
      "Chức năng cập nhật hồ sơ đang được phát triển.\n\nDữ liệu hiện tại:\n" +
        JSON.stringify(userInfo, null, 2)
    );
  };

  const handleChangePassword = () => {
    alert("Chức năng đổi mật khẩu đang được phát triển.");
  };

  return (
    <>
      {/* User Profile Section */}
      <div className="untree_co-section before-footer-section mt-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8">
              <div className="p-4 border rounded bg-light shadow-sm">
                <h3 className="text-black mb-4 text-center">
                  Thông Tin Cá Nhân
                </h3>

                <form id="userForm">
                  <div className="form-group mb-3">
                    <label className="text-black" htmlFor="fullName">
                      Họ Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black" htmlFor="email">
                      Địa Chỉ Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black" htmlFor="phone">
                      Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="text-black" htmlFor="address">
                      Địa Chỉ
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows="3"
                      value={userInfo.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-black px-4"
                      onClick={handleUpdateProfile}
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      Chỉnh Sửa Trang Cá Nhân
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-black px-4"
                      onClick={handleChangePassword}
                      style={{ border: "1px solid #000", color: "#000" }}
                    >
                      Đổi Mật Khẩu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
