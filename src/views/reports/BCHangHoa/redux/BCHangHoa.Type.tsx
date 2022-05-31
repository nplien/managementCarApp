import {IDateFilterType, IDateRange, IAppState} from 'views/app';
import {IBCSPModel} from 'models/DashBoard.Model';
import {IStorePerson} from 'models/ModelBase';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';

export interface IBCHangHoaState extends IAppState {
  thoiGianLoc?: IDateFilterType;
  khoangThoiGian?: IDateRange;

  arrChiNhanhDaChonBCHH?: IStorePerson[];
  arrBCHangHoaRevenue?: IBCSPModel[];
  arrBCHangHoaByInventory?: IBCSPModel[];
  arrBCHangHoaByProfit?: IBCSPModel[];
  arrBCHangHoaByWarehouse?: IBCSPModel[];

  totalProduct?: number;
  groupCategory?: boolean;
  type?: string[];
  KeyWord?: string;
  category?: {name: string; id: number};
  totalProductValueInventory?: number;
  isError?: boolean;
  count?: number;
  view?: MOI_QUAN_TAM;
  viewWarehouse?: MOI_QUAN_TAM;
}

export interface IDashboardAction {
  type: string;
  payload: IBCHangHoaState;
}
