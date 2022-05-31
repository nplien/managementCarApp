import {IProductcategoryState} from '.';
import {IAppAction} from 'views/app';

export const PRODUCT_CATEGORY_ACTION = {
  IS_REFRESH: 'PRODUCT/CATEGORY/LIST/IS/REFRESH',

  GET: 'PRODUCT/CATEGORY/LIST/GET',
  SUCCESS: 'PRODUCT/CATEGORY/LIST/SUCCESS',
  FAIL: 'PRODUCT/CATEGORY/LIST/FAIL',

  IS_LOADMORE: 'PRODUCT/CATEGORY/IS/LOADMORE',
  RESET: 'PRODUCT/CATEGORY/LIST/RESET'
};

export function GetProductCategory() {
  return {
    type: PRODUCT_CATEGORY_ACTION.GET
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: PRODUCT_CATEGORY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: PRODUCT_CATEGORY_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function DestroyCategory() {
  return {
    type: PRODUCT_CATEGORY_ACTION.RESET
  };
}

const ProductCategoryReducer = (
  state: IProductcategoryState = {
    isFirstLoading: true,
    isRefresh: false,
    arrProduct: [],
    count: 0,
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IProductcategoryState>
): IProductcategoryState => {
  switch (action.type) {
    case PRODUCT_CATEGORY_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case PRODUCT_CATEGORY_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case PRODUCT_CATEGORY_ACTION.SUCCESS:
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

    case PRODUCT_CATEGORY_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }

    case PRODUCT_CATEGORY_ACTION.RESET:
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

    default:
      return state;
  }
};

export default ProductCategoryReducer;
