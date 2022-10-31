export type GetOrderByIdReturnType = {
  id: string;
  price: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: string;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddr: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddr: string;
  shipAddrDetail: string;
  orderMessage: string;
  shippingStatus: string;
  created: string;
};

export type PostOrderBodyType = {
  userId?: number;
  price: number;
  method: string;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddr: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddr: string;
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
  userAddr: string;
  userAddrPost: string;
  shipName: string;
  shipPhone: string;
  shipAddrDetail: string;
  shipAddr: string;
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
    userAddr: string;
    userAddrPost: string;
    userAddrDetail: string;
    shipName: string;
    shipPhone: string;
    shipAddr: string;
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
  userAddr: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
  shippingStatus: string;
  created: string;
};

export type GetOrderStatusReturnType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostOrderStatusReturnType[];
};

export type PutOrderShippingStatusReqType = {
  orderId: string;
  body: {
    shippingStatus: string;
  };
};

export type PutOrderShippingStatusReturnType = {
  id: string;
  shippingStatus: string;
};

export type GetOrderStatusReqType = {
  userId: number;
  page: number;
};
