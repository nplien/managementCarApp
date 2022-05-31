import {ICreatedBy} from './ModelBase';
import {ProductModel} from './Product.Model';
import {Store} from './Store.Model';

export interface IExportModel {
  id: number;
  code?: string;
  type?: string;
  note?: any;
  sender?: Store;
  receiver?: Store;
  discounts?: any[];
  products?: ProductOfExport[];
  status?: string;
  status_name?: string;
  created_by?: ICreatedBy;
  updated_by?: ICreatedBy;
  confirmed_by?: ICreatedBy;
  cancelled_by?: ICreatedBy;
  completed_by?: ICreatedBy;
  is_debit?: boolean;
  total_product?: number;
  total_export_quantity?: number;
  total_import_quantity?: number;
  total_price_before_discount?: number;
  total_discount_value?: number;
  total_export_price?: number;
  total_import_price?: number;
  total_paid?: number;
  total_unpaid?: number;
  created_at?: number;
  updated_at?: number;
  confirmed_at?: number;
  cancelled_at?: number;
  completed_at?: number;
}
export interface ProductOfExport extends ProductModel {
  total_export_price?: number;
  total_import_price?: number;
  total_discount_value?: number;
  total_export_quantity?: number;
  total_import_quantity?: number;
  total_price_before_discount?: number;
}
