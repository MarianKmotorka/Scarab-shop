import { ImSpinner8 } from 'react-icons/im'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
0%{
    transform:rotate(0deg);
}
100%{
    transform:rotate(360deg);
}

`

const Spinner = styled(ImSpinner8)`
  font-size: inherit;
  animation: ${spin} 2s linear infinite;
  margin-top: 2px;
`

export default Spinner
