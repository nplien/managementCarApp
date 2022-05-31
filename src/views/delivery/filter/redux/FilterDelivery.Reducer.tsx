import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IFilterDeliveryState, IFilterDeliveryAction} from './FilterDelivery.Types';
export const ARR_THU_TIEN_HO_COD = [
  {
    id: 'is_cod_amount',
    name: 'Có COD',
    value: true
  },
  {
    id: 'is_cod_amount',
    name: 'Không có COD',
    value: false
  }
];
export const ARR_DOI_TAC_GIAO_HANG = [
  {
    id: 'ghn',
    name: 'Giao Hàng Nhanh'
  },
  {
    id: 'ghtk',
    name: 'Giao hàng tiết kiệm'
  }
];
export const FILTER_DELVERY_ACTION = {
  STATUS_SELECT: 'DELVERY/FILTER_DELVERY/STATUS/SELECT',

  KEYWORD_CODE: 'DELVERY/FILTER_DELVERY/KEYWORD_CODE',
  KEYWORD_CUSTOMER: 'DELVERY/FILTER_DELVERY/KEYWORD_CUSTOMER',
  KEYWORD_ORDER_CODE: 'DELVERY/FILTER_DELVERY/KEYWORD_ORDER_CODE',
  KEYWORD_NOTE: 'DELVERY/FILTER_DELVERY/KEYWORD_NOTE',

  SET_MAP_FILTER_TIME_HT: 'DELVERY/FILTER_DELVERY/SET_MAP_FILTER_TIME_HT',
  PROVINCES_CITY_DELIVER: 'DELVERY/FILTER_DELVERY/PROVINCES_CITY_DELIVER',
  DELETE_PROVINCES_CITY_DELIVER: 'DELVERY/FILTER_DELVERY/DELETE_PROVINCES_CITY_DELIVER',

  IS_CHUYEN_DI: 'DELVERY/FILTER_DELVERY/IS_CHUYEN_DI',
  IS_NHAP_VE: 'DELVERY/FILTER_DELVERY/IS_NHAP_VE',

  STORE_CHUYEN_DI: 'DELVERY/FILTER_DELVERY/STORE_CHUYEN_DI',
  STORE_NHAP_VE: 'DELVERY/FILTER_DELVERY/STORE_NHAP_VE',
  THU_TIEN_HO_COD: 'DELVERY/FILTER_DELVERY/THU_TIEN_HO_COD',
  DOI_TAC_GIAO_HANG: 'DELVERY/FILTER_DELVERY/DOI_TAC_GIAO_HANG',
  SET_VALUE: 'DELVERY/FILTER_DELVERY/SET_VALUE'
};

export function setKeywordCode(code: string): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.KEYWORD_CODE,
    payload: {
      code
    }
  };
}
export function setKeywordCustomer(customer: string): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.KEYWORD_CUSTOMER,
    payload: {
      customer
    }
  };
}
export function setKeywordOrderCode(order_code: string): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.KEYWORD_ORDER_CODE,
    payload: {
      order_code
    }
  };
}
export function setKeywordNote(note: string): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.KEYWORD_ORDER_CODE,
    payload: {
      note
    }
  };
}

export function setStatusDelivery(arrCurrentStatus: any): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.STATUS_SELECT,
    payload: {
      arrCurrentStatus
    }
  };
}

export function setIsChuyenDi(isChuyenDi: boolean): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.IS_CHUYEN_DI,
    payload: {
      isChuyenDi
    }
  };
}

export function setStoreChuyenDi(arrStoreChuyenDi: any): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.STORE_CHUYEN_DI,
    payload: {
      arrStoreChuyenDi
    }
  };
}

export function setIsNhapVe(isNhapVe: boolean): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.IS_NHAP_VE,
    payload: {
      isNhapVe
    }
  };
}

export function setStoreNhapVe(arrStoreNhapVe: any): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.STORE_NHAP_VE,
    payload: {
      arrStoreNhapVe
    }
  };
}

export function setThuTienHoCOD(thuTienHoCOD: any): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.THU_TIEN_HO_COD,
    payload: {
      thuTienHoCOD
    }
  };
}
export function setDoiTacGiaoHang(doiTacGiaohang: any): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.DOI_TAC_GIAO_HANG,
    payload: {
      doiTacGiaohang
    }
  };
}

export function setParamsFilterTimeHT(currentFilterTimeHT: any, convertCurrentFilterTimeHT: any) {
  return {
    type: FILTER_DELVERY_ACTION.SET_MAP_FILTER_TIME_HT,
    payload: {
      currentFilterTimeHT,
      convertCurrentFilterTimeHT
    }
  };
}

export function setProvincesCityDelivery(provincesCity: {code: string; name: string}) {
  return {
    type: FILTER_DELVERY_ACTION.PROVINCES_CITY_DELIVER,
    payload: {provincesCity}
  };
}

export function setDeleteProvincesCity(provincesCity: {code: string; name: string}) {
  return {
    type: FILTER_DELVERY_ACTION.DELETE_PROVINCES_CITY_DELIVER,
    payload: {provincesCity}
  };
}
export function setValue(filterDeliveryReducer: IFilterDeliveryState): IFilterDeliveryAction {
  return {
    type: FILTER_DELVERY_ACTION.SET_VALUE,
    payload: {
      doiTacGiaohang: filterDeliveryReducer.doiTacGiaohang,
      thuTienHoCOD: filterDeliveryReducer.thuTienHoCOD,
      code: filterDeliveryReducer.code,
      customer: filterDeliveryReducer.customer,
      order_code: filterDeliveryReducer.order_code,
      note: filterDeliveryReducer.note,
      currentFilterTimeHT: filterDeliveryReducer.currentFilterTimeHT,
      convertCurrentFilterTimeHT: filterDeliveryReducer.convertCurrentFilterTimeHT,
      provincesCity: filterDeliveryReducer.provincesCity
    }
  };
}
const FilterDeliveryReducer = (
  state: IFilterDeliveryState = {
    arrCurrentStatus: [],
    isNhapVe: false,
    isChuyenDi: false,
    arrStoreNhapVe: null,
    arrStoreChuyenDi: null,
    thuTienHoCOD: {},
    doiTacGiaohang: {},
    currentFilterTimeHT: CONFIG_DATE_FILTER.VAN_DON[0],
    convertCurrentFilterTimeHT: Utilities.getDateFilter('TOAN_THOI_GIAN'),
    provincesCity: []
  },
  action: IFilterDeliveryAction
): IFilterDeliveryState => {
  switch (action.type) {
    case FILTER_DELVERY_ACTION.KEYWORD_CODE:
      return {
        ...state,
        code: action.payload.code
      };
    case FILTER_DELVERY_ACTION.KEYWORD_CUSTOMER:
      return {
        ...state,
        customer: action.payload.customer
      };
    case FILTER_DELVERY_ACTION.KEYWORD_ORDER_CODE:
      return {
        ...state,
        order_code: action.payload.order_code
      };
    case FILTER_DELVERY_ACTION.KEYWORD_NOTE:
      return {
        ...state,
        note: action.payload.note
      };

    case FILTER_DELVERY_ACTION.SET_MAP_FILTER_TIME_HT:
      return {
        ...state,
        currentFilterTimeHT: action.payload?.currentFilterTimeHT,
        convertCurrentFilterTimeHT: action.payload?.convertCurrentFilterTimeHT
      };
    case FILTER_DELVERY_ACTION.STATUS_SELECT:
      return {
        ...state,
        arrCurrentStatus: action.payload.arrCurrentStatus
      };
    case FILTER_DELVERY_ACTION.IS_CHUYEN_DI:
      return {
        ...state,
        isChuyenDi: action.payload.isChuyenDi
      };
    case FILTER_DELVERY_ACTION.IS_NHAP_VE:
      return {
        ...state,
        isNhapVe: action.payload.isNhapVe
      };
    case FILTER_DELVERY_ACTION.STORE_CHUYEN_DI:
      return {
        ...state,
        arrStoreChuyenDi:
          action.payload.arrStoreChuyenDi.length > 0 ? [...action.payload.arrStoreChuyenDi] : null
      };
    case FILTER_DELVERY_ACTION.STORE_NHAP_VE:
      return {
        ...state,
        arrStoreNhapVe:
          action.payload.arrStoreNhapVe.length > 0 ? [...action.payload.arrStoreNhapVe] : null
      };
    case FILTER_DELVERY_ACTION.THU_TIEN_HO_COD:
      return {
        ...state,
        thuTienHoCOD: action.payload?.thuTienHoCOD
      };
    case FILTER_DELVERY_ACTION.DOI_TAC_GIAO_HANG:
      return {
        ...state,
        doiTacGiaohang: action.payload?.doiTacGiaohang
      };
    case FILTER_DELVERY_ACTION.PROVINCES_CITY_DELIVER:
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
    case FILTER_DELVERY_ACTION.DELETE_PROVINCES_CITY_DELIVER:
      const indexDelete = state.provincesCity.findIndex(
        (value: {code: number}) => value.code === action.payload?.provincesCity.code
      );
      if (indexDelete !== -1) {
        state.provincesCity.splice(indexDelete, 1);
      }
      return {
        ...state
      };
    case FILTER_DELVERY_ACTION.SET_VALUE:
      return {
        ...state,
        doiTacGiaohang: action.payload?.doiTacGiaohang,
        thuTienHoCOD: action.payload?.thuTienHoCOD,
        code: action.payload?.code,
        customer: action.payload?.customer,
        order_code: action.payload?.order_code,
        note: action.payload?.note,
        currentFilterTimeHT: action.payload?.currentFilterTimeHT,
        convertCurrentFilterTimeHT: action.payload?.convertCurrentFilterTimeHT,
        provincesCity: action.payload?.provincesCity
      };

    default:
      return state;
  }
};

export default FilterDeliveryReducer;
