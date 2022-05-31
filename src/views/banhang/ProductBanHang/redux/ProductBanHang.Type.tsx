import {IBangGiaModel} from 'models/BangGia.Model';
import {CustomerModel} from 'models/Customer.Model';
import {ProductOptionsModel} from 'models/Product.Model';
import {IAppState, ISortFilterType} from 'views/app';

export interface IProductBanHangState extends IAppState {
  arrProduct?: ProductOptionsModel[];
  count?: number;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;

  giaHienThi?: {id: string; name: string};
  currentBangGia?: IBangGiaModel;
  currentKhachHang?: CustomerModel;
  isSelectMany?: boolean;
  sortFilter?: ISortFilterType;
}
