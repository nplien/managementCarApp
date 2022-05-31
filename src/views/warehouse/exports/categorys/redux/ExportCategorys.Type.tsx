import {IBrands} from 'models/Brands.Model';
import {ICategoryModel} from 'models/Category.Model';
import {IAppState} from 'views/app';

export interface IExportCateReducerState extends IAppState {
  arrExportCateReducer?: ICategoryModel[];
  arrCate?: ICategoryModel[];
  cate?: ICategoryModel;

  arrBrands?: IBrands[];
  keywordBrands?: string;
  brands?: string;

  count?: number;
  keyword?: string;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
