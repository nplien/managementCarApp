import {ICategoryModel} from 'models/Category.Model';

export interface IFilterCategoryState {
  keyword?: string;

  arrType?: any[];
  type?: any;

  arrCate?: ICategoryModel[];
  cate?: ICategoryModel;

  tonKho?: any;
  banTrucTiep?: any;
  hienThi?: any;
}

export interface IFilterCategoryAction {
  type: string;
  payload?: IFilterCategoryState;
}
