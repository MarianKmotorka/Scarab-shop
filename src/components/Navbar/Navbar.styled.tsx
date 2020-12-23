import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { MD, SM } from '../../utils/theme'

export const NAVBAR_HEIGHT = 65
export const NAVBAR_HEIGHT_STRING = '65px'

export const Wrapper = styled.div`
  height: ${NAVBAR_HEIGHT_STRING};
  background-color: ${({ theme }) => theme.black};
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  z-index: 50;

  position: sticky;
  top: 0;

  display: flex;
  align-items: center;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const Logo = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;

  @media screen and (max-width: ${SM}px) {
    font-size: 1.2rem;
  }
`

export const MenuButton = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  cursor: pointer;
  display: grid;
  place-items: center;
`

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  transition: color 0.2s, background-color 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.white};
    font-weight: 400;
  }

  @media screen and (min-width: ${MD + 1}px) {
    flex-direction: column;

    svg {
      font-size: 1.4rem;
    }

    p {
      margin-top: 5px;
      font-size: 0.9rem;
    }

    &.active,
    :hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media screen and (max-width: ${MD}px) {
    padding: 20px;

    > svg,
    > span {
      font-size: 1.5rem;
      width: 80px;
    }

    p {
      font-size: 1.3rem;
      text-align: start;
      width: 28%;
    }

    &.active,
    :hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`

export const ResponsiveMenuLinks = styled(motion.div)`
  display: flex;

  @media screen and (min-width: ${MD + 1}px) {
    > a + a {
      margin-left: 50px;
    }
  }

  @media screen and (max-width: ${MD}px) {
    position: fixed;
    max-width: 400px;
    width: 100vw;
    top: ${NAVBAR_HEIGHT_STRING};
    bottom: 0;
    right: 0;
    padding-top: 100px;
    background-color: ${({ theme }) => theme.black};
    flex-direction: column;
  }
`

export const Center = styled.span`
  display: grid;
  place-items: center;
`
