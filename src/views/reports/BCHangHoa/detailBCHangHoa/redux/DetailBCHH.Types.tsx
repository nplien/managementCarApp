import {IBCSPModel, ISumBCSPModel} from 'models/DashBoard.Model';
import {IStorePerson} from 'models/ModelBase';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface IDetailBCHHState extends IAppState {
  arrDetailBCHH?: IBCSPModel[];
  sumDetailBCHH?: ISumBCSPModel;
  isLoadMore?: boolean;
  isStop?: boolean;
  count?: number;
  error?: string;

  currentSortDetailBCHH?: ISortFilterType;
  arrStoreDetailBCHH?: IStorePerson[];

  thoiGianLocDetailBCHH?: IDateFilterType;
  khoangThoiGianDetailBCHH?: IDateRange;

  keyword?: string;
  statuses?: string;

  category?: number;
  stock?: number;
  type?: any;
  categories?: {name?: string; id?: string};
}
