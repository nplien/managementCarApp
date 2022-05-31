import {KHACH_LE} from 'common/Constants';
import {CustomerModel} from 'models/Customer.Model';
import {IChooseKhachHangState, IChooseKhachHangAction} from './ChooseKhachHang.Type';

export const CHOOSE_KHACH_HANG_ACTION = {
  CHOOSE_KHACH_HANG: 'CHOOSE/KHACH/HANG/SET'
};

export function setKhachHang(currentKhachHang: CustomerModel) {
  return {
    type: CHOOSE_KHACH_HANG_ACTION.CHOOSE_KHACH_HANG,
    payload: {
      currentKhachHang
    }
  };
}

const ChooseKhachHangReducer = (
  state: IChooseKhachHangState = {
    currentKhachHang: KHACH_LE
  },
  action: IChooseKhachHangAction
): IChooseKhachHangState => {
  switch (action.type) {
    case CHOOSE_KHACH_HANG_ACTION.CHOOSE_KHACH_HANG:
      return {...state, currentKhachHang: action.payload?.currentKhachHang};

    default:
      return state;
  }
};

export default ChooseKhachHangReducer;
