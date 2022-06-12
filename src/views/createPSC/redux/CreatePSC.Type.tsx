import {KieuKhuyenMai} from 'configs/ProductConfig';
import {ChannelModel} from 'models/ManagerSetting.Model';
// import {IProductPCS} from 'models/PhieuSuaChua.Model';
import {IProductPhuTung} from 'models/PhuTung.Model';

export interface ICreatePSCState {
  arrProductPSC?: IProductPhuTung[];
  productPSC?: IProductPhuTung;

  isManySelected?: boolean;

  currentKenhBan?: ChannelModel;

  ghiChuHoaDon?: string;

  isSelectedManyPSC?: boolean;

  discountType?: KieuKhuyenMai;
  discountValue?: number;
  tienGiamGia?: number;

  // phieuSuaChua?: IProductPCS;
  // arrPhieuSuaChua?: IProductPCS[];
}

export interface ICreatePSCAction {
  type: string;
  payload: ICreatePSCState;
}
