import {IBangGiaModel} from 'models/BangGia.Model';
import {IAppState} from 'views/app';

export interface IBangGiaState extends IAppState {
  arrBangGia?: IBangGiaModel[];
  count?: number;
  keyword?: string;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
