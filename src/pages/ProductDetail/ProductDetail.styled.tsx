import styled, { css } from 'styled-components'
import { SM } from '../../utils/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 30px;
`

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 595px;
  width: 100%;
  min-width: 300px;

  margin-bottom: 30px;
`

export const SmallImagesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 95px);

  @media screen and (max-width: ${SM}px) {
    grid-template-columns: repeat(auto-fill, 60px);
  }
`

export const SmallImage = styled.img`
  height: 95px;
  width: 95px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: ${SM}px) {
    height: 60px;
    width: 60px;
  }
`

export const MainImage = styled.img`
  display: block;
  max-width: 600px;
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  margin-bottom: 5px;
`

export const ProductInfo = styled.div`
  border-radius: 5px;
  flex: 1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  min-width: 300px;
  height: auto;
`

export const SectionTitle = styled.p`
  color: ${({ theme }) => theme.primary};
  padding: 25px 30px;
  background-color: ${({ theme }) => theme.black3};
`

export const Section = styled.p<{ spaceBetween?: boolean }>`
  padding: 30px;
  white-space: pre-line;

  ${({ spaceBetween }) =>
    spaceBetween &&
    css`
      display:flex;
      justify-content:space-between;
      align-items:center;
      }
    `};
`

export const Money = styled.span<{ fontSize: string }>`
  color: ${({ theme }) => theme.primary};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
`