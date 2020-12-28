import firebase from 'firebase/app'

export type ProductCategory = 'beetle' | 'butterfly'

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
  descriptionSK: string | null // Slovak language description
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
  resolved: boolean
  isNew: boolean
}

/**
 * Stored under /users/id/ordersHistory
 */
export interface IUserOrder extends IEntity {
  placed: firebase.firestore.Timestamp
  /**
   * { productId: amount}
   */
  products: Record<string, number>
  cutomerName: string
  customerEmail: string
  customerMessage: string
}

export interface IUser extends IEntity {
  name: string
  email: string
  isAdmin: boolean
  registered: firebase.firestore.Timestamp
  lastLogin: firebase.firestore.Timestamp
}

export interface IProductStatistics extends IEntity {
  /**
   * ID of a product
   */
  id: string
  viewedByIps: string[]
}
