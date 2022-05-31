import ClientAPI, {IResponse} from './ClientAPI';
import {CustomerModelRequest, CustomerModel, IAddressModel} from 'models/Customer.Model';
import Utilities from 'utils/Utilities';
import {IProvince, IStorePerson} from 'models/ModelBase';

const URL_CUSTOMER = 'v1/users';
const URL_ADDRESS_CUSTOMER = '/v1/address';

export interface ICustomersRequest {
  id?: string;
  tax_code?: string;
  company?: string;
  // location
  country?: string;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  gender?: string;
  stores?: IStorePerson[];
  type?: string;
  note?: string;
  birthday?: Date;
  status?: string;
  group?: IGroupsRequest;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
}
export interface province {
  id: number;
  code: string;
  name: string;
}
export interface IGroupsRequest {
  id?: number;
  name?: string;
  discount_value?: number;
  discount_type?: number;
}
async function getApiCustomer(paramCustomer: CustomerModelRequest) {
  const response = await ClientAPI.GET<IResponse<CustomerModel[]>>(
    URL_CUSTOMER,
    paramCustomer,
    Utilities.getHeaderRequest()
  );
  return response;
}
async function getApiDetailCustomer(idCustomer: string) {
  const response = await ClientAPI.GET<IResponse<CustomerModel>>(
    URL_CUSTOMER + '/' + idCustomer,
    {},
    Utilities.getHeaderRequest()
  );
  return response;
}
async function postApiCustomer(dataCustomers: ICustomersRequest) {
  const response = await ClientAPI.POST<IResponse<CustomerModel>>(
    URL_CUSTOMER,
    dataCustomers,
    Utilities.getHeaderRequest()
  );
  return response;
}
async function putApiCustomer(IdCustomer: string, dataCustomers: ICustomersRequest) {
  const response = await ClientAPI.PUT<IResponse<CustomerModel>>(
    URL_CUSTOMER + '/' + IdCustomer,
    dataCustomers,
    Utilities.getHeaderRequest()
  );
  return response;
}
/**
 * * Delete 1 Customer
 */
async function deleteApiCustomer(IdCustomer: string) {
  const response = await ClientAPI.DELETE(
    URL_CUSTOMER + '/' + IdCustomer,
    Utilities.getHeaderRequest()
  );
  return response;
}
/**
 * @param GET address customer
 */
async function getApiAddressCustomer(id: string) {
  const response = await ClientAPI.GET<IResponse<IAddressModel[]>>(
    URL_ADDRESS_CUSTOMER,
    {user_id: id},
    Utilities.getHeaderRequest()
  );
  return response;
}

export {
  getApiCustomer,
  getApiDetailCustomer,
  postApiCustomer,
  putApiCustomer,
  deleteApiCustomer,
  getApiAddressCustomer
};
