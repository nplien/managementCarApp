import {ICreatedBy} from './ModelBase';
import {ProductPart} from './Product.Model';
import {Store} from './Store.Model';
export interface IInventoryModel {
  id: number;
  code?: string;
  note?: string;
  store?: Store;
  products?: ProductOfInventory[];
  status?: string;
  status_name?: string;
  is_warning?: boolean;
  is_favorite?: boolean;
  created_by?: ICreatedBy;
  updated_by?: ICreatedBy;
  confirmed_by?: ICreatedBy;
  cancelled_by?: ICreatedBy;
  total_product?: number;
  total_quantity?: number;
  total_actual_price?: number;
  total_adjustment_price?: number;
  total_quantity_up_price?: number;
  total_quantity_down_price?: number;
  total_actual?: number;
  total_adjustment?: number;
  total_quantity_up?: number;
  total_quantity_down?: number;
  created_at?: number;
  updated_at?: number;
  confirmed_at?: number;
  cancelled_at?: any;
}

export interface ProductOfInventory {
  id: number;
  sku?: string;
  name?: string;
  type?: string;
  unit?: string;
  brand?: string;
  price?: number;
  units?: Unit[];
  master_id?: number;
  option_id?: number;
  categories?: ICreatedBy[];
  normal_price?: number;
  total_actual?: number;
  product_parts?: ProductPart[];
  original_price?: number;
  total_quantity?: number;
  total_adjustment?: number;
  total_adjustment_price?: number;
}

export interface Unit {
  name?: string;
  quantity?: number;
  original_price?: number;
}
