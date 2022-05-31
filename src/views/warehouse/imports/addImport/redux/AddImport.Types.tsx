import {IProductSale} from 'models/Product.Model';
import {ISuppliers} from 'models/Suppliers.Model';
import {IAppState} from 'views/app';

export interface IAddImportOrderState extends IAppState {
  arrProductImport?: IProductSale[];
  isLoadMore?: boolean;
  count?: number;
  isError?: boolean;
  isStop?: boolean;
  suppliers?: ISuppliers;
  priceItem?: any;
  totalItem?: any;
  oldTotalItem?: any;
  productImport?: IProductSale;
  isManySelected?: boolean;
  note?: string;
}
