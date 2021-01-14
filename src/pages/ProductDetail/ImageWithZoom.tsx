import styled, { css } from 'styled-components'
import { useMousePosition } from '../../hooks'

export const Wrapper = styled.div`
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
`

interface IStyleProps {
  isZoomed: boolean
  x: number
  y: number
}

export const Image = styled.img<IStyleProps>`
  display: block;
  width: 100%;
  max-height: 700px;
  object-fit: contain;
`

interface IImageWithZoomProps {
  src: string
}

const ImageWithZoom = ({ src }: IImageWithZoomProps) => {
  const [handle, { x, y }, isHover] = useMousePosition()
  console.log(x, y)

  const style = {
    transform: isHover ? 'scale(2)' : 'scale(1)',
    objectPosition: isHover ? `${2 * x}% ${2 * y}%` : 'center',
  }

  return (
    <Wrapper ref={handle}>
      <Image style={style} src={src} isZoomed={isHover} x={x} y={y} />
    </Wrapper>
  )
}

export default ImageWithZoom
