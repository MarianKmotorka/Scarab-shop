import styled from 'styled-components'
import { MD } from '../utils/theme'

export const PageTitle = styled.h1`
  width: 100%;
  padding: 7px 10%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: ${MD}px) {
    padding: 10px 5%;
    font-size: 1.9rem;
  }

  margin-bottom: 50px;
  font-size: 2.2rem;
  font-weight: 400;

  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  text-shadow: 2px -2px 1px rgba(0, 0, 0, 0.2);
`
