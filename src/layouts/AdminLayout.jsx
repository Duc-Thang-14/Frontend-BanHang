import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 250 }}>
        <Link to="users">Quản lý người dùng</Link>
        <br />
        <Link to="products">Quản lý sản phẩm</Link>
      </div>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
