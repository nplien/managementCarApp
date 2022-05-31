import {IOrderState} from './Order.Types';
import {IAppAction, IDateFilterType, IDateRange, ISortFilterType} from 'views/app';

import {
  ARR_PT_BAN_HANG,
  ARR_PT_THANHTOAN,
  CONFIG_DATE_FILTER,
  CONFIG_SORT_FILTER,
  IMethodSales,
  IPaymentItem
} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IStatusItem} from 'configs/StatusConfig';
import {IStaffModel} from 'models/Staff.Model';
import {ILocation} from 'models/Localtion.Model';
import {IStorePerson} from 'models/ModelBase';

export const ORDER_ACTION = {
  LIST: 'ORDER/NORMAL_ORDER/LIST',
  LIST_SUCCESS: 'ORDER/NORMAL_ORDER/LIST_SUCCESS',
  LIST_FAIL: 'ORDER/NORMAL_ORDER/LIST_FAIL',
  LOADMORE: 'ORDER/NORMAL_ORDER/LOADMORE',
  REFRESH: 'ORDER/NORMAL_ORDER/REFRESH',
  CLEAR_DASHBOARD: 'ORDER/NORMAL_ORDER/CLEAR/DASHBOARD',

  SORT_SELECT: 'ORDER/SORT/SELECT',
  STORE_ORDER: 'ORDER/SORT/STORE_ORDER',
  FILTER_SELECT: 'ORDER/FILTER/SELECT/DATE',

  KEYWORD_CODE: 'ORDER/FILTER/KEYWORD_CODE',
  KEYWORD_NOTE: 'ORDER/FILTER/KEYWORD_NOTE',
  KEYWORD_CUSTOMER: 'ORDER/FILTER/KEYWORD_CUSTOMER',
  KEYWORD_RECEIVER: 'ORDER/FILTER/KEYWORD_RECEIVERKEYWORD',
  KEYWORD_PRODUCT_SKU: 'ORDER/FILTER/KEYWORD_PRODUCT_SKU',
  KEYWORD_PRODUCT_NAME: 'ORDER/FILTER/KEYWORD_PRODUCT_NAME',

  STATUS_SELECT: 'ORDER/FILTER/STATUS_SELECT',
  CHANGE_STARFF_LOC_ORDER: 'INVOICE/FILTER/CHANGE_STARFF_LOC_ORDER',
  LOCATION_CITY_DA_CHON_ORDER: 'ORDER/INVOICE/LOCATION_CITY_DA_CHON_ORDER',

  PAYMENT_METHODS: 'ORDER/INVOICE/PAYMENT_METHODS',
  CHANGE_ARR_PTTT_ORDER: 'ORDER/INVOICE/CHANGE_ARR_PTTT_INVOICE',
  CHANGE_PTBH_ORDER: 'ORDER/INVOICE/CHANGE_PTBH_INVOICE',
  CHANGE_ARR_PTBH_ORDER: 'ORDER/INVOICE/CHANGE_ARR_PTBH_INVOICE',

  CHANELS_SELECT: 'ORDER/INVOICE/CHANELS_SELECT',

  SET_VALUE: 'ORDER/FILTER/SET_VALUE',
  DESTROY_DH: 'ORDER/FILTER/DESTROY_DH'
};

export function getListOrder() {
  return {
    type: ORDER_ACTION.LIST
  };
}
export function clearListDashBoardOrder() {
  return {
    type: ORDER_ACTION.CLEAR_DASHBOARD
  };
}
export function setOnRefreshDH(isRefresh: boolean) {
  return {
    type: ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreDH(isLoadMore: boolean) {
  return {
    type: ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setOrderSort(orderSort: ISortFilterType) {
  return {
    type: ORDER_ACTION.SORT_SELECT,
    payload: {
      orderSort
    }
  };
}
export function setStoreOrder(arrStoreOrder?: IStorePerson[]) {
  return {
    type: ORDER_ACTION.STORE_ORDER,
    payload: {
      arrStoreOrder
    }
  };
}

export function setOrderFilterDate(
  orderFilterDate?: IDateFilterType,
  convertOrderFilterDate?: IDateRange
) {
  return {
    type: ORDER_ACTION.FILTER_SELECT,
    payload: {
      orderFilterDate,
      convertOrderFilterDate
    }
  };
}

export function setKeywordCodeDH(code: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}
export function setKeywordNoteDH(note: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_NOTE,
    payload: {
      note
    }
  };
}
export function setKeywordCustomerDH(customer: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_CUSTOMER,
    payload: {
      customer
    }
  };
}
export function setKeywordReceiverDG(receiver: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_RECEIVER,
    payload: {
      receiver
    }
  };
}
export function setKeywordpPoductSkuDH(product_sku: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_PRODUCT_SKU,
    payload: {
      product_sku
    }
  };
}
export function setKeywordProductNameDH(product_name: string): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.KEYWORD_PRODUCT_NAME,
    payload: {
      product_name
    }
  };
}

export function setStatusOrder(arrCurrentStatusDH?: IStatusItem[]): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.STATUS_SELECT,
    payload: {
      arrCurrentStatusDH
    }
  };
}

export function onChangeStaffOrder(arrStaffDaChonOrder: IStaffModel[]) {
  return {
    type: ORDER_ACTION.CHANGE_STARFF_LOC_ORDER,
    payload: {
      arrStaffDaChonOrder
    }
  };
}

export function setLocationCityOrder(locationDaChonOrder?: ILocation): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.LOCATION_CITY_DA_CHON_ORDER,
    payload: {
      locationDaChonOrder
    }
  };
}

export function setPaymentMethodOrder(pttt: IPaymentItem): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.PAYMENT_METHODS,
    payload: {
      pttt
    }
  };
}
export function changeArrPTTTOrder(arrPTTTDaChon: IPaymentItem[]) {
  return {
    type: ORDER_ACTION.CHANGE_ARR_PTTT_ORDER,
    payload: {
      arrPTTTDaChon
    }
  };
}
export function onChangePTBHOrder(ptbh: IMethodSales) {
  return {
    type: ORDER_ACTION.CHANGE_PTBH_ORDER,
    payload: {
      ptbh
    }
  };
}
export function changeArrPTBHOrder(arrPTBHDaChon: IMethodSales[]) {
  return {
    type: ORDER_ACTION.CHANGE_ARR_PTBH_ORDER,
    payload: {
      arrPTBHDaChon
    }
  };
}

export function setChannelsOrder(channels: any): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.CHANELS_SELECT,
    payload: {
      channels
    }
  };
}

export function setValueOrder(filterOrderReducer: IOrderState): IAppAction<IOrderState> {
  return {
    type: ORDER_ACTION.SET_VALUE,
    payload: {
      code: filterOrderReducer.code,
      note: filterOrderReducer.note,
      customer: filterOrderReducer.customer,
      receiver: filterOrderReducer.receiver,
      product_sku: filterOrderReducer.product_sku,
      product_name: filterOrderReducer.product_name,
      arrStaffDaChonOrder: filterOrderReducer.arrStaffDaChonOrder,
      locationDaChonOrder: filterOrderReducer.locationDaChonOrder,
      channels: filterOrderReducer.channels,
      arrPTBHDaChon: filterOrderReducer.arrPTBHDaChon,
      arrPTTTDaChon: filterOrderReducer.arrPTTTDaChon
    }
  };
}

export function onDestroyOrderDH() {
  return {
    type: ORDER_ACTION.DESTROY_DH
  };
}

const OrderReducer = (
  state: IOrderState = {
    isFirstLoading: true,
    count: 0,
    isLoadMore: false,
    arrOrder: [],
    isRefresh: false,
    isStop: false,
    isError: false,

    orderSort: CONFIG_SORT_FILTER.DAT_HANG[0],
    arrStoreOrder: [],

    orderFilterDate: CONFIG_DATE_FILTER.DAT_HANG[5],
    convertOrderFilterDate: Utilities.getDateFilter(CONFIG_DATE_FILTER.DAT_HANG[5].id),

    arrCurrentStatusDH: [],
    arrStaffDaChonOrder: [],
    arrPTBHDaChon: [...ARR_PT_BAN_HANG],
    arrPTTTDaChon: [...ARR_PT_THANHTOAN]
  },
  action: IAppAction<IOrderState>
): IOrderState => {
  switch (action.type) {
    case ORDER_ACTION.LOADMORE:
      return {...state, isLoadMore: action.payload?.isLoadMore};

    case ORDER_ACTION.REFRESH:
      return {...state, isRefresh: action.payload?.isRefresh};

    case ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          isStop: action.payload?.isStop,
          count: action.payload?.count,
          isLoadMore: false,
          arrOrder: action.payload?.arrOrder ? action.payload?.arrOrder : []
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          isStop: action.payload?.isStop,
          count: action.payload?.count,
          isLoadMore: false,
          arrOrder: state.arrOrder?.concat(action.payload?.arrOrder || [])
        };
      }

    case ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isError: true,
        isFirstLoading: false
      };
    case ORDER_ACTION.CLEAR_DASHBOARD:
      return {
        count: 0,
        isLoadMore: false,
        arrOrder: [],
        isRefresh: false,
        isStop: false,
        isError: false
      };
    case ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        orderSort: action.payload?.orderSort
      };
    case ORDER_ACTION.STORE_ORDER:
      return {
        ...state,
        arrStoreOrder: action.payload?.arrStoreOrder
      };
    case ORDER_ACTION.FILTER_SELECT:
      return {
        ...state,
        orderFilterDate: action.payload?.orderFilterDate,
        convertOrderFilterDate: action.payload?.convertOrderFilterDate
      };
    case ORDER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case ORDER_ACTION.KEYWORD_NOTE:
      return {
        ...state,
        note: action.payload?.note
      };
    case ORDER_ACTION.KEYWORD_CUSTOMER:
      return {
        ...state,
        customer: action.payload?.customer
      };
    case ORDER_ACTION.KEYWORD_RECEIVER:
      return {
        ...state,
        receiver: action.payload?.receiver
      };
    case ORDER_ACTION.KEYWORD_PRODUCT_SKU:
      return {
        ...state,
        product_sku: action.payload?.product_sku
      };
    case ORDER_ACTION.KEYWORD_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload?.product_name
      };
    case ORDER_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrCurrentStatusDH: action.payload?.arrCurrentStatusDH
      };
    case ORDER_ACTION.CHANGE_STARFF_LOC_ORDER:
      return {
        ...state,
        arrStaffDaChonOrder: action.payload?.arrStaffDaChonOrder
      };
    case ORDER_ACTION.LOCATION_CITY_DA_CHON_ORDER:
      return {
        ...state,
        locationDaChonOrder: action.payload?.locationDaChonOrder
      };
    case ORDER_ACTION.CHANELS_SELECT:
      return {
        ...state,
        channels: action.payload?.channels
      };
    case ORDER_ACTION.PAYMENT_METHODS:
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
    case ORDER_ACTION.CHANGE_ARR_PTTT_ORDER:
      return {
        ...state,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon
      };
    case ORDER_ACTION.CHANGE_PTBH_ORDER:
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
    case ORDER_ACTION.CHANGE_ARR_PTBH_ORDER:
      return {
        ...state,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon
      };
    case ORDER_ACTION.SET_VALUE:
      return {
        ...state,
        code: action.payload?.code,
        note: action.payload?.note,
        customer: action.payload?.customer,
        receiver: action.payload?.receiver,
        product_sku: action.payload?.product_sku,
        product_name: action.payload?.product_name,
        arrStaffDaChonOrder: action.payload?.arrStaffDaChonOrder,
        locationDaChonOrder: action.payload?.locationDaChonOrder,
        channels: action.payload?.channels,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon
      };

    case ORDER_ACTION.DESTROY_DH:
      return {
        isFirstLoading: true,
        count: 0,
        isLoadMore: false,
        arrOrder: [],
        isRefresh: false,
        isStop: false,
        isError: false,

        orderSort: CONFIG_SORT_FILTER.DAT_HANG[0],
        arrStoreOrder: [],

        orderFilterDate: CONFIG_DATE_FILTER.DAT_HANG[5],
        convertOrderFilterDate: Utilities.getDateFilter(CONFIG_DATE_FILTER.DAT_HANG[5].id),

        arrCurrentStatusDH: [],
        arrStaffDaChonOrder: []
      };
    default:
      return state;
  }
};

export default OrderReducer;
