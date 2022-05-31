import {ICategoryState} from '.';
import {IAppAction} from 'views/app';

export const CATEGORY_ACTION = {
  KEYWORD: 'CATEGORY/LIST/ACTION/KEYWORD',

  IS_REFRESH: 'CATEGORY/LIST/IS/REFRESH',

  GET: 'CATEGORY/LIST/GET',
  SUCCESS: 'CATEGORY/LIST/SUCCESS',
  FAIL: 'CATEGORY/LIST/FAIL',

  IS_LOADMORE: 'CATEGORY/IS/LOADMORE',
  RESET: 'CATEGORY/LIST/RESET'
};

export function setKeywordSearchCate(keyword: string) {
  return {
    type: CATEGORY_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function GetCateGory() {
  return {
    type: CATEGORY_ACTION.GET
  };
}

export function showRefreshCate(isRefresh: boolean) {
  return {
    type: CATEGORY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmoreCate(isLoadMore: boolean) {
  return {
    type: CATEGORY_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function DestroyCateGory() {
  return {
    type: CATEGORY_ACTION.RESET
  };
}

const CategoryReducer = (
  state: ICategoryState = {
    isFirstLoading: true,
    isRefresh: false,
    arrCategory: [],
    count: 0,
    keyword: '',
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<ICategoryState>
): ICategoryState => {
  switch (action.type) {
    case CATEGORY_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case CATEGORY_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case CATEGORY_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case CATEGORY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrCategory: action.payload?.arrCategory,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrCategory: state.arrCategory?.concat(action.payload?.arrCategory || []),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case CATEGORY_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case CATEGORY_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrCategory: [],
        count: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    default:
      return state;
  }
};

export default CategoryReducer;
