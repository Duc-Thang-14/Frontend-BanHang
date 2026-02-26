import { Col, Pagination, Row } from "antd";
import React from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperNavbar, WrapperProducts } from "./style";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";

const TypeProductPage = () => {
  const onShowSizeChange = () => {};
  return (
    <div>
      <div
        style={{
          width: "1270px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
            height: "calc(100% - 20px)",
          }}
        >
          <WrapperNavbar span={4}>
            <NavBarComponent />
          </WrapperNavbar>
          <Col
            span={20}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
            <Pagination
              style={{ margin: "auto" }}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
