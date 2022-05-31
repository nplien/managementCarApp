import {ARR_PT_THANHTOAN, IPaymentItem} from 'configs/FilterConfig';
import {CustomerModel} from 'models/Customer.Model';
import {SO_QUY_GROUP_TYPE, SO_QUY_STATUS, SO_QUY_TYPE} from 'models/SoQuy.Model';
import {IStaffModel} from 'models/Staff.Model';
import {PAYMENT_ACTION} from 'views/soquy/list/redux';
import {IFilterSoQuyState, IFilterSoQuyAction} from './FilterSoQuy.Types';

export const FILTER_SOQUY_ACTION = {
  STATUS_SELECT: 'SOQUY/FILTER_SOQUY/STATUS/SELECT',
  CODE: 'SOQUY/FILTER_SOQUY/CODE',
  NOTE: 'SOQUY/FILTER_SOQUY/NOTE',
  LOAI_THU_CHI: 'SOQUY/FILTER_SOQUY/LOAI_THU_CHI',
  LOAI_CHUNG_TU: 'SOQUY/FILTER_SOQUY/LOAI_CHUNG_TU',

  SET_VALUE: 'SOQUY/FILTER_SOQUY/SET_VALUE',

  CHANGE_CUSTOMER_SO_QUY: 'SOQUY/FILTER_SOQUY/CHANGE/CUSTOMER',
  CHANGE_NHAN_VIEN_SO_QUY: 'SOQUY/FILTER_SOQUY/CHANGE/NHAN_VIEN',
  CHANGE_PTTT_SO_QUY: 'SOQUY/FILTER_SOQUY/CHANGE/LOC/PTTT',
  CHANGE_ARR_PTTT_SO_QUY: 'SOQUY/FILTER_SOQUY/CHANGE/LOC/ARR/PTTT'
};

export function setKeywordSearchSQ(code: string): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.CODE,
    payload: {
      code
    }
  };
}
export function setKeywordNoteSQ(note: string): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.NOTE,
    payload: {
      note
    }
  };
}

export function setStatusSoQuy(status?: SO_QUY_STATUS): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.STATUS_SELECT,
    payload: {
      status
    }
  };
}

export function setLoaiThuChiSQ(groups?: SO_QUY_GROUP_TYPE): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.LOAI_THU_CHI,
    payload: {
      groups
    }
  };
}
export function setLoaiChungTuSQ(types?: SO_QUY_TYPE): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.LOAI_CHUNG_TU,
    payload: {
      types
    }
  };
}

export function setValueSoQuy(filterSoQuyReducer: IFilterSoQuyState): IFilterSoQuyAction {
  return {
    type: FILTER_SOQUY_ACTION.SET_VALUE,
    payload: {
      code: filterSoQuyReducer.code,
      note: filterSoQuyReducer.note,
      status: filterSoQuyReducer.status,
      groups: filterSoQuyReducer.groups,
      types: filterSoQuyReducer.types
    }
  };
}

export function changeCustomerSoQuy(arrCustomerDaChon: CustomerModel[]) {
  return {
    type: FILTER_SOQUY_ACTION.CHANGE_CUSTOMER_SO_QUY,
    payload: {
      arrCustomerDaChon
    }
  };
}
export function changeNhanViewSoQuy(arrStaffDaChon: IStaffModel[]) {
  return {
    type: FILTER_SOQUY_ACTION.CHANGE_NHAN_VIEN_SO_QUY,
    payload: {
      arrStaffDaChon
    }
  };
}
export function changePTTTSoQuy(pttt: IPaymentItem) {
  return {
    type: FILTER_SOQUY_ACTION.CHANGE_PTTT_SO_QUY,
    payload: {
      pttt
    }
  };
}
export function changeArrPTTTSoQuy(arrPTTTDaChon: IPaymentItem[]) {
  return {
    type: FILTER_SOQUY_ACTION.CHANGE_ARR_PTTT_SO_QUY,
    payload: {
      arrPTTTDaChon
    }
  };
}

const FilterSoQuyReducer = (
  state: IFilterSoQuyState = {
    arrCustomerDaChon: [],
    arrStaffDaChon: [],
    arrPTTTDaChon: [...ARR_PT_THANHTOAN]
  },
  action: IFilterSoQuyAction
): IFilterSoQuyState => {
  switch (action.type) {
    case FILTER_SOQUY_ACTION.CODE:
      return {
        ...state,
        code: action.payload.code
      };
    case FILTER_SOQUY_ACTION.NOTE:
      return {
        ...state,
        note: action.payload.note
      };
    case FILTER_SOQUY_ACTION.STATUS_SELECT:
      return {
        ...state,
        status: action?.payload?.status
      };
    case FILTER_SOQUY_ACTION.LOAI_THU_CHI:
      return {
        ...state,
        groups: action?.payload?.groups
      };
    case FILTER_SOQUY_ACTION.LOAI_CHUNG_TU:
      return {
        ...state,
        types: action?.payload?.types
      };
    case FILTER_SOQUY_ACTION.SET_VALUE:
      return {
        ...state,
        note: action.payload.note,
        code: action.payload.code,
        status: action.payload.status,
        groups: action.payload.groups,
        types: action.payload.types
      };

    case FILTER_SOQUY_ACTION.CHANGE_CUSTOMER_SO_QUY:
      return {
        ...state,
        arrCustomerDaChon: action.payload?.arrCustomerDaChon
      };
    case FILTER_SOQUY_ACTION.CHANGE_NHAN_VIEN_SO_QUY:
      return {
        ...state,
        arrStaffDaChon: action.payload?.arrStaffDaChon
      };
    case FILTER_SOQUY_ACTION.CHANGE_PTTT_SO_QUY:
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
    case FILTER_SOQUY_ACTION.CHANGE_ARR_PTTT_SO_QUY:
      return {
        ...state,
        arrPTTTDaChon: action.payload?.arrPTTTDaChon
      };

    case PAYMENT_ACTION.DESTROY_SO_QUY:
      return {
        arrCustomerDaChon: [],
        arrStaffDaChon: [],
        arrPTTTDaChon: [...ARR_PT_THANHTOAN]
      };
    default:
      return state;
  }
};

export default FilterSoQuyReducer;
