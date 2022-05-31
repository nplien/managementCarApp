import {CustomerModel, CustomerModelRequest} from 'models/Customer.Model';
import {IAppState, ISortFilterType} from 'views/app';

export interface ISuppliersState extends IAppState {
  arrSupplier?: CustomerModel[];
  isLoadMore?: boolean;
  isError?: boolean;
  count?: number;

  currentSort?: ISortFilterType;

  param?: CustomerModelRequest;
  nameGroup?: string;
}
export interface IFilterSupplierAction {
  type: string;
  payload?: ISuppliersState;
}
