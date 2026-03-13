import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import image1 from "../../assets/Images/image1.webp";
const CardComponent = ({ name, image, price, rating, selled, onClick }) => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      onClick={onClick}
      cover={
        <img
          src={`http://localhost:3000${image}`}
          alt={name}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
      }
    >
      <img
        src={logo}
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
          borderTopLeftRadius: "3px",
        }}
      />

      <StyleNameProduct>{name}</StyleNameProduct>

      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />
        </span>

        <WrapperStyleTextSell> | Đã bán {selled}</WrapperStyleTextSell>
      </WrapperReportText>

      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>{price}</span>
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
