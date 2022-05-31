import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {ProductModel} from 'models/Product.Model';
import {OrderIEModel} from 'models/Order.Model';
import {ISuppliers} from 'models/Suppliers.Model';
import {IStorePerson} from 'models/ModelBase';
// import
const URL_IMPORT = 'v1/imports';
// export
const URL_EXPORT = 'v1/exports';

export interface IRequestExport {
  code?: string; // search theo ma
  product_sku?: string; // search theo ma
  product_name?: string; // search theo ma
  skip: number;
  limit: number;
  statuses?: string; //delivery,confirmed,cancelled
  min_confirmed_at?: string; // 03/09/2021
  max_confirmed_at?: string; //03/11/2021
  min_created_at?: string; //04/19/2021
  max_created_at?: string; //04/22/2021
  types?: string; //1
  owners?: string; //coco_online
  owner_types?: string; //sender,receiver
  sort_by?: string; // created_at, updated_at
  order_by?: string; // created_at, updated_at
  stores?: string; // ds kho chuyen di
  user_code?: string; // ds kho nhap ve,
  receivers?: string; //
  senders?: string; //
  is_receiver?: boolean;
  is_sender?: boolean;
  is_match?: boolean | string;
  min_completed_at?: string; //  03/01/2021
  max_completed_at?: string; //  03/07/2021
}

export interface IRequestImport {
  code?: string; // search theo ma
  note?: string; // search theo ma
  product_sku?: string; // search theo ma
  product_name?: string; // search theo ma
  skip: number;
  limit: number;
  statuses?: 'draft' | 'cancelled' | 'completed'; //draft,cancelled,completed
  min_confirmed_at?: string; // 03/09/2021
  max_confirmed_at?: string; //03/11/2021
  min_created_at?: string; //04/19/2021
  max_created_at?: string; //04/22/2021
  // types?: string; //1
  // owners?: string; //coco_online
  // owner_types?: string; //sender,receiver
  sort_by?: string; // created_at, updated_at
  order_by?: string; // created_at, updated_at
  receivers?: string; //  ds kho nhap ve
  staffs?: string;
}

export interface IRequestPostExport {
  type?: number;
  note?: string | null;
  source?: IStorePerson | any;
  store?: IStorePerson | any;
  products?: [ProductModel];
  total_price?: number;
  total_paid?: number;
  total_unpaid?: number;
  total_product?: number;
}
export interface IRequestPostImport {
  type?: number;
  supplier?: ISuppliers;
  receiver?: IStorePerson;
  total_paid?: number;
  total_price?: number;
  total_quantity?: number;
  total_unpaid?: number;
  note?: string;
  products?: ProductModel[];
}

export const WareHouseApi = {
  //get imports
  getListImport: async (params: IRequestExport) => {
    const response = ClientAPI.GET<IResponse<OrderIEModel[]>>(
      URL_IMPORT,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailImport: async (id: string) => {
    const response = ClientAPI.GET<IResponse<OrderIEModel>>(
      `${URL_IMPORT}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  //get exports truyền types: chuyển hàng(1), huỷ đơn(2)
  getListExport: async (params: IRequestExport) => {
    const response = ClientAPI.GET<IResponse<OrderIEModel[]>>(
      URL_EXPORT,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailExport: async (id: string) => {
    const response = ClientAPI.GET<IResponse<OrderIEModel>>(
      `${URL_EXPORT}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  postListExport: async (body: IRequestPostExport) => {
    const response = ClientAPI.POST<IResponse<any>>(URL_EXPORT, body, Utilities.getHeaderRequest());
    return response;
  },
  postImportOrder: async (body: IRequestPostImport) => {
    const response = ClientAPI.POST<IResponse<any>>(URL_IMPORT, body, Utilities.getHeaderRequest());
    return response;
  }
};
