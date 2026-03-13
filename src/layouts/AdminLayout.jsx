import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: "dashboard", label: "Thống kê", icon: <DashboardOutlined /> },
    { path: "users", label: "Quản lý người dùng", icon: <UserOutlined /> },
    { path: "products", label: "Quản lý sản phẩm", icon: <ShoppingOutlined /> },
    {
      path: "get-all-orders",
      label: "Quản lý đơn hàng",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f1f5f9" }}>
      {/* ===== SIDEBAR ===== */}
      <div
        style={{
          width: 260,
          background: "#0f172a",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              color: "#fff",
              marginBottom: 40,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            🚀 ADMIN
          </h2>

          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderRadius: 10,
                  marginBottom: 12,
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: 15,
                  transition: "all 0.2s ease",
                  background: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "#fff" : "#cbd5e1",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ===== BACK TO HOME ===== */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 16px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
            background: "#22c55e",
            color: "#fff",
          }}
        >
          <HomeOutlined />
          Về trang Home
        </Link>
      </div>

      {/* ===== MAIN ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <div
          style={{
            height: 70,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600 }}>Admin Dashboard</div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size={40}>A</Avatar>
            <div>
              <div style={{ fontWeight: 600 }}>Admin</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Super Administrator
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: 30,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
