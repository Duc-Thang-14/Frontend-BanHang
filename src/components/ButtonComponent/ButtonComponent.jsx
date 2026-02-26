import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  size,
  styleButton = {}, // 👈 FIX
  styleTextButton = {}, // 👈 nên thêm
  textbutton,
  disabled,
  ...rests
}) => {
  return (
    <Button
      style={{
        ...styleButton,
        backgroundColor: disabled ? "#ccc" : styleButton.backgroundColor,
        opacity: disabled ? 0.7 : 1,
      }}
      size={size}
      disabled={disabled}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  );
};

export default ButtonComponent;
