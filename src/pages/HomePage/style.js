import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  gap: 28px;

  margin: 20px 0 30px 0;
  padding: 14px 20px;

  background: #ffffff;
  border-radius: 10px;

  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);

  font-size: 18px;
  font-weight: 600;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 20px;

  margin-top: 30px;
`;
