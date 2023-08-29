export interface products{
  id: number,
  title: string,
  price: number
  description: string,
  category: string,
  image: string,
  rating: rating[]
}
export  interface  rating{
  rate: number,
  count: number
}
