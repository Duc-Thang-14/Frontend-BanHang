import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

const MainLayout = () => {
  return (
    <>
      <HeaderComponent />
      <div style={{ paddingTop: "70px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
