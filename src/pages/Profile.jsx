import React, { useState } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header.jsx";

const User = () => {
  // Mock data cho user
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, New York, NY",
  });

  // Hàm xử lý Update Profile
  const handleUpdateProfile = () => {
    alert("Chức năng cập nhật thông tin cá nhân đang được phát triển.");
  };

  // Hàm xử lý Change Password
  const handleChangePassword = () => {
    alert("Chức năng đổi mật khẩu đang được phát triển.");
  };

  return (
    <>
      <Header activePage="user" />
      {/* User Profile Section */}
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8">
              <div className="p-4 border rounded bg-light shadow-sm">
                <h3 className="text-black mb-4 text-center">
                  Personal Information
                </h3>
                <form>
                  <div className="form-group mb-3">
                    <label className="text-black">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="text-black">Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-black px-4"
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-black px-4"
                      onClick={handleChangePassword}
                    >
                      Change Password
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

export default User;
