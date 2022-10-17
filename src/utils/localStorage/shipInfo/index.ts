import { CartItemType } from '@apis/cart/CartApi.type';
import { GetProductByIdReturnType } from '@apis/product/ProductApi.type';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const SHIP_INFO_KEY = '@shipInfo';

export type ShipInfoType = {
  count: number;
  cartIds: number[];
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
