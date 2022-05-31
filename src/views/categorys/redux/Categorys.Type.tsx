import {ICategoryModel} from 'models/Category.Model';
import {IAppState} from 'views/app';

export interface ICategoryState extends IAppState {
  arrCategory?: ICategoryModel[];

  count?: number;
  keyword?: string;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
