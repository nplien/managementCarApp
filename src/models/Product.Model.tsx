import {KieuKhuyenMai} from 'configs/ProductConfig';
import {IBangGiaModel} from './BangGia.Model';
import {ICategoryOfProduct, ICreatedBy} from './ModelBase';

export interface ProductModel {
  id: number;
  sku: string;
  slug?: string;
  type?: number;
  name: string;
  brand?: string;
  price?: number;
  options?: {
    name: string;
    quantity: number;
  };
  option_id?: number;
  weight?: string;
  barcode?: string;
  hashtag?: string[];
  discount?: {
    id: number;
    name: string;
    rate: number;
    value: number;
  };
  position?: string;
  video_url?: string;
  short_name?: null;
  normal_price?: number;
  thumbnail_url?: string;
  variations?: {
    name: string;
    values: string[];
  }[];
  attributes?: string[];
  categories: ICategoryOfProduct[];
  products?: ProductOptionsModel[]; // san pham con
  stocks?: StockProduct[];
  parts?: ProductModel[]; //  san pham cha, setup thanh phan de tru kho
  view_count?: number;
  order_count?: number;
  return_count?: number;
  rating_count?: number;
  rating_average?: number;
  comment_count?: number;
  favourite_count?: number;
  is_visible?: boolean;
  is_top_hot?: boolean;
  purchased_at?: number;
  created_at?: number;
  created_by?: {
    id: number;
    name: string;
  };
  updated_at?: number;
  updated_by?: {
    id: number;
    name: string;
  };
  stock_min?: number;
  stock_max?: number;
  stock_address?: string;
  original_price?: number;
  unit?: string;
  units?: string[];
  status_name?: string;
  status?: string;
  expired_at?: number;
}

export interface ProductOptionsModel {
  id: number;
  sku: string;
  unit?: string;
  type?: number;
  name: string;
  brand?: string;
  units?: {name: string; quantity: number; original_price: number}[];
  images: string[];
  barcode?: string;
  stocks?: StockProduct[];
  options?: string[];
  indexes?: number[];
  providers?: {
    shop_id: number;
    shop_name: string;
    shopee_id: number;
    shopee_option_id: number;
  }[];
  parent_id?: number;
  is_default?: boolean;
  option_name?: string;
  price_books?: {
    id: number;
    name: string;
    price: number;
    normal_price: number;
  }[];
  original_price?: number;
  normal_price?: number;
  discount?: {
    id: number;
    name: string;
    rate: number;
    value: number;
    type: KieuKhuyenMai;
  };
  price?: number;
  purchased_at?: number;
  created_at?: number;
  updated_at?: number;
  expired_at?: number;

  note?: string;
}

export interface IProductSale {
  product: ProductOptionsModel;
  price_books: IBangGiaModel;
  totalQty: number;
}

export interface StockProduct {
  id?: number | string;
  name?: string;
  product_id?: number | string;
  product_option_id?: number | string;
  total_quantity?: number | string;
  total_product?: number | string;
  total_stock_quantity?: number | string;
  total_order_quantity?: number | string;
}

export interface ProductOrderModel extends ProductModel {
  total_quantity?: number;
  total_price?: number;
  total_discount_value?: number;
  total_original_price?: number;
  total_return_quantity?: number;
  total_price_before_discount?: number;
}

export interface ProductPart {
  id: number;
  name?: string;
  type?: string;
  master_id?: number;
  option_id?: number;
  product_id?: number;
  total_actual?: string;
  product_price?: number;
  total_quantity?: string;
  total_adjustment?: string;
  product_option_id?: number;
  product_normal_price?: number;
  product_original_price?: number;
  total_adjustment_price?: string;
}

export interface ProductIEModel {
  id: string;
  name: string;
  unit: string;
  option_id: string;
  sku: string;
  price_max: number;
  price_min: number;
  total_price: number;
  total_quantity: number;
  total_final_quantity: number;
  total_original_quantity: number;
  total_actual: number;
  categories: CategoryOfProductModel[];
}

export interface ProductDelivery {
  id: number;
  option_id: number;
  sku: number;
  name: string;
  total_price: number;
  total_quantity: number;
}

interface CategoryOfProductModel extends ICategoryOfProduct {
  logo?: string;
  path: [];
  image?: string;
  children: CategoryChildOfProductModel[] | [];
}

interface CategoryChildOfProductModel {
  id: string | number;
  logo: string | null;
  name: string;
  path: [1];
  slug: string;
  image: string;
  children: [];
  meta_url?: string;
  position: number;
  is_active: boolean;
  parent_id: number | string;
  created_at: number;
  created_by: ICreatedBy;
  meta_image: string | null;
  meta_title: string | null;
  updated_at: number;
  meta_content: string | null;
  is_show_on_web: boolean;
  is_show_on_home: boolean;
}

export interface IProductModelRequest {
  store_id?: string;
  types?: string;
  categories?: string;
  stock_value?: number;
  is_public?: boolean;
  is_active?: boolean;
  order_by?: string;
  sort_by?: string;
  skip: number;
  limit: number;
  attributes?: string;
}

export interface IProductCreate {
  add_on_deal?: object | null;
  barcode?: object | null;
  brand?: string | null;
  bundle_deal?: null;
  categories?: ICategoryOfProduct[];
  deal_sale?: {
    id: string;
    name: string;
    type: string;
    discount_rate: number;
    discount_value: number;
  } | null;
  images: string[];
  indexes?: number[];
  is_active?: boolean;
  is_default?: boolean;
  is_has_add_on_deal?: boolean;
  is_has_bundle_deal?: boolean;
  is_has_flash_sale?: boolean;
  is_has_hot_deal?: boolean;
  name?: string;
  option_id?: string;
  options?: [];
  position?: number;
  price?: number;
  price_books?: [];
  price_max?: number;
  price_min?: number;
  sku: string | null;
  stocks?: [];
  total_quantity: number;
  total_actual: number;
  total_adjustment: number;
  total_final_quantity: number;
  total_price: number;
}

export interface IProductInOrder {
  id?: number;
  option_id?: number;
  sku?: string;
  name?: string;
  price?: number;
  price_books?: {
    id: number;
    name: string;
    price: number;
    normal_price: number;
  }[];
  total_quantity?: number;
  total_price?: number;
  total_before_discount?: number;
  total_discount?: number;
  discount?: {
    id: number;
    name: string;
    rate: number;
    value: number;
  };
  discount_by?: {
    id: any;
    name: string;
    type: string;
  };
  note?: string;
  normal_price?: number;
  original_price?: number;
  parent_id?: string;
}
