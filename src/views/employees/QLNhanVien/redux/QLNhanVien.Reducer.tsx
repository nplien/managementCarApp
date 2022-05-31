import {ICreateByState} from './QLNhanVien.Type';
import {IAppAction} from 'views/app';
import {QLNhanVienFake} from './QLNhanVienFake';

export const CREATEBY_CUSTOMER_ACTION = {
  IS_REFRESH: 'CREATEBY/LIST/IS/REFRESH',

  GET: 'CREATEBY/LIST/GET',
  GET_ALL: 'CREATEBY/LIST/GET_ALL',
  SUCCESS: 'CREATEBY/LIST/SUCCESS',
  FAIL: 'CREATEBY/LIST/FAIL',

  IS_LOADMORE: 'CREATEBY/LIST/IS/LOADMORE',
  RESET: 'CREATEBY/LIST/RESET'
};
/**
 *
 * @param action
 *
 * 1. Refreshing CreatedBy
 * 2. Load List CreatedBy
 */
export function GetCreateByCustomer(): IAppAction<ICreateByState> {
  return {
    type: CREATEBY_CUSTOMER_ACTION.GET
  };
}

/** Get All Staff  */
export function getAllStaff(): IAppAction<ICreateByState> {
  return {
    type: CREATEBY_CUSTOMER_ACTION.GET_ALL
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: CREATEBY_CUSTOMER_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: CREATEBY_CUSTOMER_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function reset() {
  return {
    type: CREATEBY_CUSTOMER_ACTION.RESET
  };
}

const QLNhanVienReducer = (
  state: ICreateByState = {
    isFirstLoading: true,
    isRefresh: false,
    arrStaffs: QLNhanVienFake,
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<ICreateByState>
): ICreateByState => {
  switch (action.type) {
    case CREATEBY_CUSTOMER_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case CREATEBY_CUSTOMER_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case CREATEBY_CUSTOMER_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrStaffs: action.payload?.arrStaffs,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrStaffs: state.arrStaffs?.concat(action.payload?.arrStaffs || []),
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case CREATEBY_CUSTOMER_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };

    case CREATEBY_CUSTOMER_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrStaffs: [],
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    default:
      return state;
  }
};

export default QLNhanVienReducer;
