import {IBangGiaModel} from 'models/BangGia.Model';

export interface IChooseBangGiaState {
  currentBangGia?: IBangGiaModel;
}

export interface IChooseBangGiaAction {
  type: string;
  payload?: IChooseBangGiaState;
}
