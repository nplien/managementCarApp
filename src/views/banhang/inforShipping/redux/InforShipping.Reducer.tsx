import {Store} from 'models/Store.Model';
import {CREATE_SALE_ACTION} from 'views/banhang/createSale/redux';
import {PRODUCT_BAN_HANG_ACTION} from 'views/banhang/ProductBanHang/redux';
import {THANH_TOAN_ACTION} from 'views/banhang/thanhToanBanHang/redux';
import {IInforShippingState, IInforShippingAction} from './InforShipping.Types';

export const INFOR_SHIPPING_SORT_ACTION = {
  CHOOSE_STORE_SHIP: 'INFOR_SHIPPING/CHOOSE_STORE_SHIP',
  SET_CUSTOMER_INFOR_SHIP: 'INFOR_SHIPPING/SET_CUSTOMER_INFOR_SHIP',
  SET_OBJECT_VALUE_INFOR_SHIP: 'INFOR_SHIPPING/SET_OBJECT_VALUE_INFOR_SHIP',

  SET_OBJECT_DOI_TAC_GIAO_HANG: 'INFOR_SHIPPING/SET_OBJECT_DOI_TAC_GIAO_HANG',
  RESET_DOI_TAC: 'INFOR_SHIPPING/RE_SET_OBJECT_DOI_TAC_GIAO_HANG'
};

export function setStoreInforShip(storeInforShip: Store): IInforShippingAction {
  return {
    type: INFOR_SHIPPING_SORT_ACTION.CHOOSE_STORE_SHIP,
    payload: {
      storeInforShip
    }
  };
}
export function setObjectInforShip(objInforShip: any): IInforShippingAction {
  return {
    type: INFOR_SHIPPING_SORT_ACTION.SET_OBJECT_VALUE_INFOR_SHIP,
    payload: {
      objInforShip
    }
  };
}
export function setObjectDTGH(objDoiTacGiaoHang: any): IInforShippingAction {
  return {
    type: INFOR_SHIPPING_SORT_ACTION.SET_OBJECT_DOI_TAC_GIAO_HANG,
    payload: {
      objDoiTacGiaoHang
    }
  };
}
export function setInforCustomerShip(inforCustomerShip: any): IInforShippingAction {
  return {
    type: INFOR_SHIPPING_SORT_ACTION.SET_CUSTOMER_INFOR_SHIP,
    payload: {
      inforCustomerShip
    }
  };
}

export function resetDoiTacGiaoHang() {
  return {
    type: INFOR_SHIPPING_SORT_ACTION.RESET_DOI_TAC
  };
}

const InforShippingReducer = (
  state: IInforShippingState = {
    storeInforShip: undefined,
    objInforShip: undefined,
    inforCustomerShip: undefined,
    objDoiTacGiaoHang: undefined
  },
  action: IInforShippingAction
): IInforShippingState => {
  switch (action.type) {
    case INFOR_SHIPPING_SORT_ACTION.CHOOSE_STORE_SHIP:
      return {
        ...state,
        storeInforShip: action.payload?.storeInforShip
      };
    case INFOR_SHIPPING_SORT_ACTION.SET_OBJECT_VALUE_INFOR_SHIP:
      return {
        ...state,
        objInforShip: action.payload?.objInforShip
      };
    case INFOR_SHIPPING_SORT_ACTION.SET_CUSTOMER_INFOR_SHIP:
      return {
        ...state,
        inforCustomerShip: action.payload?.inforCustomerShip
      };
    case INFOR_SHIPPING_SORT_ACTION.SET_OBJECT_DOI_TAC_GIAO_HANG:
      return {
        ...state,
        objDoiTacGiaoHang: action.payload?.objDoiTacGiaoHang
      };
    case CREATE_SALE_ACTION.ADD_PRODUCT:
    case CREATE_SALE_ACTION.ADD_LIST_PRODUCT:
    case PRODUCT_BAN_HANG_ACTION.CHOOSE_BANG_GIA:
      return {
        ...state,
        objInforShip: {
          receiver_name: state.objInforShip?.receiver_name,
          receiver_phone: state.objInforShip?.receiver_phone,
          receiver_address: state.objInforShip?.receiver_address,
          receiver_ward: state.objInforShip?.receiver_ward,
          receiver_province: state.objInforShip?.receiver_province,
          receiver_district: state.objInforShip?.receiver_district
        },
        objDoiTacGiaoHang: undefined
      };
    case PRODUCT_BAN_HANG_ACTION.CHOOSE_KHACH_HANG:
      return {
        ...state,
        objInforShip: undefined,
        inforCustomerShip: action.payload?.inforCustomerShip,
        objDoiTacGiaoHang: undefined
      };
    case INFOR_SHIPPING_SORT_ACTION.RESET_DOI_TAC:
      return {...state, objDoiTacGiaoHang: undefined};
    case THANH_TOAN_ACTION.THANH_TOAN_THANH_CONG:
      return {
        ...state,
        storeInforShip: undefined,
        objInforShip: undefined,
        inforCustomerShip: undefined,
        objDoiTacGiaoHang: undefined
      };
    default:
      return state;
  }
};

export default InforShippingReducer;
