import styled from 'styled-components'
import AutoTextArea from '../../components/AutoTextArea/AutoTextArea'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

export const Wrapper = styled.div``

export const OrderDirections = styled.p`
  margin: 50px 0;
  line-height: 1.4rem;
  padding: 30px;
  background-color: ${({ theme }) => theme.white2};
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 30px auto;

  > * + * {
    margin-top: 10px;
  }
`

export const StyledInput = styled(Input)`
  width: 100%;
`

export const StyledTextArea = styled(AutoTextArea)`
  width: 100%;
`

export const StyledButton = styled(Button)`
  align-self: flex-end;
`

export const ValidationError = styled.div`
  padding: 30px;
  width: 100%;
  color: ${({ theme }) => theme.red};
  background-color: ${({ theme }) => theme.black3};
`

export const SuccessMessage = styled.p`
  font-size: 1.7rem;
  margin: 30px 0;
`
