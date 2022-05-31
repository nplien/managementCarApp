import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {IInventoryModel} from 'models/Inventory.Model';

const URL_INVENTORY = 'v1/stock-takes';
interface IInventory {
  skip?: number;
  limit?: number;
  id?: string;
  stores?: string;
  statuses?: string;
  min_created_at?: string;
  max_created_at?: string;
  order_by?: string;
  note?: string | number;
}

export const InventoryApi = {
  getListInventory: async (param: IInventory) => {
    const response = ClientAPI.GET<IResponse<IInventoryModel[]>>(
      URL_INVENTORY,
      param,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailInventory: async (id: string) => {
    const response = await ClientAPI.GET<IResponse<IInventoryModel>>(
      `${URL_INVENTORY}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
