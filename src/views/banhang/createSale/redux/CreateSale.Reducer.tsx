import {ARR_KENH_BAN} from 'configs/FilterConfig';
import {ChannelModel} from 'models/ManagerSetting.Model';
import {IProductSale} from 'models/Product.Model';
import {THANH_TOAN_ACTION} from 'views/banhang/thanhToanBanHang/redux';
import {ICreateSaleState, ICreateSaleAction} from './CreateSale.Type';

export const CREATE_SALE_ACTION = {
  ADD_PRODUCT: 'CREATE/SALE/ADD/PRODUCT',
  ADD_LIST_PRODUCT: 'CREATE/SALE/ADD/LIST/PRODUCT',
  SET_PRODUCT: 'CREATE/SALE/SET/PRODUCT',
  DELETE_PRODUCT: 'CREATE/SALE/DELETE/PRODUCT',
  DELETE_LIST_PRODUCT: 'CREATE/SALE/DELETE/LIST/PRODUCT',

  IS_MANY_SELECTED: 'CREATE/SALE/IS/MANY/SELECTED',

  GHI_CHU_HOA_DON: 'CREATE/SALE/GHI/CHU/HOA/DON',

  CHOOSE_KENH_BAN: 'CHOOSE/KENH/BAN/SET',

  RESET: 'CREATE/SALE/RESET'
};

export function addProductToCart(productSale: IProductSale) {
  return {
    type: CREATE_SALE_ACTION.ADD_PRODUCT,
    payload: {
      productSale
    }
  };
}

export function addListProductToCart(arrProductSale: IProductSale[]) {
  return {
    type: CREATE_SALE_ACTION.ADD_LIST_PRODUCT,
    payload: {
      arrProductSale
    }
  };
}

export function setProductToCart(productSale: IProductSale) {
  return {
    type: CREATE_SALE_ACTION.SET_PRODUCT,
    payload: {
      productSale
    }
  };
}

export function deleteProductToCart(productSale: IProductSale) {
  return {
    type: CREATE_SALE_ACTION.DELETE_PRODUCT,
    payload: {
      productSale
    }
  };
}

export function deleteListProductToCart(arrProductSale: IProductSale[]) {
  return {
    type: CREATE_SALE_ACTION.DELETE_LIST_PRODUCT,
    payload: {
      arrProductSale
    }
  };
}

export function setIsManySelected(isManySelected: boolean) {
  return {
    type: CREATE_SALE_ACTION.IS_MANY_SELECTED,
    payload: {
      isManySelected
    }
  };
}

export function setGhiChuHoaDon(ghiChuHoaDon: string) {
  return {
    type: CREATE_SALE_ACTION.GHI_CHU_HOA_DON,
    payload: {
      ghiChuHoaDon
    }
  };
}

export function setKenhBan(currentKenhBan: ChannelModel) {
  return {
    type: CREATE_SALE_ACTION.CHOOSE_KENH_BAN,
    payload: {
      currentKenhBan
    }
  };
}

export function resetDonHang() {
  return {
    type: CREATE_SALE_ACTION.RESET
  };
}

const CreateSaleReducer = (
  state: ICreateSaleState = {
    arrProductSale: [],
    isManySelected: false,
    ghiChuHoaDon: '',
    currentKenhBan: ARR_KENH_BAN[2]
  },
  action: ICreateSaleAction
): ICreateSaleState => {
  switch (action.type) {
    case CREATE_SALE_ACTION.ADD_PRODUCT:
      if (action.payload?.productSale && state.arrProductSale) {
        let found = -1;
        found = state.arrProductSale.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productSale?.product.sku
        );
        if (found > -1) {
          state.arrProductSale[found] = {
            product: state.arrProductSale[found].product,
            totalQty: state.arrProductSale[found].totalQty + action.payload?.productSale.totalQty,
            price_books: state.arrProductSale[found].price_books
          };
        } else {
          state.arrProductSale?.push(action.payload?.productSale);
        }
      }
      return {...state, arrProductSale: state.arrProductSale ? [...state.arrProductSale] : []};

    case CREATE_SALE_ACTION.ADD_LIST_PRODUCT:
      if (action.payload?.arrProductSale && state.arrProductSale) {
        for (let index = 0; index < action.payload?.arrProductSale.length; index++) {
          const element = action.payload?.arrProductSale[index];
          let found = -1;
          found = state.arrProductSale.findIndex(
            (x: IProductSale) => x.product.sku === element.product.sku
          );
          if (found > -1) {
            state.arrProductSale[found] = {
              product: state.arrProductSale[found].product,
              totalQty: state.arrProductSale[found].totalQty + element.totalQty,
              price_books: state.arrProductSale[found].price_books
            };
          } else {
            state.arrProductSale?.push(element);
          }
        }
      }
      return {...state, arrProductSale: state.arrProductSale ? [...state.arrProductSale] : []};

    case CREATE_SALE_ACTION.SET_PRODUCT:
      if (action.payload?.productSale && state.arrProductSale) {
        let found = -1;
        found = state.arrProductSale.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productSale?.product.sku
        );
        if (found > -1) {
          state.arrProductSale[found] = {
            product: action.payload?.productSale.product,
            totalQty: action.payload?.productSale.totalQty,
            price_books: state.arrProductSale[found].price_books
          };
        } else {
          state.arrProductSale?.push(action.payload?.productSale);
        }
      }
      return {...state, arrProductSale: state.arrProductSale ? [...state.arrProductSale] : []};

    case CREATE_SALE_ACTION.DELETE_PRODUCT:
      if (action.payload?.productSale && state.arrProductSale) {
        let found = -1;
        found = state.arrProductSale.findIndex(
          (x: IProductSale) => x.product.sku === action.payload?.productSale?.product.sku
        );
        if (found > -1) {
          state.arrProductSale?.splice(found, 1);
        }
      }
      return {...state, arrProductSale: state.arrProductSale ? [...state.arrProductSale] : []};

    case CREATE_SALE_ACTION.DELETE_LIST_PRODUCT:
      if (action.payload?.arrProductSale && state.arrProductSale) {
        for (let index = 0; index < action.payload?.arrProductSale.length; index++) {
          const element = action.payload?.arrProductSale[index];
          let found = -1;
          found = state.arrProductSale.findIndex(
            (x: IProductSale) => x.product.sku === element.product.sku
          );
          if (found > -1) {
            state.arrProductSale.splice(found, 1);
          }
        }
      }
      return {...state, arrProductSale: state.arrProductSale ? [...state.arrProductSale] : []};

    case CREATE_SALE_ACTION.IS_MANY_SELECTED:
      return {...state, isManySelected: action.payload?.isManySelected};

    case CREATE_SALE_ACTION.GHI_CHU_HOA_DON:
      return {...state, ghiChuHoaDon: action.payload.ghiChuHoaDon};

    case CREATE_SALE_ACTION.CHOOSE_KENH_BAN:
      return {
        ...state,
        currentKenhBan: action.payload.currentKenhBan
      };

    case CREATE_SALE_ACTION.RESET:
    case THANH_TOAN_ACTION.THANH_TOAN_THANH_CONG:
      return {
        ...state,
        arrProductSale: [],
        isManySelected: false,
        currentKenhBan: ARR_KENH_BAN[2],
        ghiChuHoaDon: ''
      };

    default:
      return state;
  }
};

export default CreateSaleReducer;
