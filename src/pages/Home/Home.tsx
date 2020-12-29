import { useState } from 'react'
import { useObserver } from '../../hooks'
import heroBg from '../../images/scarab-bg.jpg'
import secondHeroBg from '../../images/bug-head.jpg'
import thirdHeroBg from '../../images/framed-butterfly.jpg'

import {
  HeroBg,
  Heading,
  Wrapper,
  SubHeading,
  Hero,
  SecondHero,
  SecondHeroHeading,
  SecondHeroBg,
  ThirdHero,
  ThirdHeroBG,
  ThirdHeroHeading,
} from './Home.styled'

const Home = () => {
  const [thirdHeadingSeen, setThirdHeadingSeen] = useState(false)
  const [secondHeadingSeen, setSecondHeadingSeen] = useState(false)

  const thirdHeadingRef = useObserver<HTMLHeadingElement>(() => setThirdHeadingSeen(true))
  const secondHeadingRef = useObserver<HTMLHeadingElement>(() =>
    setSecondHeadingSeen(true)
  )

  return (
    <Wrapper>
      <Hero>
        <HeroBg src={heroBg} />
        <Heading>Get insect you always wanted</Heading>
        <SubHeading>... or never knew existed</SubHeading>
      </Hero>

      <ThirdHero>
        <ThirdHeroHeading ref={thirdHeadingRef} isSeen={thirdHeadingSeen}>
          Perfect gift for anyone
        </ThirdHeroHeading>
        <ThirdHeroBG src={thirdHeroBg} />
      </ThirdHero>

      <SecondHero>
        <SecondHeroBg src={secondHeroBg} />
        <SecondHeroHeading ref={secondHeadingRef} isSeen={secondHeadingSeen}>
          Take a detailed look at nature
        </SecondHeroHeading>
      </SecondHero>
    </Wrapper>
  )
}

export default Home
