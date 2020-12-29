import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { LG, MD, SM } from '../../utils/theme'
import Button from '../Button/Button'

export const NAVBAR_HEIGHT = 70
export const NAVBAR_HEIGHT_STRING = `${NAVBAR_HEIGHT}px`

interface IProps {
  isLandingPage: boolean
  transparent: boolean
}

export const Wrapper = styled.div<IProps>`
  height: ${NAVBAR_HEIGHT_STRING};
  background-color: ${({ theme }) => theme.black};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 50;
  transition: background-color 0.8s;

  position: sticky;
  top: 0;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ isLandingPage, transparent, theme }) =>
    isLandingPage &&
    css`
      position: absolute;
      background-color: ${transparent ? 'transparent' : theme.black};
      button {
        background: transparent;

        :first-of-type {
          border: solid 2px transparent;
          :hover {
            border-color: ${({ theme }) => theme.white};
          }
        }
      }
    `}

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
  margin-right: 3px;

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
      font-size: 1.4rem;
      width: 80px;
    }

    p {
      font-size: 1.1rem;
      text-align: start;
      width: 28%;
    }

    &.active,
    :hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`

export const Menu = styled(motion.div)`
  @media screen and (max-width: ${LG}px) {
    position: fixed;
    max-width: 400px;
    width: 100vw;
    top: ${NAVBAR_HEIGHT_STRING};
    bottom: 0;
    right: 0;
    padding-top: 80px;
    background-color: ${({ theme }) => theme.black};
  }
`

export const Center = styled.span`
  display: grid;
  place-items: center;
`

export const AuthLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  button {
    max-width: 120px;
    margin: 10px 0;
    text-transform: uppercase;
  }

  @media screen and (max-width: ${LG}px) {
    padding: 0 10px;
  }

  @media screen and (max-width: ${MD}px) {
    margin-top: 50px;
  }
`

export const ProductLinks = styled.div`
  display: flex;

  @media screen and (min-width: ${MD + 1}px) {
    > a + a {
      margin-left: 50px;
    }
  }

  @media screen and (max-width: ${MD}px) {
    flex-direction: column;
  }
`

export const UserName = styled(NavLink)`
  color: ${({ theme }) => theme.white};
  margin: 10px;
  font-size: 1.1rem;

  &.active {
    color: ${({ theme }) => theme.primary};
  }

  :hover {
    text-decoration: underline;
  }
`

export const LoginButton = styled(Button)`
  transition: all 0.3s;
  :hover {
    border: solid 2px ${({ theme }) => theme.white};
  }
`
