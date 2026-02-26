import { React, useState } from "react";
import imageLogo from "../../assets/Images/logo-login.png";

import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "../SignUpPage/style";

import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLogin } from "../../hooks/useLogin";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const mutation = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setErrorEmail("");
    setErrorPassword("");

    let isValid = true;

    if (!email) {
      setErrorEmail("Email không được để trống");
      isValid = false;
    }

    if (!password) {
      setErrorPassword("Mật khẩu không được để trống");
      isValid = false;
    }

    if (!isValid) return;

    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch(
            setAuth({
              user: data.user,
              accessToken: data.accessToken,
            }),
          );

          navigate("/");
        },

        onError: (error) => {
          const messageError = error?.response?.data?.message || error.message;

          if (messageError === "USER_NOT_FOUND") {
            setErrorEmail("Email không tồn tại");
          }

          if (messageError === "INVALID_PASSWORD") {
            setErrorPassword("Mật khẩu không đúng");
          }
        },
      },
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tạo tài khoản</p>
          <InputForm
            value={email}
            disabled={mutation.isPending}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            style={{
              marginBottom: "5px",
              border: errorEmail ? "1px solid red" : "",
            }}
          />

          {errorEmail && (
            <span style={{ color: "red", fontSize: "12px" }}>{errorEmail}</span>
          )}

          <div style={{ position: "relative", marginBottom: "5px" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "10px",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>

            <InputForm
              value={password}
              disabled={mutation.isPending}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              style={{
                border: errorPassword ? "1px solid red" : "",
              }}
            />

            {errorPassword && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errorPassword}
              </span>
            )}
          </div>

          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <Link to="/sign-up" style={{ cursor: "pointer" }}>
              <WrapperTextLight> Tạo tài khoản</WrapperTextLight>
            </Link>
          </p>
          {mutation.isPending && <Spin />}

          <ButtonComponent
            textbutton={mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            size="large"
            onClick={handleSignIn}
            disabled={mutation.isPending}
            styleButton={{
              backgroundColor: "#1890ff",
              width: "100%",
              height: "48px",
              margin: "10px 0",
            }}
            styleTextButton={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
            }}
          />
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại LTTD</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
