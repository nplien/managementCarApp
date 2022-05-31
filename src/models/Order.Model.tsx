import {IStorePerson, ICreatedBy, ISupplierOfProduct, IProvince} from './ModelBase';
import {ProductModel, ProductOrderModel, ProductPart} from './Product.Model';
import {Store} from './Store.Model';
export interface OrderModel {
  total_before_discount?: string | number;
  total_discount?: number;
  id: number;
  code?: string;
  type?: string;
  note?: string;
  status?: string;
  status_name?: string;
  channel?: ICreatedBy;
  payment?: {
    name?: string;
    method?: number;
  };
  shipping?: Shipping;
  price_book?: ICreatedBy;
  discounts?: DiscountOfOrder[];
  products?: ProductOrderModel[];
  is_delivery?: boolean;
  is_favorite?: boolean;
  is_warning?: boolean;
  created_by?: ICreatedBy;
  created_at?: number;
  updated_at?: number;
  updated_by?: ICreatedBy;
  confirmed_by?: ICreatedBy;
  deliveries?: DeliveryModel[]; // cái này dùng cho detail
  payments?: PaymentModel[]; // cái này dùng cho detail
  confirmed_at?: number;
  completed_by?: ICreatedBy;
  completed_at?: number;
  cancelled_by?: ICreatedBy;
  cancelled_at?: number;
  store?: {
    id?: number;
    name?: string;
    phone?: string;
  };
  order?: {
    id?: number;
    code?: string;
  };
  return?: any;
  invoice?: {
    id?: number;
    code?: string;
  };
  source?: string;
  hashtag?: any;
  customer?: {
    id?: number;
    name?: string;
    phone?: string;
  };
  total_revenue?: number;
  total_coin?: number;
  total_point?: number;
  total_quantity?: number;
  total_return_quantity?: number;
  total_price_before_discount?: number;
  total_price_after_discount?: number;
  total_discount_value?: number;
  total_exchange_price?: number;
  total_original_price?: number;
  total_shipping_fee?: number;
  total_return_fee?: number;
  total_price?: number;
  total_paid?: number;
  total_unpaid?: number;
}
export interface DiscountOfOrder {
  id?: number;
  code?: string;
  name?: string;
  type?: number;
  group?: string;
  value?: number;
}
export interface Shipping {
  name?: string;
  method?: number;
  address?: IStorePerson;
}
export interface OrderIEModel {
  id: number;
  code?: string;
  note?: any;
  status?: string;
  status_name?: string;
  order?: any;
  receiver?: Store;
  supplier?: Store;
  discounts?: any[];
  products?: ProductOfImport[];
  updated_by?: ICreatedBy;
  created_by?: ICreatedBy;
  confirmed_by?: ICreatedBy;
  cancelled_by?: ICreatedBy;
  is_debit?: boolean;
  total_product?: number;
  total_quantity?: number;
  total_price_before_discount?: number;
  total_discount_value?: number;
  total_price?: number;
  total_paid?: number;
  total_unpaid?: number;
  created_at?: number;
  updated_at?: number;
  confirmed_at?: number;
  cancelled_at?: number;
}

export interface ProductOfImport extends ProductModel {
  total_price?: number;
  total_quantity?: number;
  total_discount_value?: number;
  total_price_before_discount?: number;
}
export interface DiscountOfProduct {
  id: number;
  name?: string;
  rate?: number;
  value?: number;
}

export interface DeliveryModel {
  id: number;
  code?: any;
  note?: any;
  weight?: string;
  length?: string;
  height?: string;
  width?: string;
  status?: string;
  status_name?: string;
  order_id?: number;
  order_code?: string;
  order_items?: ProductPart[];
  store_id?: number;
  store_name?: string;
  store_phone?: string;
  service_id?: string;
  service_name?: string;
  customer_id?: number;
  customer_name?: string;
  customer_phone?: string;
  provider_code?: string;
  provider_name?: string;
  provider_payload?: any;
  sender_name?: string;
  sender_phone?: string;
  sender_address?: string;
  sender_province?: IProvince;
  sender_district?: IProvince;
  sender_ward?: IProvince;
  receiver_name?: string;
  receiver_phone?: string;
  receiver_note?: string;
  receiver_address?: string;
  receiver_province?: IProvince;
  receiver_district?: IProvince;
  receiver_ward?: IProvince;
  receiver_date?: any;
  payment_method?: string;
  payment_code?: any;
  payment_by?: string;
  total_order_price?: string;
  total_shipping_fee?: string;
  total_shipping_cod?: string;
  total_shipping_price?: string;
  total_insurrance_price?: string;
  is_active?: boolean;
  is_warning?: boolean;
  is_favorite?: boolean;
  client_id?: string;
  device_id?: string;
  ip_address?: string;
  updated_at?: string;
  updated_by?: any;
  created_at?: number;
  created_by?: ICreatedBy;
  confirmed_at?: any;
  confirmed_by?: any;
  completed_at?: any;
  completed_by?: any;
}
export interface PaymentModel {
  id: number;
  code?: string;
  type?: number;
  note?: any;
  value?: number;
  card?: any;
  store?: IStorePerson;
  group?: ICreatedBy;
  order?: OrderPayment;
  voucher?: any;
  partner?: ISupplierOfProduct;
  provider?: any;
  method?: number;
  method_name?: string;
  status?: string;
  status_name?: string;
  transaction_code?: string;
  transaction_type?: string;
  created_by?: ICreatedBy;
  created_at?: number;
  updated_by?: any;
  updated_at?: number;
  cancelled_by?: any;
  cancelled_at?: any;
}
export interface OrderPayment {
  id?: number;
  code?: string;
  total_paid?: string;
  total_price?: string;
}

export interface RevenueModel {
  total_value_0: number;
  total_value_1: number;
  total_value_2: number;
  total_value_3: number;
}

export interface SumOrderModle {
  total_paid?: number;
  total_price?: number;
  total_unpaid?: number;
  total_quantity?: number;
  total_discount_value?: number;
  total_price_before_discount?: number;
}
