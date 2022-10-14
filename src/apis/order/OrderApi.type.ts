export type PostOrderBodyType = {
  userId: number;
  price: number;
  paymentKey: string;
  method: string;
  userName: string;
  userPhone: string;
  userAddr: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
  orderMessage: string;
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
