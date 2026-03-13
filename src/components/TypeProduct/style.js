import styled from "styled-components";

export const WrapperType = styled.div`
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;

  font-size: 18px;
  font-weight: 600;

  transition: all 0.2s ease;

  color: ${(props) => (props.active ? "#1890ff" : "#333")};
  border-bottom: ${(props) =>
    props.active ? "2px solid #1890ff" : "2px solid transparent"};

  &:hover {
    color: #1890ff;
    background: #f5faff;
  }
`;
