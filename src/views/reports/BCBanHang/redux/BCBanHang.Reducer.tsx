import {CONFIG_DATE_FILTER, IKenhBan, IMethodSales} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange} from 'views/app';
import {IBCBanHangState} from './BCBanHang.Types';
import {IBangGiaModel} from 'models/BangGia.Model';
import {IStorePerson} from 'models/ModelBase';

export const BC_BAN_HANG_ACTION = {
  CHANGE_THOI_GIAN: 'BC_BAN_HANG/THOI/GIAN/ACTION',
  CHANGE_KHOANG_THOI_GIAN: 'BC_BAN_HANG/KHOANG/THOI/GIAN/ACTION',
  CHANGE_STORE_SALE: 'BC_BAN_HANG/CHON/CHI/NHANH/CHANGE_STORE_SALE',

  STACK_BAR_BCBH: 'BC_BAN_HANG/STACK_BAR_BCBH',
  STACK_BAR_BCBH_SUCCESS: 'BC_BAN_HANG/STACK_BAR_BCBH/SUCCESS',
  STACK_BAR_BCBH_FAIL: 'BC_BAN_HANG/STACK_BAR_BCBH/FAIL',

  PIE_CHART_BCBH: 'BC_BAN_HANG/PIE_CHART_BCBH',
  PIE_CHART_BCBH_SUCCESS: 'BC_BAN_HANG/PIE_CHART_BCBH/SUCCESS',
  PIE_CHART_BCBH_FAIL: 'BC_BAN_HANG/PIE_CHART_BCBH/FAIL',

  LINE_CHART_BCBH: 'BC_BAN_HANG/LINE_CHART_BCBH',
  LINE_CHART_BCBH_SUCCESS: 'BC_BAN_HANG/LINE_CHART_BCBH/SUCCESS',
  LINE_CHART_BCBH_FAIL: 'BC_BAN_HANG/LINE_CHART_BCBH/FAIL',

  STAFF_BEST_SALE: 'BC_BAN_HANG/STAFF_BEST_SALE',
  STAFF_BEST_SALE_SUCCESS: 'BC_BAN_HANG/STAFF_BEST_SALE/SUCCESS',
  STAFF_BEST_SALE_FAIL: 'BC_BAN_HANG/STAFF_BEST_SALE/FAIL',

  ON_SELECT_STORE_PIECHART: 'BC_BAN_HANG/CHECK_STORE_REPORT/ON_SELECT_STORE_PIECHART',
  ON_SELECT_STORE_STACKBAR: 'BC_BAN_HANG/CHECK_STORE_REPORT/ON_SELECT_STORE_STACKBAR',

  // NOTE filter action
  SALES_CHANNEL_FILTER: 'BC_BAN_HANG/SALES/CHANNEL/FILTER',
  SALES_METHODS_FILTER: 'BC_BAN_HANG/SALES/METHODS/FILTER',
  TABLE_PRICE_FILTER: 'BC_BAN_HANG/TABLE/PRICE/FILTER',
  ARR_TABLE_PRICE_FILTER: 'BC_BAN_HANG/ARR/TABLE/PRICE/FILTER'
};

export function getDoanhThuTheoThoiGianStackBarBCBH() {
  return {
    type: BC_BAN_HANG_ACTION.STACK_BAR_BCBH
  };
}

export function getDoanhThuTheoStorePieChartBCBH() {
  return {
    type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH
  };
}
export function getDoanhThuLoiNhuanGiaVonLineChartBCBH() {
  return {
    type: BC_BAN_HANG_ACTION.LINE_CHART_BCBH
  };
}

export function getStaffBestSaleBCBH() {
  return {
    type: BC_BAN_HANG_ACTION.STAFF_BEST_SALE
  };
}

// NOTE action thoi gian
export function changeLocThoiGianBCBH(thoiGianLoc: IDateFilterType) {
  return {
    type: BC_BAN_HANG_ACTION.CHANGE_THOI_GIAN,
    payload: {
      thoiGianLoc
    }
  };
}

export function changeKhoangThoiGianBCBH(khoangThoiGian: IDateRange) {
  return {
    type: BC_BAN_HANG_ACTION.CHANGE_KHOANG_THOI_GIAN,
    payload: {
      khoangThoiGian
    }
  };
}
export function changeChiNhanhBCBH(arrChiNhanhDaChonBCBH: IStorePerson[]) {
  return {
    type: BC_BAN_HANG_ACTION.CHANGE_STORE_SALE,
    payload: {
      arrChiNhanhDaChonBCBH
    }
  };
}

export function onCheckStorePieChartBCBH(storeID?: string, color?: String) {
  return {
    type: BC_BAN_HANG_ACTION.ON_SELECT_STORE_PIECHART,
    payload: {
      storeID,
      color
    }
  };
}

export function onCheckStoreStackBarBCBH(storeID?: string, color?: String) {
  return {
    type: BC_BAN_HANG_ACTION.ON_SELECT_STORE_STACKBAR,
    payload: {
      storeID,
      color
    }
  };
}

// NOTE goi action filter
export function checkSalesChannel(value: IKenhBan) {
  return {
    type: BC_BAN_HANG_ACTION.SALES_CHANNEL_FILTER,
    payload: {
      value
    }
  };
}
export function checkSalesMethods(value: IMethodSales) {
  return {
    type: BC_BAN_HANG_ACTION.SALES_METHODS_FILTER,
    payload: {
      value
    }
  };
}
export function checkTablePrice(value: IBangGiaModel) {
  return {
    type: BC_BAN_HANG_ACTION.TABLE_PRICE_FILTER,
    payload: {
      value
    }
  };
}
export function checkArrTablePrice(arrCheckitem: IBangGiaModel[]) {
  return {
    type: BC_BAN_HANG_ACTION.ARR_TABLE_PRICE_FILTER,
    payload: {
      arrCheckitem
    }
  };
}

const BCBanHangReducer = (
  state: IBCBanHangState = {
    thoiGianLoc: CONFIG_DATE_FILTER.DASHBOARD[2],
    khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[2].id),
    arrChiNhanhDaChonBCBH: [],
    isFirstLoading: true,
    // isRefresh: false,
    isError: false,
    arrCurrentStorePieChartUnChecked: [],
    arrCurrentStoreCotChongUnChecked: [],
    // new 27/9/2021
    stackbarChart: undefined,
    pieChart: undefined,
    lineChart: undefined,
    arrStoreAndColorStackChart: [],
    arrStoreAndColorPieChart: [],
    tongLoiNhuan: 0,
    tongDoanhThu: 0,
    tongGiaVon: 0,
    arrProductReportByRevenue: [],
    arrProductReportByQuantity: [],
    arrStaffsBestSales: [],

    // filter
    methodSale: undefined,
    arrKenhban: [],
    arrTablePrice: []
  },
  action: {type: string; payload: any}
): IBCBanHangState => {
  switch (action.type) {
    case BC_BAN_HANG_ACTION.CHANGE_THOI_GIAN:
      return {
        ...state,
        thoiGianLoc: action.payload.thoiGianLoc
      };

    case BC_BAN_HANG_ACTION.CHANGE_KHOANG_THOI_GIAN:
      return {
        ...state,
        khoangThoiGian: action.payload.khoangThoiGian
      };
    case BC_BAN_HANG_ACTION.CHANGE_STORE_SALE:
      return {...state, arrChiNhanhDaChonBCBH: action.payload?.arrChiNhanhDaChonBCBH};

    case BC_BAN_HANG_ACTION.STACK_BAR_BCBH_SUCCESS:
      return {
        ...state,
        // isRefresh: false,
        stackbarChart: action.payload?.stackbarChart,
        arrStoreAndColorStackChart: action.payload?.arrStoreAndColorStackChart
      };

    case BC_BAN_HANG_ACTION.STACK_BAR_BCBH_FAIL:
      return {
        ...state,
        // isRefresh: false,
        stackbarChart: undefined,
        arrStoreAndColorStackChart: []
      };

    case BC_BAN_HANG_ACTION.PIE_CHART_BCBH_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        pieChart: action.payload?.pieChart,
        arrStoreAndColorPieChart: action.payload?.arrStoreAndColorPieChart
      };

    case BC_BAN_HANG_ACTION.PIE_CHART_BCBH_FAIL:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        pieChart: undefined,
        arrStoreAndColorPieChart: []
      };

    case BC_BAN_HANG_ACTION.LINE_CHART_BCBH_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        lineChart: action.payload?.lineChart,
        tongLoiNhuan: action.payload?.tongLoiNhuan || 0,
        tongDoanhThu: action.payload?.tongDoanhThu || 0,
        tongGiaVon: action.payload?.tongGiaVon || 0
      };

    case BC_BAN_HANG_ACTION.LINE_CHART_BCBH_FAIL:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        lineChart: undefined,
        tongLoiNhuan: 0,
        tongDoanhThu: 0,
        tongGiaVon: 0
      };
    case BC_BAN_HANG_ACTION.STAFF_BEST_SALE_SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        arrStaffsBestSales: action.payload?.arrStaffsBestSales
      };
    case BC_BAN_HANG_ACTION.STAFF_BEST_SALE_FAIL:
      return {
        ...state,
        isFirstLoading: false,
        // isRefresh: false,
        arrStaffsBestSales: []
      };

    case BC_BAN_HANG_ACTION.ON_SELECT_STORE_STACKBAR: {
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
    case BC_BAN_HANG_ACTION.ON_SELECT_STORE_PIECHART: {
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

    case BC_BAN_HANG_ACTION.SALES_METHODS_FILTER:
      if (state.methodSale && state.methodSale?.id === action.payload?.value.id) {
        state.methodSale = undefined;
      } else {
        state.methodSale = action.payload?.value;
      }
      return {...state};
    case BC_BAN_HANG_ACTION.SALES_CHANNEL_FILTER:
      if (state.arrKenhban) {
        const indexCurrent = state.arrKenhban.findIndex(value => {
          return value.id === action.payload?.value.id;
        });
        if (indexCurrent !== -1) {
          state.arrKenhban.splice(indexCurrent, 1);
        } else {
          state.arrKenhban.push(action.payload.value);
        }
        return {...state, arrKenhban: [...state.arrKenhban]};
      }
      return state;
    case BC_BAN_HANG_ACTION.TABLE_PRICE_FILTER:
      if (state.arrTablePrice) {
        const indexCurrent = state.arrTablePrice.findIndex(value => {
          return value.id === action.payload?.value.id;
        });
        if (indexCurrent !== -1) {
          state.arrTablePrice.splice(indexCurrent, 1);
        } else {
          state.arrTablePrice.push(action.payload.value);
        }
        return {...state, arrTablePrice: [...state.arrTablePrice]};
      }
      return state;
    case BC_BAN_HANG_ACTION.ARR_TABLE_PRICE_FILTER:
      return {...state, arrTablePrice: [...action.payload.arrCheckitem]};
    default:
      return state;
  }
};

export default BCBanHangReducer;
