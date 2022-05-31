import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADDRESS_STORE_CHOOSE} from 'common/KeyStorages';
import {IStorePerson} from 'models/ModelBase';
import {IChooseStoreAction, IChooseStoreState} from './Store.Type';

export const CHOOSE_STORE_ACTION = {
  CHOOSE: 'STORE/CHOOSE/STORE'
};

export function chooseStore(cuaHangDangChon?: IStorePerson): IChooseStoreAction {
  return {
    type: CHOOSE_STORE_ACTION.CHOOSE,
    payload: {
      cuaHangDangChon
    }
  };
}

const ChooseStoreReducer = (
  state: IChooseStoreState = {cuaHangDangChon: undefined},
  action: IChooseStoreAction
): IChooseStoreState => {
  switch (action.type) {
    case CHOOSE_STORE_ACTION.CHOOSE:
      AsyncStorage.setItem(ADDRESS_STORE_CHOOSE, JSON.stringify(action.payload?.cuaHangDangChon));
      return {
        ...state,
        cuaHangDangChon: action.payload?.cuaHangDangChon
      };

    default:
      return state;
  }
};

export default ChooseStoreReducer;
