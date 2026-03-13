import { Input } from "antd";
import React from "react";

const InputComponent = ({
  size,
  placeholder,
  variant,
  style,
  onChange,
  value,
  ...rests
}) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      variant={variant}
      style={style}
      value={value}
      onChange={onChange}
      {...rests}
    />
  );
};

export default InputComponent;
