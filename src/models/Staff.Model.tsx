import {ICreatedBy, IProvince} from './ModelBase';
import {Store} from './Store.Model';

export interface IStaffModel {
  id?: string | number;
  type?: string;
  name?: string;
  note?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  birthday?: number;
  gender?: string;
  role?: {
    id?: string;
    name?: string;
  };
  country?: string;
  province_code?: number | null;
  district_code?: number | null;
  ward_code?: number | null;
  address?: string;
  total_debt?: number;
  total_price?: number;
  total_point?: number;
  total_purchase?: number;
  last_purchase?: number;
  status?: string;
  created_at?: number;
  updated_at?: number;
  created_by?: {
    id?: string;
    name?: string;
  };
  province?: any;
  district?: any;
  ward?: any;
}

export interface IDetailManagerModel {
  id?: number;
  name?: string;
  note?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  gender?: string;
  birthday?: string;
  barcode?: string;
  tax_code?: string;
  company?: string;
  country?: string;
  address?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  is_active?: boolean;
  is_verified_phone?: boolean;
  is_verified_email?: boolean;
  is_verified_password?: boolean;
  type?: string;
  role?: Role;
  group?: any;
  stores?: Store[];
  status?: string;
  status_name?: string;
  permissions?: string[];
  created_by?: ICreatedBy;
  total_debt?: number;
  total_order_price?: number;
  total_invoice_price?: number;
  total_return_price?: number;
  total_purchase?: number;
  total_point?: number;
  created_at?: number;
  updated_at?: number;
  last_purchase?: any;
}

export interface Role {
  id?: number;
  name?: string;
  note?: any;
  param?: ICreatedBy;
  status?: string;
  is_active?: boolean;
  created_at?: number;
  created_by?: ICreatedBy;
  updated_at?: number;
  permissions?: ICreatedBy[];
}
