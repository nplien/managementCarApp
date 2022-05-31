export interface ITheKhoModel {
  id: number;
  order_id: string;
  order_type: string;
  store_id: string;
  store_name: string;
  product_id: string;
  product_name: string;
  product_option_id: string;
  total_original_price: number;
  total_price: number;
  total_quantity: number;
  total_final_quantity: number;
  is_active: boolean;
  created_at: number;
  updated_at: number;
}
