export type PostOrderBodyType = {
  userId: number;
  price: number;
  method: string;
  userName: string;
  userPhone: string;
  userAddr: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
  orderMessage?: string;
};

export type PostOrderReturnType = {
  id: number;
  userId: number;
  price: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: string;
  userName: string;
  userPhone: string;
  userAddr: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
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
  orderId: number;
  productId: number;
  count: number;
  shippingStatus: string;
  created: string;
};
