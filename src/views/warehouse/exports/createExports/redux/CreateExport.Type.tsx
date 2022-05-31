import {IStoreModel} from 'models/Store.Model';
import {ProductModel} from 'models/Product.Model';

export interface ICreateExportState {
  totalCount?: number;
  totalPrice?: number;
  objBranch?: IStoreModel | any;
  arrExport?: Array<ProductModel> | any;
  notePhieuChuyen?: string | any;
  isManySelected?: boolean | any;
  isLoading?: boolean;
  isError?: boolean;
}
export interface ICreateExportAction {
  type: string;
  payload: {
    optionId?: string;
    totalItem?: any;
    objBranch?: IStoreModel;
    arrExport?: Array<ProductModel> | any;
    objProduct?: ProductModel | any;
    notePhieuChuyen?: string;
    isManySelected?: boolean;
  };
}
