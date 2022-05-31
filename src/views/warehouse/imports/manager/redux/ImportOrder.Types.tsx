import {IStorePerson} from 'models/ModelBase';
import {ICreatedBy} from 'models/ModelBase';
import {OrderIEModel} from 'models/Order.Model';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface IImportOrderState extends IAppState {
  arrImportOrder?: OrderIEModel[];
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  error?: string;

  currentSortIP?: ISortFilterType;
  currentFilterDate?: IDateFilterType;
  convertCurrentFilterDate?: IDateRange;
  arrStoreDaChonImport?: IStorePerson[];

  created_by?: ICreatedBy;
  arrCurrentStatus?: any;

  code?: string;
  note?: string;
  product_sku?: string;
  product_name?: string;
}
