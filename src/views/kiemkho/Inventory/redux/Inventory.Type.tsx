import {IInventoryModel} from 'models/Inventory.Model';
import {IAppState, IDateFilterType, IDateRange, ISortFilterType} from 'views/app';

export interface IIventoryState extends IAppState {
  arrInventory?: IInventoryModel[];
  count?: number;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
  sortFilter?: ISortFilterType;
  thoiGianLocKK?: IDateFilterType;
  khoangThoiGianKK?: IDateRange;

  keyword?: string;
  arrStatus?: any[];
  status?: any;
}
