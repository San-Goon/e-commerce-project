import orderApi from '@apis/order/OrderApi';
import { MutationHookParams } from '@apis/type';

import { useMutation } from '@tanstack/react-query';

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

export const usePatchOrderByIdMutation = (
  params?: MutationHookParams<typeof orderApi.patchOrderById>,
) => {
  return useMutation(orderApi.patchOrderById, {
    ...params?.options,
  });
};

export const usePatchOrderShippingStatus = (
  params?: MutationHookParams<typeof orderApi.patchOrderShippingStatus>,
) => {
  return useMutation(orderApi.patchOrderShippingStatus, {
    ...params?.options,
  });
};
