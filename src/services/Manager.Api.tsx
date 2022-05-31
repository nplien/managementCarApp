import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {IBrands, IBrandsModel} from 'models/Brands.Model';
import {IDetailManagerModel} from 'models/Staff.Model';
import {StaffDetailModel, ChannelModel} from 'models/ManagerSetting.Model';
import {IStoreModel} from 'models/Store.Model';
import {IBangGiaModel} from 'models/BangGia.Model';
import {IStorePerson} from 'models/ModelBase';
import {ITaiKhoanModel} from 'models/Payment.Model';
import {IChungTu} from 'configs/FilterConfig';
const URL_LOAI_THU_CHI = 'v1/attribute-values';
const URL_TAI_KHOAN = 'v1/attribute-values';
const URL_CHANNEL = 'v1/attribute-values';
const URL_STORE = 'v1/stores';
const URL_STAFF = 'v1/staffs';
const URL_PRICE_BOOK = 'v1/price-books';
const URL_BRANDS = 'v1/brands';

export interface IManagerRequest {
  id?: string;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  skip: number;
  limit: number;
  keyword?: string;
  min_created_at?: number;
  max_created_at?: number;
  statuses?: string;
}
export const ManagerAPI = {
  getListLoaiThuChi: async (params: object) => {
    const response = await ClientAPI.GET<IResponse<IChungTu[]>>(
      URL_LOAI_THU_CHI,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListTaiKhoan: async (params: object) => {
    const response = await ClientAPI.GET<IResponse<ITaiKhoanModel[]>>(
      URL_TAI_KHOAN,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListChannels: async (params: object) => {
    const response = await ClientAPI.GET<IResponse<ChannelModel>>(
      URL_CHANNEL,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListPriceBooks: async (params: object) => {
    const response = await ClientAPI.GET<IResponse<IBangGiaModel[]>>(
      URL_PRICE_BOOK,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListStores: async (params?: object) => {
    const response = await ClientAPI.GET<IResponse<IStoreModel[]>>(
      URL_STORE,
      params || {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListIStorePerson: async (params?: object) => {
    const response = await ClientAPI.GET<IResponse<IStorePerson[]>>(
      URL_STORE,
      params || {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDetailStores: async (id: string) => {
    const response = await ClientAPI.GET<IResponse<IStoreModel>>(
      URL_STORE + '/' + id,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListStaffs: async (params?: object) => {
    const response = await ClientAPI.GET<IResponse<StaffDetailModel[]>>(
      URL_STAFF,
      params || {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListStaffsDetail: async (id: string | number) => {
    const response = await ClientAPI.GET<IResponse<IDetailManagerModel>>(
      URL_STAFF + '/' + id,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getListBrands: async (params?: object) => {
    const response = await ClientAPI.GET<IResponse<IBrands[]>>(
      URL_BRANDS,
      params || {},
      Utilities.getHeaderRequest()
    );
    return response;
  },
  addBrands: async (dataBrands: IBrandsModel) => {
    const response = await ClientAPI.POST<IResponse<IBrandsModel[]>>(
      URL_STORE,
      dataBrands,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  updateBrands: async (IdBrands: string, dataBrands: IBrandsModel) => {
    const response = await ClientAPI.PUT<IResponse<IBrandsModel[]>>(
      URL_STORE + '/' + IdBrands,
      dataBrands,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  blockandActiveBrands: async (IdBrands: string, isActive?: 'block' | 'active') => {
    const response = await ClientAPI.POST<IResponse<IStoreModel>>(
      URL_STORE + '/' + IdBrands + '/' + isActive,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  }
};
