import {IDiscountInOrder} from 'services/Order.Api';
import {IStorePerson} from './ModelBase';
import {IPaymentOrderModel} from './Payment.Model';
import {ITiepNhanXeModel} from './TiepNhanXe.Model';

export interface IPostPSCRequest {
  //  thong tin cua hoa don
  name?: string;
  is_active?: boolean;
  status?: string;
  type?: string;
  group?: string;
  hashtag?: string;

  //  thong tin cua hang
  store?: IStorePerson;

  //  thong tin cua khach hang
  customer?: ITiepNhanXeModel;

  //  thong tin cua san pham
  products?: IProductInPSC[];

  //  giam gia cho hoa don
  discounts?: IDiscountInOrder[];

  //  thanh toan cho hoa don
  is_payment?: boolean;
  payments?: IPaymentOrderModel[];
}

export interface IProductInPSC {
  id?: number;
  sku?: string;
  name?: string;
  price?: number;
  total_quantity?: number;
  total_price?: number;
  discount?: {
    id: number;
    name: string;
    rate: number;
    value: number;
  };
  note?: string;
  normal_price?: number;
}

export interface IProductPCS {
  id?: number;
  code?: string;
  products?: IProductInPSC[];
  customer?: ITiepNhanXeModel;
  total_quantity?: number;
  total_price?: number;
  total_paid?: number;
  //  thanh toan cho hoa don
  is_payment?: boolean;
  payments?: IPaymentOrderModel[];
  created_at?: number;
  stores?: IStorePerson;
  status_name?: string;
  status_id?: number;
}
