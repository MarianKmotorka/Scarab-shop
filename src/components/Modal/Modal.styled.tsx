import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);

  display: grid;
  place-items: center;
`

export const Card = styled(motion.div)`
  position: relative;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  width: 90%;
  background-color: ${({ theme }) => theme.white};
  max-width: 500px;

  p {
    font-size: 1.3rem;
  }

  svg {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  button {
    text-transform: uppercase;
  }
`
