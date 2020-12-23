import styled, { css } from 'styled-components'

export interface IStyledButtonProps {
  hover?: boolean
  reversed?: boolean
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

  ${({ hover = true, scale = 1, reversed, disabled, theme }) => {
    const bgHex = reversed ? theme.black : theme.white
    const colorHex = reversed ? theme.white : theme.black

    return css`
      outline: none;
      border: 2px solid ${theme.black};

      font-size: 1rem;
      cursor: ${disabled ? 'auto' : 'pointer'};
      transform: scale(${scale});
      transition: background-color 0.2s, color 0.2s;

      padding: 8px 18px;
      background: ${bgHex};
      color: ${colorHex};

      ${hover &&
      css`
        :hover {
          color: ${bgHex};
          background: ${colorHex};
          * {
            color: inherit;
          }
        }
      `}

      * {
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
