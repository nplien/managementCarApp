import {IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import {IStatusItem} from 'configs/StatusConfig';
import {ILocation} from 'models/Localtion.Model';
import {IStorePerson} from 'models/ModelBase';

import {OrderModel} from 'models/Order.Model';
import {IStaffModel} from 'models/Staff.Model';
import {IAppState, IDateFilterType, IDateRange, ISortFilterType} from 'views/app';

export interface IOrderState extends IAppState {
  arrOrder?: OrderModel[];
  isLoadMore?: boolean;
  count?: number;
  isError?: boolean;
  isStop?: boolean;
  types?: string | null;

  orderSort?: ISortFilterType;
  arrStoreOrder?: IStorePerson[];

  orderFilterDate?: IDateFilterType;
  convertOrderFilterDate?: IDateRange;

  code?: string;
  note?: string;
  customer?: string;
  receiver?: string;
  product_sku?: string;
  product_name?: string;

  arrCurrentStatusDH?: IStatusItem[];

  arrStaffDaChonOrder?: IStaffModel[];
  locationDaChonOrder?: ILocation;

  channels?: string;
  arrPTTTDaChon?: IPaymentItem[];
  arrPTBHDaChon?: IMethodSales[];
  pttt?: IPaymentItem;
  ptbh?: IMethodSales;
}
