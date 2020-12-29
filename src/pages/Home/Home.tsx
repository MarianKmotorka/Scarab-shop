import heroBg from '../../images/scarab-bg.jpg'
import secondHeroBg from '../../images/bug-head.jpg'

import {
  HeroBg,
  Heading,
  Wrapper,
  SubHeading,
  Hero,
  SecondHero,
  SecondHeroHeading,
  SecondHeroBg,
} from './Home.styled'

const Home = () => {
  return (
    <Wrapper>
      <Hero>
        <HeroBg src={heroBg} />
        <Heading>Get insect you always wanted</Heading>
        <SubHeading>... or never knew existed</SubHeading>
      </Hero>

      <SecondHero>
        <SecondHeroBg src={secondHeroBg} />
        <SecondHeroHeading>See details you've never seen</SecondHeroHeading>
      </SecondHero>
    </Wrapper>
  )
}

export default Home
