import {ARR_KENH_BAN} from 'configs/FilterConfig';
import {KieuKhuyenMai} from 'configs/ProductConfig';
import {ChannelModel} from 'models/ManagerSetting.Model';
import {IProductPCS} from 'models/PhieuSuaChua.Model';
import {IProductPhuTung} from 'models/PhuTung.Model';
import {ICreatePSCState, ICreatePSCAction} from './CreatePSC.Type';

export const CREATE_PSC_ACTION = {
  ADD_PRODUCT: 'CREATE/PSC/ADD/PRODUCT',
  ADD_LIST_PRODUCT: 'CREATE/PSC/ADD/LIST/PRODUCT',
  SET_PRODUCT: 'CREATE/PSC/SET/PRODUCT',
  DELETE_PRODUCT: 'CREATE/PSC/DELETE/PRODUCT',
  DELETE_LIST_PRODUCT: 'CREATE/PSC/DELETE/LIST/PRODUCT',

  IS_MANY_SELECTED: 'CREATE/PSC/IS/MANY/SELECTED',
  IS_MANY_SELECTED_PSC: 'CREATE/PSC/IS/MANY/SELECTED_PSC',

  GHI_CHU_HOA_DON: 'CREATE/PSC/GHI/CHU/HOA/DON',

  CHOOSE_KENH_BAN: 'CHOOSE/KENH/BAN/SET',

  RESET: 'CREATE/PSC/RESET',
  DISCOUNT: 'THANH/TOAN/ACTION/DISCOUNT_PSC',

  THANH_TOAN_PSC: 'THANH/TOAN/ACTION_PSC'
};

export function addProductToCart(productPSC: IProductPhuTung) {
  return {
    type: CREATE_PSC_ACTION.ADD_PRODUCT,
    payload: {
      productPSC
    }
  };
}

export function addListProductToCart(arrProductPSC: IProductPhuTung[]) {
  return {
    type: CREATE_PSC_ACTION.ADD_LIST_PRODUCT,
    payload: {
      arrProductPSC
    }
  };
}

export function setProductToCart(productPSC: IProductPhuTung) {
  return {
    type: CREATE_PSC_ACTION.SET_PRODUCT,
    payload: {
      productPSC
    }
  };
}

export function deleteProductToCart(productPSC: IProductPhuTung) {
  return {
    type: CREATE_PSC_ACTION.DELETE_PRODUCT,
    payload: {
      productPSC
    }
  };
}

export function deleteListProductToCart(arrProductPSC: IProductPhuTung[]) {
  return {
    type: CREATE_PSC_ACTION.DELETE_LIST_PRODUCT,
    payload: {
      arrProductPSC
    }
  };
}

export function setIsManySelected(isManySelected: boolean) {
  return {
    type: CREATE_PSC_ACTION.IS_MANY_SELECTED,
    payload: {
      isManySelected
    }
  };
}
export function setIsManySelectedPSC(isSelectedManyPSC: boolean) {
  return {
    type: CREATE_PSC_ACTION.IS_MANY_SELECTED_PSC,
    payload: {
      isSelectedManyPSC
    }
  };
}

export function setGhiChuHoaDon(ghiChuHoaDon: string) {
  return {
    type: CREATE_PSC_ACTION.GHI_CHU_HOA_DON,
    payload: {
      ghiChuHoaDon
    }
  };
}

export function setKenhBan(currentKenhBan: ChannelModel) {
  return {
    type: CREATE_PSC_ACTION.CHOOSE_KENH_BAN,
    payload: {
      currentKenhBan
    }
  };
}

export function resetDonHang() {
  return {
    type: CREATE_PSC_ACTION.RESET
  };
}

export function setDiscount(
  discountType: KieuKhuyenMai,
  discountValue: number,
  tienGiamGia: number
) {
  return {
    type: CREATE_PSC_ACTION.DISCOUNT,
    payload: {
      discountType,
      discountValue,
      tienGiamGia
    }
  };
}
export function thanhToan(phieuSuaChua: IProductPCS) {
  return {
    type: CREATE_PSC_ACTION.THANH_TOAN_PSC,
    payload: {
      phieuSuaChua
    }
  };
}

const CreatePSCReducer = (
  state: ICreatePSCState = {
    arrProductPSC: [],
    isManySelected: false,
    isSelectedManyPSC: false,
    ghiChuHoaDon: '',
    currentKenhBan: ARR_KENH_BAN[2],

    discountType: KieuKhuyenMai.GIAM_THANG_TIEN,
    discountValue: 0,
    tienGiamGia: 0
  },
  action: ICreatePSCAction
): ICreatePSCState => {
  switch (action.type) {
    case CREATE_PSC_ACTION.ADD_PRODUCT:
      console.log(11111);
      if (action.payload?.productPSC && state.arrProductPSC) {
        let found = -1;
        found = state.arrProductPSC.findIndex(
          (x: IProductPhuTung) => x.phuTung?.sku === action.payload?.productPSC?.phuTung?.sku
        );
        if (found > -1) {
          state.arrProductPSC[found] = {
            phuTung: state.arrProductPSC[found].phuTung,
            totalQty: state.arrProductPSC[found].totalQty + action.payload?.productPSC.totalQty
          };
        } else {
          state.arrProductPSC?.push(action.payload?.productPSC);
        }
      }
      return {...state, arrProductPSC: state.arrProductPSC ? [...state.arrProductPSC] : []};

    case CREATE_PSC_ACTION.ADD_LIST_PRODUCT:
      if (action.payload?.arrProductPSC && state.arrProductPSC) {
        for (let index = 0; index < action.payload?.arrProductPSC.length; index++) {
          const element = action.payload?.arrProductPSC[index];
          let found = -1;
          found = state.arrProductPSC.findIndex(
            (x: IProductPhuTung) => x.phuTung?.sku === element.phuTung?.sku
          );
          if (found > -1) {
            state.arrProductPSC[found] = {
              phuTung: state.arrProductPSC[found].phuTung,
              totalQty: state.arrProductPSC[found].totalQty + element.totalQty
            };
          } else {
            state.arrProductPSC?.push(element);
          }
        }
      }
      return {...state, arrProductPSC: state.arrProductPSC ? [...state.arrProductPSC] : []};

    case CREATE_PSC_ACTION.SET_PRODUCT:
      if (action.payload?.productPSC && state.arrProductPSC) {
        let found = -1;
        found = state.arrProductPSC.findIndex(
          (x: IProductPhuTung) => x.phuTung?.sku === action.payload?.productPSC?.phuTung?.sku
        );
        if (found > -1) {
          state.arrProductPSC[found] = {
            phuTung: action.payload?.productPSC.phuTung,
            totalQty: action.payload?.productPSC.totalQty
          };
        } else {
          state.arrProductPSC?.push(action.payload?.productPSC);
        }
      }
      return {...state, arrProductPSC: state.arrProductPSC ? [...state.arrProductPSC] : []};

    case CREATE_PSC_ACTION.DELETE_PRODUCT:
      if (action.payload?.productPSC && state.arrProductPSC) {
        let found = -1;
        found = state.arrProductPSC.findIndex(
          (x: IProductPhuTung) => x.phuTung?.sku === action.payload?.productPSC?.phuTung?.sku
        );
        if (found > -1) {
          state.arrProductPSC?.splice(found, 1);
        }
      }
      return {...state, arrProductPSC: state.arrProductPSC ? [...state.arrProductPSC] : []};

    case CREATE_PSC_ACTION.DELETE_LIST_PRODUCT:
      if (action.payload?.arrProductPSC && state.arrProductPSC) {
        for (let index = 0; index < action.payload?.arrProductPSC.length; index++) {
          const element = action.payload?.arrProductPSC[index];
          let found = -1;
          found = state.arrProductPSC.findIndex(
            (x: IProductPhuTung) => x.phuTung?.sku === element.phuTung?.sku
          );
          if (found > -1) {
            state.arrProductPSC.splice(found, 1);
          }
        }
      }
      return {...state, arrProductPSC: state.arrProductPSC ? [...state.arrProductPSC] : []};

    case CREATE_PSC_ACTION.IS_MANY_SELECTED:
      return {...state, isManySelected: action.payload?.isManySelected};
    case CREATE_PSC_ACTION.IS_MANY_SELECTED_PSC:
      return {...state, isSelectedManyPSC: action.payload?.isSelectedManyPSC};

    case CREATE_PSC_ACTION.GHI_CHU_HOA_DON:
      return {...state, ghiChuHoaDon: action.payload.ghiChuHoaDon};

    case CREATE_PSC_ACTION.CHOOSE_KENH_BAN:
      return {
        ...state,
        currentKenhBan: action.payload.currentKenhBan
      };
    case CREATE_PSC_ACTION.DISCOUNT:
      return {
        ...state,
        discountType: action.payload.discountType,
        discountValue: action.payload.discountValue,
        tienGiamGia: action.payload.tienGiamGia
      };
    // case CREATE_PSC_ACTION.THANH_TOAN_PSC:
    //   let objTMP = state.arrPhieuSuaChua?.find(x => x.id === action.payload.phieuSuaChua?.id);
    //   if (objTMP) {
    //     return {
    //       ...state,
    //       arrPhieuSuaChua: state.arrPhieuSuaChua?.map(x => {
    //         if (x.id === action.payload.phieuSuaChua?.id) {
    //           x = action.payload.phieuSuaChua;
    //         }
    //         return x;
    //       })
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       arrPhieuSuaChua: [...state.arrPhieuSuaChua, action.payload.phieuSuaChua]
    //     };
    //   }

    case CREATE_PSC_ACTION.RESET:
      return {
        ...state,
        arrProductPSC: [],
        isManySelected: false,
        currentKenhBan: ARR_KENH_BAN[2],
        ghiChuHoaDon: '',
        isSelectedManyPSC: false
      };

    default:
      return state;
  }
};

export default CreatePSCReducer;
