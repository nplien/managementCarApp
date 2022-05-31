import {ProductModel} from 'models/Product.Model';
import {IAppState, ISortFilterType} from 'views/app';

export interface IProductHangHoaState extends IAppState {
  arrProduct?: ProductModel[];
  count?: number;
  tong_ton_kho?: number;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;

  sortFilter?: ISortFilterType;
  giaHienThi?: {id: string; name: string};
}
