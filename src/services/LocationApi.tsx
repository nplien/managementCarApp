import ClientAPI, {IResponse} from './ClientAPI';
import {ILocation, ILocationDistrict, ILocationWard} from 'models/Localtion.Model';
const URL_LOCATION = 'v1/provinces';
const URL_LOCATION_DISTRICT = 'v1/districts';
const URL_LOCATION_WARD = 'v1/wards';
const URL_CITY = 'v1/provinces?skip=0&limit=100';
const URL_DISTRICT = '/v1/districts?province_code=';
const URL_WARD = '/v1/wards?district_code=';

const LocationApi = {
  getListCity: async () => {
    const response = await ClientAPI.GET<IResponse<ILocation[]>>(URL_CITY, {});
    return response;
  },
  getListDistrict: async (id: number | any) => {
    const response = await ClientAPI.GET<IResponse<ILocation[]>>(URL_DISTRICT + id, {});
    return response;
  },
  getListWard: async (id: number | any) => {
    const response = await ClientAPI.GET<IResponse<ILocation[]>>(URL_WARD + id, {});
    return response;
  },
  getDetail: async (id: string | any) => {
    const response = await ClientAPI.GET<IResponse<ILocation>>(URL_LOCATION + '/' + id, {});
    return response;
  },
  getDetailDistrict: async (id: number) => {
    const response = await ClientAPI.GET<IResponse<ILocationDistrict>>(
      URL_LOCATION_DISTRICT + '/' + id,
      {}
    );
    return response;
  },
  getDetailWard: async (id: number) => {
    const response = await ClientAPI.GET<IResponse<ILocationWard>>(
      URL_LOCATION_WARD + '/' + id,
      {}
    );
    return response;
  },
  getProvinces: async (params: object) => {
    const response = await ClientAPI.GET<IResponse<ILocation>>(URL_LOCATION, params);
    return response;
  }
};
export {LocationApi};
