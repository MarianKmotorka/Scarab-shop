import styled, { css } from 'styled-components'

export interface IStyledButtonProps {
  hover?: boolean
  reversed?: boolean
  colorInverted?: boolean
  scale?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  position?: string
}

export const StyledPrimaryButton = styled.button<IStyledButtonProps>`
  position: ${({ top, left, bottom, right, position }) =>
    position ? position : top || left || bottom || right ? 'absolute' : 'static'};

  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};

  ${({ hover = true, scale = 1, reversed, colorInverted, disabled, theme }) => {
    const bgHex = reversed ? theme.black : theme.white
    const colorHex = reversed ? theme.white : theme.black

    return css`
      outline: none;
      border: 2px solid ${colorInverted ? theme.white : theme.black};
      border-radius: 3px;

      font-size: 1rem;
      cursor: ${disabled ? 'auto' : 'pointer'};
      transform: scale(${scale});
      transition: all 0.2s, color 0.2s;

      padding: 8px 18px;
      background: ${bgHex};
      color: ${colorHex};

      ${hover &&
      !disabled &&
      css`
        :hover {
          color: ${bgHex};
          background: ${colorHex};
          * {
            color: inherit;
          }
        }
      `} * {
        color: inherit;
      }
    `
  }}
`

export const LoadingProgress = styled.span`
  margin-left: 7px;

  ::after {
    content: '%';
  }
`
