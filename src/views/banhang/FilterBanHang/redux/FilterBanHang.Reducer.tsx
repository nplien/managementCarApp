import {BAN_TRUC_TIEP, HIEN_THI, TON_KHO} from 'configs/FilterConfig';
import {ICategoryModel} from 'models/Category.Model';

import {IFilterBanHangAction, IFilterBanHangState} from './FilterBanHang.Type';

export const FILTER_BAN_HANG_ACTION = {
  KEYWORD: 'FILTER/BAN/HANG/ACTION/KEYWORD',
  TYPE: 'FILTER/BAN/HANG/ACTION/TYPE',
  CATEGORY: 'FILTER/BAN/HANG/ACTION/CATEGORY',
  TON_KHO: 'FILTER/BAN/HANG/ACTION/TON_KHO',
  BAN_TRUC_TIEP: 'FILTER/BAN/HANG/ACTION/BAN_TRUC_TIEP',
  HIEN_THI: 'FILTER/BAN/HANG/ACTION/HIEN_THI',

  RESET: 'FILTER/BAN/HANG/ACTION/RESET',
  SET_VALUE: 'FILTER/BAN/HANG/ACTION/SET/VALUE'
};

export function setKeywordSearch(keyword: string): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setTypeObj(type: any): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.TYPE,
    payload: {
      type
    }
  };
}

export function setCateObjBanHang(cate: ICategoryModel): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.CATEGORY,
    payload: {
      cate
    }
  };
}

export function setTonKho(tonKho: any): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.TON_KHO,
    payload: {
      tonKho
    }
  };
}

export function setBanTrucTiep(banTrucTiep: any): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.BAN_TRUC_TIEP,
    payload: {
      banTrucTiep
    }
  };
}

export function setHienThi(hienThi: any): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.HIEN_THI,
    payload: {
      hienThi
    }
  };
}

export function reset(): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.RESET
  };
}

export function setValue(filterBanHangReducer: IFilterBanHangState): IFilterBanHangAction {
  return {
    type: FILTER_BAN_HANG_ACTION.SET_VALUE,
    payload: {
      keyword: filterBanHangReducer.keyword,
      arrType: filterBanHangReducer.arrType,
      arrCate: filterBanHangReducer.arrCate,
      tonKho: filterBanHangReducer.tonKho,
      banTrucTiep: filterBanHangReducer.banTrucTiep,
      hienThi: filterBanHangReducer.hienThi
    }
  };
}

const FilterBanHangReducer = (
  state: IFilterBanHangState = {
    keyword: '',
    arrType: [],
    arrCate: [],
    tonKho: TON_KHO[0],
    banTrucTiep: BAN_TRUC_TIEP[0],
    hienThi: HIEN_THI[1]
  },
  action: IFilterBanHangAction
): IFilterBanHangState => {
  switch (action.type) {
    case FILTER_BAN_HANG_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case FILTER_BAN_HANG_ACTION.TYPE:
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

    case FILTER_BAN_HANG_ACTION.CATEGORY:
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

    case FILTER_BAN_HANG_ACTION.TON_KHO:
      return {
        ...state,
        tonKho: action.payload?.tonKho
      };

    case FILTER_BAN_HANG_ACTION.BAN_TRUC_TIEP:
      return {
        ...state,
        banTrucTiep: action.payload?.banTrucTiep
      };

    case FILTER_BAN_HANG_ACTION.HIEN_THI:
      return {
        ...state,
        hienThi: action.payload?.hienThi
      };

    case FILTER_BAN_HANG_ACTION.RESET:
      return {
        ...state,
        keyword: '',
        arrType: [],
        arrCate: [],
        tonKho: TON_KHO[0],
        banTrucTiep: BAN_TRUC_TIEP[0],
        hienThi: HIEN_THI[1]
      };

    case FILTER_BAN_HANG_ACTION.SET_VALUE:
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

export default FilterBanHangReducer;
