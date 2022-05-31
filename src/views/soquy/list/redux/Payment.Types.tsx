import {IStorePerson} from 'models/ModelBase';
import {PaymentModel, RevenueModel} from 'models/Order.Model';
import {IAppState, IDateFilterType, IDateRange, ISortFilterType} from 'views/app';

export interface IPaymentState extends IAppState {
  arrPayment?: PaymentModel[];
  objRevenue?: RevenueModel;
  isLoadMore?: boolean;
  count?: number;
  error?: string;
  isStop?: boolean;
  currentSort?: ISortFilterType;
  currentFilterDateSQ?: IDateFilterType;
  convertCurrentFilterDateSQ?: IDateRange;
  arrChiNhanhDaChonSQ?: IStorePerson[];
}
