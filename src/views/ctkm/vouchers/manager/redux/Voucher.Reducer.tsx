import {IVoucherState} from './Voucher.Types';
import {IAppAction} from 'views/app';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';

export const VOUCHER_ACTION = {
  LIST: 'VOUCHER/LIST',
  LIST_SUCCESS: 'VOUCHER/LIST_SUCCESS',
  LIST_FAIL: 'VOUCHER/LIST_FAIL',
  DETAIL: 'VOUCHER/DETAIL',
  DETAIL_SUCCESS: 'VOUCHER/DETAIL/SUCCESS',
  DETAIL_FAIL: 'VOUCHER/DETAIL/FAIL',
  DETAIL_FIRST: 'VOUCHER/DETAIL/FIRST',
  FIRST_LOADING: 'VOUCHER/FIRST_LOADING',
  REFRESH: 'VOUCHER/REFRESH',
  LOADMORE: 'VOUCHER/LOADMORE',
  ACTIVE_FILTER: 'VOUCHER/ACTIVE',

  FILTER_DATE_VOUCHER: 'VOUCHER/FILTER_DATE_VOUCHER',
  STORE_VOUCHER: 'VOUCHER/STORE_VOUCHER',
  KEYWORD_NAME: 'VOUCHER/KEYWORD_NAME',
  KEYWORD_CODE: 'VOUCHER/KEYWORD_CODE',
  SET_VALUE: 'VOUCHER/SET_VALUE'
};

export function getListVoucher() {
  return {
    type: VOUCHER_ACTION.LIST
  };
}

export function getDetailVoucher(id: string | number) {
  return {
    type: VOUCHER_ACTION.DETAIL,
    payload: {
      id
    }
  };
}

export function setDetailVoucherFirst(isFirst: boolean) {
  return {
    type: VOUCHER_ACTION.DETAIL_FIRST,
    payload: {
      isFirstDetail: isFirst
    }
  };
}

export function onFirstLoading(isFirstLoading: boolean): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setActive(status: string): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.ACTIVE_FILTER,
    payload: {
      status
    }
  };
}

export function setParamsFilterDate(
  currentFilterDateVC: any,
  convertCurrentFilterDateVC: any
): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.FILTER_DATE_VOUCHER,
    payload: {
      currentFilterDateVC,
      convertCurrentFilterDateVC
    }
  };
}
export function setStoreVoucher(arrStoreVoucher: any): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.STORE_VOUCHER,
    payload: {
      arrStoreVoucher
    }
  };
}
export function setKeywordName(name: string): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.KEYWORD_NAME,
    payload: {
      name
    }
  };
}
export function setKeywordCode(code: string): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}

export function setValueVoucher(VoucherReducer: IVoucherState): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.SET_VALUE,
    payload: {
      name: VoucherReducer.name,
      code: VoucherReducer.code,
      status: VoucherReducer.status
    }
  };
}

export function setOnRefresh(isRefresh: boolean): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmore(isLoadMore: boolean): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

const VoucherReducer = (
  state: IVoucherState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrVoucher: [],
    status: 'active',
    detailOfVoucher: undefined,
    isError: false,
    isFirstDetail: true,
    currentFilterDateVC: CONFIG_DATE_FILTER.VOUCHER[5],
    convertCurrentFilterDateVC: Utilities.getDateFilter('THANG_NAY'),
    arrStoreVoucher: []
  },
  action: IAppAction<IVoucherState>
): IVoucherState => {
  switch (action.type) {
    case VOUCHER_ACTION.KEYWORD_NAME:
      return {
        ...state,
        name: action.payload?.name
      };
    case VOUCHER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case VOUCHER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case VOUCHER_ACTION.ACTIVE_FILTER:
      return {
        ...state,
        status: action?.payload?.status
      };
    case VOUCHER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case VOUCHER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case VOUCHER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrVoucher: action.payload?.arrVoucher
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrVoucher: state.arrVoucher?.concat(action.payload?.arrVoucher || [])
        };
      }
    case VOUCHER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false,
        isError: false
      };

    case VOUCHER_ACTION.FILTER_DATE_VOUCHER:
      return {
        ...state,
        currentFilterDateVC: action.payload?.currentFilterDateVC,
        convertCurrentFilterDateVC: action.payload?.convertCurrentFilterDateVC
      };
    case VOUCHER_ACTION.STORE_VOUCHER:
      return {
        ...state,
        arrStoreVoucher:
          action.payload?.arrStoreVoucher.length > 0 ? [...action.payload?.arrStoreVoucher] : null
      };
    case VOUCHER_ACTION.DETAIL_SUCCESS:
      return {...state, detailOfVoucher: action.payload?.detailOfVoucher, isFirstDetail: false};
    case VOUCHER_ACTION.DETAIL_FAIL:
      return {...state, detailOfVoucher: undefined, isFirstDetail: false};
    case VOUCHER_ACTION.DETAIL_FIRST:
      return {...state, isFirstDetail: action.payload?.isFirstDetail};
    case VOUCHER_ACTION.SET_VALUE:
      return {
        ...state,
        code: action.payload?.code,
        name: action.payload?.name,
        status: action.payload?.status
      };

    default:
      return state;
  }
};

export default VoucherReducer;
