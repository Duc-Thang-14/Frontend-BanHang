import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm = ({ placeholder = "Nhập text", ...rests }) => {
  return <WrapperInputStyle placeholder={placeholder} {...rests} />;
};

export default InputForm;
