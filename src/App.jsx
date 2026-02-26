import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/Defaultcomponent/Defaucomponent";
import { useDispatch } from "react-redux";
import api from "./services/axiosInstance";
import { setAuth } from "./redux/slices/authSlice";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.post("/auth/refresh-token");

        if (res.data?.accessToken) {
          dispatch(
            setAuth({
              accessToken: res.data.accessToken,
              user: res.data.user,
            }),
          );
        }
      } catch (error) {
        // Không cần log gì cả
      }
    };

    checkLogin();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((item, index) => {
            const Page = item.page;
            const Layout = item.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
