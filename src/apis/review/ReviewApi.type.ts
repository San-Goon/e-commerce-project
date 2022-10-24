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

export interface GetReviewReqType {
  userId: number;
  page: number;
}

export interface GetReviewReturnType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostReviewReturnType[];
}

export type GetReviewByIdReturnType = Omit<PostReviewReturnType, 'nickname'>;

export interface PutReviewReqType {
  id: number;
  body: {
    rate: number;
    content: string;
    reviewimagePath: string[];
  };
}

export type PutReviewReturnType = Omit<PostReviewReturnType, 'nickname'>;
