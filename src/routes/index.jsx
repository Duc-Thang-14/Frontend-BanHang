import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";

const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, adminRoutes]);

  return element;
};

export default AppRoutes;
