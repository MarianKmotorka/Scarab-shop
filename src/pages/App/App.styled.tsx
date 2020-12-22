import { createGlobalStyle } from 'styled-components'
import { MD } from '../../utils/theme'

export const GlobalStyles = createGlobalStyle`
*, *::before, *::after{
    box-sizing:border-box;
    margin:0;
    padding:0;
    font-family: 'Roboto', sans-serif;
}

body{
    height:100vh;
    overflow:auto;
    background-color:${({ theme }) => theme.white};

    ::-webkit-scrollbar {
    width: 10px;
    background: transparent;
    }

    ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.black};
    }

    ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }

  @media screen and (max-width: ${MD}px){
    ::-webkit-scrollbar {
      width: 3px;
    }
  }
}
`
