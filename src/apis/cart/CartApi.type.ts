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

export type PostCartItemBodyType = {
  productId: number;
  cartId: number;
  count: number;
};

export type PostCartItemReturnType = {
  id: number;
  productId: number;
  cartId: number;
  count: number;
};

export type PostCartReturnType = {
  id: number;
  cartitem: string;
  userId: number;
};

export type PatchCartItemReqType = {
  id: number;
  count: number;
};

export type PatchCartItemReturnType = {
  count: number;
};
