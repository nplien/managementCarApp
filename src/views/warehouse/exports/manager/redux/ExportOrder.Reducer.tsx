import {IExportOrderState} from './ExportOrder.Types';
import {IDateFilterType, IAppAction, IDateRange} from 'views/app';
import {ARR_TT_NHAN_HANG, CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';

export const EXPORT_ORDER_ACTION = {
  LIST: 'ORDER/EXPORT/LIST',
  LIST_SUCCESS: 'ORDER/EXPORT/LIST_SUCCESS',
  LIST_FAIL: 'ORDER/EXPORT/LIST_FAIL',
  FIRST_LOADING: 'ORDER/EXPORT/FIRST_LOADING',
  REFRESH: 'ORDER/EXPORT/REFRESH',
  LOADMORE: 'ORDER/EXPORT/LOADMORE',

  SORT_SELECT: 'EXPORT/SORT/SELECT',
  SET_MAP_FILTER: 'EXPORT/FILTER_DATE/SET_MAP_FILTER',

  STATUS_SELECT: 'EXPORT/FILTER_EXPORT/STATUS/SELECT',
  TT_NHAN_HANG: 'EXPORT/FILTER_EXPORT/STATUS/TT_NHAN_HANG',

  KEYWORD_CODE: 'EXPORT/FILTER_EXPORT/KEYWORD_CODE',
  KEYWORD_PRODUCT_SKU: 'EXPORT/FILTER_EXPORT/KEYWORD_PRODUCT_SKU',
  KEYWORD_PRODUCT_NAME: 'EXPORT/FILTER_EXPORT/KEYWORD_PRODUCT_NAME',

  IS_CHUYEN_DI: 'EXPORT/FILTER_EXPORT/IS_CHUYEN_DI',
  IS_NHAP_VE: 'EXPORT/FILTER_EXPORT/IS_NHAP_VE',
  STORE_CHUYEN_DI: 'EXPORT/FILTER_EXPORT/STORE_CHUYEN_DI',
  STORE_NHAP_VE: 'EXPORT/FILTER_EXPORT/STORE_NHAP_VE',

  SET_MAP_TIME_NGAY_NHAN: 'EXPORT/FILTER_EXPORT/SET_MAP_TIME_NGAY_NHAN',
  SET_VALUE: 'EXPORT/FILTER_EXPORT/SET_VALUE'
};

export function getListExportOrder() {
  return {
    type: EXPORT_ORDER_ACTION.LIST
  };
}

export function onFirstLoadingExport(isFirstLoading: boolean): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefreshExport(isRefresh: boolean): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreExport(isLoadMore: boolean): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}
export function setParamsSortExport(currentSort: any) {
  return {
    type: EXPORT_ORDER_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}

export function setFilterDateExport(
  currentDateExport: IDateFilterType,
  convertCurrentDateExport: IDateRange
) {
  return {
    type: EXPORT_ORDER_ACTION.SET_MAP_FILTER,
    payload: {
      currentDateExport,
      convertCurrentDateExport
    }
  };
}

export function setKeywordCodeExport(code: string): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}
export function setKeywordProductSkuExport(product_sku: string): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.KEYWORD_PRODUCT_SKU,
    payload: {
      product_sku
    }
  };
}
export function setKeywordProductNameExport(product_name: string): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.KEYWORD_PRODUCT_NAME,
    payload: {
      product_name
    }
  };
}
export function setTTNhanHangExport(is_match: any): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.TT_NHAN_HANG,
    payload: {
      is_match
    }
  };
}

export function setParamsTimeNgayNhanExport(
  currentTimeNgayNhan: IDateFilterType,
  convertCurrentTimeNgayNhan: IDateRange
) {
  return {
    type: EXPORT_ORDER_ACTION.SET_MAP_TIME_NGAY_NHAN,
    payload: {
      currentTimeNgayNhan,
      convertCurrentTimeNgayNhan
    }
  };
}

export function setStatusExport(arrCurrentStatus: any): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.STATUS_SELECT,
    payload: {
      arrCurrentStatus
    }
  };
}

export function setIsChuyenDiExport(isChuyenDi: boolean): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.IS_CHUYEN_DI,
    payload: {
      isChuyenDi
    }
  };
}

export function setStoreChuyenDiExport(arrStoreChuyenDi: any): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.STORE_CHUYEN_DI,
    payload: {
      arrStoreChuyenDi
    }
  };
}

export function setIsNhapVeExport(isNhapVe: boolean): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.IS_NHAP_VE,
    payload: {
      isNhapVe
    }
  };
}

export function setStoreNhapVeExport(arrStoreNhapVe: any): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.STORE_NHAP_VE,
    payload: {
      arrStoreNhapVe
    }
  };
}
export function setValueExport(
  filterExportReducer: IExportOrderState
): IAppAction<IExportOrderState> {
  return {
    type: EXPORT_ORDER_ACTION.SET_VALUE,
    payload: {
      arrStoreNhapVe: filterExportReducer?.arrStoreNhapVe,
      arrStoreChuyenDi: filterExportReducer?.arrStoreChuyenDi,
      code: filterExportReducer.code,
      product_sku: filterExportReducer.product_sku,
      product_name: filterExportReducer.product_name,
      isNhapVe: filterExportReducer.isNhapVe,
      isChuyenDi: filterExportReducer.isNhapVe,
      is_match: filterExportReducer.is_match,
      currentTimeNgayNhan: filterExportReducer.currentTimeNgayNhan,
      convertCurrentTimeNgayNhan: filterExportReducer.convertCurrentTimeNgayNhan
    }
  };
}
const ExportOrderReducer = (
  state: IExportOrderState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrExportOrder: [],

    currentSort: CONFIG_SORT_FILTER.CHUYEN_HANG[0],
    currentDateExport: CONFIG_DATE_FILTER.CHUYEN_HANG[5],
    convertCurrentDateExport: Utilities.getDateFilter('THANG_NAY'),

    arrCurrentStatus: [],
    isNhapVe: false,
    isChuyenDi: false,
    arrStoreNhapVe: null,
    arrStoreChuyenDi: null,
    is_match: ARR_TT_NHAN_HANG[0],
    currentTimeNgayNhan: CONFIG_DATE_FILTER.CHUYEN_HANG[0],
    convertCurrentTimeNgayNhan: Utilities.getDateFilter('TOAN_THOI_GIAN')
  },
  action: IAppAction<IExportOrderState>
): IExportOrderState => {
  switch (action.type) {
    case EXPORT_ORDER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case EXPORT_ORDER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case EXPORT_ORDER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case EXPORT_ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrExportOrder: action.payload?.arrExportOrder
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrExportOrder: state.arrExportOrder?.concat(action.payload?.arrExportOrder || [])
        };
      }
    case EXPORT_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case EXPORT_ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };
    case EXPORT_ORDER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentDateExport: action.payload?.currentDateExport,
        convertCurrentDateExport: action.payload?.convertCurrentDateExport
      };
    case EXPORT_ORDER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case EXPORT_ORDER_ACTION.KEYWORD_PRODUCT_SKU:
      return {
        ...state,
        product_sku: action.payload?.product_sku
      };
    case EXPORT_ORDER_ACTION.KEYWORD_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload?.product_name
      };
    case EXPORT_ORDER_ACTION.TT_NHAN_HANG:
      return {
        ...state,
        is_match: action.payload?.is_match
      };
    case EXPORT_ORDER_ACTION.SET_MAP_TIME_NGAY_NHAN:
      return {
        ...state,
        currentTimeNgayNhan: action.payload?.currentTimeNgayNhan,
        convertCurrentTimeNgayNhan: action.payload?.convertCurrentTimeNgayNhan
      };
    case EXPORT_ORDER_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrCurrentStatus: action.payload?.arrCurrentStatus
      };
    case EXPORT_ORDER_ACTION.IS_CHUYEN_DI:
      return {
        ...state,
        isChuyenDi: action.payload?.isChuyenDi
      };
    case EXPORT_ORDER_ACTION.IS_NHAP_VE:
      return {
        ...state,
        isNhapVe: action.payload?.isNhapVe
      };
    case EXPORT_ORDER_ACTION.STORE_CHUYEN_DI:
      return {
        ...state,
        arrStoreChuyenDi:
          action.payload?.arrStoreChuyenDi?.length > 0
            ? [...action.payload?.arrStoreChuyenDi]
            : null
      };
    case EXPORT_ORDER_ACTION.STORE_NHAP_VE:
      return {
        ...state,
        arrStoreNhapVe:
          action.payload?.arrStoreNhapVe?.length > 0 ? [...action.payload?.arrStoreNhapVe] : null
      };
    case EXPORT_ORDER_ACTION.SET_VALUE:
      return {
        ...state,
        arrStoreNhapVe: action.payload?.arrStoreNhapVe,
        arrStoreChuyenDi: action.payload?.arrStoreChuyenDi,

        is_match: action.payload?.is_match,

        code: action.payload?.code,
        product_sku: action.payload?.product_sku,
        product_name: action.payload?.product_name,

        isNhapVe: action.payload?.isNhapVe,
        isChuyenDi: action.payload?.isChuyenDi,

        currentTimeNgayNhan: action.payload?.currentTimeNgayNhan,
        convertCurrentTimeNgayNhan: action.payload?.convertCurrentTimeNgayNhan
      };
    default:
      return state;
  }
};

export default ExportOrderReducer;
