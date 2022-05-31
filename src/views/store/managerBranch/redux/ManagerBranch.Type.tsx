import {IStoreModel} from 'models/Store.Model';
import {IAppState} from 'views/app';

export interface IManagerBranchState extends IAppState {
  arrManagerBranch?: IStoreModel[];
  count?: number;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;

  currentFilterDateBrand?: any;
  convertCurrentFilterDateBrand?: any;
  keyword?: string;
  status?: string;
}
