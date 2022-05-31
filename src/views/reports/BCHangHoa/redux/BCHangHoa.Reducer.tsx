import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange} from 'views/app';
import {IBCHangHoaState} from './BCHangHoa.Type';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import {IStorePerson} from 'models/ModelBase';

export const BC_HANG_HOA_ACTION = {
  CHANGE_THOI_GIAN: 'BCHANGHOA/THOI/GIAN/ACTION',
  CHANGE_KHOANG_THOI_GIAN: 'BCHANGHOA/KHOANG/THOI/GIAN/ACTION',
  CHANGE_STORE_COMMODITY: 'BCHANGHOA/CHANGE/STORE',
  CHANGE_GROUP_CATEGORY: 'BCHANGHOA/GROUP/CATEGORY/CHANGE_GROUP_CATEGORY',
  CHANGE_CATEGORY: 'BCHANGHOA/CATEGORY/CHANGE_CATEGORY',
  CHANGE_TYPE: 'BCHANGHOA/TYPE/CHANGE_TYPE',
  CHANGE_KEYWORD: 'BCHANGHOA/TYPE/CHANGE_KEYWORD',
  CHANGE_CLEAN_CATEGORY: 'BCHANGHOA/CHANGE_CLEAN_CATEGORY',

  IS_REFRESH: 'BCHANGHOA/LIST/IS/REFRESH',

  GET: 'BCHANGHOA/LIST/GET',
  SUCCESS: 'BCHANGHOA/LIST/SUCCESS',
  FAIL: 'BCHANGHOA/LIST/FAIL',
  RESET: 'BCHANGHOA/LIST/RESET',

  CHANGE_VIEW_BC_HANG_HOA: 'BCHANGHOA/TYPE/CHANGE_VIEW_BC_HANG_HOA',
  CHANGE_VIEW_BC_WAREHOUSE: 'BCHANGHOA/TYPE/CHANGE_VIEW_BC_WAREHOUSE'
};

// NOTE action thoi gian
export function changeLocThoiGianBCHH(thoiGianLoc: IDateFilterType) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_THOI_GIAN,
    payload: {
      thoiGianLoc
    }
  };
}

export function changeKhoangThoiGianBCHH(khoangThoiGian: IDateRange) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_KHOANG_THOI_GIAN,
    payload: {
      khoangThoiGian
    }
  };
}

// NOTE action thoi gian BCHangHoa
export function changeChiNhanhBCHH(arrChiNhanhDaChonBCHH: IStorePerson[]) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_STORE_COMMODITY,
    payload: {
      arrChiNhanhDaChonBCHH
    }
  };
}

// NOTE get list commodity
export function getListBCHangHoa() {
  return {
    type: BC_HANG_HOA_ACTION.GET
  };
}
export function resetBCHangHoa() {
  return {
    type: BC_HANG_HOA_ACTION.RESET
  };
}
// NOTE change group_category,type,category,keyword
export function changeGroupCategory() {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_GROUP_CATEGORY
  };
}

export function changeTypeBCHangHoa(status: any) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_TYPE,
    payload: {status}
  };
}
export function changeCategoryBCHangHoa(name: string, id: string) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_CATEGORY,
    payload: {
      category: {name: name, id: id}
    }
  };
}
export function cleanCategoryBCHangHoa() {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_CLEAN_CATEGORY
  };
}
export function changeKeyWordBCHangHoa(KeyWord: string) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_KEYWORD,
    payload: {
      KeyWord
    }
  };
}
// Thay đổi view in request của báo cáo hàng hoá
export function changeViewBCHangHoa(view: MOI_QUAN_TAM) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_VIEW_BC_HANG_HOA,
    payload: {
      view
    }
  };
}
// Thay đổi view in request của báo cáo gia tri kho va ton kho
export function changeViewBCWarehouse(viewWarehouse: MOI_QUAN_TAM) {
  return {
    type: BC_HANG_HOA_ACTION.CHANGE_VIEW_BC_WAREHOUSE,
    payload: {
      viewWarehouse
    }
  };
}

const BCHangHoaReducer = (
  state: IBCHangHoaState = {
    thoiGianLoc: CONFIG_DATE_FILTER.HANG_HOA[3],
    khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.HANG_HOA[3].id),
    arrChiNhanhDaChonBCHH: [],
    count: 0,
    isFirstLoading: true,
    isRefresh: false,
    isError: false,
    arrBCHangHoaRevenue: [],
    arrBCHangHoaByInventory: [],
    arrBCHangHoaByWarehouse: [],
    arrBCHangHoaByProfit: [],
    totalProduct: 0,
    totalProductValueInventory: 0,
    groupCategory: false,
    category: undefined,
    type: [],
    KeyWord: '',
    view: MOI_QUAN_TAM.BAN_HANG,
    viewWarehouse: MOI_QUAN_TAM.GIA_TRI_KHO
  },
  action: {type: string; payload: any}
): IBCHangHoaState => {
  switch (action.type) {
    case BC_HANG_HOA_ACTION.CHANGE_THOI_GIAN:
      return {
        ...state,
        thoiGianLoc: action.payload.thoiGianLoc
      };
    case BC_HANG_HOA_ACTION.CHANGE_STORE_COMMODITY:
      return {
        ...state,
        arrChiNhanhDaChonBCHH: action.payload.arrChiNhanhDaChonBCHH
      };

    case BC_HANG_HOA_ACTION.CHANGE_KHOANG_THOI_GIAN:
      return {
        ...state,
        khoangThoiGian: action.payload.khoangThoiGian
      };
    case BC_HANG_HOA_ACTION.SUCCESS:
      return {
        ...state,
        arrBCHangHoaRevenue: action.payload.arrBCHangHoaRevenue,
        arrBCHangHoaByInventory: action.payload.arrBCHangHoaByInventory,
        arrBCHangHoaByWarehouse: action.payload.arrBCHangHoaByWarehouse,
        arrBCHangHoaByProfit: action.payload.arrBCHangHoaByProfit,
        totalProduct: action.payload.totalProduct,
        totalProductValueInventory: action.payload.totalProductValueInventory
      };
    case BC_HANG_HOA_ACTION.CHANGE_GROUP_CATEGORY:
      return {
        ...state,
        groupCategory: !state.groupCategory
      };
    case BC_HANG_HOA_ACTION.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload.category
      };
    case BC_HANG_HOA_ACTION.CHANGE_CLEAN_CATEGORY:
      return {
        ...state,
        category: undefined
      };
    case BC_HANG_HOA_ACTION.CHANGE_KEYWORD:
      return {
        ...state,
        KeyWord: action.payload.KeyWord
      };
    case BC_HANG_HOA_ACTION.CHANGE_VIEW_BC_HANG_HOA:
      return {
        ...state,
        view: action.payload.view
      };
    case BC_HANG_HOA_ACTION.CHANGE_VIEW_BC_WAREHOUSE:
      return {
        ...state,
        viewWarehouse: action.payload.viewWarehouse
      };
    case BC_HANG_HOA_ACTION.CHANGE_TYPE:
      if (state.type) {
        let indexElement = -1;
        indexElement = state.type.findIndex((x: any) => x?.name === action.payload?.status.name);
        if (indexElement > -1) {
          state.type.splice(indexElement, 1);
        } else {
          state.type.push(action.payload?.status);
        }
      }
      return {
        ...state,
        type: state.type ? [...state.type] : []
      };
    case BC_HANG_HOA_ACTION.RESET:
      return {
        ...state,
        thoiGianLoc: CONFIG_DATE_FILTER.HANG_HOA[3],
        khoangThoiGian: Utilities.getDateFilter(CONFIG_DATE_FILTER.HANG_HOA[3].id),
        count: 0,
        isFirstLoading: true,
        isRefresh: false,
        isError: false,
        arrBCHangHoaRevenue: [],
        arrBCHangHoaByInventory: [],
        arrBCHangHoaByWarehouse: [],
        arrBCHangHoaByProfit: [],
        totalProduct: 0,
        totalProductValueInventory: 0,
        groupCategory: false,
        category: undefined,
        type: [],
        KeyWord: '',
        view: MOI_QUAN_TAM.BAN_HANG,
        viewWarehouse: MOI_QUAN_TAM.GIA_TRI_KHO
      };
    default:
      return state;
  }
};

export default BCHangHoaReducer;
