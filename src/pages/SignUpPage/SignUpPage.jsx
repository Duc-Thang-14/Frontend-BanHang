import React, { useState } from "react";
import imageLogo from "../../assets/Images/logo-login.png";

import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";

import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSignUp } from "../../hooks/useSignUp";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useSignUp();

  const handleSignUp = () => {
    // ✅ reset lỗi cũ
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    let isValid = true;

    if (!email) {
      setErrorEmail("Email không được để trống");
      isValid = false;
    }

    if (!password) {
      setErrorPassword("Mật khẩu không được để trống");
      isValid = false;
    }

    if (!confirmPassword) {
      setErrorConfirmPassword("Vui lòng nhập lại mật khẩu");
      isValid = false;
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword("Mật khẩu không khớp");
      isValid = false;
    }

    if (!isValid) return;

    mutation.mutate(
      { email, password, confirmPassword },
      {
        onSuccess: (data) => {
          // ✅ thông báo thành công
          message.success("Đăng ký thành công! Vui lòng đăng nhập");

          // ✅ chuyển sang trang đăng nhập (delay nhẹ cho UX)
          setTimeout(() => {
            navigate("/sign-in");
          }, 800);
        },
        onError: (error) => {
          const messageError = error?.response?.data?.message || error.message;

          if (messageError === "Email already exists") {
            setErrorEmail("Email đã tồn tại");
            message.error("Email đã tồn tại");
          } else {
            message.error("Đăng ký thất bại, vui lòng thử lại");
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

          <div style={{ position: "relative", marginBottom: "5px" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "10px",
                cursor: "pointer",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>

            <InputForm
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              style={{
                border: errorConfirmPassword ? "1px solid red" : "",
              }}
            />

            {errorConfirmPassword && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errorConfirmPassword}
              </span>
            )}
          </div>

          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Đã có tài khoản
            <Link to="/sign-in" style={{ cursor: "pointer" }}>
              <WrapperTextLight> Đăng nhập</WrapperTextLight>
            </Link>
          </p>
          <ButtonComponent
            textbutton={mutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
            onClick={handleSignUp}
            disabled={mutation.isPending}
            size="large"
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
            alt="iamge-logo"
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
