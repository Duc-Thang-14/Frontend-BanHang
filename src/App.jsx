import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./services/axiosInstance";
import { setAuth } from "./redux/slices/authSlice";
import AppRoutes from "./routes/index";

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
      } catch (error) {}
    };

    checkLogin();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
