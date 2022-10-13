import { IProductMap } from '@utils/types';

export type GetProductListReturnType = {
  cursor: string;
  results: IProductMap[];
};

export type GetProductByIdReturnType = {
  avgRate: number | null;
  capacity: number;
  description: string;
  detail: string;
  id: number;
  name: string;
  photo: string;
  price: number;
  reviewCount: number;
  reviewList: any;
};
