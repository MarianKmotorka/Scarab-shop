import styled from 'styled-components'
import Button from '../../components/Button/Button'
import HookFormInput from '../../components/HookForm/HookFormInput'
import HookFormTextArea from '../../components/HookForm/HookFormTextArea'

export const Wrapper = styled.div``

export const Directions = styled.p`
  margin-top: 50px;
  line-height: 1.4rem;
  padding: 30px;
  background-color: ${({ theme }) => theme.white2};

  a {
    margin-left: 10px;
    text-decoration: underline;

    :hover {
      font-weight: 500;
    }
  }
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 60px auto;

  > * + * {
    margin-top: 10px;
  }
`

export const StyledInput = styled(HookFormInput)`
  width: 100%;
`

export const StyledTextArea = styled(HookFormTextArea)`
  width: 100%;
`

export const StyledButton = styled(Button)`
  align-self: flex-end;
`

export const SuccessMessage = styled.p`
  font-size: 1.7rem;
  margin: 30px 0;
`
