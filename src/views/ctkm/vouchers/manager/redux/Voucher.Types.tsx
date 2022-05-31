import {VoucherModel} from 'models/Voucher.Model';
import {IAppState} from 'views/app';

export interface IVoucherState extends IAppState {
  count?: number;
  isStop?: boolean;
  isLoadMore?: boolean;
  arrVoucher?: VoucherModel[];
  status?: string;
  detailOfVoucher?: VoucherModel;
  isError?: boolean;
  isFirstDetail?: boolean;
  currentFilterDateVC?: any;
  convertCurrentFilterDateVC?: any;
  arrStoreVoucher?: any;
  code?: string;
  name?: string;
}
