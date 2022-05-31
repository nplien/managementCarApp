import {IPaymentItem} from 'configs/FilterConfig';
import {CustomerModel} from 'models/Customer.Model';
import {SO_QUY_GROUP_TYPE, SO_QUY_STATUS, SO_QUY_TYPE} from 'models/SoQuy.Model';
import {IStaffModel} from 'models/Staff.Model';

export interface IFilterSoQuyState {
  code?: string;
  note?: string;
  status?: SO_QUY_STATUS;
  groups?: SO_QUY_GROUP_TYPE;
  types?: SO_QUY_TYPE;

  arrCustomerDaChon?: CustomerModel[];
  arrStaffDaChon?: IStaffModel[];
  arrPTTTDaChon?: IPaymentItem[];

  pttt?: IPaymentItem;
}

export interface IFilterSoQuyAction {
  type: string;
  payload: IFilterSoQuyState;
}
