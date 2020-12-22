import { createGlobalStyle } from 'styled-components'

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
}
`
