import {ICreatedBy} from 'models/ModelBase';
import {IProductPCS} from 'models/PhieuSuaChua.Model';
import {IProductPhuTung} from 'models/PhuTung.Model';
import {ITiepNhanXeModel} from 'models/TiepNhanXe.Model';
import allReducer from './App.Reducer';

export type RootState = ReturnType<typeof allReducer>;

export type MyReduxAction = {
  type: keyof PayloadList;
  payload: PayloadList[MyReduxAction['type']];
};

export type PayloadList = {
  // Tiep Nhan xe, TNX Là Tiếp nhận xe
  'SET/TNX/TYPE_CAR': {
    typeCar: ICreatedBy;
  };
  'SET/TNX/OBJECT_INFOR_XE': {
    inforXeTN: ITiepNhanXeModel;
  };

  // Phụ tùng
  'SET/PSC/SELECTED_PHU_TUNG': {
    productPhuTung: IProductPhuTung;
  };
  'SET/PSC/PHU_TUNG_TO_CART': {
    productPhuTung: IProductPhuTung;
  };
  'SET/PSC/DELETE/PRODUCT_PHU_TUNG': {
    productPhuTung: IProductPhuTung;
  };
  'SET/PSC/DELETE/LIST/PRODUCT_PHU_TUNG': {
    arrPhuTung: IProductPhuTung[];
  };
  'SET/PSC/LIST_PHU_TUNG': {
    arrPhuTung: IProductPhuTung[];
  };
  'SET/PSC/IS/MANY/SELECTED': {
    isManySelected: boolean;
  };
  'SET/PSC/CURRENT_TIEP_NHAN_XE': {
    currenTiepNhanXe?: ITiepNhanXeModel;
  };
  'THANH/TOAN/ACTION_PSC': {
    phieuSuaChua: IProductPCS;
  };
  'CREATE/PSC/RESET': undefined;
  'CREATE/PSC/RESET_ARR_PSC': undefined;
};
