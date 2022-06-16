import {KieuKhuyenMai} from 'configs/ProductConfig';
import {CREATE_SALE_ACTION} from 'views/banhang/createSale/redux';
import {PRODUCT_BAN_HANG_ACTION} from 'views/banhang/ProductBanHang/redux';
import {IThanhToanAction, IThanhToanState} from './ThanhToan.Type';

export const THANH_TOAN_ACTION = {
  THANH_TOAN: 'THANH/TOAN/ACTION',
  THANH_TOAN_THANH_CONG: 'THANH/TOAN/ACTION/THANH/CONG',
  THANH_TOAN_THAT_BAI: 'THANH/TOAN/ACTION/THAT/BAI',

  DISCOUNT: 'THANH/TOAN/ACTION/DISCOUNT',

  IS_GIAO_HANG: 'THANH/TOAN/ACTION/IS_GIAO_HANG'
};

export function thanhToan() {
  return {
    type: THANH_TOAN_ACTION.THANH_TOAN
  };
}

export function setDiscount(
  discountType: KieuKhuyenMai,
  discountValue: number,
  tienGiamGia: number
) {
  return {
    type: THANH_TOAN_ACTION.DISCOUNT,
    payload: {
      discountType,
      discountValue,
      tienGiamGia
    }
  };
}

export function setIsGiaoHang(isGiaoHang: boolean) {
  return {
    type: THANH_TOAN_ACTION.IS_GIAO_HANG,
    payload: {
      isGiaoHang
    }
  };
}

const ThanhToanReducer = (
  state: IThanhToanState = {
    discountType: KieuKhuyenMai.GIAM_THANG_TIEN,
    discountValue: 0,
    tienGiamGia: 0,
    isGiaoHang: false
  },
  action: IThanhToanAction
): IThanhToanState => {
  switch (action.type) {
    case THANH_TOAN_ACTION.DISCOUNT:
      return {
        ...state,
        discountType: action.payload.discountType,
        discountValue: action.payload.discountValue,
        tienGiamGia: action.payload.tienGiamGia
      };

    case THANH_TOAN_ACTION.IS_GIAO_HANG:
      return {
        ...state,
        isGiaoHang: action.payload.isGiaoHang
      };

    case CREATE_SALE_ACTION.ADD_PRODUCT:
    case CREATE_SALE_ACTION.ADD_LIST_PRODUCT:
    case PRODUCT_BAN_HANG_ACTION.CHOOSE_BANG_GIA:
      return {
        ...state,
        discountType: KieuKhuyenMai.GIAM_THANG_TIEN,
        discountValue: 0,
        tienGiamGia: 0
      };

    case CREATE_SALE_ACTION.RESET:
    case THANH_TOAN_ACTION.THANH_TOAN_THANH_CONG:
    case PRODUCT_BAN_HANG_ACTION.GET:
      return {
        ...state,
        discountType: KieuKhuyenMai.GIAM_THANG_TIEN,
        discountValue: 0,
        tienGiamGia: 0,
        isGiaoHang: false
      };
    default:
      return state;
  }
};

export default ThanhToanReducer;
