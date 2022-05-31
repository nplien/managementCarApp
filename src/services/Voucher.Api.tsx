import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {VoucherModel} from 'models/Voucher.Model';
import {IStoreModel} from 'models/Store.Model';
const URL_VOUCHERS = 'v1/vouchers/';
const URL_DEALS = 'v1/deals';
export interface IRequestVoucher {
  skip: number;
  limit: number;
  statuses: string;
  keyword?: string;
  min_created_at?: number;
  max_created_at?: number;
  stores?: IStoreModel;
  code?: string;
  name?: string;
}
export interface IRequestPostVoucher {
  apply_expired_at?: string;
  apply_started_at?: string;
  description?: string;
  id?: string;
  name?: string;
  type?: string;
  discount_type?: number;
  discount_value?: number;
  is_multiple?: boolean;
  is_public?: boolean;
}
export const VoucherAPI = {
  getListVouchers: async (objParams: IRequestVoucher) => {
    const response = ClientAPI.GET<IResponse<VoucherModel[]>>(
      URL_VOUCHERS,
      objParams,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailVouchers: async (id: string) => {
    const response = ClientAPI.GET<IResponse<VoucherModel>>(
      URL_VOUCHERS + id,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  postVouchers: async (body: IRequestPostVoucher) => {
    const response = ClientAPI.POST<IResponse<any>>(URL_DEALS, body, Utilities.getHeaderRequest());
    return response;
  }
};
