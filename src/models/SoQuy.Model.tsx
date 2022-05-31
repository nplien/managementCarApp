import {ICreatedBy, IStorePerson, ISupplierOfProduct} from './ModelBase';
import {OrderPayment} from './Order.Model';

export enum SO_QUY_TYPE {
  THU = 1,
  CHI = 2
}

export enum SO_QUY_GROUP_TYPE {
  KHAC = 1,
  CHUYEN_RUT = 2
}

export enum SO_QUY_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export type ISumSoQuy = {
  total_value_0?: number;
  total_value_1?: number;
  total_value_2?: number;
  total_value_3?: number;
};

export interface ISoQuyModel {
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
