import {CustomerModel} from 'models/Customer.Model';

export interface IChooseKhachHangState {
  currentKhachHang?: CustomerModel;
}

export interface IChooseKhachHangAction {
  type: string;
  payload?: IChooseKhachHangState;
}
