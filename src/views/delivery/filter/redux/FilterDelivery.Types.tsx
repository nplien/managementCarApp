export interface IFilterDeliveryState {
  arrCurrentStatus?: any;

  code?: string;
  customer?: string;
  order_code?: string;
  note?: string;

  isChuyenDi?: boolean;
  isNhapVe?: boolean;
  arrStoreChuyenDi?: any;
  arrStoreNhapVe?: any;
  thuTienHoCOD?: any;
  doiTacGiaohang?: any;

  currentFilterTimeHT?: any;
  convertCurrentFilterTimeHT?: any;

  provincesCity?: any;
}

export interface IFilterDeliveryAction {
  type: string;
  payload: IFilterDeliveryState;
}
