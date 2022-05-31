import {IImportOrderState} from './ImportOrder.Types';
import {IDateFilterType, IAppAction, IDateRange} from 'views/app';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {ICreatedBy} from 'models/ModelBase';
export const IMPORT_ORDER_ACTION = {
  LIST: 'ORDER/IMPORT/LIST',
  LIST_SUCCESS: 'ORDER/IMPORT/LIST_SUCCESS',
  LIST_FAIL: 'ORDER/IMPORT/LIST_FAIL',
  FIRST_LOADING: 'ORDER/IMPORT/FIRST_LOADING',
  REFRESH: 'ORDER/IMPORT/REFRESH',
  LOADMORE: 'ORDER/IMPORT/LOADMORE',

  SORT_SELECT: 'ORDER/IMPORT/SORT/SELECT',
  SET_MAP_FILTER: 'ORDER/IMPORT/FILTER_DATE/SET_MAP_FILTER',
  STORE_DA_CHON_IMPORT: 'IMPORT/FILTER_IMPORT/STORE_DA_CHON_IMPORT',

  KEYWORD_CODE: 'IMPORT/FILTER_IMPORT/KEYWORD_CODE',
  KEYWORD_NOTE: 'IMPORT/FILTER_IMPORT/KEYWORD_NOTE',
  KEYWORD_PRODUCT_SKU: 'IMPORT/FILTER_IMPORT/KEYWORD_PRODUCT_SKU',
  KEYWORD_PRODUCT_NAME: 'IMPORT/FILTER_IMPORT/KEYWORD_PRODUCT_NAME',

  STATUS_SELECT: 'IMPORT/FILTER_IMPORT/STATUS/SELECT',
  CREATEDBY: 'ORDER/FILTER/CREATEDBY',
  SET_VALUE: 'IMPORT/FILTER_IMPORT/SET_VALUE'
};

export function getListImportOrder() {
  return {
    type: IMPORT_ORDER_ACTION.LIST
  };
}

export function onFirstLoadingImportOrder(isFirstLoading: boolean): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefreshImportOrder(isRefresh: boolean): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreImportOrder(isLoadMore: boolean): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setParamsSortIP(currentSortIP: any) {
  return {
    type: IMPORT_ORDER_ACTION.SORT_SELECT,
    payload: {
      currentSortIP
    }
  };
}

export function setParamsFilterDateIP(
  currentFilterDate: IDateFilterType,
  convertCurrentFilterDate: IDateRange
) {
  return {
    type: IMPORT_ORDER_ACTION.SET_MAP_FILTER,
    payload: {
      currentFilterDate,
      convertCurrentFilterDate
    }
  };
}

export function setCreatedByIP(created_by?: ICreatedBy) {
  return {
    type: IMPORT_ORDER_ACTION.CREATEDBY,
    payload: {created_by}
  };
}
export function setKeywordCodeImport(code: string): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}
export function setKeywordNoteImport(note: string): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.KEYWORD_NOTE,
    payload: {
      note
    }
  };
}
export function setKeywordProduct_skuImport(product_sku: string): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.KEYWORD_PRODUCT_SKU,
    payload: {
      product_sku
    }
  };
}
export function setKeywordProduct_nameImport(product_name: string): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.KEYWORD_PRODUCT_NAME,
    payload: {
      product_name
    }
  };
}

export function setStatusImport(arrCurrentStatus: any): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.STATUS_SELECT,
    payload: {
      arrCurrentStatus
    }
  };
}

export function setStoreNhapVeImport(arrStoreDaChonImport: any): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.STORE_DA_CHON_IMPORT,
    payload: {
      arrStoreDaChonImport
    }
  };
}
export function setValueImport(
  importFilterReducer: IImportOrderState
): IAppAction<IImportOrderState> {
  return {
    type: IMPORT_ORDER_ACTION.SET_VALUE,
    payload: {
      code: importFilterReducer.code,
      note: importFilterReducer.note,
      product_sku: importFilterReducer.product_sku,
      product_name: importFilterReducer.product_name
    }
  };
}

const ImportOrderReducer = (
  state: IImportOrderState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrImportOrder: [],
    currentSortIP: CONFIG_SORT_FILTER.NHAP_HANG[0],
    currentFilterDate: CONFIG_DATE_FILTER.NHAP_HANG[5],
    convertCurrentFilterDate: Utilities.getDateFilter(CONFIG_DATE_FILTER.NHAP_HANG[5].id),
    arrCurrentStatus: [],
    arrStoreDaChonImport: []
  },
  action: IAppAction<IImportOrderState>
): IImportOrderState => {
  switch (action.type) {
    case IMPORT_ORDER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case IMPORT_ORDER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case IMPORT_ORDER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case IMPORT_ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrImportOrder: action.payload?.arrImportOrder
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrImportOrder: state.arrImportOrder?.concat(action.payload?.arrImportOrder || [])
        };
      }
    case IMPORT_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case IMPORT_ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSortIP: action.payload?.currentSortIP
      };
    case IMPORT_ORDER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentFilterDate: action.payload?.currentFilterDate,
        convertCurrentFilterDate: action.payload?.convertCurrentFilterDate
      };
    case IMPORT_ORDER_ACTION.CREATEDBY:
      return {
        ...state,
        created_by: action.payload?.created_by
      };
    case IMPORT_ORDER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case IMPORT_ORDER_ACTION.KEYWORD_NOTE:
      return {
        ...state,
        note: action.payload?.note
      };
    case IMPORT_ORDER_ACTION.KEYWORD_PRODUCT_SKU:
      return {
        ...state,
        product_sku: action.payload?.product_sku
      };
    case IMPORT_ORDER_ACTION.KEYWORD_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload?.product_name
      };
    case IMPORT_ORDER_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrCurrentStatus: action.payload?.arrCurrentStatus
      };
    case IMPORT_ORDER_ACTION.STORE_DA_CHON_IMPORT:
      return {
        ...state,
        arrStoreDaChonImport: action.payload?.arrStoreDaChonImport
      };
    case IMPORT_ORDER_ACTION.SET_VALUE:
      return {
        ...state,
        code: action.payload?.code,
        note: action.payload?.note,
        product_sku: action.payload?.product_sku,
        product_name: action.payload?.product_name
      };
    default:
      return state;
  }
};

export default ImportOrderReducer;
