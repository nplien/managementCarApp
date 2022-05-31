import {KieuKhuyenMai} from 'configs/ProductConfig';
import {IBangGiaModel} from 'models/BangGia.Model';
import {CustomerModel} from 'models/Customer.Model';
import {ChannelModel} from 'models/ManagerSetting.Model';
import {IStorePerson} from 'models/ModelBase';
import {OrderModel} from 'models/Order.Model';
import {IPaymentOrderModel} from 'models/Payment.Model';
import {IProductInOrder} from 'models/Product.Model';
import {IStoreModel} from 'models/Store.Model';
import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';

const URL_ORDER = 'v1/orders';
// vận đơn

export interface IOrderRequest {
  id?: string;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
  types?: string;
  min_created_at?: string;
  max_created_at?: string;
  is_delivery?: string;
  staffs?: string;
  date_type?: string;
  code?: string;
  note?: string;
  customer?: string;
  receiver?: string;
  product_sku?: string;
  product_name?: string;

  statuses?: string;
  channels?: string;
  payment_methods?: string;
  created_by?: string;
  price_books?: any;
  info_received?: string;
  stores?: string;
  source?: CustomerModel;
  store?: IStoreModel;
  total_discount?: number | null;

  /**--- V2 --- */
  min_created_at_day?: string;
  max_created_at_day?: string;
  date_time?: string;
  order_types?: string;
}

export interface IDiscountInOrder {
  code: string;
  group: string;
  id: number;
  name: string;
  type: KieuKhuyenMai;
  value: number;
}

export interface IPostOrderRequest {
  //  thong tin cua hoa don
  name?: string;
  is_active?: boolean;
  status?: string;
  type?: string;
  group?: string;
  hashtag?: string;

  //  thong tin cua hang
  store?: IStorePerson;
  channel?: ChannelModel;

  //  thong tin cua khach hang
  customer?: CustomerModel;

  //  thong tin cua san pham
  price_book?: IBangGiaModel;
  products?: IProductInOrder[];

  //  giam gia cho hoa don
  discounts?: IDiscountInOrder[];

  //  thanh toan cho hoa don
  is_payment?: boolean;
  payments?: IPaymentOrderModel[];

  //  van don
  is_delivery?: boolean;
  deliveries?: any[];
}

export const OrderAPI = {
  //get order truyền types: retail(hoá đơn), order(đặt hàng), return(trả hàng)
  getListOrder: async (params: object) => {
    const response = ClientAPI.GET<IResponse<OrderModel[]>>(
      URL_ORDER,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailOrder: async (id: string) => {
    const response = ClientAPI.GET<IResponse<OrderModel>>(
      `${URL_ORDER}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  //post order
  postOrderBanHang: async (params: IPostOrderRequest) => {
    const response = ClientAPI.POST<IResponse<OrderModel>>(
      URL_ORDER,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListInvoiceReport: async (params: object) => {
    const response = ClientAPI.GET<IResponse<OrderModel[]>>(
      'v1/invoice-reports',
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
