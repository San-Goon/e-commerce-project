import { CartItemType } from '@apis/cart/CartApi.type';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const SHIP_INFO_KEY = '@shipInfo';

export type ShipInfoType = {
  PIAgree: boolean;
  method: string;
  orderMessage?: string;
  productsList: (GetProductByIdReturnType & CartItemType)[];
  orderInfo: {
    userId: number;
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
  };
  shipAddress: string;
  shipExtraAddress: string;
  shipName: string;
  shipPhone: string;
  userAddress: string;
  userExtraAddress: string;
  userName: string;
  userPhone: string;
};

export const getShipInfo = () => {
  const shipInfo = getLocalStorage<ShipInfoType>(SHIP_INFO_KEY);
  return shipInfo;
};

export const setShipInfo = (shipInfo: ShipInfoType) => {
  setLocalStorage(SHIP_INFO_KEY, shipInfo);
};

export const deleteShipInfo = () => {
  removeLocalStorage(SHIP_INFO_KEY);
};
