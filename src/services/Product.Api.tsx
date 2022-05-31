import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {ProductModel, ProductOptionsModel} from 'models/Product.Model';

const URL_PRODUCTS = 'v1/products';
const SOURCE = '/reports';

const URL_PRODUCT = 'v1/product';
const OPTIONS = '-options';

export const ProductAPI = {
  getListProduct: async (params: object = {}) => {
    const response = await ClientAPI.GET<IResponse<ProductModel[]>>(
      URL_PRODUCTS + SOURCE,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getListProductOptions: async (params: object = {}) => {
    const response = await ClientAPI.GET<IResponse<ProductOptionsModel[]>>(
      URL_PRODUCT + OPTIONS,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getListProductHangHoa: async (params: object = {}) => {
    const response = await ClientAPI.GET<IResponse<ProductModel[]>>(
      URL_PRODUCTS,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getListProductSale: async (params: object = {}) => {
    const response = await ClientAPI.GET<IResponse<ProductOptionsModel[]>>(
      URL_PRODUCT + '-options',
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getDetailProduct: async (id: number) => {
    const response = await ClientAPI.GET<IResponse<ProductModel>>(
      `${URL_PRODUCTS}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getDetailProductOptions: async (id: number) => {
    const response = await ClientAPI.GET(
      `${URL_PRODUCT + OPTIONS}/${id}`,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
