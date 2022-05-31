import {ICustomerState, IFilterCustomerAction, IFilterCustomerState} from './Cutomer.Type';
import {IDateFilterType, IAppAction, IDateRange, ISortFilterType} from 'views/app';
import {CustomerModel} from 'models/Customer.Model';
import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {customerFake} from './DataCustomerFake';
export enum CUSTOMER_ACTION {
  LIST = 'CUSTOMER/LIST',
  LOADMORE = 'CUSTOMER/LIST/LOADMORE',
  LIST_SUCCESS = 'CUSTOMER/LIST_SUCCESS',
  LIST_FAIL = 'CUSTOMER/LIST_FAIL',
  LOADMORE_SUCCESS = 'CUSTOMER/LIST/LOADMORE_SUCCESS',
  LOADMORE_FAIL = 'CUSTOMER/LIST/LOADMORE_FAIL',
  LOAD_ERROR = 'CUSTOMER/LIST/LOAD_ERROR',

  CHANGE = 'CUSTOMER/CHANGE/GIA/BAN/ACTION',

  SET_MAP_FILTER = 'CUSTOMER/FILTER_DATE/SET_MAP_FILTER',
  SORT_SELECT = 'CUSTOMERS/SORT/SELECT',

  //NOTE Action filter
  STATUS_SELECT = 'CUSTOMER/FILTER/STATUS/SELECT',
  KEYWORD = 'CUSTOMER/FILTER/KEYWORD',
  CREATEDBY = 'CUSTOMER/FILTER/CREATEDBY',
  GENDERS = 'CUSTOMER/FILTER/GENDERS',
  TYPES = 'CUSTOMER/FILTER/TYPES',
  GROUPS = 'CUSTOMER/FILTER/GROUPS',
  PROVINCESCITY = 'CUSTOMER/FILTER/PROVINCESCITY',
  DELETEPROVINCESCITY = 'CUSTOMER/FILTER/DELETE/PROVINCESCITY',
  MINPRICE = 'CUSTOMER/FILTER/MINPRICE',
  MAXPRICE = 'CUSTOMER/FILTER/MAXPRICE',
  MAXPOINT = 'CUSTOMER/FILTER/MAXPOINT',
  MINPOINT = 'CUSTOMER/FILTER/MINPOINT',
  MINDEBT = 'CUSTOMER/FILTER/MINDEBT',
  MAXDEBT = 'CUSTOMER/FILTER/MAXDEBT',
  CLEAR = 'CUSTOMER/FILTER/CLEAR',
  SET_VALUE = 'CUSTOMER/FILTER/SET/VALUE',

  CHANGE_GDC = 'CHANGE/THOI/GIAN/CHANGE_GDC',
  CHANGE_KHOANG_THOI_GIAN_GDC = 'CHANGE/KHOANG/THOI/GIAN/CHANGE_GDC'
}
/**
 *
 * @param action
 * 1. Tìm kiếm customer
 * 2. Refreshing customer
 * 3. Load List Customer
 */
export function GetCustomer(skip: number, limit: number, isRefresh?: boolean) {
  return {
    type: CUSTOMER_ACTION.LIST,
    payload: {
      skip,
      limit,
      isRefresh
    }
  };
}

/**
 * @param action
 * 1.Load more customer
 */
export function LoadMoreCustomer(skip: number, limit: number) {
  return {
    type: CUSTOMER_ACTION.LOADMORE,
    payload: {
      skip,
      limit
    }
  };
}

export function changeGiaBanCustomer(priceHienThi: {id: string; name: string}) {
  return {
    type: CUSTOMER_ACTION.CHANGE,
    payload: {
      priceHienThi
    }
  };
}

export function setCustomerFilterDate(
  currentFilterDate: IDateFilterType,
  convertCurrentFilterDate: IDateRange
) {
  return {
    type: CUSTOMER_ACTION.SET_MAP_FILTER,
    payload: {
      currentFilterDate,
      convertCurrentFilterDate
    }
  };
}

export function setCustomerSort(currentSort?: ISortFilterType) {
  return {
    type: CUSTOMER_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}

/**
 * NOTE Filter
 * @param
 * @returns
 */
export function setkeyWord(keyword: string) {
  return {
    type: CUSTOMER_ACTION.KEYWORD,
    payload: {keyword}
  };
}
export function setStatus(status: string | null) {
  return {
    type: CUSTOMER_ACTION.STATUS_SELECT,
    payload: {status}
  };
}
export function setCreatedBy(created_by: string | null) {
  return {
    type: CUSTOMER_ACTION.CREATEDBY,
    payload: {created_by}
  };
}
export function setGenders(genders: string | null) {
  return {
    type: CUSTOMER_ACTION.GENDERS,
    payload: {genders}
  };
}
export function setTypes(types: string | null) {
  return {
    type: CUSTOMER_ACTION.TYPES,
    payload: {types}
  };
}
export function setGroups(groups?: {id: string; name: string} | any) {
  return {
    type: CUSTOMER_ACTION.GROUPS,
    payload: {groups}
  };
}
export function setProvincesCity(provincesCity: {code: string; name: string}) {
  return {
    type: CUSTOMER_ACTION.PROVINCESCITY,
    payload: {provincesCity}
  };
}
export function setDeleteProvincesCity(provincesCity: {code: string; name: string}) {
  return {
    type: CUSTOMER_ACTION.DELETEPROVINCESCITY,
    payload: {provincesCity}
  };
}
export function setMinPrice(min_total_price: string) {
  return {
    type: CUSTOMER_ACTION.MINPRICE,
    payload: {min_total_price}
  };
}
export function setMaxPrice(max_total_price: string) {
  return {
    type: CUSTOMER_ACTION.MAXPRICE,
    payload: {max_total_price}
  };
}
export function setMinDebt(min_total_debt: string) {
  return {
    type: CUSTOMER_ACTION.MINDEBT,
    payload: {min_total_debt}
  };
}
export function setMaxDebt(max_total_debt: string) {
  return {
    type: CUSTOMER_ACTION.MAXDEBT,
    payload: {max_total_debt}
  };
}
export function setMaxPoint(max_total_point: string) {
  return {
    type: CUSTOMER_ACTION.MAXPOINT,
    payload: {max_total_point}
  };
}
export function setMinPoint(min_total_point: string) {
  return {
    type: CUSTOMER_ACTION.MINPOINT,
    payload: {min_total_point}
  };
}

export function setClear() {
  return {
    type: CUSTOMER_ACTION.CLEAR
  };
}
export function setValue(filterReducer: IFilterCustomerState): IFilterCustomerAction {
  return {
    type: CUSTOMER_ACTION.SET_VALUE,
    payload: {
      keyword: filterReducer.keyword,
      status: filterReducer.status,
      created_by: filterReducer.created_by,
      genders: filterReducer.genders,
      types: filterReducer.types,
      groups: filterReducer.groups,
      min_total_price: filterReducer.min_total_price,
      max_total_price: filterReducer.max_total_price,
      min_total_debt: filterReducer.min_total_debt,
      max_total_debt: filterReducer.max_total_debt,
      provincesCity: filterReducer.provincesCity
    }
  };
}

export function changeTGFilterCustomer(thoiGianLocGDC?: IDateFilterType) {
  return {
    type: CUSTOMER_ACTION.CHANGE_GDC,
    payload: {
      thoiGianLocGDC
    }
  };
}

export function changeKTGFilterCustomer(khoangThoiGianGDC?: IDateRange) {
  return {
    type: CUSTOMER_ACTION.CHANGE_KHOANG_THOI_GIAN_GDC,
    payload: {
      khoangThoiGianGDC
    }
  };
}

const CustomerReducer = (
  state: ICustomerState = {
    isFirstLoading: true,
    arrCustomer: customerFake,
    isRefresh: false,
    isLoadMore: false,
    count: 0,
    isError: false,

    giaHienThiCustomer: CONFIG_PRICE_SHOW.CUSTOMER[0],
    currentFilterDate: CONFIG_DATE_FILTER.CUSTOMER[0],
    convertCurrentFilterDate: Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[2].id),
    currentSort: CONFIG_SORT_FILTER.CUSTOMER[2],

    //NOTE reducer filter
    status: '',
    created_by: '',
    genders: '',
    keyword: '',
    types: '',
    groups: null,
    min_total_price: '',
    max_total_price: '',
    min_total_debt: '',
    max_total_debt: '',
    min_total_point: '',
    max_total_point: '',
    provincesCity: [],
    thoiGianLocGDC: CONFIG_DATE_FILTER.CUSTOMER[0],
    khoangThoiGianGDC: Utilities.getDateFilter(CONFIG_DATE_FILTER.CUSTOMER[0].id)
  },
  action: IAppAction<ICustomerState>
): ICustomerState => {
  switch (action.type) {
    case CUSTOMER_ACTION.LIST:
      if (action.payload?.isRefresh) {
        return {
          ...state,
          isRefresh: true,
          isError: false,
          count: action.payload.count
        };
      }
      return {
        ...state,
        isFirstLoading: true,
        count: action.payload?.count,
        isError: false
      };
    case CUSTOMER_ACTION.LIST_SUCCESS:
      if (action.payload?.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          arrCustomer: action.payload.arrCustomer,
          count: action.payload.count
        };
      }
      return {
        ...state,
        isFirstLoading: false,
        arrCustomer: action.payload?.arrCustomer,
        count: action.payload?.count
      };
    case CUSTOMER_ACTION.LIST_FAIL:
      return {...state, isFirstLoading: false, isRefresh: false};

    case CUSTOMER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: true,
        isError: false
      };
    case CUSTOMER_ACTION.LOADMORE_SUCCESS:
      let arrLoadMore: CustomerModel[] = [];
      if (state.arrCustomer && action.payload?.arrCustomer) {
        arrLoadMore = state.arrCustomer.concat(action.payload?.arrCustomer);
      }
      return {...state, arrCustomer: arrLoadMore, isLoadMore: false};
    case CUSTOMER_ACTION.LOADMORE_FAIL:
      return {...state, isLoadMore: false};
    case CUSTOMER_ACTION.LOAD_ERROR:
      return {...state, isError: true, isFirstLoading: false, isRefresh: false};

    case CUSTOMER_ACTION.CHANGE:
      return {
        ...state,
        giaHienThiCustomer: action.payload?.giaHienThiCustomer
      };
    case CUSTOMER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentFilterDate: action.payload?.currentFilterDate || CONFIG_DATE_FILTER.CUSTOMER[0],
        convertCurrentFilterDate: action.payload?.convertCurrentFilterDate
      };

    case CUSTOMER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };

    //NOTE filter
    case CUSTOMER_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    case CUSTOMER_ACTION.STATUS_SELECT:
      return {
        ...state,
        status: action.payload?.status
      };
    case CUSTOMER_ACTION.CREATEDBY:
      return {
        ...state,
        created_by: action.payload?.created_by
      };
    case CUSTOMER_ACTION.GENDERS:
      return {
        ...state,
        genders: action.payload?.genders
      };
    case CUSTOMER_ACTION.TYPES:
      return {
        ...state,
        types: action.payload?.types
      };
    case CUSTOMER_ACTION.GROUPS:
      return {
        ...state,
        groups: action.payload?.groups
      };
    case CUSTOMER_ACTION.PROVINCESCITY:
      const indexValue = state.provincesCity.findIndex(
        (value: {code: number}) => value.code === action.payload?.provincesCity.code
      );
      if (indexValue !== -1) {
        state.provincesCity.splice(indexValue, 1);
      } else {
        state.provincesCity.push(action.payload?.provincesCity);
      }
      return {
        ...state
      };
    case CUSTOMER_ACTION.DELETEPROVINCESCITY:
      const indexDelete = state.provincesCity.findIndex(
        (value: {code: number}) => value.code === action.payload?.provincesCity.code
      );
      if (indexDelete !== -1) {
        state.provincesCity.splice(indexDelete, 1);
      }
      return {
        ...state
      };
    case CUSTOMER_ACTION.MINPRICE:
      return {
        ...state,
        min_total_price: action.payload?.min_total_price
      };
    case CUSTOMER_ACTION.MAXPRICE:
      return {
        ...state,
        max_total_price: action.payload?.max_total_price
      };
    case CUSTOMER_ACTION.MINDEBT:
      return {
        ...state,
        min_total_debt: action.payload?.min_total_debt
      };
    case CUSTOMER_ACTION.MAXDEBT:
      return {
        ...state,
        max_total_debt: action.payload?.max_total_debt
      };
    case CUSTOMER_ACTION.MAXPOINT:
      return {
        ...state,
        max_total_point: action.payload?.max_total_point
      };
    case CUSTOMER_ACTION.MINPOINT:
      return {
        ...state,
        min_total_point: action.payload?.min_total_point
      };
    case CUSTOMER_ACTION.CHANGE_GDC:
      return {
        ...state,
        thoiGianLocGDC: action.payload?.thoiGianLocGDC
      };

    case CUSTOMER_ACTION.CHANGE_KHOANG_THOI_GIAN_GDC:
      return {
        ...state,
        khoangThoiGianGDC: action.payload?.khoangThoiGianGDC
      };

    case CUSTOMER_ACTION.CLEAR:
      return {
        ...state,
        status: '',
        created_by: '',
        genders: '',
        keyword: '',
        types: '',
        groups: null,
        min_total_price: '',
        max_total_price: '',
        min_total_debt: '',
        max_total_debt: '',
        min_total_point: '',
        max_total_point: '',
        provincesCity: [],
        thoiGianLocGDC: CONFIG_DATE_FILTER.CUSTOMER[0],
        khoangThoiGianGDC: Utilities.getDateFilter(CONFIG_DATE_FILTER.CUSTOMER[0].id)
      };
    case CUSTOMER_ACTION.SET_VALUE:
      return {
        ...state,
        status: action.payload?.status,
        created_by: action.payload?.created_by,
        genders: action.payload?.genders,
        keyword: action.payload?.keyword,
        types: action.payload?.types,
        groups: action.payload?.groups,
        min_total_price: action.payload?.min_total_price,
        max_total_price: action.payload?.max_total_price,
        min_total_debt: action.payload?.min_total_debt,
        max_total_debt: action.payload?.max_total_debt,
        min_total_point: action.payload?.min_total_point,
        max_total_point: action.payload?.max_total_point,
        provincesCity: action.payload?.provincesCity,
        thoiGianLocGDC: action.payload?.thoiGianLocGDC,
        khoangThoiGianGDC: action.payload?.khoangThoiGianGDC
      };
    default:
      return state;
  }
};

export default CustomerReducer;
