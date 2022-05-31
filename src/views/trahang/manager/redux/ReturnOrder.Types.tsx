import {IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import {IStatusItem} from 'configs/StatusConfig';
import {ILocation} from 'models/Localtion.Model';
import {IStorePerson} from 'models/ModelBase';
import {OrderModel, SumOrderModle} from 'models/Order.Model';
import {IStaffModel} from 'models/Staff.Model';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface IReturnOrderState extends IAppState {
  arrReturnOrder?: OrderModel[];
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  sum?: SumOrderModle;
  error?: string;
  types?: string | null;

  currentSort?: ISortFilterType;
  arrStoreTraHang?: IStorePerson[];

  currentDateTraHang?: IDateFilterType;
  convertCurrentDateTraHang?: IDateRange;

  code?: string;
  note?: string;
  customer?: string;
  product_sku?: string;
  product_name?: string;
  receiver?: string;

  arrStatusTraHang?: IStatusItem[];

  channels?: string;
  arrPTTTDaChon?: IPaymentItem[];
  arrPTBHDaChon?: IMethodSales[];
  pttt?: IPaymentItem;
  ptbh?: IMethodSales;

  arrStaffDaChonTraHang?: IStaffModel[];

  locationDaChon?: ILocation;
}
