import { Row } from "antd";
import styled from "styled-components";

export const WrapperTextHeader = styled.span`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

export const WrapperHeader = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  padding: 10px 20px;
  background-color: rgb(26, 148, 255);
  align-items: center;

  z-index: 1000;
`;

export const WrapperAccountHeader = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: nowrap;
`;
