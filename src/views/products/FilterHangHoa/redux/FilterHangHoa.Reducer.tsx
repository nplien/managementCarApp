import {BAN_TRUC_TIEP, HIEN_THI, TON_KHO} from 'configs/FilterConfig';
import {ICategoryModel} from 'models/Category.Model';

import {IFilterHangHoaAction, IFilterHangHoaState} from './FilterHangHoa.Type';

export const FILTER_HANG_HOA_ACTION = {
  KEYWORD: 'FILTER/LIST/HANG/HOA/ACTION/KEYWORD',
  TYPE: 'FILTER/LIST/HANG/HOA/ACTION/TYPE',
  CATEGORY: 'FILTER/LIST/HANG/HOA/ACTION/CATEGORY',
  TON_KHO: 'FILTER/LIST/HANG/HOA/ACTION/TON_KHO',
  BAN_TRUC_TIEP: 'FILTER/LIST/HANG/HOA/ACTION/BAN_TRUC_TIEP',
  HIEN_THI: 'FILTER/LIST/HANG/HOA/ACTION/HIEN_THI',

  RESET: 'FILTER/LIST/HANG/HOA/ACTION/RESET',
  SET_VALUE: 'FILTER/LIST/HANG/HOA/ACTION/SET/VALUE'
};

export function setKeywordSearch(keyword: string): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setTypeObj(type: any): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.TYPE,
    payload: {
      type
    }
  };
}

export function setCateObjHangHoa(cate: ICategoryModel): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.CATEGORY,
    payload: {
      cate
    }
  };
}

export function setTonKho(tonKho: any): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.TON_KHO,
    payload: {
      tonKho
    }
  };
}

export function setBanTrucTiep(banTrucTiep: any): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.BAN_TRUC_TIEP,
    payload: {
      banTrucTiep
    }
  };
}

export function setHienThi(hienThi: any): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.HIEN_THI,
    payload: {
      hienThi
    }
  };
}

export function reset(): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.RESET
  };
}

export function setValue(filterHangHoaReducer: IFilterHangHoaState): IFilterHangHoaAction {
  return {
    type: FILTER_HANG_HOA_ACTION.SET_VALUE,
    payload: {
      keyword: filterHangHoaReducer.keyword,
      arrType: filterHangHoaReducer.arrType,
      arrCate: filterHangHoaReducer.arrCate,
      tonKho: filterHangHoaReducer.tonKho,
      banTrucTiep: filterHangHoaReducer.banTrucTiep,
      hienThi: filterHangHoaReducer.hienThi
    }
  };
}

const FilterHangHoaReducer = (
  state: IFilterHangHoaState = {
    keyword: '',
    arrType: [],
    arrCate: [],
    tonKho: TON_KHO[0],
    banTrucTiep: BAN_TRUC_TIEP[0],
    hienThi: HIEN_THI[1]
  },
  action: IFilterHangHoaAction
): IFilterHangHoaState => {
  switch (action.type) {
    case FILTER_HANG_HOA_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case FILTER_HANG_HOA_ACTION.TYPE:
      if (state.arrType) {
        let indexElement = -1;

        indexElement = state.arrType.findIndex(x => x.name === action.payload?.type.name);
        if (indexElement > -1) {
          state.arrType.splice(indexElement, 1);
        } else {
          state.arrType.push(action.payload?.type);
        }
      }
      return {
        ...state,
        arrType: state.arrType ? [...state.arrType] : []
      };

    case FILTER_HANG_HOA_ACTION.CATEGORY:
      if (state.arrCate && action.payload?.cate) {
        let indexElement = -1;

        indexElement = state.arrCate.findIndex(x => x.id === action.payload?.cate?.id);
        if (indexElement > -1) {
          state.arrCate.splice(indexElement, 1);
        } else {
          state.arrCate.push(action.payload.cate);
        }
      }
      return {
        ...state,
        arrCate: state.arrCate ? [...state.arrCate] : []
      };

    case FILTER_HANG_HOA_ACTION.TON_KHO:
      return {
        ...state,
        tonKho: action.payload?.tonKho
      };

    case FILTER_HANG_HOA_ACTION.BAN_TRUC_TIEP:
      return {
        ...state,
        banTrucTiep: action.payload?.banTrucTiep
      };

    case FILTER_HANG_HOA_ACTION.HIEN_THI:
      return {
        ...state,
        hienThi: action.payload?.hienThi
      };

    case FILTER_HANG_HOA_ACTION.RESET:
      return {
        ...state,
        keyword: '',
        arrType: [],
        arrCate: [],
        tonKho: TON_KHO[0],
        banTrucTiep: BAN_TRUC_TIEP[0],
        hienThi: HIEN_THI[1]
      };

    case FILTER_HANG_HOA_ACTION.SET_VALUE:
      return {
        ...state,
        keyword: action.payload?.keyword,
        arrType: action.payload?.arrType,
        arrCate: action.payload?.arrCate,
        tonKho: action.payload?.tonKho,
        banTrucTiep: action.payload?.banTrucTiep,
        hienThi: action.payload?.hienThi
      };

    default:
      return state;
  }
};

export default FilterHangHoaReducer;
