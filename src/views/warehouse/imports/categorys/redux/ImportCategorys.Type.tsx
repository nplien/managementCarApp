import {IBrands} from 'models/Brands.Model';
import {ICategoryModel} from 'models/Category.Model';
import {IAppState} from 'views/app';

export interface IImportCateReducerState extends IAppState {
  arrImportCateReducer?: ICategoryModel[];
  arrCate?: ICategoryModel[];
  cate?: ICategoryModel;

  arrBrands?: IBrands[];
  keywordBrands?: string;
  brands?: string;

  count?: number;
  keywordCate?: string;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
