export interface IBCBHModel {
  store_id?: number;
  store_name?: string;
  created_at_month?: number | string; // số tháng trong năm
  created_at_year?: number | string; // số năm
  created_at_day?: number | string; // chuỗi ngày - tháng - năm
  created_at_hours?: number | string; // số giờ trong 1 ngày
  total_quantity_1?: number | string;
  total_quantity_2?: number | string;
  total_value_1?: number | null;
  total_value_2?: number | null;
  total_value_3?: number | null;
  total_value_4?: number | null;
  total_value_5?: number | null;
  total_value_6?: number | null;
  total_value_15?: number | null;
  total_value_16?: number | null;
  total_value_17?: number | null;
  total_value_18?: number | null;
  total_value_19?: number | null;
  total_value_20?: number | null;
  total_value_21?: number | null;
  total_value_22?: number | null;
  total_value_23?: number | null;
  total_value_24?: number | null;
  total_value_25?: number | null;
  total_value_26?: number | null;
  total_value_27?: number | null;
  created_by?: {
    id: number;
    name: string;
  };
}

export interface ISumBCBHModel {
  total_quantity_1?: number;
  total_quantity_2?: number;
  total_value_1?: number;
  total_value_2?: number;
  total_value_3?: number;
  total_value_4?: number;
  total_value_5?: number;
  total_value_6?: number;
  total_value_7?: number;
  total_value_8?: number;
  total_value_9?: number;
  total_value_10?: number;
  total_value_11?: number;
  total_value_12?: number;
  total_value_13?: number;
  total_value_14?: number;
  total_value_15?: number;
  total_value_16?: number;
  total_value_17?: number;
  total_value_18?: number;
  total_value_19?: number;
  total_value_20?: number;
  total_value_21?: number;
  total_value_22?: number;
  total_value_23?: number;
  total_value_24?: number;
  total_value_25?: number;
  total_value_26?: number;
  total_value_27?: number;
  total_value_28?: number;
}

export interface IBCSPModel extends ISumBCSPModel {
  product_id?: number | string;
  product_name?: number | string;
  product_category_name?: number | string;
  product_original_price?: number;
  product_price?: number;
  product_sku?: number | string;
  store_id?: number | string;
  store_name?: number | string;
}

export interface ISumBCSPModel {
  total_quantity_1?: number;
  total_quantity_2?: number;
  total_quantity_3?: number;
  total_quantity_4?: number;
  total_quantity_5?: number;
  total_quantity_6?: number;
  total_quantity_7?: number;
  total_quantity_8?: number;
  total_quantity_10?: number;
  total_quantity_11?: number;
  total_quantity_12?: number;
  total_quantity_13?: number;
  total_quantity_14?: number;
  total_quantity_15?: number;
  total_quantity_16?: number;
  total_quantity_17?: number;
  total_quantity_18?: number;
  total_quantity_19?: number;
  total_quantity_20?: number;
  total_quantity_21?: number;
  total_quantity_22?: number;
  total_quantity_23?: number;
  total_quantity_24?: number;
  total_quantity_25?: number;
  total_quantity_26?: number;
  total_quantity_27?: number;
  total_quantity_28?: number;
  total_value_1?: number;
  total_value_2?: number;
  total_value_3?: number;
  total_value_4?: number;
  total_value_5?: number;
  total_value_6?: number;
  total_value_7?: number;
  total_value_8?: number;
  total_value_9?: number;
  total_value_10?: number;
  total_value_11?: number;
  total_value_12?: number;
  total_value_13?: number;
  total_value_14?: number;
  total_value_15?: number;
  total_value_16?: number;
  total_value_17?: number;
  total_value_18?: number;
  total_value_19?: number;
  total_value_20?: number;
  total_value_21?: number;
  total_value_22?: number;
  total_value_23?: number;
  total_value_24?: number;
  total_value_25?: number;
  total_value_26?: number;
  total_value_27?: number;
  total_value_28?: number;
}

export interface IBCDHModel {
  product_id?: number | string;
  product_sku?: string;
  product_name?: string;
  total_value_1?: string;
  total_value_2?: string;
  total_value_3?: string;
  total_quantity_1?: string;
  total_quantity_2?: string;
  total_quantity_3?: string;
}

export interface ISumBCDHModel {
  total_quantity_1?: number;
  total_quantity_2?: number;
  total_quantity_3?: number;
  total_value_1?: number;
  total_value_2?: number;
  total_value_3?: number;
}

export enum TON_KHO_TYPE {
  DUOI_DINH_MUC_TON = 1,
  VUOT_DINH_MUC_TON = 2,
  CON_HANG_TRONG_KHO = 3,
  HET_HANG_TRONG_KHO = 4
}
export interface IBCBHModelV2 {
  staff?: {
    id: number;
    name: string;
  };
  store_id?: number;
  store_name?: string;
  order_created_at: number | null;
  time_created_at_day: number | null;
  created_at_time: number;
  total_value_1: number;
  total_value_2: number;
  total_value_3: number;
  total_value_4: number;
  total_value_5: number;
  total_value_6: number;
  total_quantity_1: number | null;
  total_quantity_2: number | null;
  product_price: number | null;
  product_revenue: number | null;
  time_total_value_1: number | null;
  time_total_value_2: number | null;
  time_total_value_3: number | null;
  time_total_value_4: number | null;
  time_total_value_5: number | null;
  time_total_value_6: number | null;
  time_total_quantity_1: number | null;
  time_total_quantity_2: number | null;
  order_total_revenue: number | null;
  order_total_quantity: number | null;
  product_total_revenue: number | null;
  product_original_price: number | null;
  product_total_quantity: number | null;
  order_total_shipping_fee: number | null;
  order_total_discount_value: number | null;
  order_total_original_price: number | null;
  order_total_price_after_discount: number | null;
  order_total_price_before_discount: number | null;
}
export interface ISumBCDHModelV2 {
  total_paid?: number;
  total_price?: number;
  total_unpaid?: number;
  total_quantity?: number;
  total_discount_value?: number;
  total_price_before_discount?: number;
}
