import {ICategoryModel} from 'models/Category.Model';

export interface IFilterHangHoaState {
  keyword?: string;

  arrType?: any[];
  type?: any;

  arrCate?: ICategoryModel[];
  cate?: ICategoryModel;

  tonKho?: any;
  banTrucTiep?: any;
  hienThi?: any;
}

export interface IFilterHangHoaAction {
  type: string;
  payload?: IFilterHangHoaState;
}
