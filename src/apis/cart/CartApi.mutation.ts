import cartApi from '@apis/cart/CartApi';
import { MutationHookParams } from '@apis/type';

import { useMutation } from '@tanstack/react-query';

export const usePostCartMutation = (
  params?: MutationHookParams<typeof cartApi.postCart>,
) => {
  return useMutation(cartApi.postCart, {
    ...params?.options,
  });
};

export const usePostCartItemMutation = (
  params?: MutationHookParams<typeof cartApi.postCartItem>,
) => {
  return useMutation(cartApi.postCartItem, {
    ...params?.options,
  });
};

export const usePatchCartItemMutation = (
  params?: MutationHookParams<typeof cartApi.patchCartItem>,
) => {
  return useMutation(cartApi.patchCartItem, {
    ...params?.options,
  });
};

export const useDeleteCartItemMutation = (
  params?: MutationHookParams<typeof cartApi.deleteCartItem>,
) => {
  return useMutation(cartApi.deleteCartItem, {
    ...params?.options,
  });
};
