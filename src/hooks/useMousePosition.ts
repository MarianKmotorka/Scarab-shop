import { useCallback, useEffect, useRef, useState } from 'react'

type ReturnType = [(el: HTMLDivElement) => void, { x: number; y: number }, boolean]

const useMousePosition = (): ReturnType => {
  const parentRect = useRef<DOMRect>()
  const imageRect = useRef<DOMRect>()
  const parent = useRef<HTMLDivElement>()
  const image = useRef<HTMLImageElement>()
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [isHover, setIsHover] = useState(false)

  const moveHandler = useCallback((e: MouseEvent) => {
    if (!parent.current || !image.current) return
    const imgW = imageRect.current?.width || 1
    const imgH = imageRect.current?.height || 1
    const parW = parentRect.current?.width || 1
    const parH = parentRect.current?.height || 1

    const xPercent = (-e.clientX / parW) * (imgW - parW)
    const yPercent = (-e.clientY / parH) * (imgH - parH)

    setX(xPercent)
    setY(yPercent)
  }, [])

  const mouseEnterHandler = useCallback(() => {
    setIsHover(true)
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setIsHover(false)
  }, [])

  const handleMousePosition = useCallback(
    (el?: HTMLDivElement) => {
      parentRect.current = el?.getBoundingClientRect()
      parent.current = el
      imageRect.current = (el?.firstChild as HTMLImageElement).getBoundingClientRect()
      image.current = el?.firstChild as HTMLImageElement
      el?.addEventListener('mousemove', moveHandler)
      el?.addEventListener('mouseenter', mouseEnterHandler)
      el?.addEventListener('mouseleave', mouseLeaveHandler)
    },
    [mouseEnterHandler, mouseLeaveHandler, moveHandler]
  )

  useEffect(() => {
    return () => {
      parent.current?.removeEventListener('mousemove', moveHandler)
      parent.current?.removeEventListener('mouseenter', mouseEnterHandler)
      parent.current?.removeEventListener('mouseleave', mouseLeaveHandler)
    }
  }, [moveHandler, mouseLeaveHandler, mouseEnterHandler])

  return [handleMousePosition, { x, y }, isHover]
}

export default useMousePosition
