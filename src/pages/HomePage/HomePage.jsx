import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperTypeProduct,
  WrapperButtonMore,
  WrapperProducts,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import image1 from "../../assets/Images/image1.webp";
import image2 from "../../assets/Images/image2.webp";
import image3 from "../../assets/Images/image3.webp";
import image4 from "../../assets/Images/image4.webp";
import image5 from "../../assets/Images/image5.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";

const HomePage = () => {
  const arr = ["TV", "Tủ lạnh", "Máy giặt"];
  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`,
  //     );
  //     console.log(res.data.data);
  //   };

  //   fetchAPI();
  // }, []);
  return (
    <div style={{ height: "1000px", padding: "0px 120px" }}>
      <WrapperTypeProduct style={{}}>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperTypeProduct>
      <SliderComponent arrimage={[image1, image2, image3, image4, image5]} />
      <WrapperProducts>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </WrapperProducts>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WrapperButtonMore textbutton="Xem thêm" size="large" />
      </div>
      <NavBarComponent />
    </div>
  );
};

export default HomePage;
