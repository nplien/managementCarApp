import {IProductPCS} from 'models/PhieuSuaChua.Model';
import {IPhuTungModel, IProductPhuTung} from 'models/PhuTung.Model';
import {ITiepNhanXeModel} from 'models/TiepNhanXe.Model';
import {MyReduxAction, PayloadList} from 'views/app/redux/MyAction.Type';
import {dataPhuTungFake} from '../addPhieuSuaChua/components/DataPhuTungFake';

type IStatusPSCStates = {
  productPhuTung?: IProductPhuTung;
  arrPhuTung: IProductPhuTung[];
  isManySelected?: boolean;
  currenTiepNhanXe?: ITiepNhanXeModel;
  phieuSuaChua?: IProductPCS;
  arrPhieuSuaChua: IProductPCS[];
  arrPhuTungTmp: IPhuTungModel[];
  objPhuTungTmp?: IPhuTungModel;
};

const initialStates: IStatusPSCStates = {
  arrPhuTung: [],
  arrPhieuSuaChua: [],
  arrPhuTungTmp: dataPhuTungFake
};
const PhieuSuaChuaReducer = (state: IStatusPSCStates = initialStates, action: MyReduxAction) => {
  switch (action.type) {
    case 'SET/PSC/IS/MANY/SELECTED': {
      const payload = action.payload as PayloadList['SET/PSC/IS/MANY/SELECTED'];
      return {
        ...state,
        isManySelected: payload.isManySelected
      };
    }
    case 'SET/PSC/CURRENT_TIEP_NHAN_XE': {
      const payload = action.payload as PayloadList['SET/PSC/CURRENT_TIEP_NHAN_XE'];
      return {
        ...state,
        currenTiepNhanXe: payload.currenTiepNhanXe
      };
    }
    case 'SET/PSC/SELECTED_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/SELECTED_PHU_TUNG'];
      if (payload?.productPhuTung && state.arrPhuTung) {
        let found = -1;
        found = state.arrPhuTung.findIndex(
          (x: IProductPhuTung) => x.phuTung?.id === payload?.productPhuTung?.phuTung?.id
        );
        if (found > -1) {
          state.arrPhuTung[found] = {
            phuTung: state.arrPhuTung[found].phuTung,
            totalQty: state.arrPhuTung[found].totalQty + payload?.productPhuTung.totalQty
          };
        } else {
          state.arrPhuTung?.push(payload?.productPhuTung);
        }
      }
      return {...state, arrProductSale: state.arrPhuTung ? [...state.arrPhuTung] : []};
    }
    case 'SET/PSC/LIST_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/LIST_PHU_TUNG'];
      if (payload?.arrPhuTung && state.arrPhuTung) {
        for (let index = 0; index < payload?.arrPhuTung.length; index++) {
          const element = payload?.arrPhuTung[index];
          let found = -1;
          found = state.arrPhuTung.findIndex(
            (x: IProductPhuTung) => x.phuTung?.id === element.phuTung?.id
          );
          if (found > -1) {
            state.arrPhuTung[found] = {
              phuTung: state.arrPhuTung[found].phuTung,
              totalQty: state.arrPhuTung[found].totalQty + element.totalQty
            };
          } else {
            state.arrPhuTung?.push(element);
          }
        }
      }
      return {...state, arrProductSale: state.arrPhuTung ? [...state.arrPhuTung] : []};
    }
    case 'SET/PSC/PHU_TUNG_TO_CART': {
      const payload = action.payload as PayloadList['SET/PSC/PHU_TUNG_TO_CART'];
      if (payload?.productPhuTung && state.arrPhuTung) {
        let found = -1;
        found = state.arrPhuTung.findIndex(
          (x: IProductPhuTung) => x.phuTung?.id === payload?.productPhuTung?.phuTung?.id
        );
        if (found > -1) {
          state.arrPhuTung[found] = {
            phuTung: payload?.productPhuTung.phuTung,
            totalQty: payload?.productPhuTung.totalQty
          };
        } else {
          state.arrPhuTung?.push(payload?.productPhuTung);
        }
      }
      return {...state, arrProductSale: state.arrPhuTung ? [...state.arrPhuTung] : []};
    }
    case 'SET/PSC/DELETE/PRODUCT_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/DELETE/PRODUCT_PHU_TUNG'];
      if (payload?.productPhuTung && state.arrPhuTung) {
        let found = -1;
        found = state.arrPhuTung.findIndex(
          (x: IProductPhuTung) => x.phuTung?.id === payload?.productPhuTung?.phuTung?.id
        );
        if (found > -1) {
          state.arrPhuTung?.splice(found, 1);
        }
      }
      return {...state, arrProductSale: state.arrPhuTung ? [...state.arrPhuTung] : []};
    }
    case 'SET/PSC/DELETE/LIST/PRODUCT_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/DELETE/LIST/PRODUCT_PHU_TUNG'];
      if (payload?.arrPhuTung && state.arrPhuTung) {
        for (let index = 0; index < payload?.arrPhuTung.length; index++) {
          const element = payload?.arrPhuTung[index];
          let found = -1;
          found = state.arrPhuTung.findIndex(
            (x: IProductPhuTung) => x.phuTung?.id === element.phuTung?.id
          );
          if (found > -1) {
            state.arrPhuTung.splice(found, 1);
          }
        }
      }
      return {...state, arrProductSale: state.arrPhuTung ? [...state.arrPhuTung] : []};
    }
    case 'THANH/TOAN/ACTION_PSC': {
      const payload = action.payload as PayloadList['THANH/TOAN/ACTION_PSC'];
      let objTMP = state.arrPhieuSuaChua?.find(x => x.id === payload.phieuSuaChua?.id);
      if (objTMP) {
        return {
          ...state,
          arrPhieuSuaChua: state.arrPhieuSuaChua?.map(x => {
            if (x.id === payload.phieuSuaChua?.id) {
              x = payload.phieuSuaChua;
            }
            return x;
          })
        };
      } else {
        return {
          ...state,
          arrPhieuSuaChua: [...state.arrPhieuSuaChua, payload.phieuSuaChua]
        };
      }
    }
    case 'CREATE/PSC/RESET_ARR_PSC': {
      return {
        ...state,
        arrPhieuSuaChua: []
      };
    }
    case 'SET/PSC/ARR_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/ARR_PHU_TUNG'];
      return {
        ...state,
        arrPhuTungTmp: payload.arrPhuTungTmp
      };
    }
    case 'SET/PSC/OBJ_PHU_TUNG': {
      const payload = action.payload as PayloadList['SET/PSC/OBJ_PHU_TUNG'];
      let objTMP = state.arrPhuTungTmp?.find(x => x.id === payload.objPhuTungTmp?.id);
      if (objTMP) {
        return {
          ...state,
          arrPhuTungTmp: state.arrPhuTungTmp?.map(x => {
            if (x.id === payload.objPhuTungTmp?.id) {
              x = payload.objPhuTungTmp;
            }
            return x;
          })
        };
      } else {
        return {
          ...state,
          arrPhuTungTmp: [...state.arrPhuTungTmp, payload.objPhuTungTmp]
        };
      }
    }

    default:
      return state;
  }
};

export default PhieuSuaChuaReducer;
