import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {SO_QUY_TYPE} from './SoQuy.Model';

export interface IPaymentOrderModel {
  method?: PAYMENT_METHOD;
  type?: SO_QUY_TYPE; // 1: Phiếu thu, 2: Phiếu chi
  value?: number;
  card?: ITaiKhoanModel;

  partner?: {id?: number; name?: string; phone?: string}; // khach hang hien tai

  random_id?: number | string; // key cua item, dung de ve view
  name?: string; // ten cua voucher, dung de ve view
}

export interface ITaiKhoanModel {
  name?: string;
  number?: string;
  ccv?: string;
  bank?: string;
  value?: string;
  content?: string;
}
