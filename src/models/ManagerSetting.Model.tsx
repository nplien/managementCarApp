import {ICreatedBy} from './ModelBase';
export interface StaffDetailModel {
  id?: string | number;
  type?: string;
  name?: string;
  note?: string;
  phone?: string | null;
  email?: string | null;
  avatar?: string | null;
  cover?: string | null;
  birthday?: number | string | null;
  gender?: string;
  role?: ICreatedBy;
  country?: string;
  province_code?: number | string | null;
  district_code?: number | string | null;
  ward_code?: number | string | null;
  address?: string | null;
  total_debt?: number;
  total_price?: number;
  total_point?: number;
  total_purchase?: number;
  last_purchase?: string | null;
  status?: string;
  created_at?: number;
  updated_at?: number;
  created_by?: ICreatedBy;
}
export interface StoreModel {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  email?: string;
  description?: string | null;
  status?: string | null;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  created_by: ICreatedBy;
  logo: string | null;
  created_at?: number;
  updated_at?: number;
}
export interface ChannelModel {
  id: number;
  logo?: string;
  name: string;
  note?: string;
  checked?: boolean;
  is_active?: boolean;
  created_by?: ICreatedBy;
  created_at?: number;
  updated_at?: number;
}

export interface PriceBookModel {
  id: number;
  name: string;
  note: string | null;
  apply_started_at: number;
  apply_expired_at: number;
  apply_follow_field: string | null;
  apply_follow_cal_type: number;
  apply_follow_value: number;
  apply_follow_value_type: number;
  apply_for_customer: [];
  apply_for_member: [];
  apply_for_store: [];
  is_active: boolean;
  is_default: boolean;
  is_auto_update: boolean;
  created_by: ICreatedBy;
  created_at: number;
  updated_at: number;
}
export interface ComponentPropsModel {
  type: string | null;
  kind: string | null;
}

export interface ResponseAPIModel<T> {
  data: T;
  code: number;
  message?: string;
  count?: number;
}
