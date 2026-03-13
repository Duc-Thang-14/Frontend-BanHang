import React from "react";
import { WrapperType } from "./style";

const TypeProduct = ({ name, onClick, active }) => {
  return (
    <WrapperType onClick={onClick} active={active}>
      {name}
    </WrapperType>
  );
};

export default TypeProduct;
