import {IProductHangHoaState} from '.';
import {IAppAction, ISortFilterType} from 'views/app';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {CONFIG_PRICE_SHOW} from 'common/Constants';

export const PRODUCT_HANG_HOA_ACTION = {
  IS_REFRESH: 'PRODUCT/HANG/HOA/LIST/IS/REFRESH',

  GET: 'PRODUCT/HANG/HOA/LIST/GET',
  SUCCESS: 'PRODUCT/HANG/HOA/LIST/SUCCESS',
  FAIL: 'PRODUCT/HANG/HOA/LIST/FAIL',

  IS_LOADMORE: 'PRODUCT/HANG/HOA/IS/LOADMORE',
  RESET: 'PRODUCT/HANG/HOA/LIST/RESET',

  CHANGE_SORT: 'CHANGE/SORT/FILTER/HANG/HOA/ACTION',
  CHANGE_PRICE: 'PRODUCT/CHANGE/GIA/BAN/HANG/HOA/ACTION'
};

export function GetProductHangHoa() {
  return {
    type: PRODUCT_HANG_HOA_ACTION.GET
  };
}

export function showRefreshHangHoa(isRefresh: boolean) {
  return {
    type: PRODUCT_HANG_HOA_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmoreHangHoa(isLoadMore: boolean) {
  return {
    type: PRODUCT_HANG_HOA_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function resetHangHoa() {
  return {
    type: PRODUCT_HANG_HOA_ACTION.RESET
  };
}

export function changeSortFilterHangHoa(sortFilter: ISortFilterType) {
  return {
    type: PRODUCT_HANG_HOA_ACTION.CHANGE_SORT,
    payload: {
      sortFilter
    }
  };
}

export function changeGiaBanHangHoa(priceHienThi: {id: string; name: string}) {
  return {
    type: PRODUCT_HANG_HOA_ACTION.CHANGE_PRICE,
    payload: {
      priceHienThi
    }
  };
}

const ProductHangHoaReducer = (
  state: IProductHangHoaState = {
    isFirstLoading: true,
    isRefresh: false,
    arrProduct: [],
    count: 0,
    tong_ton_kho: 0,
    isLoadMore: false,
    isStop: false,
    isError: false,
    sortFilter: CONFIG_SORT_FILTER.HANG_HOA[0],
    giaHienThi: CONFIG_PRICE_SHOW.HANG_HOA[0]
  },
  action: IAppAction<IProductHangHoaState>
): IProductHangHoaState => {
  switch (action.type) {
    case PRODUCT_HANG_HOA_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case PRODUCT_HANG_HOA_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case PRODUCT_HANG_HOA_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrProduct: action.payload?.arrProduct,
          count: action.payload?.count,
          tong_ton_kho: action.payload?.tong_ton_kho,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrProduct: state.arrProduct?.concat(action.payload?.arrProduct || []),
          count: action.payload?.count,
          tong_ton_kho: action.payload?.tong_ton_kho,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case PRODUCT_HANG_HOA_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case PRODUCT_HANG_HOA_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrProduct: [],
        count: 0,
        tong_ton_kho: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case PRODUCT_HANG_HOA_ACTION.CHANGE_SORT:
      return {
        ...state,
        sortFilter: action.payload?.sortFilter
      };

    case PRODUCT_HANG_HOA_ACTION.CHANGE_PRICE:
      return {
        ...state,
        giaHienThi: action.payload?.giaHienThi
      };

    default:
      return state;
  }
};

export default ProductHangHoaReducer;
