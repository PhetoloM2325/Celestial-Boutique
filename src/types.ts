export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  color: string
  note: string
  sizes: string[]
  fit: string
  colors: string[]
  rating: number
  reviewCount: number
  badge: string
  composition: string
  care: string
  description: string
}

export type BodyType = 'Hourglass' | 'Pear' | 'Rectangle' | 'Athletic' | 'Apple' | 'Full figure'
