import {IDeliveryOrderState} from './DeliveryOrder.Types';
import {IAppAction} from 'views/app';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';

export const DELIVERY_ORDER_ACTION = {
  LIST: 'ORDER/DELIVERY/LIST',
  LIST_SUCCESS: 'ORDER/DELIVERY/LIST_SUCCESS',
  LIST_FAIL: 'ORDER/DELIVERY/LIST_FAIL',
  FIRST_LOADING: 'ORDER/DELIVERY/FIRST_LOADING',
  REFRESH: 'ORDER/DELIVERY/REFRESH',
  LOADMORE: 'ORDER/DELIVERY/LOADMORE',
  SET_MAP_FILTER: 'DELIVERY/FILTER_DATE/SET_MAP_FILTER',
  SORT_SELECT: 'DELIVERY/SORT/SELECT'
};

export function setParamsSort(currentSortVD: any) {
  return {
    type: DELIVERY_ORDER_ACTION.SORT_SELECT,
    payload: {
      currentSortVD
    }
  };
}

export function setParamsFilterDate(thoiGianLoc: any, khoangThoiGian: any) {
  return {
    type: DELIVERY_ORDER_ACTION.SET_MAP_FILTER,
    payload: {
      thoiGianLoc,
      khoangThoiGian
    }
  };
}

export function getListDeliveryOrder() {
  return {
    type: DELIVERY_ORDER_ACTION.LIST
  };
}

export function onFirstLoading(isFirstLoading: boolean): IAppAction<IDeliveryOrderState> {
  return {
    type: DELIVERY_ORDER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefresh(isRefresh: boolean): IAppAction<IDeliveryOrderState> {
  return {
    type: DELIVERY_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmore(isLoadMore: boolean): IAppAction<IDeliveryOrderState> {
  return {
    type: DELIVERY_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

const DeliveryOrderReducer = (
  state: IDeliveryOrderState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrDeliveryOrder: [],
    thoiGianLoc: CONFIG_DATE_FILTER.VAN_DON[5],
    khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.VAN_DON[5].id),
    currentSortVD: CONFIG_SORT_FILTER.VAN_DON[0]
  },
  action: IAppAction<IDeliveryOrderState>
): IDeliveryOrderState => {
  switch (action.type) {
    case DELIVERY_ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSortVD: action.payload?.currentSortVD
      };
    case DELIVERY_ORDER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        thoiGianLoc: action.payload?.thoiGianLoc,
        khoangThoiGian: action.payload?.khoangThoiGian
      };
    case DELIVERY_ORDER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case DELIVERY_ORDER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case DELIVERY_ORDER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case DELIVERY_ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrDeliveryOrder: action.payload?.arrDeliveryOrder
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrDeliveryOrder: state.arrDeliveryOrder?.concat(action.payload?.arrDeliveryOrder || [])
        };
      }
    case DELIVERY_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    default:
      return state;
  }
};

export default DeliveryOrderReducer;
