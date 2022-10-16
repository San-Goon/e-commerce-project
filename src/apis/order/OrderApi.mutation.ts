import orderApi from '@apis/order/OrderApi';
import { MutationHookParams } from '@apis/type';

import { useMutation } from '@tanstack/react-query';

export const ORDER_API_MUTATION_KEY = {
  POST: (param?: any) => ['order', param],
};

export const usePostOrderMutation = (
  params?: MutationHookParams<typeof orderApi.postOrder>,
) => {
  return useMutation(orderApi.postOrder, {
    ...params?.options,
  });
};

export const usePostOrderStatusMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderStatus>,
) => {
  return useMutation(orderApi.postOrderStatus, {
    ...params?.options,
  });
};
