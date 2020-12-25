import firebase from 'firebase/app'

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

export interface IOrder extends IEntity {
  placed: firebase.firestore.Timestamp
  /**
   * { productId: amount}
   */
  products: Record<string, number>
  cutomerName: string
  customerEmail: string
  customerMessage: string
  userId: string | null
}

export interface IUser extends IEntity {
  name: string
  email: string
  isAdmin: boolean // TODO: set firebase rule -> reject create user with isAdmin:true
  registered: firebase.firestore.Timestamp
  lastLogin: firebase.firestore.Timestamp
}
