import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {ICategoryModel} from 'models/Category.Model';

const URL_CUSTOMER = 'v1/categories';

export interface ICategoryRequest {
  skip?: number;
  limit?: number;
  nested?: boolean;
  keyword?: string;
}
const CategoryApi = {
  getListCategory: async (paramCategory: ICategoryRequest) => {
    const response = await ClientAPI.GET<IResponse<ICategoryModel[]>>(
      URL_CUSTOMER,
      paramCategory,
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
export {CategoryApi};
