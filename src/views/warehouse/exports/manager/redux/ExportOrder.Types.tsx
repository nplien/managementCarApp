import {IMethodSales} from 'configs/FilterConfig';
import {IExportModel} from 'models/ExportOrder.Model';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface IExportOrderState extends IAppState {
  arrExportOrder?: IExportModel[];
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  error?: string;

  currentSort?: ISortFilterType;
  currentDateExport?: IDateFilterType;
  convertCurrentDateExport?: IDateRange;

  code?: string;
  product_sku?: string;
  product_name?: string;

  arrCurrentStatus?: any;
  is_match?: IMethodSales;

  isChuyenDi?: boolean;
  isNhapVe?: boolean;

  arrStoreChuyenDi?: any;
  arrStoreNhapVe?: any;

  currentTimeNgayNhan?: IDateFilterType;
  convertCurrentTimeNgayNhan?: IDateRange;
}
