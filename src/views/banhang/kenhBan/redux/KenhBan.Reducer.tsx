import {IKenhBanState} from './KenhBan.Type';
import {IAppAction} from 'views/app';

export const KENH_BAN_ACTION = {
  IS_REFRESH: 'KENH/BAN/LIST/IS/REFRESH',

  GET: 'KENH/BAN/LIST/GET',
  SUCCESS: 'KENH/BAN/LIST/SUCCESS',
  FAIL: 'KENH/BAN/LIST/FAIL',

  IS_LOADMORE: 'KENH/BAN/LIST/IS/LOADMORE',
  RESET: 'KENH/BAN/LIST/RESET',

  SET_KEYWORD: 'KENH/BAN/SET/KEYWORD'
};

export function getKenhBan() {
  return {
    type: KENH_BAN_ACTION.GET
  };
}

export function showRefreshKenhBan(isRefresh: boolean) {
  return {
    type: KENH_BAN_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmoreKenhBan(isLoadMore: boolean) {
  return {
    type: KENH_BAN_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function reset() {
  return {
    type: KENH_BAN_ACTION.RESET
  };
}

export function setKeywordKenhBan(keyword: string) {
  return {
    type: KENH_BAN_ACTION.SET_KEYWORD,
    payload: {
      keyword
    }
  };
}

const KenhBanReducer = (
  state: IKenhBanState = {
    isFirstLoading: true,
    isRefresh: false,
    arrKenhBan: [],
    count: 0,
    keyword: '',
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IKenhBanState>
): IKenhBanState => {
  switch (action.type) {
    case KENH_BAN_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case KENH_BAN_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case KENH_BAN_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrKenhBan: action.payload?.arrKenhBan,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrKenhBan: state.arrKenhBan?.concat(action.payload?.arrKenhBan || []),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case KENH_BAN_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case KENH_BAN_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrKenhBan: [],
        count: 0,
        keyword: '',
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case KENH_BAN_ACTION.SET_KEYWORD: {
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    }

    default:
      return state;
  }
};

export default KenhBanReducer;
