export interface ITags {
  id: number;
  name: string;
}

export interface IProductMap {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  thumbnail: string;
  tag: Array<ITags>;
  avgRate: number;
  reviewCount: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  count: number;
}
