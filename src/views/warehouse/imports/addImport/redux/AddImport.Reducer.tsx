import {IProductSale} from 'models/Product.Model';
import {IAddImportOrderState} from './AddImport.Types';
import {IAppAction} from 'views/app';
import {BANG_GIA_CHUNG} from 'common/Constants';

export const ADD_IMPORT_ORDER_ACTION = {
  LIST_FAIL: 'IMPORT/ORDER/ADD/GET_LIST_FAIL',
  GET_LIST: 'IMPORT/ORDER/ADD/CATEGORY/LIST/GET',
  SUCCESS: 'IMPORT/ORDER/ADD/CATEGORY/LIST/SUCCESS',
  ADD_PRODUCT: 'IMPORT/ORDER/ADD/LIST/ADD_PRODUCT',
  SET_PRODUCT: 'IMPORT/ORDER/ADD/LIST/SET_PRODUCT',
  DELETE_LIST_PRODUCT_IMPORT: 'IMPORT/ORDER/ADD/LIST/DELETE_LIST_PRODUCT_IMPORT',
  DELETE_PRODUCT_IMPORT: 'IMPORT/ORDER/ADD/LIST/DELETE_PRODUCT_IMPORT',
  ADD_LIST_PRODUCT_IMPORT: 'IMPORT/ORDER/ADD/LIST/ADD_LIST_PRODUCT_IMPORT',

  REFRESH: 'IMPORT/ORDER/ADD/ADD/REFRESH',
  LOADMORE: 'IMPORT/ORDER/ADD/ADD/LOADMORE',
  RESET: 'IMPORT/ORDER/ADD/ADD/RESET',

  SUPPLIERS_SELECT: 'IMPORT/ORDER/ADD/SUPPLIERS_SELECT',
  IS_MANY_SELECTED: 'IMPORT/ORDER/ADD/IS_MANY_SELECTED',
  NOTE: 'IMPORT/ORDER/ADD/NOTE'
};

export function setOnLoadmore(isLoadMore: boolean) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setCurrentSuppliear(suppliers: any): IAppAction<IAddImportOrderState> {
  return {
    type: ADD_IMPORT_ORDER_ACTION.SUPPLIERS_SELECT,
    payload: {
      suppliers
    }
  };
}
export function setOnRefresh(isRefresh: boolean) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setTextNote(text: string): IAppAction<IAddImportOrderState> {
  return {
    type: ADD_IMPORT_ORDER_ACTION.NOTE,
    payload: {
      note: text
    }
  };
}

export function destroyAddImportOrder() {
  return {
    type: ADD_IMPORT_ORDER_ACTION.RESET
  };
}

export function getListAddImport() {
  return {
    type: ADD_IMPORT_ORDER_ACTION.GET_LIST
  };
}

export function addProductToImport(productImport: IProductSale) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.ADD_PRODUCT,
    payload: {
      productImport
    }
  };
}
export function setProductToImport(productImport: IProductSale) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.SET_PRODUCT,
    payload: {
      productImport
    }
  };
}
export function addListProductToImport(arrProductImport: IProductSale[]) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.ADD_LIST_PRODUCT_IMPORT,
    payload: {
      arrProductImport
    }
  };
}

export function setIsManySelected(isManySelected: boolean) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.IS_MANY_SELECTED,
    payload: {
      isManySelected
    }
  };
}
export function deleteListImport(arrProductImport: IProductSale[]) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.DELETE_LIST_PRODUCT_IMPORT,
    payload: {
      arrProductImport
    }
  };
}
export function deleteItemImport(productImport: IProductSale) {
  return {
    type: ADD_IMPORT_ORDER_ACTION.DELETE_PRODUCT_IMPORT,
    payload: {
      productImport
    }
  };
}

const AddImportOrderReducer = (
  state: IAddImportOrderState = {
    arrProductImport: [],
    isFirstLoading: true,
    count: 0,
    isLoadMore: false,
    isRefresh: false,
    isStop: false,
    isError: false
  },
  action: IAppAction<IAddImportOrderState>
): IAddImportOrderState => {
  switch (action.type) {
    case ADD_IMPORT_ORDER_ACTION.LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case ADD_IMPORT_ORDER_ACTION.REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};
    case ADD_IMPORT_ORDER_ACTION.SUPPLIERS_SELECT: {
      return {
        ...state,
        suppliers: action.payload?.suppliers
      };
    }
    case ADD_IMPORT_ORDER_ACTION.NOTE: {
      return {
        ...state,
        note: action.payload?.note
      };
    }

    case ADD_IMPORT_ORDER_ACTION.SUCCESS:
      let arr: any = [];
      if (action.payload?.arrProductImport && state.arrProductImport) {
        for (let index = 0; index < action.payload?.arrProductImport.length; index++) {
          const element = action.payload?.arrProductImport[index];
          arr.push({
            product: element,
            totalQty: 1
          });
        }
      }
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        arrProductImport: arr ? [...arr] : [],
        count: action.payload?.count,
        isLoadMore: false,
        isStop: action.payload?.isStop
      };

    case ADD_IMPORT_ORDER_ACTION.ADD_PRODUCT:
      if (action.payload?.productImport && state.arrProductImport) {
        let found = -1;
        found = state.arrProductImport.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productImport?.product.sku
        );
        if (found > -1) {
          state.arrProductImport[found] = {
            product: state.arrProductImport[found].product,
            price_books: BANG_GIA_CHUNG,
            totalQty:
              state.arrProductImport[found].totalQty + action.payload?.productImport.totalQty
          };
        } else {
          state.arrProductImport?.push(action.payload?.productImport);
        }
      }
      return {
        ...state,
        arrProductImport: state.arrProductImport ? [...state.arrProductImport] : []
      };
    case ADD_IMPORT_ORDER_ACTION.SET_PRODUCT:
      if (action.payload?.productImport && state.arrProductImport) {
        let found = -1;
        found = state.arrProductImport.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productImport?.product.sku
        );
        if (found > -1) {
          state.arrProductImport[found] = {
            product: state.arrProductImport[found].product,
            price_books: BANG_GIA_CHUNG,
            totalQty: action.payload?.productImport.totalQty
          };
        } else {
          state.arrProductImport?.push(action.payload?.productImport);
        }
      }
      return {
        ...state,
        arrProductImport: state.arrProductImport ? [...state.arrProductImport] : []
      };
    case ADD_IMPORT_ORDER_ACTION.IS_MANY_SELECTED:
      return {...state, isManySelected: action.payload?.isManySelected};

    case ADD_IMPORT_ORDER_ACTION.DELETE_LIST_PRODUCT_IMPORT:
      if (action.payload?.arrProductImport && state.arrProductImport) {
        for (let index = 0; index < action.payload?.arrProductImport.length; index++) {
          const element = action.payload?.arrProductImport[index];
          let found = -1;
          found = state.arrProductImport.findIndex(
            (x: IProductSale) => x.product.sku === element.product.sku
          );
          if (found > -1) {
            state.arrProductImport.splice(found, 1);
          }
        }
      }
      return {
        ...state,
        arrProductImport: state.arrProductImport ? [...state.arrProductImport] : []
      };

    case ADD_IMPORT_ORDER_ACTION.DELETE_PRODUCT_IMPORT:
      if (action.payload?.productImport && state.arrProductImport) {
        let found = -1;
        found = state.arrProductImport.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productImport?.product.sku
        );
        if (found > -1) {
          state.arrProductImport?.splice(found, 1);
        }
      }
      return {
        ...state,
        arrProductImport: state.arrProductImport ? [...state.arrProductImport] : []
      };
    case ADD_IMPORT_ORDER_ACTION.ADD_LIST_PRODUCT_IMPORT:
      if (action.payload?.arrProductImport && state.arrProductImport) {
        for (let index = 0; index < action.payload?.arrProductImport.length; index++) {
          const element = action.payload?.arrProductImport[index];
          let found = -1;
          found = state.arrProductImport.findIndex(
            (x: IProductSale) => x.product.sku === element.product.sku
          );
          if (found > -1) {
            state.arrProductImport[found] = {
              product: state.arrProductImport[found].product,
              price_books: BANG_GIA_CHUNG,
              totalQty: state.arrProductImport[found].totalQty + element.totalQty
            };
          } else {
            state.arrProductImport?.push(element);
          }
        }
      }
      return {
        ...state,
        arrProductImport: state.arrProductImport ? [...state.arrProductImport] : []
      };

    case ADD_IMPORT_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isError: true,
        isFirstLoading: false
      };
    case ADD_IMPORT_ORDER_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: true,
        isRefresh: false,
        arrProductImport: [],
        isManySelected: false,
        suppliers: {}
      };

    default:
      return state;
  }
};

export default AddImportOrderReducer;
