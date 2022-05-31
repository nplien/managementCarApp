import {ProductOptionsModel} from 'models/Product.Model';
import {IAppState} from 'views/app';

export interface IProductcategoryState extends IAppState {
  arrProduct?: ProductOptionsModel[];
  count?: number;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
