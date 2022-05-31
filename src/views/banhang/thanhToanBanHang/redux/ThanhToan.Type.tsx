import {KieuKhuyenMai} from 'configs/ProductConfig';

export interface IThanhToanState {
  discountType?: KieuKhuyenMai;
  discountValue?: number;
  tienGiamGia?: number;

  isGiaoHang?: boolean;
}

export interface IThanhToanAction {
  type: string;
  payload: IThanhToanState;
}
