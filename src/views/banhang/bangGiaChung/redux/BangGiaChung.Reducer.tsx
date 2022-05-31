import {IBangGiaState} from './BangGiaChung.Type';
import {IAppAction} from 'views/app';

export const BANG_GIA_ACTION = {
  IS_REFRESH: 'BANG/GIA/LIST/IS/REFRESH',

  GET: 'BANG/GIA/LIST/GET',
  SUCCESS: 'BANG/GIA/LIST/SUCCESS',
  FAIL: 'BANG/GIA/LIST/FAIL',

  IS_LOADMORE: 'BANG/GIA/LIST/IS/LOADMORE',
  RESET: 'BANG/GIA/LIST/RESET',

  SET_KEYWORD: 'BANG/GIA/SET/KEYWORD'
};

export function getBangGia() {
  return {
    type: BANG_GIA_ACTION.GET
  };
}

export function showRefreshBangGia(isRefresh: boolean) {
  return {
    type: BANG_GIA_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmoreBangGia(isLoadMore: boolean) {
  return {
    type: BANG_GIA_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function reset() {
  return {
    type: BANG_GIA_ACTION.RESET
  };
}

export function setKeywordBangGia(keyword: string) {
  return {
    type: BANG_GIA_ACTION.SET_KEYWORD,
    payload: {
      keyword
    }
  };
}

const BangGiaReducer = (
  state: IBangGiaState = {
    isFirstLoading: true,
    isRefresh: false,
    arrBangGia: [],
    count: 0,
    keyword: '',
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IBangGiaState>
): IBangGiaState => {
  switch (action.type) {
    case BANG_GIA_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case BANG_GIA_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case BANG_GIA_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrBangGia: action.payload?.arrBangGia,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrBangGia: state.arrBangGia?.concat(action.payload?.arrBangGia || []),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case BANG_GIA_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case BANG_GIA_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrBangGia: [],
        count: 0,
        keyword: '',
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case BANG_GIA_ACTION.SET_KEYWORD: {
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    }

    default:
      return state;
  }
};

export default BangGiaReducer;
