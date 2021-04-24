import styled from "styled-components";
import { MD } from "../utils/theme";

export const PageTitle = styled.h1`
  width: 100%;
  padding: 25px 10%;

  @media screen and (max-width: ${MD}px) {
    padding: 20px 5%;
    font-size: 1.5rem;
  }

  margin-bottom: 10px;
  font-size: 1.8rem;
  font-weight: 500;

  color: rgb(134, 42, 42);
`;
