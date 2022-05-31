import {IStaffModel} from 'models/Staff.Model';
import {IAppState} from 'views/app';

export interface ICreateByState extends IAppState {
  arrStaffs?: IStaffModel[];

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
