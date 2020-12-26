import { PageMinHeightWrapper } from '../PageMinHeightWrapper'
import './Loader.css'

const Loader = () => (
  <div className='spinner'>
    <div className='bounce1'></div>
    <div className='bounce2'></div>
    <div className='bounce3'></div>
  </div>
)

export const FullPageLoader = () => (
  <PageMinHeightWrapper center>
    <Loader />
  </PageMinHeightWrapper>
)

export default Loader
