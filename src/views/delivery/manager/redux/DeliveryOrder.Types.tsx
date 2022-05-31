import {DeliveryModel} from 'models/Order.Model';
import {IAppState, ISortFilterType, IThoiGianLocState} from 'views/app';

export interface IDeliveryOrderState extends IAppState, Partial<IThoiGianLocState> {
  currentSortVD?: ISortFilterType;
  arrDeliveryOrder?: DeliveryModel[];
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  error?: string;
}
