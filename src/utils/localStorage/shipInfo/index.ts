import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const SHIP_INFO_KEY = '@shipInfo';

export type ShipInfoType = {
  productInfos: { productId: number; count: number }[];
  cartIds: string[];
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
