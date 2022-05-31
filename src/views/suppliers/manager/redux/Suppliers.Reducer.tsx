import {IFilterSupplierAction, ISuppliersState} from './Suppliers.Type';

import {IAppAction, ISortFilterType} from 'views/app';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {CustomerModelRequest} from 'models/Customer.Model';

export const SUPPLIER_ACTION = {
  LIST: 'SUPPLIER/LIST',
  LIST_SUCCESS: 'SUPPLIER/LIST_SUCCESS',
  LIST_FAIL: 'SUPPLIER/LIST_FAIL',
  LOAD_ERROR: 'SUPPLIER/LIST/LOAD_ERROR',

  SORT_SELECT: 'SUPPLIER/SORT/SELECT',

  FILTER: 'FILTER/SUPPLIER'
};
export function GetSuppliers(skip: number, limit: number, isRefresh?: boolean) {
  return {
    type: SUPPLIER_ACTION.LIST,
    payload: {
      skip,
      limit,
      isRefresh
    }
  };
}

export function setParamsSortSupplier(currentSort: ISortFilterType) {
  return {
    type: SUPPLIER_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}

export function GetFilterSupplier(
  param?: CustomerModelRequest,
  nameGroup?: string
): IFilterSupplierAction {
  return {
    type: SUPPLIER_ACTION.FILTER,
    payload: {
      param,
      nameGroup
    }
  };
}

const SuppliersReducer = (
  state: ISuppliersState = {
    isFirstLoading: false,
    arrSupplier: [],
    isRefresh: false,
    isLoadMore: false,
    isError: false,
    count: 0,

    currentSort: CONFIG_SORT_FILTER.NCC[2],

    param: {},
    nameGroup: ''
  },
  action: IAppAction<ISuppliersState>
): ISuppliersState => {
  switch (action.type) {
    case SUPPLIER_ACTION.LIST:
      if (action.payload?.isRefresh) {
        return {...state, isRefresh: true, isError: false};
      }
      return {...state, isFirstLoading: true, isError: false};
    case SUPPLIER_ACTION.LIST_SUCCESS:
      if (action.payload?.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          arrSupplier: action.payload.arrSupplier,
          count: action.payload.count
        };
      }
      return {
        ...state,
        isFirstLoading: false,
        arrSupplier: action.payload?.arrSupplier,
        count: action.payload?.count
      };
    case SUPPLIER_ACTION.LIST_FAIL:
      return {...state, isFirstLoading: false, isRefresh: false};
    case SUPPLIER_ACTION.LOAD_ERROR:
      return {...state, isError: false, isFirstLoading: false, isRefresh: false};

    case SUPPLIER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };

    case SUPPLIER_ACTION.FILTER:
      return {...state, param: action.payload?.param, nameGroup: action.payload?.nameGroup};
    default:
      return state;
  }
};

export default SuppliersReducer;
