import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {IStorePerson} from 'models/ModelBase';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange} from 'views/app';
import {IDashboardState, IDashboardAction} from '.';

export const DASHBOARD_ACTION = {
  IS_REFRESH: 'DASHBOARD/LIST/IS_REFRESH',
  IS_FIRST_LOADING: 'DASHBOARD/LIST/IS_FIRST_LOADING',
  IS_LOADING_DATHANG: 'DASHBOARD/LIST/IS_LOADING_DATHANG',
  IS_LOADING_TON_SP: 'DASHBOARD/LIST/IS_LOADING_TON_SP',

  ON_CHECK_STORE_PIECHART: 'DASHBOARD/CHECK_STORE_REPORT/ON_CHECK_STORE_PIECHART',
  ON_CHECK_COT_CHONG: 'DASHBOARD/CHECK_STORE_REPORT/ON_CHECK_COT_CHONG',

  STACK_BAR_DASHBOARD: 'DASHBOARD/STACK_BAR_DASHBOARD',
  STACK_BAR_DASHBOARD_SUCCESS: 'DASHBOARD/STACK_BAR_DASHBOARD/SUCCESS',
  STACK_BAR_DASHBOARD_FAIL: 'DASHBOARD/STACK_BAR_DASHBOARD/FAIL',

  PIE_CHART_DASHBOARD: 'DASHBOARD/PIE_CHART',
  PIE_CHART_DASHBOARD_SUCCESS: 'DASHBOARD/PIE_CHART/SUCCESS',
  PIE_CHART_DASHBOARD_FAIL: 'DASHBOARD/PIE_CHART/FAIL',

  BCSP: 'DASHBOARD/LIST/GET/BCSP',
  BCSP_SUCCESS: 'DASHBOARD/LIST/GET/BCSP_SUCCESS',
  BCSP_FAIL: 'DASHBOARD/LIST/GET/BCSP_FAIL',

  BCDH: 'DASHBOARD/LIST/GET/BCDH',
  BCDH_SUCCESS: 'DASHBOARD/LIST/GET/BCDH_SUCCESS',
  BCDH_FAIL: 'DASHBOARD/LIST/GET/BCDH_FAIL',

  CHANGE_THOI_GIAN_DASHBOARD: 'CHANGE/CHANGE_THOI_GIAN_DASHBOARD',
  CHANGE_KHOANG_THOI_GIAN_DASHBOARD: 'CHANGE/CHANGE_KHOANG_THOI_GIAN_DASHBOARD',
  CHANGE_FILTER_STORE_DASHBOARD: 'CHANGE/CHANGE_FILTER_STORE_DASHBOARD',

  TOP_10_FOR_SALE: 'TOP_10_FOR_SALE',
  TOP_10_FOR_SALE_SUCCESS: 'TOP_10_FOR_SALE/SUCCESS',

  TOP_10_FOR_QTY: 'TOP_10_FOR_QTY',
  TOP_10_FOR_QTY_SUCCESS: 'TOP_10_FOR_QTY/SUCCESS'
};

export function getTop10ForSale() {
  return {
    type: DASHBOARD_ACTION.TOP_10_FOR_SALE
  };
}
export function getTop10ForQty() {
  return {
    type: DASHBOARD_ACTION.TOP_10_FOR_QTY
  };
}

export function getDoanhThuTheoThoiGianStackBarDashBoard() {
  return {
    type: DASHBOARD_ACTION.STACK_BAR_DASHBOARD
  };
}

export function getDoanhThuTheoStorePieChartDashBoard() {
  return {
    type: DASHBOARD_ACTION.PIE_CHART_DASHBOARD
  };
}

export function getBCSP() {
  return {
    type: DASHBOARD_ACTION.BCSP
  };
}
export function getBCDH() {
  return {
    type: DASHBOARD_ACTION.BCDH
  };
}

export function onCheckStoreReportPieChart(storeID?: string, color?: String) {
  return {
    type: DASHBOARD_ACTION.ON_CHECK_STORE_PIECHART,
    payload: {
      storeID,
      color
    }
  };
}

export function onCheckStoreReportStackChart(storeID?: string, color?: String) {
  return {
    type: DASHBOARD_ACTION.ON_CHECK_COT_CHONG,
    payload: {
      storeID,
      color
    }
  };
}

export function onShowFirstLoadingDashBoard(isFirstLoading: boolean) {
  return {
    type: DASHBOARD_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function onShowRefreshDashBoard(isRefresh: boolean) {
  return {
    type: DASHBOARD_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

/**
 * Hiện thị loading của view Đặt hàng trong DashBoard
 *  */
export function onShowLoadingDatHangDashBoard(isLoadingDatHang: boolean) {
  return {
    type: DASHBOARD_ACTION.IS_LOADING_DATHANG,
    payload: {
      isLoadingDatHang
    }
  };
}

/**
 * Hiện thị loading của view Tồn kho trong DashBoard
 *  */
export function onShowLoadingTonKhoSPDashBoard(isLoadingTonKhoSP: boolean) {
  return {
    type: DASHBOARD_ACTION.IS_LOADING_TON_SP,
    payload: {
      isLoadingTonKhoSP
    }
  };
}

export function changeLocThoiGianDashBoard(thoiGianLoc: IDateFilterType) {
  return {
    type: DASHBOARD_ACTION.CHANGE_THOI_GIAN_DASHBOARD,
    payload: {
      thoiGianLoc
    }
  };
}

export function changeKhoangThoiGianDashBoard(khoangThoiGian: IDateRange) {
  return {
    type: DASHBOARD_ACTION.CHANGE_KHOANG_THOI_GIAN_DASHBOARD,
    payload: {
      khoangThoiGian
    }
  };
}

export function changeChiNhanhDashBoard(arrChiNhanhDaChonDashBoard: IStorePerson[]) {
  return {
    type: DASHBOARD_ACTION.CHANGE_FILTER_STORE_DASHBOARD,
    payload: {
      arrChiNhanhDaChonDashBoard
    }
  };
}

const DashboardReducer = (
  state: IDashboardState = {
    thoiGianLoc: CONFIG_DATE_FILTER.DASHBOARD[1],
    khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[1].id),
    isFirstLoading: true,
    isRefresh: false,
    isError: false,
    arrCurrentStorePieChartUnChecked: [],
    arrCurrentStoreCotChongUnChecked: [],

    // new 27/9/2021
    arrChiNhanhDaChonDashBoard: [],
    stackbarChart: undefined,
    pieChart: undefined,
    arrStoreAndColorStackChart: [],
    arrStoreAndColorPieChart: [],
    tongGiaTriHoaDonBan: 0,
    tongGiaTriHoaDonTra: 0,
    tongSoHoaDonBan: 0,
    tongSoHoaDonTra: 0,
    tongSoSanPhamTonKho: 0,
    tongSoHoaDonDatHang: 0,
    tongGiaTriHoaDonDatHang: 0,
    tongGiaTriSanPhamTonKho: 0,
    arrProductReportByRevenue: [],
    arrProductReportByQuantity: [],
    isLoadingDatHang: true,
    isLoadingTonKhoSP: true,
    isTop10ForSale: true
  },
  action: IDashboardAction
): IDashboardState => {
  switch (action.type) {
    case DASHBOARD_ACTION.CHANGE_FILTER_STORE_DASHBOARD:
      return {
        ...state,
        arrChiNhanhDaChonDashBoard: action.payload.arrChiNhanhDaChonDashBoard
      };
    case DASHBOARD_ACTION.CHANGE_THOI_GIAN_DASHBOARD:
      return {
        ...state,
        thoiGianLoc: action.payload.thoiGianLoc
      };

    case DASHBOARD_ACTION.CHANGE_KHOANG_THOI_GIAN_DASHBOARD:
      return {
        ...state,
        khoangThoiGian: action.payload.khoangThoiGian
      };

    case DASHBOARD_ACTION.IS_FIRST_LOADING:
      return {...state, isFirstLoading: action.payload?.isFirstLoading};

    case DASHBOARD_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case DASHBOARD_ACTION.IS_LOADING_DATHANG:
      return {...state, isLoadingDatHang: action.payload?.isLoadingDatHang};

    case DASHBOARD_ACTION.IS_LOADING_TON_SP:
      return {...state, isLoadingTonKhoSP: action.payload?.isLoadingTonKhoSP};

    case DASHBOARD_ACTION.STACK_BAR_DASHBOARD_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        stackbarChart: action.payload?.stackbarChart,
        arrStoreAndColorStackChart: action.payload?.arrStoreAndColorStackChart
      };

    case DASHBOARD_ACTION.STACK_BAR_DASHBOARD_FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        stackbarChart: undefined,
        arrStoreAndColorStackChart: []
      };

    case DASHBOARD_ACTION.PIE_CHART_DASHBOARD_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        pieChart: action.payload?.pieChart,
        arrStoreAndColorPieChart: action.payload?.arrStoreAndColorPieChart,
        tongGiaTriHoaDonBan: action.payload?.tongGiaTriHoaDonBan || 0,
        tongGiaTriHoaDonTra: action.payload?.tongGiaTriHoaDonTra || 0,
        tongSoHoaDonBan: action.payload?.tongSoHoaDonBan || 0,
        tongSoHoaDonTra: action.payload?.tongSoHoaDonTra || 0
      };
    case DASHBOARD_ACTION.PIE_CHART_DASHBOARD_FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        pieChart: undefined,
        arrStoreAndColorPieChart: [],
        tongGiaTriHoaDonBan: 0,
        tongGiaTriHoaDonTra: 0,
        tongSoHoaDonBan: 0,
        tongSoHoaDonTra: 0
      };

    case DASHBOARD_ACTION.BCSP_SUCCESS:
      return {
        ...state,
        isLoadingTonKhoSP: false,
        tongSoSanPhamTonKho: action.payload?.tongSoSanPhamTonKho || 0,
        tongGiaTriSanPhamTonKho: action.payload?.tongGiaTriSanPhamTonKho || 0
        // arrProductReportByRevenue: action.payload?.arrProductReportByRevenue || [],
        // arrProductReportByQuantity: action.payload?.arrProductReportByQuantity || []
      };
    case DASHBOARD_ACTION.BCSP_FAIL:
      return {
        ...state,
        isLoadingTonKhoSP: false,
        tongSoSanPhamTonKho: 0,
        tongGiaTriSanPhamTonKho: 0
        // arrProductReportByRevenue: [],
        // arrProductReportByQuantity: []
      };

    case DASHBOARD_ACTION.BCDH_SUCCESS:
      return {
        ...state,
        isLoadingDatHang: false,
        tongSoHoaDonDatHang: action.payload?.tongSoHoaDonDatHang || 0,
        tongGiaTriHoaDonDatHang: action.payload?.tongGiaTriHoaDonDatHang || 0
      };

    case DASHBOARD_ACTION.BCDH_FAIL:
      return {
        ...state,
        isLoadingDatHang: false,
        tongSoHoaDonDatHang: 0,
        tongGiaTriHoaDonDatHang: 0
      };

    case DASHBOARD_ACTION.ON_CHECK_COT_CHONG: {
      let arrCurrentStoreCotChongUnCheckedTmp = [];
      let arrStoreUnCheck = state.arrCurrentStoreCotChongUnChecked || [];
      if (arrStoreUnCheck.length === 0) {
        arrCurrentStoreCotChongUnCheckedTmp = [...arrStoreUnCheck, action.payload];
      } else {
        let arrTmp = arrStoreUnCheck;
        let indexRemove = arrTmp.findIndex(x => x.storeID === action.payload.storeID);
        if (indexRemove > -1) {
          arrTmp.splice(indexRemove, 1);
          arrCurrentStoreCotChongUnCheckedTmp = [...arrTmp];
        } else {
          arrCurrentStoreCotChongUnCheckedTmp = [...arrStoreUnCheck, action.payload];
        }
      }
      return {
        ...state,
        arrCurrentStoreCotChongUnChecked: arrCurrentStoreCotChongUnCheckedTmp
      };
    }
    case DASHBOARD_ACTION.ON_CHECK_STORE_PIECHART: {
      let arrCurrentStorePieChartUnCheckedTmp = [];
      let arrStoreUnCheck = state.arrCurrentStorePieChartUnChecked || [];
      if (arrStoreUnCheck.length === 0) {
        arrCurrentStorePieChartUnCheckedTmp = [...arrStoreUnCheck, action.payload];
      } else {
        let arrTmp = arrStoreUnCheck;
        let indexRemove = arrTmp.findIndex(x => x.storeID === action.payload.storeID);
        if (indexRemove > -1) {
          arrTmp.splice(indexRemove, 1);
          arrCurrentStorePieChartUnCheckedTmp = [...arrTmp];
        } else {
          arrCurrentStorePieChartUnCheckedTmp = [...arrStoreUnCheck, action.payload];
        }
      }
      return {
        ...state,
        arrCurrentStorePieChartUnChecked: arrCurrentStorePieChartUnCheckedTmp
      };
    }

    case DASHBOARD_ACTION.TOP_10_FOR_SALE:
      return {...state, isTop10ForSale: true, arrProductReportByRevenue: []};
    case DASHBOARD_ACTION.TOP_10_FOR_SALE_SUCCESS:
      return {
        ...state,
        isTop10ForSale: false,
        arrProductReportByRevenue: action.payload?.arrProductReportByRevenue || []
      };
    case DASHBOARD_ACTION.TOP_10_FOR_QTY:
      return {...state, isTop10ForQty: true, arrProductReportByQuantity: []};
    case DASHBOARD_ACTION.TOP_10_FOR_QTY_SUCCESS:
      return {
        ...state,
        isTop10ForQty: false,
        arrProductReportByQuantity: action.payload?.arrProductReportByQuantity || []
      };
    default:
      return state;
  }
};

export default DashboardReducer;
