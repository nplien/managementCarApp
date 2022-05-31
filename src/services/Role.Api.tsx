import Utilities from 'utils/Utilities';
import ClientAPI from './ClientAPI';

const URL_CUSTOMER = '/v1/roles';

interface IRole {
  skip: number;
  limit: number;
  keyword?: string;
  statuses?: string;
}
const RoleApi = {
  getListRole: async (paramRole: IRole) => {
    const response = await ClientAPI.GET(URL_CUSTOMER, paramRole, Utilities.getHeaderRequest());
    return response;
  }
};
export {RoleApi};
