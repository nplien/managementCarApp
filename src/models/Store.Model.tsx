import {ICreatedBy, IProvince, ISupplierOfProduct} from './ModelBase';

export interface IStoreModel {
  id: number;
  name?: string;
  logo?: string;
  phone?: string;
  email?: any;
  status?: 'active' | 'inactive';
  condinate?: number[];
  description?: any;
  is_visible?: boolean;
  address?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  created_by?: ICreatedBy;
  created_at?: number;
  updated_at?: number;
}
export interface Store extends ISupplierOfProduct {
  address?: string;
}
