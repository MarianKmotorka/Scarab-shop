import styled, { keyframes, css } from 'styled-components'

const trashAnimation = keyframes`
  0%{
    transform: rotate(-1.5deg);
  }
  100%{
    transform: rotate(1.5deg);
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    font-size: 1.4rem;
    height: 75px;
    display: block;
  }
`

export const ImagesContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 80px);
  margin-bottom: 15px;
`

export const Image = styled.img<{ deleteActive: boolean }>`
  width: 80px;
  height: 80px;
  display: block;
  object-fit: cover;
  cursor: pointer;
  border-radius: 3px;

  ${({ deleteActive }) =>
    deleteActive &&
    css`
      animation: ${trashAnimation} 0.15s linear alternate infinite;
    `};

  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const Error = styled.p`
  padding: 25px;
  color: ${({ theme }) => theme.red};
  background-color: ${({ theme }) => theme.white2};
  margin-bottom: 15px;
`
