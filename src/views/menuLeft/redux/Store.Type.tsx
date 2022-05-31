import {IStorePerson} from 'models/ModelBase';

export interface IChooseStoreState {
  cuaHangDangChon?: IStorePerson;
}

export interface IChooseStoreAction {
  type: string;
  payload: IChooseStoreState;
}
