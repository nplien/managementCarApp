import Utilities from 'utils/Utilities';
import {IRequestShip} from 'views/banhang/inforShipping/redux';
import ClientAPI from './ClientAPI';

const URL_CACULATE_FEES = 'v1/delivery-services/calculate-fees';

export const PhiShipAPI = {
  postCaculateFees: async (params: IRequestShip) => {
    const response = ClientAPI.POST(URL_CACULATE_FEES, params, Utilities.getHeaderRequest());
    return response;
  }
};
