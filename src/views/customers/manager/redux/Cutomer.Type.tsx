import {CustomerModel} from 'models/Customer.Model';
import {IDateFilterType, IAppState, IDateRange, ISortFilterType} from 'views/app';

export interface ICustomerState extends IAppState, IFilterCustomerState {
  arrCustomer?: CustomerModel[];
  isLoadMore?: boolean;
  count?: number;
  isError?: boolean;

  giaHienThiCustomer?: {id?: string; name?: string};
  currentFilterDate?: IDateFilterType;
  convertCurrentFilterDate?: IDateRange;
  currentSort?: ISortFilterType;
}

export interface IFilterCustomerState {
  status?: string;
  created_by?: any;
  genders?: string;
  keyword?: string;
  types?: string;
  groups?:
    | {
        id: string;
        name: string;
      }
    | null
    | any;
  min_total_price?: string;
  max_total_price?: string;
  min_total_debt?: string;
  max_total_debt?: string;
  min_total_point?: string;
  max_total_point?: string;
  provincesCity?:
    | [
        {
          code: string;
          name: string;
        }
      ]
    | any;

  thoiGianLocGDC?: IDateFilterType;
  khoangThoiGianGDC?: IDateRange;
}
export interface IFilterCustomerAction {
  type: string;
  payload?: IFilterCustomerState;
}
