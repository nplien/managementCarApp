import {IBCSPModel} from 'models/DashBoard.Model';
import {IStorePerson} from 'models/ModelBase';
import {IAppState, IThoiGianLocState} from 'views/app';

export type IStoreAndColor = {
  id?: number | string;
  name?: string;
  color?: string;
};

export interface IDashboardState extends IAppState, Partial<IThoiGianLocState> {
  isError?: boolean;
  arrCurrentStorePieChartUnChecked?: Array<any>;
  arrCurrentStoreCotChongUnChecked?: Array<any>;
  // new
  arrChiNhanhDaChonDashBoard?: IStorePerson[];
  stackbarChart?: any;
  pieChart?: any;
  arrStoreAndColorStackChart?: IStoreAndColor[];
  arrStoreAndColorPieChart?: IStoreAndColor[];
  storeID?: string;
  color?: string;
  tongSoHoaDonBan?: number;
  tongGiaTriHoaDonBan?: number;
  tongSoHoaDonTra?: number;
  tongSoHoaDonDatHang?: number;
  tongSoSanPhamTonKho?: number;
  tongGiaTriHoaDonTra?: number;
  tongGiaTriHoaDonDatHang?: number;
  tongGiaTriSanPhamTonKho?: number;
  arrProductReportByRevenue?: IBCSPModel[];
  arrProductReportByQuantity?: IBCSPModel[];
  isLoadingDatHang?: boolean;
  isLoadingTonKhoSP?: boolean;
  isTop10ForSale?: boolean;
  isTop10ForQty?: boolean;
}

export interface IDashboardAction {
  type: string;
  payload: IDashboardState;
}
