import {IProvince, IStorePerson} from './ModelBase';

export interface CustomerModel {
  id?: number;
  type?: string;
  name?: string;
  note?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  birthday?: number;
  gender?: string;
  barcode?: string;
  tax_code?: number;
  company?: string;
  status?: string;
  status_name?: string;
  group?: {
    id?: number;
    name?: string;
    discount_type?: number;
    discount_value?: number;
  };
  country?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  address?: string;
  total_debt?: number;
  total_order_price?: number;
  total_invoice_price?: number;
  total_return_price?: number;
  total_point?: number;
  total_purchase?: number;
  last_purchase?: number;
  is_active?: boolean;
  is_verify_phone?: boolean;
  is_verify_email?: boolean;
  is_verify_password?: boolean;
  created_at?: number;
  updated_at?: number;
  created_by?: {
    id?: string | Number;
    name?: string;
  };
  stores?: IStorePerson[];
  is_verified_phone?: boolean;
  is_verified_email?: boolean;
  is_verified_password?: boolean;
  role?: string;
  permissions?: any;
}
export interface CustomerModelRequest {
  status?: string;
  created_by?: string;
  genders?: string;
  keyword?: string;
  min_total_debt?: number;
  max_total_debt?: number;
  min_birthday?: string;
  max_birthday?: string;
  min_created_at?: string;
  max_created_at?: string;
  min_last_purchase?: string;
  max_last_purchase?: string;
  min_total_price?: string;
  max_total_price?: string;
  skip?: number;
  limit?: number;
  types?: string;
  groups?: string;
  order_by?: string;
  sort_by?: string;
  provinces?: string;
  staffs?: string;
  min_total_point?: number;
  max_total_point?: number;
}
export interface IAddressModel {
  id?: number;
  name?: string;
  type?: string;
  phone?: string;
  address?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  is_active?: boolean;
  is_default?: boolean;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
