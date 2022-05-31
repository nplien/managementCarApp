import {ICreateExportState, ICreateExportAction} from './CreateExport.Type';
import {IStoreModel} from 'models/Store.Model';
import {ProductOptionsModel} from 'models/Product.Model';

export const CREATE_EXPORT_ACTION = {
  COUNT: 'CREATE/EXPORT/COUNT',
  MINUS: 'CREATE/EXPORT/MINUS',
  VALUEINPUT: 'CREATE/EXPORT/VALUEINPUT',
  HEADERBRANCH: 'CREATE/EXPORT/HEADERBRANCH',
  GET_LIST_CREATE: 'CREATE/BRANDS/LIST/GET',
  SUCCESS: 'CREATE/LIST/SUCCESS',
  FAIL: 'CREATE/LIST/FAIL',
  LIST_CREATE_SUCCESS: 'CREATE/BRANDS/LIST/BRANS_SUCCESS',
  CLEAR: 'CREATE/EXPORT/CLEAR',
  SETNOTE: 'CREATE/EXPORT/SETNOTE',
  PUSH_VALUE: 'CREATE/EXPORT/PUSH/VALUE',
  PUSH_ARRAY_VALUE: 'CREATE/EXPORT/PUSH/ARRAY/VALUE',
  DELETE_PRODUCT: 'CREATE/SALE/DELETE/PRODUCT',
  DELETE_LIST_PRODUCT: 'CREATE/EXPORT/DELETE/LIST/PRODUCT',
  IS_MANY_SELECTED: 'CREATE/EXPORT/IS/MANY/SELECTED'
};
export function setSummation(optionId: string): ICreateExportAction {
  return {
    type: CREATE_EXPORT_ACTION.COUNT,
    payload: {
      optionId
    }
  };
}
export function setSubtraction(optionId: string): ICreateExportAction {
  return {
    type: CREATE_EXPORT_ACTION.MINUS,
    payload: {
      optionId
    }
  };
}
export function setValueInput(totalItem: number, optionId: string): ICreateExportAction {
  return {
    type: CREATE_EXPORT_ACTION.VALUEINPUT,
    payload: {
      optionId,
      totalItem
    }
  };
}
export function setHeaderBranch(objBranch: IStoreModel) {
  return {
    type: CREATE_EXPORT_ACTION.HEADERBRANCH,
    payload: {
      objBranch
    }
  };
}
export function pushValueItem(objProduct: ProductOptionsModel) {
  return {
    type: CREATE_EXPORT_ACTION.PUSH_VALUE,
    payload: {
      objProduct
    }
  };
}
export function pushArrayValueItem(arrExport: Array<ProductOptionsModel>): ICreateExportAction {
  return {
    type: CREATE_EXPORT_ACTION.PUSH_ARRAY_VALUE,
    payload: {
      arrExport
    }
  };
}
export function setDeleteItem(optionId: string) {
  return {
    type: CREATE_EXPORT_ACTION.DELETE_PRODUCT,
    payload: {
      optionId
    }
  };
}
export function deleteListExport(arrExport: Array<ProductOptionsModel>): ICreateExportAction {
  return {
    type: CREATE_EXPORT_ACTION.DELETE_LIST_PRODUCT,
    payload: {
      arrExport
    }
  };
}

export function setIsManySelect(isManySelected: boolean) {
  return {
    type: CREATE_EXPORT_ACTION.IS_MANY_SELECTED,
    payload: {
      isManySelected
    }
  };
}
export function setNote(notePhieuChuyen: string) {
  return {
    type: CREATE_EXPORT_ACTION.SETNOTE,
    payload: {
      notePhieuChuyen
    }
  };
}
export function setLoadingListCreate() {
  return {
    type: CREATE_EXPORT_ACTION.GET_LIST_CREATE
  };
}
export function setClearValue() {
  return {
    type: CREATE_EXPORT_ACTION.CLEAR
  };
}

const CreateExportReducer = (
  state: ICreateExportState = {
    totalCount: 0,
    totalPrice: 0,
    objBranch: {},
    arrExport: [],
    notePhieuChuyen: '',
    isManySelected: false,
    isLoading: false,
    isError: false
  },
  action: ICreateExportAction
): ICreateExportState => {
  switch (action.type) {
    /** công để lấy tổng số sản phẩm */
    case CREATE_EXPORT_ACTION.COUNT:
      let currentArrPlus = state.arrExport;
      for (let index = 0; index < currentArrPlus.length; index++) {
        const element = currentArrPlus[index];
        if (element.sku === action.payload.optionId) {
          element.total_quantity = element.total_quantity + 1;
          break;
        }
      }
      let CurrentPlus: number = 0;
      let CurrentPlusPrice: number | any = 0;
      if (currentArrPlus.length > 0) {
        for (let index = 0; index < currentArrPlus.length; index++) {
          const element = currentArrPlus[index];
          CurrentPlus = CurrentPlus + element.total_quantity;
          CurrentPlusPrice = element.total_quantity * element.price + CurrentPlusPrice;
        }
      }
      return {
        ...state,
        arrExport: [...currentArrPlus],
        totalCount: CurrentPlus,
        totalPrice: CurrentPlusPrice
      };

    /** Trừ để lấy tổng số sản phẩm */
    case CREATE_EXPORT_ACTION.MINUS:
      let currentArrMinus = state.arrExport;
      for (let index = 0; index < currentArrMinus.length; index++) {
        const element = currentArrMinus[index];
        if (element.sku === action.payload.optionId) {
          element.total_quantity = element.total_quantity - 1;
          break;
        }
      }
      let CurrentMinus: number = 0;
      let CurrentMinusPrice: number | any = 0;
      if (currentArrMinus.length > 0) {
        for (let index = 0; index < currentArrMinus.length; index++) {
          const element = currentArrMinus[index];
          CurrentMinus = CurrentMinus + element.total_quantity;
          CurrentMinusPrice = element.total_quantity * element.price + CurrentMinusPrice;
        }
      }
      return {
        ...state,
        totalCount: CurrentMinus,
        arrExport: [...currentArrMinus],
        totalPrice: CurrentMinusPrice
      };

    /** Nhập giá trị để lấy tổng số sản phẩm */
    case CREATE_EXPORT_ACTION.VALUEINPUT:
      const {totalItem, optionId} = action?.payload;
      let currentArrInput = state.arrExport;
      for (let index = 0; index < currentArrInput.length; index++) {
        const element = currentArrInput[index];
        if (element.sku === optionId) {
          element.total_quantity = totalItem;
          break;
        }
      }
      let CurrentTotal: number = 0;
      let CurrentPrice: number | any = 0;
      if (currentArrInput.length > 0) {
        for (let index = 0; index < currentArrInput.length; index++) {
          const element = currentArrInput[index];
          CurrentTotal = CurrentTotal + element.total_quantity;
          CurrentPrice = element.total_quantity * element.price + CurrentPrice;
        }
      }
      return {
        ...state,
        totalCount: CurrentTotal,
        arrExport: [...currentArrInput],
        totalPrice: CurrentPrice
      };

    case CREATE_EXPORT_ACTION.HEADERBRANCH:
      return {...state, objBranch: action?.payload?.objBranch};

    case CREATE_EXPORT_ACTION.GET_LIST_CREATE:
      return {...state, isLoading: true};

    // add item to array export
    case CREATE_EXPORT_ACTION.PUSH_VALUE:
      const {objProduct} = action.payload;
      let currentArrExport = state.arrExport;
      if (currentArrExport.length > 0) {
        for (let index = 0; index < currentArrExport.length; index++) {
          const element = currentArrExport[index];
          if (element.sku === objProduct?.sku) {
            objProduct.total_quantity = element.total_quantity + 1;
            break;
          }
        }
      }
      const found = currentArrExport.findIndex(
        (element: {sku: string | undefined}) => element.sku === objProduct?.sku
      );
      if (found === -1 && objProduct) {
        objProduct.total_quantity = 1;
        currentArrExport.push(objProduct);
      }
      let totalPush: number = 0;
      let totalPricePush: number | any = 0;
      if (currentArrExport.length > 0) {
        for (let index = 0; index < currentArrExport.length; index++) {
          const element = currentArrExport[index];
          totalPush = totalPush + element.total_quantity;
          totalPricePush = element.total_quantity * element.price + totalPricePush;
        }
      }
      return {
        ...state,
        arrExport: [...currentArrExport],
        totalCount: totalPush,
        totalPrice: totalPricePush
      };
    case CREATE_EXPORT_ACTION.PUSH_ARRAY_VALUE:
      const {arrExport} = action.payload;
      let currentArrPush = state.arrExport;

      for (let index = 0; index < arrExport.length; index++) {
        const elementPush: ProductOptionsModel = arrExport[index];
        const foundIndex = currentArrPush?.findIndex(
          (x: ProductOptionsModel) => x.sku === elementPush.sku
        );
        if (foundIndex > -1) {
          currentArrPush[foundIndex].total_quantity += 1;
        } else {
          // elementPush.total_quantity = 1;
          currentArrPush.push(elementPush);
        }
      }
      let totalArrPush: number = 0;
      let totalPriceArrPush: number | any = 0;
      if (currentArrPush.length > 0) {
        for (let index = 0; index < currentArrPush.length; index++) {
          const element = currentArrPush[index];
          totalArrPush = totalArrPush + element.total_quantity;
          totalPriceArrPush = element.total_quantity * element.price + totalPriceArrPush;
        }
      }
      return {
        ...state,
        arrExport: [...currentArrPush],
        totalCount: totalArrPush,
        totalPrice: totalPriceArrPush
      };
    case CREATE_EXPORT_ACTION.SUCCESS:
      const totalList: number | any = action.payload?.arrExport?.length;
      let totalPriceList: number | any = 0;
      let addTotal = [];
      if (action.payload?.arrExport) {
        for (let index = 0; index < action.payload?.arrExport?.length; index++) {
          const element = action.payload?.arrExport[index];
          element.total_quantity = 1;
          addTotal.push(element);
          totalPriceList = totalPriceList + element.price;
        }
      }
      return {
        ...state,
        isError: false,
        isLoading: false,
        arrExport: addTotal,
        totalCount: totalList,
        totalPrice: totalPriceList
      };
    /** delete one item */
    case CREATE_EXPORT_ACTION.DELETE_PRODUCT:
      let currentArrDelete = state.arrExport;
      const deleteIndex = currentArrDelete.findIndex(
        (element: {sku: string | undefined}) => element.sku === action.payload.optionId
      );
      if (deleteIndex > -1) {
        currentArrDelete.splice(deleteIndex, 1);
      }
      let totalDelete: number = 0;
      let totalPriceDelete: number | any = 0;
      if (currentArrDelete.length > 0) {
        for (let index = 0; index < currentArrDelete.length; index++) {
          const element = currentArrDelete[index];
          totalDelete += element.total_quantity;
          totalPriceDelete += element.total_quantity * element.price;
        }
      }
      return {
        ...state,
        arrExport: [...currentArrDelete],
        totalCount: totalDelete,
        totalPrice: totalPriceDelete
      };

    /** Delete array export  */
    case CREATE_EXPORT_ACTION.DELETE_LIST_PRODUCT:
      let currentListDelete = state.arrExport;
      if (action.payload?.arrExport && currentListDelete) {
        for (let index = 0; index < action.payload?.arrExport.length; index++) {
          const element = action.payload?.arrExport[index];
          let foundIndex = -1;
          foundIndex = currentListDelete.findIndex(
            (x: ProductOptionsModel) => x.sku === element.sku
          );
          if (foundIndex > -1) {
            currentListDelete.splice(foundIndex, 1);
          }
        }
      }
      let totalDeleteList: number = 0;
      let totalPriceDeleteList: number | any = 0;
      if (currentListDelete.length > 0) {
        for (let index = 0; index < currentListDelete.length; index++) {
          const element = currentListDelete[index];
          totalDeleteList = totalDeleteList + element.total_quantity;
          totalPriceDeleteList = element.total_quantity * element.price + totalPriceDeleteList;
        }
      }
      return {
        ...state,
        arrExport: [...currentListDelete],
        isManySelected: false,
        totalCount: totalDeleteList,
        totalPrice: totalPriceDeleteList
      };

    case CREATE_EXPORT_ACTION.IS_MANY_SELECTED:
      return {...state, isManySelected: action.payload?.isManySelected};
    case CREATE_EXPORT_ACTION.SETNOTE:
      return {...state, notePhieuChuyen: action?.payload?.notePhieuChuyen};
    case CREATE_EXPORT_ACTION.FAIL:
      return {...state, isError: true, isLoading: false};
    case CREATE_EXPORT_ACTION.CLEAR:
      return {
        ...state,
        totalCount: 0,
        totalPrice: 0,
        objBranch: {},
        arrExport: [],
        notePhieuChuyen: ''
      };
    default:
      return state;
  }
};

export default CreateExportReducer;
