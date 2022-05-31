import {PersonalModel} from 'models/Personal.Model';

export interface IPersonalState {
  isPersonLoading?: boolean;
  infoPersonal?: PersonalModel;
  infoUpdate?: PersonalModel;
  error?: string;
}

export interface IPersonalAction {
  type: string;
  payload: {
    key: keyof PersonalModel;
    value?: string | null;
    info?: PersonalModel;
    isPersonLoading?: boolean;
    oldPass?: string;
    newPass?: string;
    user?: PersonalModel;
  };
}
