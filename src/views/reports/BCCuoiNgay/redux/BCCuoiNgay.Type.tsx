import {IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import {IStaffModel} from 'models/Staff.Model';
import {IDateFilterType, IAppState, IDateRange} from 'views/app';
import {CustomerModel} from 'models/Customer.Model';
import {IStorePerson} from 'models/ModelBase';

export interface IBCCuoiNgayState extends IAppState {
  thoiGianLoc?: IDateFilterType;
  khoangThoiGian?: IDateRange;
  arrChiNhanhDaChonBCCN?: IStorePerson[];
  arrStaffDaChon?: IStaffModel[];
  arrCustomerDaChon?: CustomerModel[];
  arrPTTTDaChon?: IPaymentItem[];
  arrPTBHDaChon?: IMethodSales[];

  tongTienThu?: number;
  tongTienChi?: number;
  tongTienThuChi?: number;
  isLoadingThuChi?: boolean;

  tongSoHoaDonHD?: number;
  tongSoLuongSanPhamHD?: number;
  tongDoanhThuHD?: number;
  tongThuKhacHD?: number;
  tongThucThuHD?: number;
  isLoadingHD?: boolean;

  tongPTTT_TiemMat?: number;
  tongPTTT_ChuyenKhoan?: number;
  tongPTTT_The?: number;
  tongPTTT_Diem?: number;
  tongPTTT_Voucher?: number;
  isLoadingPTTT?: boolean;

  tongSoHoaDonDH?: number;
  tongSoLuongSanPhamDH?: number;
  tongDoanhThuDH?: number;
  tongThuKhacDH?: number;
  tongThucThuDH?: number;
  isLoadingDH?: boolean;

  tongSoHoaDonTH?: number;
  tongSoLuongSanPhamTH?: number;
  tongTienTH?: number;
  tongHoanTraThuKhacTH?: number;
  tongPhiTraTH?: number;
  tongThucTraTH?: number;
  isLoadingTH?: boolean;
}

export interface IBCCNAction {
  type: string;
  payload?: IBCCuoiNgayState & {
    pttt?: IPaymentItem;
    ptbh?: IMethodSales;
    typeOfOrder?: 'retail' | 'order' | 'return';
  };
}
