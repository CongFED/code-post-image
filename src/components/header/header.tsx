import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/css/header/header.css";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    navigate("/login"); // Điều hướng người dùng về trang đăng nhập
  };

  return (
    <header className="bg-light container-header">
      <div className="container">
        <div className="d-flex justify-content-end align-items-center">
          <div className="dropdown" ref={dropdownRef}>
            <img
              src="https://i.pravatar.cc/50"
              alt="avatar"
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
              className="dropdown-toggle image-header"
            />
            <div
              className={`dropdown-menu${
                isOpen ? " show" : ""
              } custom-dropdown`}
              aria-labelledby="dropdownMenuButton"
            >
              <NavLink className="dropdown-item" to="/upload">
                Upload
              </NavLink>
              {/* Thêm sự kiện onClick để xử lý đăng xuất */}
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
