import {IProductBanHangState} from '.';
import {IAppAction, ISortFilterType} from 'views/app';
import {BANG_GIA_CHUNG, CONFIG_PRICE_SHOW, KHACH_LE} from 'common/Constants';
import {IBangGiaModel} from 'models/BangGia.Model';
import {CustomerModel} from 'models/Customer.Model';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';

export const PRODUCT_BAN_HANG_ACTION = {
  IS_REFRESH: 'PRODUCT/BAN/HANG/LIST/IS/REFRESH',

  GET: 'PRODUCT/BAN/HANG/LIST/GET',
  SUCCESS: 'PRODUCT/BAN/HANG/LIST/SUCCESS',
  FAIL: 'PRODUCT/BAN/HANG/LIST/FAIL',

  IS_LOADMORE: 'PRODUCT/BAN/HANG/IS/LOADMORE',
  RESET: 'PRODUCT/BAN/HANG/LIST/RESET',

  CHANGE_PRICE: 'PRODUCT/CHANGE/GIA/BAN/HANG/ACTION',
  CHOOSE_BANG_GIA: 'CHOOSE/BANG/GIA/BAN/HANG/SET',
  CHOOSE_KHACH_HANG: 'CHOOSE/KHACH/BAN/HANG/SET',
  IS_SELECTED_MANY: 'IS/SELECTED/MANY/SET/BAN/HANG',
  CHANGE_FILTER: 'CHANGE/SORT/FILTER/BAN/HANG/ACTION'
};

export function GetProductBanHang() {
  return {
    type: PRODUCT_BAN_HANG_ACTION.GET
  };
}

export function showRefreshBanHang(isRefresh: boolean) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function DestroyBanHang() {
  return {
    type: PRODUCT_BAN_HANG_ACTION.RESET
  };
}

export function changeGiaBan(giaHienThi: {id: string; name: string}) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.CHANGE_PRICE,
    payload: {
      giaHienThi
    }
  };
}

export function setBangGia(currentBangGia: IBangGiaModel) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.CHOOSE_BANG_GIA,
    payload: {
      currentBangGia
    }
  };
}

export function setKhachHang(currentKhachHang: CustomerModel) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.CHOOSE_KHACH_HANG,
    payload: {
      currentKhachHang
    }
  };
}

export function setSelectedMany(isSelectMany: boolean) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.IS_SELECTED_MANY,
    payload: {
      isSelectMany
    }
  };
}

export function changeSortFilterBanHang(sortFilter: ISortFilterType) {
  return {
    type: PRODUCT_BAN_HANG_ACTION.CHANGE_FILTER,
    payload: {
      sortFilter
    }
  };
}

const ProductBanHangReducer = (
  state: IProductBanHangState = {
    isFirstLoading: true,
    isRefresh: false,
    arrProduct: [],
    count: 0,
    isLoadMore: false,
    isStop: false,
    isError: false,
    giaHienThi: CONFIG_PRICE_SHOW.HANG_HOA[0],
    currentBangGia: BANG_GIA_CHUNG,
    currentKhachHang: KHACH_LE,
    isSelectMany: false,
    sortFilter: CONFIG_SORT_FILTER.HANG_HOA[0]
  },
  action: IAppAction<IProductBanHangState>
): IProductBanHangState => {
  switch (action.type) {
    case PRODUCT_BAN_HANG_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case PRODUCT_BAN_HANG_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case PRODUCT_BAN_HANG_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrProduct: action.payload?.arrProduct,
          count: action.payload?.count,
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
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }

    case PRODUCT_BAN_HANG_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case PRODUCT_BAN_HANG_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrProduct: [],
        count: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case PRODUCT_BAN_HANG_ACTION.CHANGE_PRICE:
      return {
        ...state,
        giaHienThi: action.payload?.giaHienThi
      };

    case PRODUCT_BAN_HANG_ACTION.CHOOSE_BANG_GIA:
      return {
        ...state,
        currentBangGia: action.payload?.currentBangGia
      };

    case PRODUCT_BAN_HANG_ACTION.CHOOSE_KHACH_HANG:
      return {
        ...state,
        currentKhachHang: action.payload?.currentKhachHang
      };

    case PRODUCT_BAN_HANG_ACTION.IS_SELECTED_MANY:
      return {
        ...state,
        isSelectMany: action.payload?.isSelectMany
      };

    case PRODUCT_BAN_HANG_ACTION.CHANGE_FILTER:
      return {
        ...state,
        sortFilter: action.payload?.sortFilter
      };

    default:
      return state;
  }
};

export default ProductBanHangReducer;
