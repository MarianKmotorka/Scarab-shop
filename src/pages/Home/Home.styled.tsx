import styled, { keyframes } from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from '../../components/Navbar/Navbar.styled'
import { LG, MD, SM } from '../../utils/theme'

export const Wrapper = styled.div``

const landAnimation = keyframes`
0%{
  transform:translateY(-100px);
  opacity:0;
}
100%{
  transform:translate(0px);
  opacity:1;
}
`

export const Hero = styled.div`
  height: 100vh;
  position: relative;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    width: 100%;
    max-width: 80%;
    margin: 20px auto;

    animation: ${landAnimation} 2s ease;

    @media screen and (max-width: ${MD}px) {
      max-width: 90%;
    }
  }
`

export const Heading = styled.h1`
  font-size: 5rem;
  color: white;
  filter: opacity(1);

  @media screen and (max-width: ${MD}px) {
    font-size: 3.5rem;
  }

  @media screen and (max-width: ${SM}px) {
    font-size: 3rem;
  }
`

export const SubHeading = styled.h1`
  font-size: 4rem;
  text-align: end;
  color: ${({ theme }) => theme.primary};
  filter: opacity(1);
  align-self: flex-end;

  @media screen and (max-width: ${MD}px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: ${SM}px) {
    font-size: 2rem;
  }
`

export const HeroBg = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  object-position: top;
  filter: grayscale(100%) opacity(0.4);
`

export const SecondHero = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;

  > * {
    width: 100%;
    max-width: 80%;
    margin: 20px auto;

    @media screen and (max-width: ${MD}px) {
      max-width: 90%;
    }
  }

  @media screen and (max-width: ${LG}px) {
    flex-direction: column-reverse;
    height: 150%;

    img {
      max-width: 100%;
      height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
      margin: 0;
    }
  }
`

export const SecondHeroBg = styled.img`
  height: 100%;
  max-width: 600px;
  object-fit: cover;
  display: block;
`

export const SecondHeroHeading = styled.h1<{ isSeen: boolean }>`
  font-weight: 500;
  font-size: 3.5rem;
  min-width: 400px;
  color: ${({ theme }) => theme.white};
  text-shadow: 3px -3px 3px rgba(0, 0, 0, 0.4);
  text-align: center;

  transition: 2.5s ease;
  transform: translateX(150px);
  ${({ isSeen }) => isSeen && 'transform:translateX(0px);'}

  @media screen and (max-width: ${LG}px) {
    height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 2.5rem;
    min-width: 0;
  }
`

export const ThirdHero = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
  background: ${({ theme }) => theme.white2};
  display: flex;
  align-items: center;

  > * {
    width: 100%;
    max-width: 80%;
    margin: 20px auto;

    @media screen and (max-width: ${MD}px) {
      max-width: 90%;
    }
  }

  @media screen and (max-width: ${LG}px) {
    flex-direction: column;
    height: 150%;

    img {
      max-width: 100%;
      height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
      margin: 0;
    }
  }
`

export const ThirdHeroBG = styled.img`
  height: 100%;
  width: calc(100vh - ${NAVBAR_HEIGHT_STRING});
  object-fit: cover;
  display: block;
`

export const ThirdHeroHeading = styled.h1<{ isSeen: boolean }>`
  font-size: 3.5rem;
  min-width: 400px;
  color: ${({ theme }) => theme.white};
  text-shadow: 2px -2px 1px rgba(0, 0, 0, 0.4);
  text-align: center;

  transition: 2.5s ease;
  transform: translateX(-150px);
  ${({ isSeen }) => isSeen && 'transform:translateX(0px);'}

  @media screen and (max-width: ${LG}px) {
    height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 2.5rem;
    min-width: 0;
  }
`
