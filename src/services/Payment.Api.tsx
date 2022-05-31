import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {PaymentModel, RevenueModel} from 'models/Order.Model';
import {SO_QUY_GROUP_TYPE, SO_QUY_STATUS, SO_QUY_TYPE} from 'models/SoQuy.Model';
const URL_PAYMENT = 'v1/payments';
const SOURCE_REVENUE = '/total-revenue';
const SOURCE_CREATE = '/bulk-create';

export interface IRequestSoQuy {
  skip: number;
  limit: number;
  stores?: string; // 258_ba_trieu,208_nguyen_trai
  min_created_at?: string; // 03/01/2021
  max_created_at?: string; // 03/07/2021
  staffs?: string; // dai_trang,vu_hang
  id?: string; // 2
  sort_by?: string;
  order_by?: string;
  is_delivery?: string;
  statuses?: SO_QUY_STATUS | string;
  code?: string;
  note?: string;
  groups?: SO_QUY_GROUP_TYPE | string;
  types?: SO_QUY_TYPE | string;
  partners?: string;
  methods?: string;
}

export interface IResponseSoQuy {
  code?: number;
  count?: number;
  message?: any;
  sum?: RevenueModel;
  data?: PaymentModel[];
}
export const PaymentAPI = {
  getListPayment: async (params: IRequestSoQuy) => {
    const response = ClientAPI.GET<IResponse<PaymentModel[]>>(
      URL_PAYMENT,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailPayment: async (id: string) => {
    const response = ClientAPI.GET<IResponse<PaymentModel>>(
      URL_PAYMENT + '/' + id,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getRevenue: async (params: IRequestSoQuy) => {
    const response = ClientAPI.GET<IResponse<RevenueModel>>(
      URL_PAYMENT + SOURCE_REVENUE,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  createPayment: async (bodyQuery: any) => {
    const response = ClientAPI.POST<IResponse<any>>(
      URL_PAYMENT + SOURCE_CREATE,
      bodyQuery,
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
