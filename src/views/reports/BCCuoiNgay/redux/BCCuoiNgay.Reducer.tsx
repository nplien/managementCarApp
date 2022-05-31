import {
  ARR_PT_BAN_HANG,
  ARR_PT_THANHTOAN,
  CONFIG_DATE_FILTER,
  IMethodSales,
  IPaymentItem
} from 'configs/FilterConfig';
import {IStaffModel} from 'models/Staff.Model';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange} from 'views/app';
import {IBCCNAction} from '.';
import {IBCCuoiNgayState} from './BCCuoiNgay.Type';
import {CustomerModel} from 'models/Customer.Model';
import {IStorePerson} from 'models/ModelBase';

export const BCCUOINGAY_THOIGIAN_ACTION = {
  CHANGE_TIME: 'BCCUOINGAY/CHANGE/TIME',
  CHANGE_KHOANG_THOI_GIAN: 'BCCUOINGAY/CHANGE/KHOANG_TIME',
  CHANGE_STORE_BCCN: 'BCCUOINGAY/CHANGE/STORE',
  CHANGE_PTTT_LOC_BCCN: 'BCCUOINGAY/CHANGE/LOC/PTTT',
  CHANGE_PTBH_LOC_BCCN: 'BCCUOINGAY/CHANGE/LOC/PTBH',
  CHANGE_KHACH_HANG_LOC_BCCN: 'BCCUOINGAY/CHANGE/LOC/KHACH/HANG',
  CHANGE_STARFF_LOC_BCCN: 'BCCUOINGAY/CHANGE/LOC/STAFF',
  TONG_KET_THU_CHI: 'BCCUOINGAY/TONG_KET_THU_CHI',
  TONG_KET_THU_CHI_SUCCESS: 'BCCUOINGAY/TONG_KET_THU_CHI/SUCCESS',
  TONG_KET_THU_CHI_FAIL: 'BCCUOINGAY/TONG_KET_THU_CHI/FAIL',
  /**Sửa type này thì lưu ý trong file BCCuoiNgaySaga đang sử dụng logic cộng chuỗi */
  TONG_KET_HOA_DON: 'BCCUOINGAY/TONG_KET_HOA_DON',
  TONG_KET_HOA_DON_SUCCESS: 'BCCUOINGAY/TONG_KET_HOA_DON/SUCCESS',
  /**Sửa type này thì lưu ý trong file BCCuoiNgaySaga đang sử dụng logic cộng chuỗi */
  TONG_KET_DAT_HANG: 'BCCUOINGAY/TONG_KET_DAT_HANG',
  TONG_KET_DAT_HANG_SUCCESS: 'BCCUOINGAY/TONG_KET_DAT_HANG/SUCCESS',
  /**Sửa type này thì lưu ý trong file BCCuoiNgaySaga đang sử dụng logic cộng chuỗi */
  TONG_KET_TRA_HANG: 'BCCUOINGAY/TONG_KET_TRA_HANG',
  TONG_KET_TRA_HANG_SUCCESS: 'BCCUOINGAY/TONG_KET_TRA_HANG/SUCCESS',
  TONG_KET_BAN_HANG_FAIL: 'BCCUOINGAY/TONG_KET_BAN_HANG/FAIL',
  /**Sửa type này thì lưu ý trong file BCCuoiNgaySaga đang sử dụng logic cộng chuỗi */
  TONG_KET_PTTT: 'BCCUOINGAY/TONG_KET_PTTT',
  TONG_KET_PTTT_SUCCESS: 'BCCUOINGAY/TONG_KET_PTTT/SUCCESS',
  TONG_KET_PTTT_FAIL: 'BCCUOINGAY/TONG_KET_PTTT/FAIL',
  REFRESH_BCCN: 'BCCUOINGAY/REFRESH_BCCN',
  RESET_FILTER_DEFAULT: 'BCCUOINGAY/RESET_FILTER_DEFAULT'
};

export function getTongKetPTTTBCCN(): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT
  };
}

export function onResetFilterDefault(params: IBCCuoiNgayState): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.RESET_FILTER_DEFAULT,
    payload: params
  };
}

export function onRefreshingBCCN(isRefresh: boolean): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.REFRESH_BCCN,
    payload: {
      isRefresh
    }
  };
}

export function getTongKetThuChiBCCN(): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI
  };
}

export function getTongKetBanHangBCCN(
  type: keyof typeof BCCUOINGAY_THOIGIAN_ACTION,
  typeOfOrder: 'retail' | 'order' | 'return'
): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION[type],
    payload: {
      typeOfOrder
    }
  };
}

export function onChangeLocThoiGianBCCN(thoiGianLoc: IDateFilterType) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_TIME,
    payload: {
      thoiGianLoc
    }
  };
}

export function onChangeKhoangThoiGianBCCN(khoangThoiGian: IDateRange): IBCCNAction {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_KHOANG_THOI_GIAN,
    payload: {
      khoangThoiGian: khoangThoiGian
    }
  };
}

export function onChangeChiNhanhBCCN(arrChiNhanhDaChonBCCN: IStorePerson[]) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_STORE_BCCN,
    payload: {
      arrChiNhanhDaChonBCCN
    }
  };
}

export function onChangePTTTLocBCCN(pttt: IPaymentItem) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_PTTT_LOC_BCCN,
    payload: {
      pttt
    }
  };
}

export function onChangePTBHLocBCCN(ptbh: IMethodSales) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_PTBH_LOC_BCCN,
    payload: {
      ptbh
    }
  };
}

export function onChangeArrCustomerLocBCCN(arrCustomerDaChon: CustomerModel[]) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_KHACH_HANG_LOC_BCCN,
    payload: {
      arrCustomerDaChon
    }
  };
}

export function onChangeStaffLocBCCN(arrStaffDaChon: IStaffModel[]) {
  return {
    type: BCCUOINGAY_THOIGIAN_ACTION.CHANGE_STARFF_LOC_BCCN,
    payload: {
      arrStaffDaChon
    }
  };
}

const BCCuoiNgayReducer = (
  state: IBCCuoiNgayState = {
    thoiGianLoc: CONFIG_DATE_FILTER.DASHBOARD[0],
    khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[0].id),
    arrChiNhanhDaChonBCCN: [],
    arrPTBHDaChon: [...ARR_PT_BAN_HANG],
    arrPTTTDaChon: [...ARR_PT_THANHTOAN],
    arrStaffDaChon: [],
    arrCustomerDaChon: [],
    isFirstLoading: true,
    isRefresh: false,

    tongTienThu: 0,
    tongTienChi: 0,
    tongTienThuChi: 0,
    isLoadingThuChi: true,

    tongPTTT_TiemMat: 0,
    tongPTTT_ChuyenKhoan: 0,
    tongPTTT_The: 0,
    tongPTTT_Diem: 0,
    tongPTTT_Voucher: 0,
    isLoadingPTTT: true,

    tongSoHoaDonHD: 0,
    tongSoLuongSanPhamHD: 0,
    tongDoanhThuHD: 0,
    tongThuKhacHD: 0,
    tongThucThuHD: 0,
    isLoadingHD: true,

    tongSoHoaDonDH: 0,
    tongSoLuongSanPhamDH: 0,
    tongDoanhThuDH: 0,
    tongThuKhacDH: 0,
    tongThucThuDH: 0,
    isLoadingDH: true,

    tongSoHoaDonTH: 0,
    tongSoLuongSanPhamTH: 0,
    tongTienTH: 0,
    tongHoanTraThuKhacTH: 0,
    tongPhiTraTH: 0,
    tongThucTraTH: 0,
    isLoadingTH: true
  },
  action: IBCCNAction
): IBCCuoiNgayState => {
  switch (action.type) {
    case BCCUOINGAY_THOIGIAN_ACTION.REFRESH_BCCN:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case BCCUOINGAY_THOIGIAN_ACTION.RESET_FILTER_DEFAULT:
      return {
        ...state,
        arrCustomerDaChon: action.payload?.arrCustomerDaChon,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon,
        arrStaffDaChon: action.payload?.arrStaffDaChon
      };
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT_SUCCESS:
      return {
        ...state,
        tongPTTT_TiemMat: action.payload?.tongPTTT_TiemMat,
        tongPTTT_ChuyenKhoan: action.payload?.tongPTTT_ChuyenKhoan,
        tongPTTT_The: action.payload?.tongPTTT_The,
        tongPTTT_Diem: action.payload?.tongPTTT_Diem,
        tongPTTT_Voucher: action.payload?.tongPTTT_Voucher,
        isLoadingPTTT: false
      };
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT_FAIL:
      return {
        ...state,
        tongPTTT_TiemMat: 0,
        tongPTTT_ChuyenKhoan: 0,
        tongPTTT_The: 0,
        tongPTTT_Diem: 0,
        tongPTTT_Voucher: 0,
        isLoadingPTTT: true
      };

    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_PTTT_LOC_BCCN:
      let arrPTTTDaChonCopy = [...(state.arrPTTTDaChon || [])] || [];
      if (action.payload?.pttt) {
        let indexExist = arrPTTTDaChonCopy.findIndex(
          x => x.method === action.payload?.pttt?.method
        );
        if (indexExist > -1) {
          arrPTTTDaChonCopy.splice(indexExist, 1);
        } else {
          arrPTTTDaChonCopy.push(action.payload?.pttt);
        }
        return {
          ...state,
          arrPTTTDaChon: arrPTTTDaChonCopy
        };
      }
      return state;
    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_PTBH_LOC_BCCN:
      let arrPTBHDaChonCopy = [...(state.arrPTBHDaChon || [])] || [];
      if (action.payload?.ptbh) {
        let indexExist = arrPTBHDaChonCopy.findIndex(x => x.id === action.payload?.ptbh?.id);
        if (indexExist > -1) {
          arrPTBHDaChonCopy.splice(indexExist, 1);
        } else {
          arrPTBHDaChonCopy.push(action.payload?.ptbh);
        }
        return {
          ...state,
          arrPTBHDaChon: arrPTBHDaChonCopy
        };
      }
      return state;
    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_STARFF_LOC_BCCN:
      return {
        ...state,
        arrStaffDaChon: action.payload?.arrStaffDaChon
      };

    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_KHACH_HANG_LOC_BCCN:
      return {
        ...state,
        arrCustomerDaChon: action.payload?.arrCustomerDaChon
      };

    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_STORE_BCCN:
      return {
        ...state,
        arrChiNhanhDaChonBCCN: action.payload?.arrChiNhanhDaChonBCCN
      };
    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_TIME:
      return {
        ...state,
        thoiGianLoc: action.payload?.thoiGianLoc
      };

    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI_SUCCESS:
      return {
        ...state,
        isRefresh: false,
        tongTienThu: action.payload?.tongTienThu || 0,
        tongTienChi: action.payload?.tongTienChi || 0,
        tongTienThuChi: action.payload?.tongTienThuChi || 0,
        isLoadingThuChi: false
      };
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI_FAIL:
      return {
        ...state,
        isRefresh: false,
        isLoadingThuChi: true
      };

    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI:
      return {...state, isLoadingThuChi: true};
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT:
      return {...state, isLoadingPTTT: true};
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_HOA_DON:
      return {...state, isLoadingHD: true};
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_DAT_HANG:
      return {...state, isLoadingDH: true};
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_TRA_HANG:
      return {...state, isLoadingTH: true};

    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_HOA_DON_SUCCESS:
      return {
        ...state,
        isRefresh: false,
        tongSoHoaDonHD: action.payload?.tongSoHoaDonHD || 0,
        tongSoLuongSanPhamHD: action.payload?.tongSoLuongSanPhamHD || 0,
        tongDoanhThuHD: action.payload?.tongDoanhThuHD || 0,
        tongThuKhacHD: action.payload?.tongThuKhacHD || 0,
        tongThucThuHD: action.payload?.tongThucThuHD || 0,
        isLoadingHD: false
      };

    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_DAT_HANG_SUCCESS:
      return {
        ...state,
        isRefresh: false,
        tongSoHoaDonDH: action.payload?.tongSoHoaDonDH || 0,
        tongSoLuongSanPhamDH: action.payload?.tongSoLuongSanPhamDH || 0,
        tongDoanhThuDH: action.payload?.tongDoanhThuDH || 0,
        tongThuKhacDH: action.payload?.tongThuKhacDH || 0,
        tongThucThuDH: action.payload?.tongThucThuDH || 0,
        isLoadingDH: false
      };
    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_TRA_HANG_SUCCESS:
      return {
        ...state,
        isRefresh: false,
        tongSoHoaDonTH: action.payload?.tongSoHoaDonTH || 0,
        tongSoLuongSanPhamTH: action.payload?.tongSoLuongSanPhamTH || 0,
        tongTienTH: action.payload?.tongTienTH || 0,
        tongHoanTraThuKhacTH: action.payload?.tongHoanTraThuKhacTH || 0,
        tongPhiTraTH: action.payload?.tongPhiTraTH || 0,
        tongThucTraTH: action.payload?.tongThucTraTH || 0,
        isLoadingTH: false
      };

    case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_BAN_HANG_FAIL:
      return {
        ...state,
        isRefresh: false,
        isLoadingThuChi: true,
        isLoadingPTTT: true,
        isLoadingHD: true,
        isLoadingDH: true,
        isLoadingTH: true
      };

    case BCCUOINGAY_THOIGIAN_ACTION.CHANGE_KHOANG_THOI_GIAN:
      return {
        ...state,
        khoangThoiGian: action.payload?.khoangThoiGian
      };

    default:
      return state;
  }
};

export default BCCuoiNgayReducer;
