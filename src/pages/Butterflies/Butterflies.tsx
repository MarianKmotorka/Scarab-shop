import { Container } from '../../components/Container'
import { PageTitle } from '../../components/PageTitle'
import ProductCard from '../../components/ProductCard/ProductCard'
import { IProduct } from '../../domain'
import { Grid, Wrapper } from './Butterflies.styled'

const fakeProducts: IProduct[] = [
  {
    category: 'butterfly',
    name: 'Babocka zvaruhodna zkundy dikna',
    description: 'awdawd',
    id: 'awdawd',
    minPrice: 50.25,
    maxPrice: 60,
    numberInStock: 6,
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/makm-firegram.appspot.com/o/HKi3dLuNZgZGo4bqBgFFGvOviIf21605699785866IMG_20201002_153630_1.jpg?alt=media&token=43c40221-22c7-492f-9592-680bcf8166ac',
    ],
  },
  {
    category: 'butterfly',
    name: 'Babocka zvaruhodna',
    description: 'awdawd',
    id: 'awdawaaawd',
    minPrice: 50.25,
    numberInStock: 6,
    maxPrice: 60,
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/makm-firegram.appspot.com/o/HKi3dLuNZgZGo4bqBgFFGvOviIf21605699785866IMG_20201002_153630_1.jpg?alt=media&token=43c40221-22c7-492f-9592-680bcf8166ac',
    ],
  },
  {
    category: 'butterfly',
    name: 'Babocka zvaruhodna',
    description: 'awdawd',
    id: 'awdafffwd',
    minPrice: 50.25,
    numberInStock: 6,
    maxPrice: 60,
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/makm-firegram.appspot.com/o/HKi3dLuNZgZGo4bqBgFFGvOviIf21605699785866IMG_20201002_153630_1.jpg?alt=media&token=43c40221-22c7-492f-9592-680bcf8166ac',
    ],
  },
  {
    category: 'butterfly',
    name: 'Babocka zvaruhodna',
    description: 'awdawd',
    id: 'awdeafsrawd',
    numberInStock: 0,
    minPrice: 50.25,
    maxPrice: 60,
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/makm-firegram.appspot.com/o/HKi3dLuNZgZGo4bqBgFFGvOviIf21605699785866IMG_20201002_153630_1.jpg?alt=media&token=43c40221-22c7-492f-9592-680bcf8166ac',
    ],
  },
  {
    category: 'butterfly',
    name: 'Babocka zvaruhodna mengeloidna',
    description: 'awdawd',
    id: 'awdaawdwd',
    numberInStock: 0,
    minPrice: 50.25,
    maxPrice: 60,
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/makm-firegram.appspot.com/o/HKi3dLuNZgZGo4bqBgFFGvOviIf21605699785866IMG_20201002_153630_1.jpg?alt=media&token=43c40221-22c7-492f-9592-680bcf8166ac',
    ],
  },
]

const Butterflies = () => {
  return (
    <Wrapper>
      <Container>
        <PageTitle>Motýle</PageTitle>

        <Grid>
          {fakeProducts.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  )
}

export default Butterflies
