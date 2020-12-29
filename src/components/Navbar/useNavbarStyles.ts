import { useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks'
import { NAVBAR_HEIGHT } from './Navbar.styled'

export const useNavbarStyles = (disabled: boolean) => {
  const { height } = useWindowSize()
  const [viewHeightScrolled, setViewHeightScrolled] = useState(false)

  useEffect(() => {
    if (disabled) return

    const root = document.getElementById('root')!

    const handler = () =>
      root.scrollTop + NAVBAR_HEIGHT > height
        ? setViewHeightScrolled(true)
        : setViewHeightScrolled(false)

    root.addEventListener('scroll', handler)

    return () => root.removeEventListener('scroll', handler)
  }, [height, disabled])

  return [viewHeightScrolled]
}
