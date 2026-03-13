import React, { useState, useEffect } from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperAccountHeader,
} from "./style.js";

import { Badge, Col, Dropdown, Flex, Space } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import ButttonInputSearch from "../ButtonInputSearch/ButtonInputSearch.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../../redux/slices/authSlice";
import api from "../../services/axiosInstance.js";
import useDebounce from "../../hooks/useDebounce";

const HeaderComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // debounce search
  const debounceSearch = useDebounce(search, 500);

  // 🔎 search realtime (Shopee style)
  useEffect(() => {
    if (debounceSearch.trim()) {
      navigate(`/?search=${debounceSearch}`);
    } else {
      navigate(`/`);
    }
  }, [debounceSearch]);

  // 🔎 search khi bấm nút
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/?search=${search}`);
  };

  // logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      dispatch(clearAuth());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoCart = () => {
    if (!user) {
      navigate("/sign-in");
    } else {
      navigate("/cart");
    }
  };
  const items = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      onClick: () => navigate("/profile"),
    },
    ...(user?.isAdmin
      ? [
          {
            key: "admin",
            label: "Quản lý",
            onClick: () => navigate("/admin"),
          },
        ]
      : []),
    ...(!user?.isAdmin
      ? [
          {
            key: "my-orders",
            label: "Lịch sử đơn hàng",
            onClick: () => navigate("/my-orders"),
          },
        ]
      : []),
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <Link to="/">
            <WrapperTextHeader>CỬA HÀNG</WrapperTextHeader>
          </Link>
        </Col>

        <Col span={12}>
          <ButttonInputSearch
            size="large"
            variant="borderless"
            textbutton="Tìm kiếm"
            placeholder="Tìm sản phẩm..."
            backgroundColorButton="blue"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </Col>

        <Col span={6}>
          <WrapperAccountHeader>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined style={{ fontSize: "26px" }} />
            )}

            {user ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <div style={{ cursor: "pointer", color: "white" }}>
                  <Space>
                    Xin chào, {user.name ? user.name : user.email}
                    <CaretDownOutlined />
                  </Space>
                </div>
              </Dropdown>
            ) : (
              <div style={{ cursor: "pointer" }}>
                <Link to="/sign-in" style={{ color: "white" }}>
                  <span>Đăng nhập/Đăng ký</span>
                  <div>
                    <span>Tài khoản</span>
                    <CaretDownOutlined />
                  </div>
                </Link>
              </div>
            )}

            <div
              onClick={handleGoCart}
              style={{ cursor: "pointer", display: "flex", gap: "10px" }}
            >
              <Badge count={5} style={{ fontSize: "10px" }}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: "25px",
                    marginLeft: "30px",
                    color: "white",
                  }}
                />
              </Badge>

              <span>Giỏ hàng</span>
            </div>
          </WrapperAccountHeader>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
