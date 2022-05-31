export interface ISuppliers {
  id?: String;
  type?: String;
  name?: String;
  note?: String;
  phone?: String;
  email?: String;
  avatar?: String;
  cover?: String;
  birthday?: Number | null;
  gender?: String;
  tax_code?: Number | null;
  company?: String;
  status?: String;
  group?: {
    id?: string | number | null;
    name?: string | null;
    discount_type?: string | null;
    discount_value?: string | null;
  } | null;
  country?: String;
  province_code?: string | null;
  district_code?: string | null;
  ward_code?: string | null;
  address?: String | null;
  total_debt?: Number;
  total_price?: Number;
  total_point?: Number;
  total_purchase?: Number;
  last_purchase?: null;
  is_active?: boolean;
  is_verify_phone?: boolean;
  is_verify_email?: boolean;
  is_verify_password?: boolean;
  created_at?: Number;
  updated_at?: Number;
  created_by?: {
    id?: String;
    name?: String;
  };
}
export interface ISuppliersHistory {
  id: String;
  note: String | null;
  store: {
    id: String;
    name: String;
    phone: String;
    address: String | null;
  };
  source: {
    id: String;
    name: String;
    phone: String;
    address: String | null;
  };
  reason: String | null;
  status: string;
  total_paid: number;
  total_unpaid: number;
  total_product: number;
  total_quantity: number;
  total_discount: number | null;
  total_price: number;
  is_active: Boolean;
  is_favorite: Boolean;
  created_by: {
    id: String;
    name: String;
  };
  confirmed_by: {
    id: String | null;
    name: String | null;
  };
  cancelled_by: {
    id: String;
    name: String;
  };
  confirmed_at: number | null;
  cancelled_at: number;
  created_at: number;
  updated_at: number;
}
