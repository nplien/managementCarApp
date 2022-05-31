import {IDetailBCHHState} from './DetailBCHH.Types';
import {IDateFilterType, IAppAction, IDateRange, ISortFilterType} from 'views/app';
import {
  ARR_TON_KHO_BC,
  CONFIG_DATE_FILTER,
  CONFIG_SORT_FILTER,
  HIEN_THI
} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IBCSPRequest} from 'services/DashBoard.Api';
import {IStorePerson} from 'models/ModelBase';

export const DETAIL_BCHH_ACTION = {
  LIST: 'BCHH_DETAIL/LIST',
  LIST_SUCCESS: 'BCHH_DETAIL/LIST_SUCCESS',
  LIST_FAIL: 'BCHH_DETAIL/LIST_FAIL',
  FIRST_LOADING: 'BCHH_DETAIL/FIRST_LOADING',
  REFRESH: 'BCHH_DETAIL/REFRESH',
  LOADMORE: 'BCHH_DETAIL/LOADMORE',

  CLEAR_BCHH_DETAIL: 'BCHH_DETAIL/CLEAR/BCHH_DETAIL',

  SORT_SELECT: 'BCHH_DETAIL/SORT/SELECT',
  STORE_BCHH_DETAIL: 'BCHH_DETAIL/SORT/STORE_BCHH_DETAIL',
  SET_MAP_FILTER: 'BCHH_DETAIL/FILTER_DATE/SET_MAP_FILTER',

  SET_VALUE: 'BCHH_DETAIL/FILTER/SET_VALUE',

  KEYWORD: 'BCHH_DETAIL/FILTER/KEYWORD',

  STATUS_SELECT: 'BCHH_DETAIL/FILTER/STATUS_SELECT',

  STOCK: 'BCHH_DETAIL/FILTER/STOCK',
  CATEGORY_SELECT: 'BCHH_DETAIL/FILTER/CATEGORY_SELECT',
  CHANGE_TYPE: 'BCHH_DETAIL/FILTER/CHANGE_TYPE'
};

export function getListDetailBCHH(params: IBCSPRequest) {
  return {
    type: DETAIL_BCHH_ACTION.LIST,
    params
  };
}
export function clearListDetailBCHH() {
  return {
    type: DETAIL_BCHH_ACTION.CLEAR_BCHH_DETAIL
  };
}
export function onFisrtLoadingDetailBCHH(isFirstLoading: boolean): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefreshDetailBCHH(isRefresh: boolean): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreDetailBCHH(isLoadMore: boolean): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setParamsSortDetailBCHH(currentSortDetailBCHH: ISortFilterType) {
  return {
    type: DETAIL_BCHH_ACTION.SORT_SELECT,
    payload: {
      currentSortDetailBCHH
    }
  };
}
export function setStoreDetailBCHH(
  arrStoreDetailBCHH?: IStorePerson[]
): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.STORE_BCHH_DETAIL,
    payload: {
      arrStoreDetailBCHH
    }
  };
}

export function setFilterDateDetailBCHH(
  thoiGianLocDetailBCHH?: IDateFilterType,
  khoangThoiGianDetailBCHH?: IDateRange
) {
  return {
    type: DETAIL_BCHH_ACTION.SET_MAP_FILTER,
    payload: {
      thoiGianLocDetailBCHH,
      khoangThoiGianDetailBCHH
    }
  };
}

export function setKeyWordDetailBCHH(keyword: string): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setStatusDetailBCHH(statuses?: any): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.STATUS_SELECT,
    payload: {
      statuses
    }
  };
}
export function setTypeDetailBCHH(statuses: string[]): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.CHANGE_TYPE,
    payload: {
      type: statuses
    }
  };
}

export function setStockDetailBCHH(stock?: any): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.STOCK,
    payload: {
      stock
    }
  };
}
export function setCategorylsDetailBCHH(name?: string, id?: string): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.CATEGORY_SELECT,
    payload: {
      categories: {name: name, id: id}
    }
  };
}

export function setValueDetailBCHH(
  filterDetailBCHHReducer: IDetailBCHHState
): IAppAction<IDetailBCHHState> {
  return {
    type: DETAIL_BCHH_ACTION.SET_VALUE,
    payload: {
      keyword: filterDetailBCHHReducer.keyword,
      categories: filterDetailBCHHReducer.categories,
      stock: filterDetailBCHHReducer.stock,
      type: filterDetailBCHHReducer.type
    }
  };
}
const DetailBCHHReducer = (
  state: IDetailBCHHState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrDetailBCHH: [],

    currentSortDetailBCHH: CONFIG_SORT_FILTER.BAO_CAO_HANG_HOA[0],
    arrStoreDetailBCHH: [],

    thoiGianLocDetailBCHH: CONFIG_DATE_FILTER.BAO_CAO_HANG_HOA[5],
    khoangThoiGianDetailBCHH: Utilities.getDateFilter(CONFIG_DATE_FILTER.BAO_CAO_HANG_HOA[5].id),

    statuses: HIEN_THI[1].value,
    stock: ARR_TON_KHO_BC[0].id,
    type: []
  },
  action: IAppAction<IDetailBCHHState>
): IDetailBCHHState => {
  switch (action.type) {
    case DETAIL_BCHH_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case DETAIL_BCHH_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case DETAIL_BCHH_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case DETAIL_BCHH_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrDetailBCHH: action.payload?.arrDetailBCHH,
          sumDetailBCHH: action.payload?.sumDetailBCHH
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrDetailBCHH: state.arrDetailBCHH?.concat(action.payload?.arrDetailBCHH || []),
          sumDetailBCHH: action.payload?.sumDetailBCHH
        };
      }
    case DETAIL_BCHH_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case DETAIL_BCHH_ACTION.CLEAR_BCHH_DETAIL:
      return {
        isRefresh: false,
        count: 0,
        isStop: false,
        isLoadMore: false,
        arrDetailBCHH: []
      };
    case DETAIL_BCHH_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSortDetailBCHH: action.payload?.currentSortDetailBCHH
      };
    case DETAIL_BCHH_ACTION.STORE_BCHH_DETAIL:
      return {
        ...state,
        arrStoreDetailBCHH: action.payload?.arrStoreDetailBCHH
      };
    case DETAIL_BCHH_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        thoiGianLocDetailBCHH: action.payload?.thoiGianLocDetailBCHH,
        khoangThoiGianDetailBCHH: action.payload?.khoangThoiGianDetailBCHH
      };
    case DETAIL_BCHH_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case DETAIL_BCHH_ACTION.STATUS_SELECT:
      return {
        ...state,
        statuses: action.payload?.statuses
      };
    case DETAIL_BCHH_ACTION.CHANGE_TYPE:
      if (state.type) {
        let indexElement = -1;
        indexElement = state.type.findIndex((x: any) => x?.name === action.payload?.type.name);
        if (indexElement > -1) {
          state.type.splice(indexElement, 1);
        } else {
          state.type.push(action.payload?.type);
        }
      }
      return {
        ...state,
        type: state.type ? [...state.type] : []
      };
    case DETAIL_BCHH_ACTION.CATEGORY_SELECT:
      return {
        ...state,
        categories: action.payload?.categories
      };
    case DETAIL_BCHH_ACTION.STOCK:
      return {
        ...state,
        stock: action.payload?.stock
      };
    case DETAIL_BCHH_ACTION.SET_VALUE:
      return {
        ...state
        // keyword: action.payload?.keyword,
        // categories: action.payload?.categories,
        // stock: action.payload?.stock,
        // type: action.payload?.type
      };
    default:
      return state;
  }
};

export default DetailBCHHReducer;
