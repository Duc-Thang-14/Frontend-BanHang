import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menuItemStyle = (path) => ({
    padding: "16px 18px",
    borderRadius: 12,
    textDecoration: "none",
    display: "block",
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: location.pathname.includes(path) ? "#2563eb" : "#f1f5f9",
    color: location.pathname.includes(path) ? "#fff" : "#1e293b",
    transition: "all 0.2s ease",
  });

  return (
    <div style={{ display: "flex", height: "100vh", background: "#e2e8f0" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 280,
          background: "#ffffff",
          padding: 24,
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 30,
            color: "#0f172a",
          }}
        >
          🚀 Admin Panel
        </h1>

        <Link to="users" style={menuItemStyle("users")}>
          👤 Quản lý người dùng
        </Link>

        <Link to="products" style={menuItemStyle("products")}>
          📦 Quản lý sản phẩm
        </Link>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            height: 70,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          Dashboard
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: 30,
            overflowY: "auto",
            fontSize: 18,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
