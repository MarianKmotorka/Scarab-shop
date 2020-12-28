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
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

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
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 300px;
`

export const Section = styled.section`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  border-radius: 3px;
  overflow: hidden;
`

export const SectionTitle = styled.p`
  text-transform: uppercase;
  color: ${({ theme }) => theme.black};
  padding: 15px 20px;
  font-size: 0.9rem;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.white2};
`

export const SectionBody = styled.div<{ spaceBetween?: boolean }>`
  padding: 20px;
  white-space: pre-line;

  > button + button {
    margin-left: 5px;
  }

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
