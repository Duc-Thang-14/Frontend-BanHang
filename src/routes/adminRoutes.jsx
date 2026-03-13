import { Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminUser from "../pages/AdminPage/AdminUser";
import AdminProduct from "../pages/AdminPage/AdminProduct";
import AdminRoute from "../guards/AdminRoute";
import Dashboard from "../pages/AdminPage/Dashboard";
import AdminOrderPage from "../pages/AdminPage/AdminOrderPage";

const adminRoutes = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "users", element: <AdminUser /> },
    { path: "products", element: <AdminProduct /> },
    { path: "get-all-orders", element: <AdminOrderPage /> },
  ],
};

export default adminRoutes;
