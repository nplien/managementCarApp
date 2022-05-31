export interface IBangGiaModel {
  id: number;
  name: string;
  type?: string;
  status?: string;
  status_name?: string;
  applied_groups?: string[];
  applied_stores?: string[];
  applied_members?: string[];
  applied_condition?: {
    applied_type: number;
    applied_field: string;
    applied_value: number;
    applied_operation: number;
  };
  applied_start_time?: number | string;
  applied_stop_time?: number | string;
  is_auto_create?: boolean;
  is_auto_update?: boolean;
  created_at?: number;
  created_by?: {
    id: string;
    name: string;
  };
  updated_at?: number;
  updated_by?: {
    id: string;
    name: string;
  };
}
