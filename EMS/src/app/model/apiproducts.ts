export interface products{
  id: number,
  title: string,
  price: number
  description: string,
  category: string,
  image: string,
  quantity:number
  rating: rating[],
  user:string
}
export  interface  rating{
  rate: number,
  count: number
}
export interface StripeProduct {
  Email: string,
  product: string,
  quantity: number,
  price: number,
  description: string,
  success_url: string,
  cancel_url: string
}
