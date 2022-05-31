import {IExportCateReducerState} from './ExportCategorys.Type';
import {IAppAction} from 'views/app';

export const EXPORT_CATEGORY_ACTION = {
  IS_REFRESH: 'EXPORT/CATEGORY/LIST/IS/REFRESH',

  GET: 'EXPORT/CATEGORY/LIST/GET',
  SUCCESS: 'EXPORT/CATEGORY/LIST/SUCCESS',
  FAIL: 'CATEGORY/LIST/FAIL',

  GET_BRANDS: 'EXPORT/BRANDS/LIST/GET',
  BRANSD_SUCCESS: 'EXPORT/BRANDS/LIST/BRANS_SUCCESS',
  KEYWORD_BRANDS: 'EXPORT/CATEGORY/BRANDS/KEYWORD_BRANDS',
  KEYWORD_CATES: 'EXPORT/CATEGORY/BRANDS/KEYWORD/CATES',
  BRANDS_SELECTED: 'EXPORT/CATEGORY/BRANDS/BRANDS_SELECTED',
  REFRESH: 'EXPORT/CATEGORY/BRANDS/REFRESH',
  LOADMORE: 'EXPORT/CATEGORY/BRANDS/LOADMORE',

  IS_LOADMORE: 'EXPORT/CATEGORY/IS/LOADMORE',
  RESET: 'EXPORT/CATEGORY/LIST/RESET',
  EXPORT_CATEGORY: 'EXPORT/CATEGORY/LIST/CATEGORY',
  SET_VALUE: 'EXPORT/CATEGORY/LIST/SET_VALUE'
};

export function getExportCateGory() {
  return {
    type: EXPORT_CATEGORY_ACTION.GET
  };
}

export function getExportListBrands() {
  return {
    type: EXPORT_CATEGORY_ACTION.GET_BRANDS
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: EXPORT_CATEGORY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: EXPORT_CATEGORY_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function DestroyExportCateGory() {
  return {
    type: EXPORT_CATEGORY_ACTION.RESET
  };
}
export function setCateObj(cate: any): IAppAction<IExportCateReducerState> {
  return {
    type: EXPORT_CATEGORY_ACTION.EXPORT_CATEGORY,
    payload: {
      cate
    }
  };
}
export function setKeywordBrands(keyword: string): IAppAction<IExportCateReducerState> {
  return {
    type: EXPORT_CATEGORY_ACTION.KEYWORD_BRANDS,
    payload: {
      keywordBrands: keyword
    }
  };
}
export function setKeywordCate(keyword: string): IAppAction<IExportCateReducerState> {
  return {
    type: EXPORT_CATEGORY_ACTION.KEYWORD_CATES,
    payload: {
      keyword
    }
  };
}
export function setBrands(brands: any): IAppAction<IExportCateReducerState> {
  return {
    type: EXPORT_CATEGORY_ACTION.BRANDS_SELECTED,
    payload: {
      brands
    }
  };
}
export function setOnLoadmore(isLoadMore: boolean) {
  return {
    type: EXPORT_CATEGORY_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setValue(
  filterCategoryReducer: IExportCateReducerState
): IAppAction<IExportCateReducerState> {
  return {
    type: EXPORT_CATEGORY_ACTION.SET_VALUE,
    payload: {
      arrCate: filterCategoryReducer.arrCate,
      cate: filterCategoryReducer.cate,
      brands: filterCategoryReducer.brands
    }
  };
}
const ExportCateReducer = (
  state: IExportCateReducerState = {
    isFirstLoading: true,
    isRefresh: false,
    arrExportCateReducer: [],
    arrCate: [],
    arrBrands: [],
    count: 0,
    keyword: '',
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IExportCateReducerState>
): IExportCateReducerState => {
  switch (action.type) {
    case EXPORT_CATEGORY_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case EXPORT_CATEGORY_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case EXPORT_CATEGORY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrExportCateReducer: action.payload?.arrExportCateReducer,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrExportCateReducer: state.arrExportCateReducer?.concat(
            action.payload?.arrExportCateReducer || []
          ),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }
    case EXPORT_CATEGORY_ACTION.BRANSD_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          isStop: action.payload?.isStop,
          count: action.payload?.count,
          isLoadMore: false,
          arrBrands: action.payload?.arrBrands
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          isStop: action.payload?.isStop,
          count: action.payload?.count,
          isLoadMore: false,
          arrBrands: state.arrBrands?.concat(action.payload?.arrBrands || [])
        };
      }
    case EXPORT_CATEGORY_ACTION.SET_VALUE:
      return {
        ...state,
        arrCate: action.payload?.arrCate,
        cate: action.payload?.cate,
        brands: action.payload?.brands
      };
    case EXPORT_CATEGORY_ACTION.EXPORT_CATEGORY:
      return {
        ...state,
        cate: action.payload?.cate
      };
    case EXPORT_CATEGORY_ACTION.BRANDS_SELECTED:
      return {
        ...state,
        brands: action.payload?.brands
      };
    case EXPORT_CATEGORY_ACTION.KEYWORD_BRANDS:
      return {
        ...state,
        keywordBrands: action.payload?.keywordBrands
      };
    case EXPORT_CATEGORY_ACTION.KEYWORD_CATES:
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    case EXPORT_CATEGORY_ACTION.LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case EXPORT_CATEGORY_ACTION.REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case EXPORT_CATEGORY_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrExportCateReducer: [],
        count: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case EXPORT_CATEGORY_ACTION.FAIL: {
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadMore: false,
        isError: true
      };
    }
    default:
      return state;
  }
};

export default ExportCateReducer;
