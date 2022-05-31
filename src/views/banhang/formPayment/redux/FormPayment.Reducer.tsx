import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {IPaymentOrderModel} from 'models/Payment.Model';
import {CREATE_SALE_ACTION} from 'views/banhang/createSale/redux';
import {THANH_TOAN_ACTION} from 'views/banhang/thanhToanBanHang/redux';
import {IFormPaymentAction, IFormPaymentState} from './FormPayment.Type';

export const FORM_PAYMENT_ACTION = {
  ADD_LIST_PAYMENT_FORM: 'FORM/PAYMENT/ACTION/ADD/LIST',

  EDIT_ITEM_PAYMENT: 'FORM/PAYMENT/ACTION/EDIT/ITEM/PAYMENT',
  DELETE_ITEM_PAYMENT: 'FORM/PAYMENT/ACTION/DELETE/ITEM/PAYMENT',
  DELETE_ALL_PAYMENT: 'FORM/PAYMENT/ACTION/DELETE/LIST/PAYMENT',

  RESET: 'FORM/PAYMENT/ACTION/DELETE/LIST/RESET'
};

export function addFormPayment(formPayment: IPaymentOrderModel) {
  return {
    type: FORM_PAYMENT_ACTION.ADD_LIST_PAYMENT_FORM,
    payload: {
      formPayment
    }
  };
}

export function editItemPayment(formPayment: IPaymentOrderModel) {
  return {
    type: FORM_PAYMENT_ACTION.EDIT_ITEM_PAYMENT,
    payload: {
      formPayment
    }
  };
}

export function deleteItemPayment(formPayment: IPaymentOrderModel) {
  return {
    type: FORM_PAYMENT_ACTION.DELETE_ITEM_PAYMENT,
    payload: {
      formPayment
    }
  };
}

export function deleteAllItem(paymentMethod: PAYMENT_METHOD) {
  return {
    type: FORM_PAYMENT_ACTION.DELETE_ALL_PAYMENT,
    payload: {
      paymentMethod
    }
  };
}

export function resetThanhToan() {
  return {
    type: FORM_PAYMENT_ACTION.RESET
  };
}

const FormPaymentReducer = (
  state: IFormPaymentState = {
    arrFormPayment: []
  },
  action: IFormPaymentAction
): IFormPaymentState => {
  switch (action.type) {
    case FORM_PAYMENT_ACTION.ADD_LIST_PAYMENT_FORM:
      if (action.payload.formPayment && state.arrFormPayment) {
        state.arrFormPayment?.push(action.payload.formPayment);
        return {...state, arrFormPayment: [...state.arrFormPayment]};
      }
      return state;

    case FORM_PAYMENT_ACTION.EDIT_ITEM_PAYMENT:
      if (action.payload.formPayment && state.arrFormPayment) {
        let findIndex = state.arrFormPayment.findIndex(
          obj => obj.random_id === action.payload.formPayment?.random_id
        );
        if (findIndex > -1) {
          state.arrFormPayment[findIndex] = action.payload.formPayment;
        }
      }
      return {...state, arrFormPayment: state.arrFormPayment ? [...state.arrFormPayment] : []};

    case FORM_PAYMENT_ACTION.DELETE_ITEM_PAYMENT:
      if (action.payload.formPayment && state.arrFormPayment) {
        let findIndex = state.arrFormPayment.findIndex(
          obj => obj.random_id === action.payload.formPayment?.random_id
        );
        if (findIndex > -1) {
          state.arrFormPayment.splice(findIndex, 1);
        }
      }
      return {...state, arrFormPayment: state.arrFormPayment ? [...state.arrFormPayment] : []};

    case FORM_PAYMENT_ACTION.DELETE_ALL_PAYMENT:
      let paymentTmp: IPaymentOrderModel[] = [];
      if (state.arrFormPayment) {
        paymentTmp = state.arrFormPayment.filter(payment => {
          return payment.method !== action.payload.paymentMethod;
        });
      }
      return {...state, arrFormPayment: paymentTmp};

    case FORM_PAYMENT_ACTION.RESET:
    case CREATE_SALE_ACTION.RESET:
    case THANH_TOAN_ACTION.THANH_TOAN_THANH_CONG:
      return {...state, arrFormPayment: []};

    default:
      return state;
  }
};

export default FormPaymentReducer;
