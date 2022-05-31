import {IImportCateReducerState} from './ImportCategorys.Type';
import {IAppAction} from 'views/app';

export const IMPORT_CATEGORY_ACTION = {
  IS_REFRESH: 'IMPORT/CATEGORY/LIST/IS/REFRESH',

  GET: 'IMPORT/CATEGORY/LIST/GET',
  SUCCESS: 'IMPORT/CATEGORY/LIST/SUCCESS',
  FAIL: 'CATEGORY/LIST/FAIL',

  GET_BRANDS: 'IMPORT/BRANDS/LIST/GET',
  BRANSD_SUCCESS: 'IMPORT/BRANDS/LIST/BRANS_SUCCESS',
  KEYWORD_BRANDS: 'IMPORT/CATEGORY/BRANDS/KEYWORD_BRANDS',
  KEYWORD_CATE: 'IMPORT/CATEGORY/BRANDS/KEYWORD_CATE',
  BRANDS_SELECTED: 'IMPORT/CATEGORY/BRANDS/BRANDS_SELECTED',
  REFRESH: 'IMPORT/CATEGORY/BRANDS/REFRESH',
  LOADMORE: 'IMPORT/CATEGORY/BRANDS/LOADMORE',

  IS_LOADMORE: 'IMPORT/CATEGORY/IS/LOADMORE',
  RESET: 'IMPORT/CATEGORY/LIST/RESET',
  IMPORT_CATEGORY: 'IMPORT/CATEGORY/LIST/CATEGORY',
  SET_VALUE: 'IMPORT/CATEGORY/LIST/SET_VALUE'
};

export function getImportCateGory() {
  return {
    type: IMPORT_CATEGORY_ACTION.GET
  };
}

export function getListBrands() {
  return {
    type: IMPORT_CATEGORY_ACTION.GET_BRANDS
  };
}

export function showRefresh(isRefresh: boolean) {
  return {
    type: IMPORT_CATEGORY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadMore: boolean) {
  return {
    type: IMPORT_CATEGORY_ACTION.IS_LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function destroyImportCateGory() {
  return {
    type: IMPORT_CATEGORY_ACTION.RESET
  };
}
export function setCateObj(cate: any): IAppAction<IImportCateReducerState> {
  return {
    type: IMPORT_CATEGORY_ACTION.IMPORT_CATEGORY,
    payload: {
      cate
    }
  };
}
export function setKeywordBrands(keyword: string): IAppAction<IImportCateReducerState> {
  return {
    type: IMPORT_CATEGORY_ACTION.KEYWORD_BRANDS,
    payload: {
      keywordBrands: keyword
    }
  };
}
export function setKeywordCate(keywordCate: string): IAppAction<IImportCateReducerState> {
  return {
    type: IMPORT_CATEGORY_ACTION.KEYWORD_CATE,
    payload: {
      keywordCate: keywordCate
    }
  };
}
export function setBrands(brands: any): IAppAction<IImportCateReducerState> {
  return {
    type: IMPORT_CATEGORY_ACTION.BRANDS_SELECTED,
    payload: {
      brands
    }
  };
}
export function setOnLoadmore(isLoadMore: boolean) {
  return {
    type: IMPORT_CATEGORY_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setValue(
  filterCategoryReducer: IImportCateReducerState
): IAppAction<IImportCateReducerState> {
  return {
    type: IMPORT_CATEGORY_ACTION.SET_VALUE,
    payload: {
      arrCate: filterCategoryReducer.arrCate,
      cate: filterCategoryReducer.cate,
      brands: filterCategoryReducer.brands
    }
  };
}
const ImportCateReducer = (
  state: IImportCateReducerState = {
    isFirstLoading: true,
    isRefresh: false,
    arrImportCateReducer: [],
    arrCate: [],
    arrBrands: [],
    count: 0,
    keywordCate: '',
    isLoadMore: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IImportCateReducerState>
): IImportCateReducerState => {
  switch (action.type) {
    case IMPORT_CATEGORY_ACTION.IS_REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case IMPORT_CATEGORY_ACTION.IS_LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case IMPORT_CATEGORY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrImportCateReducer: action.payload?.arrImportCateReducer,
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          arrImportCateReducer: state.arrImportCateReducer?.concat(
            action.payload?.arrImportCateReducer || []
          ),
          count: action.payload?.count,
          isLoadMore: false,
          isStop: action.payload?.isStop
        };
      }
    case IMPORT_CATEGORY_ACTION.BRANSD_SUCCESS:
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
    case IMPORT_CATEGORY_ACTION.SET_VALUE:
      return {
        ...state,
        arrCate: action.payload?.arrCate,
        cate: action.payload?.cate,
        brands: action.payload?.brands
      };
    case IMPORT_CATEGORY_ACTION.IMPORT_CATEGORY:
      return {
        ...state,
        cate: action.payload?.cate
      };
    case IMPORT_CATEGORY_ACTION.BRANDS_SELECTED:
      return {
        ...state,
        brands: action.payload?.brands
      };
    case IMPORT_CATEGORY_ACTION.KEYWORD_BRANDS:
      return {
        ...state,
        keywordBrands: action.payload?.keywordBrands
      };
    case IMPORT_CATEGORY_ACTION.KEYWORD_CATE:
      return {
        ...state,
        keywordCate: action.payload?.keywordCate
      };
    case IMPORT_CATEGORY_ACTION.LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case IMPORT_CATEGORY_ACTION.REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case IMPORT_CATEGORY_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrImportCateReducer: [],
        count: 0,
        isLoadMore: false,
        isStop: false,
        isError: false
      };

    case IMPORT_CATEGORY_ACTION.FAIL: {
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

export default ImportCateReducer;
