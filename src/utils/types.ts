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
  tags: Array<ITags>;
  avgRate: number;
  reviewCount: number;
}

export interface IProductsList {
  cursor: string;
  results: Array<IProductMap>;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  detail: string;
  photo: string;
  reviewList: Array<{
    id: number;
    userId: number;
    rate: number;
    content: string;
    created: string;
  }>;
  avgRate: number;
  reviewCount: number;
}
