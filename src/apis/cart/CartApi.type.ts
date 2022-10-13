export type CartItemType = {
  id: number;
  cartId: number;
  productId: number;
  count: number;
};

export type GetCartReturnType = {
  id: number;
  cartitem: CartItemType[];
  userId: number;
};
