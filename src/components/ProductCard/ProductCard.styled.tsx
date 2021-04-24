import { Link } from "react-router-dom";
import CoolImg from "react-cool-img";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.white};
  position: relative;

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

  :hover img {
    transform: scale(1.3);
  }
`;

export const Image = styled(CoolImg)<{ isOutOfStock: boolean }>`
  height: 270px;
  width: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s;

  ${({ isOutOfStock }) => isOutOfStock && "filter: grayscale(100%)"};
`;

export const Body = styled.div`
  padding: 13px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);

  h1 {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.white};
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const Price = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > span {
    margin: 0 5px;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
  }
`;
