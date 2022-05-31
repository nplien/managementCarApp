export interface IGroupCustomer {
  id?: number;
  type?: string;
  name?: string;
  note?: string;
  discount_value?: number;
  discount_type?: number;
  conditions?: Array<{
    field?: string;
    value?: string;
    operation?: string;
  }>;
  is_auto_updated?: boolean;
  is_active?: boolean;
  created_by?: {
    id: string;
    name: string;
  };
  created_at?: number;
  updated_at?: number;
}

export interface IGroupCustomerRequest {
  type?: string;
  name?: string;
  note?: string;
  discount_value?: number;
  discount_type?: number;
  conditions: Array<{
    field?: string;
    operation?: string;
    value?: string;
  }>;

  is_auto_update?: boolean;
}
