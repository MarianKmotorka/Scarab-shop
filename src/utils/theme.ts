import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    black: string
    black2: string
    black3: string

    white: string
    white2: string
    white3: string
  }
}

export const theme: DefaultTheme = {
  black: '#000000',
  black2: '#141414',
  black3: '#1B1B1B',

  white: '#FFFFFF',
  white2: '#F3F3F3',
  white3: '#E1E1E1',
}
