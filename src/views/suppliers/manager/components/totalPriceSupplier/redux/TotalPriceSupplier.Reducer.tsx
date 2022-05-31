import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {IChangeGiaBanState} from './TotalPriceSupplier.Type';

export const CHANGE_GIA_BAN_ACTION = {
  CHANGE: 'NCC/CHANGE/GIA/BAN/ACTION'
};

export function changeGiaBan(priceHienThi: {id: string; name: string}) {
  return {
    type: CHANGE_GIA_BAN_ACTION.CHANGE,
    payload: {
      priceHienThi
    }
  };
}

const TotalPriceSupplierReducer = (
  state: IChangeGiaBanState = {
    giaHienThi: CONFIG_PRICE_SHOW.NCC[0]
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

export default TotalPriceSupplierReducer;
