import {BANG_GIA_CHUNG} from 'common/Constants';
import {IBangGiaModel} from 'models/BangGia.Model';
import {IChooseBangGiaState, IChooseBangGiaAction} from './ChooseBangGia.Type';

export const CHOOSE_BANG_GIA_ACTION = {
  CHOOSE_BANG_GIA: 'CHOOSE/BANG/GIA/SET'
};

export function setBangGia(currentBangGia: IBangGiaModel) {
  return {
    type: CHOOSE_BANG_GIA_ACTION.CHOOSE_BANG_GIA,
    payload: {
      currentBangGia: currentBangGia
    }
  };
}

const ChooseBangGiaReducer = (
  state: IChooseBangGiaState = {
    currentBangGia: BANG_GIA_CHUNG
  },
  action: IChooseBangGiaAction
): IChooseBangGiaState => {
  switch (action.type) {
    case CHOOSE_BANG_GIA_ACTION.CHOOSE_BANG_GIA:
      return {...state, currentBangGia: action.payload?.currentBangGia};

    default:
      return state;
  }
};

export default ChooseBangGiaReducer;
