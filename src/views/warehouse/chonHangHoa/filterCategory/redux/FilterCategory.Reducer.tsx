import {ICategoryModel} from 'models/Category.Model';

import {IFilterCategoryAction, IFilterCategoryState} from './FilterCategory.Type';

export const TYPE_HANG_HOA = [
  {
    id: 'types',
    name: 'Sản phẩm',
    value: 'item'
  },
  // {
  //   id: 'types',
  //   name: 'Dịch vụ',
  //   value: 2
  // },
  {
    id: 'types',
    name: 'Combo & đóng gói',
    value: 'combo'
  }
];

export const BAN_TRUC_TIEP = [
  {
    id: 'is_visible',
    name: 'Tất cả',
    value: undefined
  },
  {
    id: 'is_visible',
    name: 'Bán trên website',
    value: true
  },
  {
    id: 'is_visible',
    name: 'Không bán trên website',
    value: false
  }
];

export const TON_KHO = [
  {
    id: 'stock_value',
    name: 'Tất cả',
    value: -1
  },
  {
    id: 'stock_value',
    name: 'Dưới định mức tồn',
    value: 1
  },
  {
    id: 'stock_value',
    name: 'Vượt định mức tồn',
    value: 2
  },
  {
    id: 'stock_value',
    name: 'Còn hàng trong kho',
    value: 3
  },
  {
    id: 'stock_value',
    name: 'Hết hàng trong kho',
    value: 4
  }
];

export const HIEN_THI = [
  {
    id: 'statuses',
    name: 'Tất cả',
    value: undefined
  },
  {
    id: 'statuses',
    name: 'Đang hoạt động',
    value: 'active'
  },
  {
    id: 'statuses',
    name: 'Ngừng hoạt động',
    value: 'inactive'
  }
];

export const FILTER_PRODUCT_ACTION = {
  KEYWORD: 'FILTER/PRODUCT/ACTION/KEYWORD',
  TYPE: 'FILTER/PRODUCT/ACTION/TYPE',
  CATEGORY: 'FILTER/PRODUCT/ACTION/CATEGORY',
  TON_KHO: 'FILTER/PRODUCT/ACTION/TON_KHO',
  BAN_TRUC_TIEP: 'FILTER/PRODUCT/ACTION/BAN_TRUC_TIEP',
  HIEN_THI: 'FILTER/PRODUCT/ACTION/HIEN_THI',

  RESET: 'FILTER/PRODUCT/ACTION/RESET',
  SET_VALUE: 'FILTER/PRODUCT/ACTION/SET/VALUE'
};

export function setKeywordSearch(keyword: string): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setTypeObj(type: any): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.TYPE,
    payload: {
      type
    }
  };
}

export function setCateObj(cate: ICategoryModel): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.CATEGORY,
    payload: {
      cate
    }
  };
}

export function setTonKho(tonKho: any): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.TON_KHO,
    payload: {
      tonKho
    }
  };
}

export function setBanTrucTiep(banTrucTiep: any): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.BAN_TRUC_TIEP,
    payload: {
      banTrucTiep
    }
  };
}

export function setHienThi(hienThi: any): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.HIEN_THI,
    payload: {
      hienThi
    }
  };
}

export function reset(): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.RESET
  };
}

export function setValue(filterCategoryReducer: IFilterCategoryState): IFilterCategoryAction {
  return {
    type: FILTER_PRODUCT_ACTION.SET_VALUE,
    payload: {
      keyword: filterCategoryReducer.keyword,
      arrType: filterCategoryReducer.arrType,
      arrCate: filterCategoryReducer.arrCate,
      tonKho: filterCategoryReducer.tonKho,
      banTrucTiep: filterCategoryReducer.banTrucTiep,
      hienThi: filterCategoryReducer.hienThi
    }
  };
}

const FilterCategoryReducer = (
  state: IFilterCategoryState = {
    keyword: '',
    arrType: [],
    arrCate: [],
    tonKho: TON_KHO[0],
    banTrucTiep: BAN_TRUC_TIEP[0],
    hienThi: HIEN_THI[1]
  },
  action: IFilterCategoryAction
): IFilterCategoryState => {
  switch (action.type) {
    case FILTER_PRODUCT_ACTION.KEYWORD:
      return {
        ...state,
        keyword: action.payload?.keyword
      };

    case FILTER_PRODUCT_ACTION.TYPE:
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

    case FILTER_PRODUCT_ACTION.CATEGORY:
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

    case FILTER_PRODUCT_ACTION.TON_KHO:
      return {
        ...state,
        tonKho: action.payload?.tonKho
      };

    case FILTER_PRODUCT_ACTION.BAN_TRUC_TIEP:
      return {
        ...state,
        banTrucTiep: action.payload?.banTrucTiep
      };

    case FILTER_PRODUCT_ACTION.HIEN_THI:
      return {
        ...state,
        hienThi: action.payload?.hienThi
      };

    case FILTER_PRODUCT_ACTION.RESET:
      return {
        ...state,
        keyword: '',
        arrType: [],
        arrCate: [],
        tonKho: TON_KHO[0],
        banTrucTiep: BAN_TRUC_TIEP[0],
        hienThi: HIEN_THI[1]
      };

    case FILTER_PRODUCT_ACTION.SET_VALUE:
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

export default FilterCategoryReducer;
