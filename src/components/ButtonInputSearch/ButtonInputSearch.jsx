import { Button } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButttonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    variant = "outlined",
    backgroundColorInput = "#fff",
    backgroundColorButton = "rgb(13, 92, 182)",
    colorButton = "#fff",
    value,
    onChange,
    onSearch,
    ...rest
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        variant={variant}
        style={{ backgroundColor: backgroundColorInput }}
        value={value}
        onChange={onChange}
        onPressEnter={onSearch}
        {...rest}
      />

      <ButtonComponent
        size={size}
        styleButton={{
          backgroundColor: backgroundColorButton,
          border: variant === "borderless" ? "none" : undefined,
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
        onClick={onSearch}
      />
    </div>
  );
};

export default ButttonInputSearch;
