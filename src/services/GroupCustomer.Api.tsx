import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';

const URL_GROUPCUSTOMER = 'v1/groups';

interface IGroupCustomer {
  type?: string;
  name?: string;
  note?: string;
  discount_value?: number;
  discount_type?: number;
  conditions?: IConditions[];

  is_auto_update?: boolean;
}
export interface IConditions {
  applied_field?: string;
  applied_operation?: string;
  applied_value?: string;
}
/**
 * * List Group Customer
 */
async function getApiGroupCustomer(skip: number, limit: number, types?: string) {
  const response = await ClientAPI.GET<IResponse<IGroupCustomer[]>>(
    URL_GROUPCUSTOMER,
    {
      skip: skip,
      limit: limit,
      types: types
    },
    Utilities.getHeaderRequest()
  );
  return response;
}

/**
 * * Get detail Group Customer
 */
async function getApiDetailGroupCustomer(IdDetail: number) {
  const response = await ClientAPI.GET<IResponse<IGroupCustomer>>(
    URL_GROUPCUSTOMER,
    {IdDetail},
    Utilities.getHeaderRequest()
  );
  return response;
}

/**
 * * Add 1 Group Customer
 */
async function postApiGroupCustomer(dataGroupCustomer: IGroupCustomer) {
  const response = await ClientAPI.POST(
    URL_GROUPCUSTOMER,
    dataGroupCustomer,
    Utilities.getHeaderRequest()
  );
  return response;
}

/**
 * * Update 1 Group Customer
 */
async function putApiGroupCustomer(id: number, dataGroupCustomer: IGroupCustomer) {
  const response = await ClientAPI.PUT(
    URL_GROUPCUSTOMER + '/' + id,
    dataGroupCustomer,
    Utilities.getHeaderRequest()
  );
  return response;
}

/**
 * * Delete 1 Customer
 */
async function deleteApiGroupCustomer(id: string) {
  const response = await ClientAPI.DELETE(
    URL_GROUPCUSTOMER + '/' + id,
    Utilities.getHeaderRequest()
  );
  return response;
}
export {
  getApiGroupCustomer,
  getApiDetailGroupCustomer,
  postApiGroupCustomer,
  putApiGroupCustomer,
  deleteApiGroupCustomer
};
