import { useState } from 'react'
import { useObserver } from '../../hooks'
import heroBg from '../../images/scarab-bg.jpg'
import secondHeroBg from '../../images/bug-head.jpg'
import thirdHeroBg from '../../images/framed-butterfly.jpg'
import yellowButterfly from '../../images/framed-yellow-butterfly.jpg'
import stagBeet from '../../images/stag-beet.jpg'
import bugOnHand from '../../images/bug-on-hand.jpg'

import {
  HeroBg,
  Heading,
  Wrapper,
  SubHeading,
  Hero,
  ThirdHero,
  ThirdHeroHeading,
  ThirdHeroBg,
  SecondHero,
  SecondHeroBG,
  SecondHeroHeading,
  Articles,
  Article,
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
        <Heading>Get the insects you always wanted</Heading>
        <SubHeading>... or never knew existed</SubHeading>
      </Hero>

      <SecondHero>
        <SecondHeroHeading ref={thirdHeadingRef} isSeen={thirdHeadingSeen}>
          Perfect gift for anyone
        </SecondHeroHeading>
        <SecondHeroBG src={thirdHeroBg} />
      </SecondHero>

      {/* <ThirdHero>
        <ThirdHeroBg src={secondHeroBg} />
        <ThirdHeroHeading ref={secondHeadingRef} isSeen={secondHeadingSeen}>
          Take a detailed look at the nature
        </ThirdHeroHeading>
      </ThirdHero> */}

      <Articles>
        <Article>
          <img src={stagBeet} alt='huge beetle' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis
            ipsam facilis quisquam ea cumque, modi laboriosam. Quasi aspernatur nostrum
            debitis officia nemo eius autem iste iusto impedit laudantium libero
            consequuntur amet est id, ea praesentium corrupti voluptates sequi quam ipsa
          </p>
        </Article>
        <Article>
          <img src={yellowButterfly} alt='huge beetle' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis
            ipsam facilis quisquam ea cumque, modi laboriosam. Quasi aspernatur nostrum
            debitis officia nemo eius autem iste iusto impedit laudantium libero
            consequuntur amet est id, ea praesentium corrupti voluptates sequi quam ipsa
          </p>
        </Article>
        <Article>
          <img src={bugOnHand} alt='huge beetle' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis
            ipsam facilis quisquam ea cumque, modi laboriosam. Quasi aspernatur nostrum
            debitis officia nemo eius autem iste iusto impedit laudantium libero
            consequuntur amet est id, ea praesentium corrupti voluptates sequi quam ipsa
          </p>
        </Article>
      </Articles>
    </Wrapper>
  )
}

export default Home
