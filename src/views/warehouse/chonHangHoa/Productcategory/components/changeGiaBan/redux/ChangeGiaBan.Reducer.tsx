import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {IChangeGiaBanState} from './ChangeGiaBan.Type';

export const CHANGE_GIA_BAN_ACTION = {
  CHANGE: 'PRODUCT/CHANGE/GIA/BAN/ACTION'
};

export function changeGiaBan(priceHienThi: {id: string; name: string}) {
  return {
    type: CHANGE_GIA_BAN_ACTION.CHANGE,
    payload: {
      priceHienThi
    }
  };
}

const ChangeGiaBanReducer = (
  state: IChangeGiaBanState = {
    giaHienThi: CONFIG_PRICE_SHOW.HANG_HOA[0]
  },
  action: {type: string; payload: any}
): IChangeGiaBanState => {
  switch (action.type) {
    case CHANGE_GIA_BAN_ACTION.CHANGE:
      return {
        ...state,
        giaHienThi: action.payload.priceHienThi
      };

    default:
      return state;
  }
};

export default ChangeGiaBanReducer;
