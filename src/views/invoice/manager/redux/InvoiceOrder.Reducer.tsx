import {IInvoiceOrderState} from './InvoiceOrder.Types';
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
import {IStatusItem} from 'configs/StatusConfig';
import {IStaffModel} from 'models/Staff.Model';
import {ILocation} from 'models/Localtion.Model';
import {IStorePerson} from 'models/ModelBase';

export const INVOICE_ORDER_ACTION = {
  LIST: 'ORDER/INVOICE/LIST',
  LIST_SUCCESS: 'ORDER/INVOICE/LIST_SUCCESS',
  LIST_FAIL: 'ORDER/INVOICE/LIST_FAIL',
  FIRST_LOADING: 'ORDER/INVOICE/FIRST_LOADING',
  REFRESH: 'ORDER/INVOICE/REFRESH',
  LOADMORE: 'ORDER/INVOICE/LOADMORE',
  LIST_DASHBOARD: 'ORDER/INVOICE/LIST/DASHBOARD',
  CLEAR_DASHBOARD: 'ORDER/INVOICE/CLEAR/DASHBOARD',
  SET_TYPES: 'ORDER/INVOICE/SET_TYPES',

  SORT_SELECT: 'INVOICE/SORT/SELECT',
  STORE_INVOICE: 'INVOICE/SORT/STORE_INVOICE',
  SET_MAP_FILTER: 'INVOICE/FILTER_DATE/SET_MAP_FILTER',

  SET_VALUE: 'INVOICE/FILTER/SET_VALUE',

  KEYWORD_CODE: 'INVOICE/FILTER/KEYWORD_CODE',
  KEYWORD_NOTE: 'INVOICE/FILTER/KEYWORD_NOTE',
  KEYWORD_PRODUCT_SKU: 'INVOICE/FILTER/KEYWORD_PRODUCT_SKU',
  KEYWORD_PRODUCT_NAME: 'INVOICE/FILTER/KEYWORD_PRODUCT_NAME',
  KEYWORD_CUSTOMER: 'INVOICE/FILTER/KEYWORD_CUSTOMER',
  KEYWORD_RECEIVER: 'INVOICE/FILTER/KEYWORD_RECEIVER',

  STATUS_SELECT: 'INVOICE/FILTER/STATUS_SELECT',

  PAYMENT_METHODS: 'INVOICE/FILTER/PAYMENT_METHODS',
  CHANGE_ARR_PTTT_INVOICE: 'INVOICE/FILTER/CHANGE_ARR_PTTT_INVOICE',
  CHANGE_PTBH_INVOICE: 'INVOICE/FILTER/CHANGE_PTBH_INVOICE',
  CHANGE_ARR_PTBH_INVOICE: 'INVOICE/FILTER/CHANGE_ARR_PTBH_INVOICE',
  CHANELS_SELECT: 'INVOICE/FILTER/CHANELS_SELECT',
  CHANGE_STARFF_LOC_INVOICE: 'INVOICE/FILTER/CHANGE_STARFF_LOC_INVOICE',

  LOCATION_CITY_DA_CHON: 'ORDER/INVOICE/LOCATION_CITY_DA_CHON',

  DESTROY_INVOICE_ORDER: 'ORDER/INVOICE/DESTROY_INVOICE_ORDER'
};

export function getListInvoice() {
  return {
    type: INVOICE_ORDER_ACTION.LIST
  };
}
export function setTypeInvoice(types: 'return' | 'retail' | null) {
  return {
    type: INVOICE_ORDER_ACTION.SET_TYPES,
    payload: {
      types
    }
  };
}
export function clearListDashBoardInvoice() {
  return {
    type: INVOICE_ORDER_ACTION.CLEAR_DASHBOARD
  };
}
export function onFisrtLoadingInvoice(isFirstLoading: boolean): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function setOnRefreshInvoice(isRefresh: boolean): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function setOnLoadmoreInvoice(isLoadMore: boolean): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.LOADMORE,
    payload: {
      isLoadMore
    }
  };
}

export function setParamsSortInvoice(currentSort: ISortFilterType) {
  return {
    type: INVOICE_ORDER_ACTION.SORT_SELECT,
    payload: {
      currentSort
    }
  };
}
export function setStoreInvoice(arrStoreInvoice?: IStorePerson[]): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.STORE_INVOICE,
    payload: {
      arrStoreInvoice
    }
  };
}

export function setFilterDateInvoice(
  currentDateInvoice?: IDateFilterType,
  convertCurrentDateInvoice?: IDateRange
) {
  return {
    type: INVOICE_ORDER_ACTION.SET_MAP_FILTER,
    payload: {
      currentDateInvoice,
      convertCurrentDateInvoice
    }
  };
}

export function setCodeInvoice(code: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}

export function setNoteInvoice(note: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_NOTE,
    payload: {
      note
    }
  };
}
export function setProductSkuInvoice(product_sku: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_PRODUCT_SKU,
    payload: {
      product_sku
    }
  };
}
export function setProductNameInvoice(product_name: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_PRODUCT_NAME,
    payload: {
      product_name
    }
  };
}
export function setCustomerInvoice(customer: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_CUSTOMER,
    payload: {
      customer
    }
  };
}
export function setReceiverInvoice(receiver: string): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.KEYWORD_RECEIVER,
    payload: {
      receiver
    }
  };
}
export function setStatusInvoice(
  arrCurrentStatusInvoice: IStatusItem[]
): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.STATUS_SELECT,
    payload: {
      arrCurrentStatusInvoice
    }
  };
}

export function setPaymentMethodInvoice(pttt: IPaymentItem) {
  return {
    type: INVOICE_ORDER_ACTION.PAYMENT_METHODS,
    payload: {
      pttt
    }
  };
}
export function changeArrPTTTInvoice(arrPTTTDaChon: IPaymentItem[]) {
  return {
    type: INVOICE_ORDER_ACTION.CHANGE_ARR_PTTT_INVOICE,
    payload: {
      arrPTTTDaChon
    }
  };
}
export function onChangePTBHInvoice(ptbh: IMethodSales) {
  return {
    type: INVOICE_ORDER_ACTION.CHANGE_PTBH_INVOICE,
    payload: {
      ptbh
    }
  };
}
export function changeArrPTBHInvoice(arrPTBHDaChon: IMethodSales[]) {
  return {
    type: INVOICE_ORDER_ACTION.CHANGE_ARR_PTBH_INVOICE,
    payload: {
      arrPTBHDaChon
    }
  };
}
export function setChannelsInvoice(channels: any): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.CHANELS_SELECT,
    payload: {
      channels
    }
  };
}

export function onChangeStaffInvoice(arrStaffDaChonInvoice: IStaffModel[]) {
  return {
    type: INVOICE_ORDER_ACTION.CHANGE_STARFF_LOC_INVOICE,
    payload: {
      arrStaffDaChonInvoice
    }
  };
}

export function setLocationCityInvoice(locationDaChon?: ILocation): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.LOCATION_CITY_DA_CHON,
    payload: {
      locationDaChon
    }
  };
}

export function setValueInvoice(
  filterInvoiceReducer: IInvoiceOrderState
): IAppAction<IInvoiceOrderState> {
  return {
    type: INVOICE_ORDER_ACTION.SET_VALUE,
    payload: {
      code: filterInvoiceReducer.code,
      note: filterInvoiceReducer.note,
      customer: filterInvoiceReducer.customer,
      product_sku: filterInvoiceReducer.product_sku,
      product_name: filterInvoiceReducer.product_name,
      receiver: filterInvoiceReducer.receiver,
      channels: filterInvoiceReducer.channels,
      arrPTBHDaChon: filterInvoiceReducer.arrPTBHDaChon,
      arrPTTTDaChon: filterInvoiceReducer.arrPTTTDaChon,
      arrStaffDaChonInvoice: filterInvoiceReducer.arrStaffDaChonInvoice,
      locationDaChon: filterInvoiceReducer.locationDaChon
    }
  };
}

export function onDestroyInvoiceOrder() {
  return {
    type: INVOICE_ORDER_ACTION.DESTROY_INVOICE_ORDER
  };
}

const InvoiceOrderReducer = (
  state: IInvoiceOrderState = {
    isRefresh: false,
    isFirstLoading: true,
    count: 0,
    isStop: false,
    isLoadMore: false,
    arrInvoiceOrder: [],
    types: null,

    currentSort: CONFIG_SORT_FILTER.HOA_DON[0],
    arrStoreInvoice: [],

    currentDateInvoice: CONFIG_DATE_FILTER.HOA_DON[5],
    convertCurrentDateInvoice: Utilities.getDateFilter(CONFIG_DATE_FILTER.HOA_DON[5].id),
    arrCurrentStatusInvoice: [],

    arrStaffDaChonInvoice: [],
    arrPTBHDaChon: [...ARR_PT_BAN_HANG],
    arrPTTTDaChon: [...ARR_PT_THANHTOAN]
  },
  action: IAppAction<IInvoiceOrderState>
): IInvoiceOrderState => {
  switch (action.type) {
    case INVOICE_ORDER_ACTION.FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action?.payload?.isFirstLoading
      };
    case INVOICE_ORDER_ACTION.REFRESH:
      return {
        ...state,
        isStop: false,
        isRefresh: action?.payload?.isRefresh
      };
    case INVOICE_ORDER_ACTION.LOADMORE:
      return {
        ...state,
        isLoadMore: action?.payload?.isLoadMore
      };
    case INVOICE_ORDER_ACTION.LIST_SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrInvoiceOrder: action.payload?.arrInvoiceOrder
        };
      } else {
        return {
          ...state,
          isRefresh: false,
          isFirstLoading: false,
          count: action.payload?.count,
          isStop: action.payload?.isStop,
          isLoadMore: false,
          arrInvoiceOrder: state.arrInvoiceOrder?.concat(action.payload?.arrInvoiceOrder || [])
        };
      }
    case INVOICE_ORDER_ACTION.LIST_FAIL:
      return {
        ...state,
        isLoadMore: false,
        isRefresh: false,
        isStop: true,
        isFirstLoading: false
      };
    case INVOICE_ORDER_ACTION.CLEAR_DASHBOARD:
      return {
        isRefresh: false,
        count: 0,
        isStop: false,
        isLoadMore: false,
        arrInvoiceOrder: []
      };
    case INVOICE_ORDER_ACTION.SET_TYPES:
      return {...state, types: action.payload?.types};
    case INVOICE_ORDER_ACTION.SORT_SELECT:
      return {
        ...state,
        currentSort: action.payload?.currentSort
      };
    case INVOICE_ORDER_ACTION.STORE_INVOICE:
      return {
        ...state,
        arrStoreInvoice: action.payload?.arrStoreInvoice
      };
    case INVOICE_ORDER_ACTION.SET_MAP_FILTER:
      return {
        ...state,
        currentDateInvoice: action.payload?.currentDateInvoice,
        convertCurrentDateInvoice: action.payload?.convertCurrentDateInvoice
      };
    case INVOICE_ORDER_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload?.code
      };
    case INVOICE_ORDER_ACTION.KEYWORD_NOTE:
      return {
        ...state,
        note: action.payload?.note
      };
    case INVOICE_ORDER_ACTION.KEYWORD_PRODUCT_SKU:
      return {
        ...state,
        product_sku: action.payload?.product_sku
      };
    case INVOICE_ORDER_ACTION.KEYWORD_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload?.product_name
      };
    case INVOICE_ORDER_ACTION.KEYWORD_CUSTOMER:
      return {
        ...state,
        customer: action.payload?.customer
      };
    case INVOICE_ORDER_ACTION.KEYWORD_RECEIVER:
      return {
        ...state,
        receiver: action.payload?.receiver
      };
    case INVOICE_ORDER_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrCurrentStatusInvoice: action.payload?.arrCurrentStatusInvoice
      };
    case INVOICE_ORDER_ACTION.CHANELS_SELECT:
      return {
        ...state,
        channels: action.payload?.channels
      };
    case INVOICE_ORDER_ACTION.PAYMENT_METHODS:
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
    case INVOICE_ORDER_ACTION.CHANGE_ARR_PTTT_INVOICE:
      return {
        ...state,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon
      };
    case INVOICE_ORDER_ACTION.CHANGE_PTBH_INVOICE:
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
    case INVOICE_ORDER_ACTION.CHANGE_ARR_PTBH_INVOICE:
      return {
        ...state,
        arrPTBHDaChon: action.payload?.arrPTBHDaChon
      };
    case INVOICE_ORDER_ACTION.CHANGE_STARFF_LOC_INVOICE:
      return {
        ...state,
        arrStaffDaChonInvoice: action.payload?.arrStaffDaChonInvoice
      };
    case INVOICE_ORDER_ACTION.LOCATION_CITY_DA_CHON:
      return {
        ...state,
        locationDaChon: action.payload?.locationDaChon
      };
    case INVOICE_ORDER_ACTION.SET_VALUE:
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
        arrStaffDaChonInvoice: action.payload?.arrStaffDaChonInvoice,
        locationDaChon: action.payload?.locationDaChon
      };

    case INVOICE_ORDER_ACTION.DESTROY_INVOICE_ORDER:
      return {
        isRefresh: false,
        isFirstLoading: true,
        count: 0,
        isStop: false,
        isLoadMore: false,
        arrInvoiceOrder: [],
        types: null,

        currentSort: CONFIG_SORT_FILTER.HOA_DON[0],
        arrStoreInvoice: [],

        currentDateInvoice: CONFIG_DATE_FILTER.HOA_DON[5],
        convertCurrentDateInvoice: Utilities.getDateFilter(CONFIG_DATE_FILTER.HOA_DON[5].id),
        arrCurrentStatusInvoice: [],

        arrStaffDaChonInvoice: []
      };
    default:
      return state;
  }
};

export default InvoiceOrderReducer;
