import {ChannelModel} from 'models/ManagerSetting.Model';
import {IProductSale} from 'models/Product.Model';

export interface ICreateSaleState {
  arrProductSale?: IProductSale[];
  productSale?: IProductSale;

  isManySelected?: boolean;

  currentKenhBan?: ChannelModel;

  ghiChuHoaDon?: string;
}

export interface ICreateSaleAction {
  type: string;
  payload: ICreateSaleState;
}
