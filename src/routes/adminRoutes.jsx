import { Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminUser from "../pages/AdminPage/AdminUser";
import AdminProduct from "../pages/AdminPage/AdminProduct";
import AdminRoute from "../guards/AdminRoute";

const adminRoutes = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    { index: true, element: <Navigate to="users" replace /> },
    { path: "users", element: <AdminUser /> },
    { path: "products", element: <AdminProduct /> },
  ],
};

export default adminRoutes;
