import {IPaymentState} from './Payment.Types';
import {IAppAction, IDateFilterType, IDateRange} from 'views/app';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IStorePerson} from 'models/ModelBase';

export const PAYMENT_ACTION = {
  LIST: 'PAYMENT/LIST',
  LIST_SUCCESS: 'PAYMENT/LIST/SUCCESS',
  LIST_FAIL: 'PAYMENT/LIST/FAIL',
  FIRST_LOADING: 'PAYMENT/FIRST_LOADING',
  REFRESH: 'PAYMENT/LIST/REFRESH',
  LOADMORE: 'PAYMENT/LIST/LOADMORE',
  SORT_SELECT: 'SOQUY/SORT/SELECT',
  SET_MAP_FILTER: 'SOQUY/FILTER_DATE/SET_MAP_FILTER',

  CHANGE_STORE_SQ: 'SOQUY/CHANGE_STORE_SQ',

  DESTROY_SO_QUY: 'SOQUY/FILTER_DATE/DESTROY_SO_QUY'
};

export function setDateFilterSoQuy(
  currentFilterDateSQ: IDateFilterType,
  convertCurrentFilterDateSQ: IDateRange
) {
  return {
    type: PAYMENT_ACTION.SET_MAP_FILTER,
    payload: {
      currentFilterDateSQ,
      convertCurrentFilterDateSQ
    }
  };
}

export function onChangeStoreSQ(arrChiNhanhDaChonSQ: IStorePerson[]) {
  return {
    type: PAYMENT_ACTION.CHANGE_STORE_SQ,
    payload: {
      arrChiNhanhDaChonSQ
    }
  };
}

export function setParamsSort(currentSort: any) {
  return {
    type: PAYMENT_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}

export function onFirstLoading(isFirstLoading: boolean): IAppAction<IPaymentState> {
  return {
    type: PAYMENT_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefresh(isRefresh: boolean): IAppAction<IPaymentState> {
  return {
    type: PAYMENT_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmore(isLoadMore: boolean): IAppAction<IPaymentState> {
  return {
    type: PAYMENT_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function getListPayment() {
  return {
    type: PAYMENT_ACTION.LIST
  };
}

export function onDestroySoQuy() {
  return {
    type: PAYMENT_ACTION.DESTROY_SO_QUY
  };
}

const PaymentReducer = (
  state: IPaymentState = {
    isRefresh: false,
    isFirstLoading: true,
    isLoadMore: false,
    isStop: false,
    count: 0,
    arrPayment: [],
    currentSort: CONFIG_SORT_FILTER.SO_QUY[0],
    objRevenue: {
      total_value_0: 0,
      total_value_1: 0,
      total_value_2: 0,
      total_value_3: 0
    },
    currentFilterDateSQ: CONFIG_DATE_FILTER.SO_QUY[5],
    convertCurrentFilterDateSQ: Utilities.getDateFilter(CONFIG_DATE_FILTER.SO_QUY[5].id),
    arrChiNhanhDaChonSQ: []
  },
  action: IAppAction<IPaymentState>
): IPaymentState => {
  switch (action.type) {
    case PAYMENT_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentFilterDateSQ: action.payload?.currentFilterDateSQ,
        convertCurrentFilterDateSQ: action.payload?.convertCurrentFilterDateSQ
      };

    case PAYMENT_ACTION.CHANGE_STORE_SQ:
      return {
        ...state,
        arrChiNhanhDaChonSQ: action.payload?.arrChiNhanhDaChonSQ || []
      };

    case PAYMENT_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };
    case PAYMENT_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case PAYMENT_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case PAYMENT_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case PAYMENT_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrPayment: action.payload?.arrPayment,
          objRevenue: action.payload?.objRevenue
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrPayment: state.arrPayment?.concat(action.payload?.arrPayment || []),
          objRevenue: action.payload?.objRevenue
        };
      }
    case PAYMENT_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case PAYMENT_ACTION.DESTROY_SO_QUY:
      return {
        isRefresh: false,
        isFirstLoading: true,
        isLoadMore: false,
        isStop: false,
        count: 0,
        arrPayment: [],
        currentSort: CONFIG_SORT_FILTER.SO_QUY[0],
        objRevenue: {
          total_value_0: 0,
          total_value_1: 0,
          total_value_2: 0,
          total_value_3: 0
        },
        currentFilterDateSQ: CONFIG_DATE_FILTER.SO_QUY[5],
        convertCurrentFilterDateSQ: Utilities.getDateFilter(CONFIG_DATE_FILTER.SO_QUY[5].id),
        arrChiNhanhDaChonSQ: []
      };
    default:
      return state;
  }
};

export default PaymentReducer;
