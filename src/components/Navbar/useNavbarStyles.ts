import { useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks'
import { NAVBAR_HEIGHT } from './Navbar.styled'

export const useNavbarStyles = (disabled: boolean) => {
  const { height } = useWindowSize()
  const [viewHeightScrolled, setViewHeightScrolled] = useState(false)

  useEffect(() => {
    if (disabled) return

    const handler = () =>
      window.scrollY + NAVBAR_HEIGHT > height
        ? setViewHeightScrolled(true)
        : setViewHeightScrolled(false)

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [height, disabled])

  return [viewHeightScrolled]
}
