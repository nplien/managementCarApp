import {ICategoryModel} from 'models/Category.Model';

export interface IFilterBanHangState {
  keyword?: string;

  arrType?: any[];
  type?: any;

  arrCate?: ICategoryModel[];
  cate?: ICategoryModel;

  tonKho?: any;
  banTrucTiep?: any;
  hienThi?: any;
}

export interface IFilterBanHangAction {
  type: string;
  payload?: IFilterBanHangState;
}
