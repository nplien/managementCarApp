import {IManagerBranchState} from './ManagerBranch.Type';
import {IAppAction} from 'views/app';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';

export const MANAGER_BRANCH_ACTION = {
  IS_REFRESH: 'MANAGER/BRANCH/LIST/IS/REFRESH',

  GET: 'MANAGER/BRANCH/LIST/GET',
  SUCCESS: 'MANAGER/BRANCH/LIST/SUCCESS',
  FAIL: 'MANAGER/BRANCH/LIST/FAIL',

  IS_LOADMORE: 'MANAGER/BRANCH/LIST/IS/LOADMORE',
  RESET: 'MANAGER/BRANCH/LIST/RESET',

  FILTER_DATE_BRAND: 'MANAGER/BRANCH/LIST/FILTER_DATE_BRAND',
  KEYWORD: 'MANAGER/BRANCH/LIST/KEYWORD',
  SET_VALUE: 'MANAGER/BRANCH/LIST/SET_VALUE',
  ACTIVE_FILTER: 'MANAGER/BRANCH/LIST/ACTIVE_FILTER'
};
/**
 *
 * @param action
 * 1. Tìm kiếm customer
 * 2. Refreshing customer
 * 3. Load List ManagerBranch
 */
export function GetManagerBranch(): IAppAction<IManagerBranchState> {
  return {
    type: MANAGER_BRANCH_ACTION.GET
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: MANAGER_BRANCH_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: MANAGER_BRANCH_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function reset() {
  return {
    type: MANAGER_BRANCH_ACTION.RESET
  };
}

export function setParamsFilterDate(
  currentFilterDateBrand: any,
  convertCurrentFilterDateBrand: any
): IAppAction<IManagerBranchState> {
  return {
    type: MANAGER_BRANCH_ACTION.FILTER_DATE_BRAND,
    payload: {
      currentFilterDateBrand,
      convertCurrentFilterDateBrand
    }
  };
}
export function setKeyword(keyword: string): IAppAction<IManagerBranchState> {
  return {
    type: MANAGER_BRANCH_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setActive(status: string): IAppAction<IManagerBranchState> {
  return {
    type: MANAGER_BRANCH_ACTION.ACTIVE_FILTER,
    payload: {
      status
    }
  };
}

export function setValueBrand(
  ManagerBranchReducer: IManagerBranchState
): IAppAction<IManagerBranchState> {
  return {
    type: MANAGER_BRANCH_ACTION.SET_VALUE,
    payload: {
      keyword: ManagerBranchReducer.keyword,
      status: ManagerBranchReducer.status
    }
  };
}

const ManagerBranchReducer = (
  state: IManagerBranchState = {
    isFirstLoading: true,
    isRefresh: false,
    count: 0,
    arrManagerBranch: [],
    isLoadMore: false,
    isStop: false,
    isError: false,
    currentFilterDateBrand: CONFIG_DATE_FILTER.STORE[5],
    convertCurrentFilterDateBrand: Utilities.getDateFilter('THANG_NAY')
  },
  action: IAppAction<IManagerBranchState>
): IManagerBranchState => {
  switch (action.type) {
    case MANAGER_BRANCH_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    case MANAGER_BRANCH_ACTION.ACTIVE_FILTER:
      return {
        ...state,
        status: action?.payload?.status
      };
    case MANAGER_BRANCH_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case MANAGER_BRANCH_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case MANAGER_BRANCH_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          count: action.payload?.count,
          arrManagerBranch: action.payload?.arrManagerBranch,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          count: action.payload?.count,
          arrManagerBranch: state.arrManagerBranch?.concat(action.payload?.arrManagerBranch || []),
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case MANAGER_BRANCH_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    case MANAGER_BRANCH_ACTION.FILTER_DATE_BRAND:
      return {
        ...state,
        currentFilterDateBrand: action.payload?.currentFilterDateBrand,
        convertCurrentFilterDateBrand: action.payload?.convertCurrentFilterDateBrand
      };
    case MANAGER_BRANCH_ACTION.SET_VALUE:
      return {
        ...state,
        keyword: action.payload?.keyword,
        status: action.payload?.status
      };

    case MANAGER_BRANCH_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        count: 0,
        arrManagerBranch: [],
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    default:
      return state;
  }
};

export default ManagerBranchReducer;
