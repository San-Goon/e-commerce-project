import { IProductMap } from '@utils/types';

export type GetProductListReturnType = {
  cursor: string;
  results: IProductMap[];
};

export type ReviewListType = {
  content: string;
  created: string;
  id: number;
  nickname: string;
  rate: number;
  reviewimageSet: { reviewId: number; url: string }[];
  userId: number;
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
  reviewList: ReviewListType[];
};
