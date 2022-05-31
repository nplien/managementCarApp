import {IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import {IStatusItem} from 'configs/StatusConfig';
import {ILocation} from 'models/Localtion.Model';
import {IStorePerson} from 'models/ModelBase';
import {OrderModel} from 'models/Order.Model';
import {IStaffModel} from 'models/Staff.Model';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface IInvoiceOrderState extends IAppState {
  arrInvoiceOrder?: OrderModel[];
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  error?: string;
  types?: string | null;

  currentSort?: ISortFilterType;
  arrStoreInvoice?: IStorePerson[];

  currentDateInvoice?: IDateFilterType;
  convertCurrentDateInvoice?: IDateRange;

  code?: string;
  note?: string;
  customer?: string;
  product_sku?: string;
  product_name?: string;
  receiver?: string;

  arrCurrentStatusInvoice?: IStatusItem[];

  channels?: string;
  arrPTTTDaChon?: IPaymentItem[];
  arrPTBHDaChon?: IMethodSales[];
  pttt?: IPaymentItem;
  ptbh?: IMethodSales;

  arrStaffDaChonInvoice?: IStaffModel[];

  locationDaChon?: ILocation;
}
