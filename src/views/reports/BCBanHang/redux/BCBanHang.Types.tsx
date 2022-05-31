import {IDateFilterType, IDateRange, IAppState} from 'views/app';
import {IStoreAndColor} from 'views/dashboard/redux';
import {
  IBCSPModel,
  //  IBCBHModel,
  IBCBHModelV2
} from 'models/DashBoard.Model';
import {IBangGiaModel} from 'models/BangGia.Model';
import {IKenhBan, IMethodSales} from 'configs/FilterConfig';
import {IStorePerson} from 'models/ModelBase';

export interface IBCBanHangState extends IAppState {
  thoiGianLoc?: IDateFilterType;
  khoangThoiGian?: IDateRange;
  arrChiNhanhDaChonBCBH?: IStorePerson[];

  isError?: boolean;
  arrCurrentStorePieChartUnChecked?: Array<any>;
  arrCurrentStoreCotChongUnChecked?: Array<any>;

  // new
  stackbarChart?: any;
  pieChart?: any;
  lineChart?: any;

  tongLoiNhuan?: number;
  tongDoanhThu?: number;
  tongGiaVon?: number;

  arrStoreAndColorStackChart?: IStoreAndColor[];
  arrStoreAndColorPieChart?: IStoreAndColor[];
  arrProductReportByRevenue?: IBCSPModel[];
  arrProductReportByQuantity?: IBCSPModel[];

  arrStaffsBestSales?: IBCBHModelV2[];
  // filter interface
  arrKenhban?: IKenhBan[];
  methodSale?: IMethodSales;
  arrTablePrice?: IBangGiaModel[];
}
