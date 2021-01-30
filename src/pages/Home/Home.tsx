import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronRight } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { useObserver } from '../../hooks'
import Button from '../../components/Button/Button'

import heroBg from '../../images/scarab-bg-min.jpg'
import bugOnHand from '../../images/golias.jpg'
import bugsOnHand from '../../images/bugs-on-hand.jpg'
import thirdHeroBg from '../../images/framed-butterfly.jpg'
import yellowButterfly from '../../images/framed-yellow-butterfly.jpg'

import {
  HeroBg,
  Heading,
  Wrapper,
  SubHeading,
  Hero,
  SecondHero,
  SecondHeroBG,
  SecondHeroHeading,
  Articles,
  Article,
} from './Home.styled'

const Home = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const [thirdHeadingSeen, setThirdHeadingSeen] = useState(false)
  const thirdHeadingRef = useObserver<HTMLHeadingElement>(() => setThirdHeadingSeen(true))

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

      <Articles>
        <Article>
          <img src={bugOnHand} alt='huge beetle' />
          <p>{t('scarabeus.wePickExquisiteSpecimensArticle')}</p>
          <Button reversed onClick={() => history.push('/products')}>
            {t('scarabeus.checkProducts')}
            <FaChevronRight />
          </Button>
        </Article>

        <Article>
          <img src={yellowButterfly} alt='huge beetle' />
          <p>{t('scarabeus.twoSheetsOfUvBlockingGlassesArticle')}</p>
          <Button reversed onClick={() => history.push('/products')}>
            {t('scarabeus.checkProducts')}
            <FaChevronRight />
          </Button>
        </Article>

        <Article>
          <img src={bugsOnHand} alt='huge beetle' />
          <p>
            {t('scarabeus.typicalOrUnusualArtical')}{' '}
            <a href='mailto: scarabeus.team@gmail.com'>
              <strong>scarabeus.team@gmail.com</strong>
            </a>
          </p>
          <Button reversed onClick={() => history.push('/products')}>
            {t('scarabeus.checkProducts')}
            <FaChevronRight />
          </Button>
        </Article>
      </Articles>
    </Wrapper>
  )
}

export default Home
