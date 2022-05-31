import {IProductInOrder} from 'models/Product.Model';
import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {DeliveryModel} from 'models/Order.Model';

// vận đơn
const URL_DELIVERY = 'v1/deliveries';

export interface IRequestDelivery {
  skip: number;
  limit: number;
  min_created_at?: string; //  03/01/2021
  max_created_at?: string; //  03/07/2021
  min_completed_at?: string; //  03/01/2021
  max_completed_at?: string; //  03/07/2021
  statuses?: string; //  pending
  stores?: string; //  coco_online
  sort_by?: string; //  sort
  order_by?: string; //  order
  is_cod_amount?: boolean; // COD,
  providers?: string; // doi tac giao hang
  code?: string;
  customer?: string;
  order_code?: string;
  note?: string;
  provinces?: string;
}

export interface IPostDeliveryRequest {
  order_id: string;
  store_id: string;
  store_name: string;
  customer_id: string;
  customer_name: string;
  products: IProductInOrder[];
  receiver_name?: string;
  receiver_phone?: string;
  receiver_address?: string;
  receiver_province_code?: number | string;
  receiver_district_code?: number | string;
  receiver_ward_code?: number | string;
  weight?: number | string;
  length?: number | string;
  width?: number | string;
  height?: number | string;
  is_cod?: boolean;
  total_cod_amount?: number;
}

export const DeliveryApi = {
  //get delivery
  getListDelivery: async (params: IRequestDelivery) => {
    const response = ClientAPI.GET<IResponse<DeliveryModel[]>>(
      URL_DELIVERY,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailDelivery: async (id: string) => {
    const response = ClientAPI.GET<IResponse<DeliveryModel>>(
      `${URL_DELIVERY}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  //post delivery
  postDelivery: async (params: IPostDeliveryRequest) => {
    const response = ClientAPI.POST(URL_DELIVERY, params, Utilities.getHeaderRequest());
    return response;
  }
};
