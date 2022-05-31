import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {ITheKhoModel} from 'models/TheKho.Model';

const URL_THEKHO = 'v1/product-histories';

interface IRequest {
  skip?: number;
  limit?: number;
  store_id: string;
  product_option_id: string;
}
const TheKhoApi = {
  getListTheKho: async (param: IRequest) => {
    const response = await ClientAPI.GET<IResponse<ITheKhoModel[]>>(
      URL_THEKHO,
      param,
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
export {TheKhoApi};
