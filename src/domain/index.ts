export type ProductCategory = 'bug' | 'butterfly'

export interface IEntity {
  id: string
}

export interface IProduct extends IEntity {
  name: string
  imageUrls: string[]
  category: ProductCategory
  minPrice: number
  maxPrice: number | null
  description: string | null
  numberInStock: number
}
