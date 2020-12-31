import { createGlobalStyle } from 'styled-components'
import { MD } from '../../utils/theme'

export const GlobalStyles = createGlobalStyle`
*, *::before, *::after{
    box-sizing:border-box;
    margin:0;
    padding:0;
    font-family: 'Roboto', sans-serif;
}

a, p{
  text-decoration:none;
  color:${({ theme }) => theme.black};
}

body{
  height:100vh;
  overflow:auto;
  overflow-x:hidden;
  background-color:${({ theme }) => theme.white};

  @media screen and (min-width: ${MD}px){
      ::-webkit-scrollbar {
        width: 5px;
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background:${({ theme }) => theme.black};
      }

      ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.white2};
    }
  }
}
`
