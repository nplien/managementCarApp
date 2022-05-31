import {IIventoryState} from '.';
import {IAppAction, IDateFilterType, IDateRange, ISortFilterType} from 'views/app';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';

export const INVENTORY_ACTION = {
  IS_REFRESH: 'INVENTORY/LIST/IS/REFRESH',

  GET: 'INVENTORY/LIST/GET',
  SUCCESS: 'INVENTORY/LIST/SUCCESS',
  FAIL: 'INVENTORY/LIST/FAIL',

  IS_LOADMORE: 'INVENTORY/LIST/IS/LOADMORE',
  RESET: 'INVENTORY/LIST/RESET',

  CHANGE_KK: 'INVENTORY/SORT/BUTTON/ACTION',
  CHANGE_THOI_GIAN_KK: 'INVENTORY/THOI/GIAN/ACTION',
  CHANGE_KHOANG_THOI_GIAN_KK: 'INVENTORY/KHOANG/THOI/GIAN/ACTION',

  KEYWORD: 'FILTER/INVENTORY/ACTION/KEYWORD',
  STATUSES: 'FILTER/INVENTORY/ACTION/STATUSES',
  SET_VALUE: 'FILTER/INVENTORY/ACTION/SET/VALUE'
};

export function GetInventory() {
  return {
    type: INVENTORY_ACTION.GET
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: INVENTORY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: INVENTORY_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function DestroyInventory() {
  return {
    type: INVENTORY_ACTION.RESET
  };
}

export function changeSortKK(sortFilter: ISortFilterType) {
  return {
    type: INVENTORY_ACTION.CHANGE_KK,
    payload: {
      sortFilter
    }
  };
}

export function locThoiGianKK(thoiGianLocKK?: IDateFilterType) {
  return {
    type: INVENTORY_ACTION.CHANGE_THOI_GIAN_KK,
    payload: {
      thoiGianLocKK
    }
  };
}

export function changeKhoangThoiGianKK(khoangThoiGianKK?: IDateRange) {
  return {
    type: INVENTORY_ACTION.CHANGE_KHOANG_THOI_GIAN_KK,
    payload: {
      khoangThoiGianKK
    }
  };
}

export function setSearchFilterKK(keyword: string) {
  return {
    type: INVENTORY_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setStatusObjKK(status: any) {
  return {
    type: INVENTORY_ACTION.STATUSES,
    payload: {
      status
    }
  };
}

export function setValueKK(filterReducer: IIventoryState) {
  return {
    type: INVENTORY_ACTION.SET_VALUE,
    payload: {
      keyword: filterReducer.keyword,
      arrStatus: filterReducer.arrStatus
    }
  };
}
const InventoryReducer = (
  state: IIventoryState = {
    isFirstLoading: true,
    isRefresh: false,
    arrInventory: [],
    count: 0,
    isLoadMore: false,
    isStop: false,
    isError: false,
    sortFilter: CONFIG_SORT_FILTER.KIEM_KHO[0],
    thoiGianLocKK: CONFIG_DATE_FILTER.KIEM_KHO[0],
    khoangThoiGianKK: Utilities.getDateFilter(CONFIG_DATE_FILTER.KIEM_KHO[0].id),

    keyword: '',
    arrStatus: []
  },
  action: IAppAction<IIventoryState>
): IIventoryState => {
  switch (action.type) {
    case INVENTORY_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case INVENTORY_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case INVENTORY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrInventory: action.payload?.arrInventory,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrInventory: state.arrInventory?.concat(action.payload?.arrInventory || []),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case INVENTORY_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case INVENTORY_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrInventory: [],
        count: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case INVENTORY_ACTION.CHANGE_KK:
      return {
        ...state,
        sortFilter: action.payload?.sortFilter
      };
    case INVENTORY_ACTION.CHANGE_THOI_GIAN_KK:
      return {
        ...state,
        thoiGianLocKK: action.payload?.thoiGianLocKK
      };

    case INVENTORY_ACTION.CHANGE_KHOANG_THOI_GIAN_KK:
      return {
        ...state,
        khoangThoiGianKK: action.payload?.khoangThoiGianKK
      };

    case INVENTORY_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case INVENTORY_ACTION.STATUSES:
      if (state.arrStatus) {
        let indexElement = -1;

        indexElement = state.arrStatus.findIndex(x => x.name === action.payload?.status.name);
        if (indexElement > -1) {
          state.arrStatus.splice(indexElement, 1);
        } else {
          state.arrStatus.push(action.payload?.status);
        }
      }
      return {
        ...state,
        arrStatus: state.arrStatus ? [...state.arrStatus] : []
      };

    case INVENTORY_ACTION.SET_VALUE:
      return {
        ...state,
        keyword: action.payload?.keyword,
        arrStatus: action.payload?.arrStatus
      };
    default:
      return state;
  }
};

export default InventoryReducer;
