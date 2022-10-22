export interface PostReviewBodyType {
  userId: number;
  productId: number;
  orderItemId: number;
  rate: number;
  content: string;
  reviewimagePath: string[];
}

export interface PostReviewReturnType {
  id: number;
  userId: number;
  nickname: string;
  productId: number;
  orderItemId: number;
  rate: number;
  content: string;
  reviewimageSet: { reviewId: number; url: string }[];
  created: string;
}
