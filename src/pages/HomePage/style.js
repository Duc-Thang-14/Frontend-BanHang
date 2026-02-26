import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  justify-content: flex-start;
  heigh: 44px;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  background-color: #1890ff;
  border-radius: 8px;
  height: 40px;
  padding: 0 24px;
  border: none;

  span {
    color: #fff;
    font-weight: 600;
  }
  &:hover {
    background-color: #fff;
    border: 1px solid #1890ff;
  }

  &:hover span {
    color: #1890ff;
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  flex-wrap: wrap;
`;
