import {ICreatedBy} from './ModelBase';

export interface VoucherModel {
  id?: number;
  code?: string;
  name?: string;
  content?: string;
  status?: string;
  status_name?: string;
  thumbnail_url?: any;
  applied_users?: any[];
  applied_stores?: number[];
  applied_members?: any[];
  applied_categories?: any[];
  applied_user_types?: string[];
  applied_user_groups?: any[];
  applied_for_months?: number[];
  applied_for_days?: number[];
  applied_for_hours?: number[];
  applied_max_quantity?: number;
  applied_order_value?: number;
  applied_start_time?: number | null;
  applied_stop_time?: number | null;
  discount_type?: number;
  discount_value?: number;
  max_discount_value?: number;
  is_visible?: boolean;
  created_by?: ICreatedBy;
  created_at?: number;
  updated_at?: number;
}
