import {IReturnOrderState} from './ReturnOrder.Types';
import {IDateFilterType, IAppAction, IDateRange, ISortFilterType} from 'views/app';
import {
  ARR_PT_BAN_HANG,
  ARR_PT_THANHTOAN,
  CONFIG_DATE_FILTER,
  CONFIG_SORT_FILTER,
  IMethodSales,
  IPaymentItem
} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IStorePerson} from 'models/ModelBase';
import {IStatusItem} from 'configs/StatusConfig';
import {IStaffModel} from 'models/Staff.Model';
import {ILocation} from 'models/Localtion.Model';

export const RETURN_ORDER_ACTION = {
  LIST: 'RETURN_ORDER/LIST',
  LIST_SUCCESS: 'RETURN_ORDER/LIST_SUCCESS',
  LIST_FAIL: 'RETURN_ORDER/LIST_FAIL',
  FIRST_LOADING: 'RETURN_ORDER/FIRST_LOADING',
  REFRESH: 'RETURN_ORDER/REFRESH',
  LOADMORE: 'RETURN_ORDER/LOADMORE',
  LIST_DASHBOARD: 'RETURN_ORDER/LIST/DASHBOARD',
  CLEAR_DASHBOARD: 'RETURN_ORDER/CLEAR/DASHBOARD',
  SET_TYPES: 'RETURN_ORDER/SET_TYPES',

  SORT_SELECT: 'RETURN_ORDER/SORT/SELECT',
  STORE_RETURN_ORDER: 'RETURN_ORDER/SORT/STORE_RETURN_ORDER',
  SET_MAP_FILTER: 'RETURN_ORDER/FILTER_DATE/SET_MAP_FILTER',

  SET_VALUE: 'RETURN_ORDER/FILTER/SET_VALUE',

  KEYWORD_CODE: 'RETURN_ORDER/FILTER/KEYWORD_CODE',
  KEYWORD_NOTE: 'RETURN_ORDER/FILTER/KEYWORD_NOTE',
  KEYWORD_PRODUCT_SKU: 'RETURN_ORDER/FILTER/KEYWORD_PRODUCT_SKU',
  KEYWORD_PRODUCT_NAME: 'RETURN_ORDER/FILTER/KEYWORD_PRODUCT_NAME',
  KEYWORD_CUSTOMER: 'RETURN_ORDER/FILTER/KEYWORD_CUSTOMER',
  KEYWORD_RECEIVER: 'RETURN_ORDER/FILTER/KEYWORD_RECEIVER',

  STATUS_SELECT: 'RETURN_ORDER/FILTER/STATUS_SELECT',

  PAYMENT_METHODS: 'RETURN_ORDER/FILTER/PAYMENT_METHODS',
  CHANGE_ARR_PTTT_RETURN_ORDER: 'RETURN_ORDER/FILTER/CHANGE_ARR_PTTT',
  CHANGE_PTBH_RETURN_ORDER: 'RETURN_ORDER/FILTER/CHANGE_PTBH',
  CHANGE_ARR_PTBH_RETURN_ORDER: 'RETURN_ORDER/FILTER/CHANGE_ARR_PTBH',
  CHANELS_SELECT: 'RETURN_ORDER/FILTER/CHANELS_SELECT',
  CHANGE_STARFF_LOC_TRA_HANG: 'RETURN_ORDER/FILTER/CHANGE_STARFF_LOC_TRA_HANG',

  LOCATION_CITY_DA_CHON: 'RETURN_ORDER/LOCATION_CITY_DA_CHON',

  DESTROY_RETURN_ORDER: 'RETURN_ORDER/DESTROY_RETURN_ORDER'
};

export function getListTraHang() {
  return {
    type: RETURN_ORDER_ACTION.LIST
  };
}
export function setTypeTraHang(types: 'return' | 'retail' | null) {
  return {
    type: RETURN_ORDER_ACTION.SET_TYPES,
    payload: {
      types
    }
  };
}
export function clearListDashBoardTraHang() {
  return {
    type: RETURN_ORDER_ACTION.CLEAR_DASHBOARD
  };
}
export function onFisrtLoadingTraHang(isFirstLoading: boolean): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefreshTraHang(isRefresh: boolean): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreTraHang(isLoadMore: boolean): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setParamsSortTraHang(currentSort: ISortFilterType) {
  return {
    type: RETURN_ORDER_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}
export function setStoreTraHang(arrStoreTraHang?: IStorePerson[]): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.STORE_RETURN_ORDER,
    payload: {
      arrStoreTraHang
    }
  };
}

export function setFilterDateTraHang(
  currentDateTraHang?: IDateFilterType,
  convertCurrentDateTraHang?: IDateRange
) {
  return {
    type: RETURN_ORDER_ACTION.SET_MAP_FILTER,
    payload: {
      currentDateTraHang,
      convertCurrentDateTraHang
    }
  };
}

export function setCodeTraHang(code: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}

export function setNoteTraHang(note: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_NOTE,
    payload: {
      note
    }
  };
}
export function setProductSkuTraHang(product_sku: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_PRODUCT_SKU,
    payload: {
      product_sku
    }
  };
}
export function setProductNameTraHang(product_name: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_PRODUCT_NAME,
    payload: {
      product_name
    }
  };
}
export function setCustomerTraHang(customer: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_CUSTOMER,
    payload: {
      customer
    }
  };
}
export function setReceiverTraHang(receiver: string): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.KEYWORD_RECEIVER,
    payload: {
      receiver
    }
  };
}
export function setStatusTraHang(arrStatusTraHang: IStatusItem[]): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.STATUS_SELECT,
    payload: {
      arrStatusTraHang
    }
  };
}

export function setPaymentMethodTraHang(pttt: IPaymentItem): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.PAYMENT_METHODS,
    payload: {
      pttt
    }
  };
}
export function changeArrPTTTTraHang(arrPTTTDaChon: IPaymentItem[]) {
  return {
    type: RETURN_ORDER_ACTION.CHANGE_ARR_PTTT_RETURN_ORDER,
    payload: {
      arrPTTTDaChon
    }
  };
}
export function onChangePTBHTraHang(ptbh: IMethodSales) {
  return {
    type: RETURN_ORDER_ACTION.CHANGE_PTBH_RETURN_ORDER,
    payload: {
      ptbh
    }
  };
}
export function changeArrPTBHTraHang(arrPTBHDaChon: IMethodSales[]) {
  return {
    type: RETURN_ORDER_ACTION.CHANGE_ARR_PTBH_RETURN_ORDER,
    payload: {
      arrPTBHDaChon
    }
  };
}
export function setChannelsTraHang(channels: any): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.CHANELS_SELECT,
    payload: {
      channels
    }
  };
}

export function onChangeStaffTraHang(arrStaffDaChonTraHang: IStaffModel[]) {
  return {
    type: RETURN_ORDER_ACTION.CHANGE_STARFF_LOC_TRA_HANG,
    payload: {
      arrStaffDaChonTraHang
    }
  };
}

export function setLocationCityTraHang(locationDaChon?: ILocation): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.LOCATION_CITY_DA_CHON,
    payload: {
      locationDaChon
    }
  };
}

export function setValueTraHang(
  filterTraHangReducer: IReturnOrderState
): IAppAction<IReturnOrderState> {
  return {
    type: RETURN_ORDER_ACTION.SET_VALUE,
    payload: {
      code: filterTraHangReducer.code,
      note: filterTraHangReducer.note,
      customer: filterTraHangReducer.customer,
      product_sku: filterTraHangReducer.product_sku,
      product_name: filterTraHangReducer.product_name,
      receiver: filterTraHangReducer.receiver,
      channels: filterTraHangReducer.channels,
      arrPTBHDaChon: filterTraHangReducer.arrPTBHDaChon,
      arrPTTTDaChon: filterTraHangReducer.arrPTTTDaChon,
      arrStaffDaChonTraHang: filterTraHangReducer.arrStaffDaChonTraHang,
      locationDaChon: filterTraHangReducer.locationDaChon
    }
  };
}

export function onDestroyReturnOrder() {
  return {
    type: RETURN_ORDER_ACTION.DESTROY_RETURN_ORDER
  };
}

const ReturnOrderReducer = (
  state: IReturnOrderState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrReturnOrder: [],
    types: null,

    currentSort: CONFIG_SORT_FILTER.HOA_DON[0],
    arrStoreTraHang: [],

    currentDateTraHang: CONFIG_DATE_FILTER.HOA_DON[5],
    convertCurrentDateTraHang: Utilities.getDateFilter(CONFIG_DATE_FILTER.HOA_DON[5].id),
    arrStatusTraHang: [],

    arrStaffDaChonTraHang: [],
    arrPTBHDaChon: [...ARR_PT_BAN_HANG],
    arrPTTTDaChon: [...ARR_PT_THANHTOAN]
  },
  action: IAppAction<IReturnOrderState>
): IReturnOrderState => {
  switch (action.type) {
    case RETURN_ORDER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case RETURN_ORDER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case RETURN_ORDER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case RETURN_ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrReturnOrder: action.payload?.arrReturnOrder,
          sum: action.payload?.sum
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          sum: action.payload?.sum,
          arrReturnOrder: state.arrReturnOrder?.concat(action.payload?.arrReturnOrder || [])
        };
      }
    case RETURN_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case RETURN_ORDER_ACTION.CLEAR_DASHBOARD:
      return {
        isRefresh: false,
        count: 0,
        isStop: false,
        isLoadMore: false,
        arrReturnOrder: []
      };
    case RETURN_ORDER_ACTION.SET_TYPES:
      return {...state, types: action.payload?.types};
    case RETURN_ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };
    case RETURN_ORDER_ACTION.STORE_RETURN_ORDER:
      return {
        ...state,
        arrStoreTraHang: action.payload?.arrStoreTraHang
      };
    case RETURN_ORDER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentDateTraHang: action.payload?.currentDateTraHang,
        convertCurrentDateTraHang: action.payload?.convertCurrentDateTraHang
      };
    case RETURN_ORDER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case RETURN_ORDER_ACTION.KEYWORD_NOTE:
      return {
        ...state,
        note: action.payload?.note
      };
    case RETURN_ORDER_ACTION.KEYWORD_PRODUCT_SKU:
      return {
        ...state,
        product_sku: action.payload?.product_sku
      };
    case RETURN_ORDER_ACTION.KEYWORD_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload?.product_name
      };
    case RETURN_ORDER_ACTION.KEYWORD_CUSTOMER:
      return {
        ...state,
        customer: action.payload?.customer
      };
    case RETURN_ORDER_ACTION.KEYWORD_RECEIVER:
      return {
        ...state,
        receiver: action.payload?.receiver
      };
    case RETURN_ORDER_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrStatusTraHang: action.payload?.arrStatusTraHang
      };
    case RETURN_ORDER_ACTION.CHANELS_SELECT:
      return {
        ...state,
        channels: action.payload?.channels
      };
    case RETURN_ORDER_ACTION.PAYMENT_METHODS:
      let arrPTTTDaChonCopy = [...(state.arrPTTTDaChon || [])] || [];
      if (action.payload?.pttt) {
        let indexExist = arrPTTTDaChonCopy.findIndex(
          x => x.method === action.payload?.pttt?.method
        );
        if (indexExist > -1) {
          arrPTTTDaChonCopy.splice(indexExist, 1);
        } else {
          arrPTTTDaChonCopy.push(action.payload?.pttt);
        }
        return {
          ...state,
          arrPTTTDaChon: arrPTTTDaChonCopy
        };
      }
      return state;
    case RETURN_ORDER_ACTION.CHANGE_ARR_PTTT_RETURN_ORDER:
      return {
        ...state,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon
      };
    case RETURN_ORDER_ACTION.CHANGE_PTBH_RETURN_ORDER:
      let arrPTBHDaChonCopy = [...(state.arrPTBHDaChon || [])] || [];
      if (action.payload?.ptbh) {
        let indexExist = arrPTBHDaChonCopy.findIndex(x => x.id === action.payload?.ptbh?.id);
        if (indexExist > -1) {
          arrPTBHDaChonCopy.splice(indexExist, 1);
        } else {
          arrPTBHDaChonCopy.push(action.payload?.ptbh);
        }
        return {
          ...state,
          arrPTBHDaChon: arrPTBHDaChonCopy
        };
      }
      return state;
    case RETURN_ORDER_ACTION.CHANGE_ARR_PTBH_RETURN_ORDER:
      return {
        ...state,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon
      };
    case RETURN_ORDER_ACTION.CHANGE_STARFF_LOC_TRA_HANG:
      return {
        ...state,
        arrStaffDaChonTraHang: action.payload?.arrStaffDaChonTraHang
      };
    case RETURN_ORDER_ACTION.LOCATION_CITY_DA_CHON:
      return {
        ...state,
        locationDaChon: action.payload?.locationDaChon
      };
    case RETURN_ORDER_ACTION.SET_VALUE:
      return {
        ...state,
        code: action.payload?.code,
        note: action.payload?.note,
        customer: action.payload?.customer,
        product_sku: action.payload?.product_sku,
        product_name: action.payload?.product_name,
        channels: action.payload?.channels,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon,
        arrStaffDaChonTraHang: action.payload?.arrStaffDaChonTraHang,
        locationDaChon: action.payload?.locationDaChon
      };
    case RETURN_ORDER_ACTION.DESTROY_RETURN_ORDER:
      return {
        isRefresh: false,
        isFirstLoading: true,
        count: 0,
        isStop: false,
        isLoadMore: false,
        arrReturnOrder: [],
        types: null,

        currentSort: CONFIG_SORT_FILTER.HOA_DON[0],
        arrStoreTraHang: [],

        currentDateTraHang: CONFIG_DATE_FILTER.HOA_DON[5],
        convertCurrentDateTraHang: Utilities.getDateFilter(CONFIG_DATE_FILTER.HOA_DON[5].id),
        arrStatusTraHang: [],

        arrStaffDaChonTraHang: [],
        arrPTBHDaChon: [...ARR_PT_BAN_HANG],
        arrPTTTDaChon: [...ARR_PT_THANHTOAN]
      };
    default:
      return state;
  }
};

export default ReturnOrderReducer;
