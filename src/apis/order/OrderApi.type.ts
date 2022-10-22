export type PostOrderBodyType = {
  userId?: number;
  price: number;
  method: string;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage?: string;
};

export type PostOrderReturnType = {
  id: string;
  userId: number;
  price: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: string;
  userName: string;
  userPhone: string;
  userAddrDetail: string;
  userAddrPost: string;
  shipName: string;
  shipPhone: string;
  shipAddrDetail: string;
  shipAddrPost: string;
  orderMessage: string;
  created: string;
};

export type PostOrderStatusBodyType = {
  orderId: string;
  productId: number;
  count: number;
};

export type PostOrderStatusReturnType = {
  id: number;
  orderId: string;
  productId: number;
  count: number;
  shippingStatus: string;
  created: string;
};

export type PatchOrderByIdReqType = {
  id: string;
  body: Partial<{
    price: number;
    paymentKey: string;
    method: string;
    userName: string;
    userPhone: string;
    userAddrPost: string;
    userAddrDetail: string;
    shipName: string;
    shipPhone: string;
    shipAddrPost: string;
    shipAddrDetail: string;
    orderMessage: string;
  }>;
};

export type OrderByIdReturnType = {
  id: string;
  price: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: string;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
  created: string;
};

export type GetOrderStatusReturnType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostOrderStatusReturnType[];
};

export type PatchOrderShippingStatusReqType = {
  userId: number;
  body: {
    shippingStatus: string;
  };
};

export type GetOrderStatusReqType = {
  userId: number;
  page: number;
};
