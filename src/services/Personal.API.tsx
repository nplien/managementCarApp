import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {PersonalModel} from 'models/Personal.Model';
import MyStaticLocal from 'utils/MyStaticLocal';
const URL_ACCOUNT = 'v1/staffs';
const URL_LOGIN = 'v1/auth/login-password';
const SOURCE_CHANGE_PASS = '/change-password';

export const PersonalAPI = {
  getInfoPersonal: async () => {
    const response = ClientAPI.GET<IResponse<PersonalModel>>(
      URL_ACCOUNT + '/' + MyStaticLocal.USER_ID,
      {},
      Utilities.getHeaderRequest()
    );
    return response;
  },

  updateInfoPersonal: async (body: object) => {
    const response = ClientAPI.PUT<IResponse<PersonalModel>>(URL_ACCOUNT, body);
    return response;
  },
  updatePasswordPersonal: async (oldPass: string, newPass: string) => {
    const objChangePass = {
      password: oldPass,
      newPassword: newPass
    };
    const response = ClientAPI.POST<IResponse<any>>(
      URL_ACCOUNT + SOURCE_CHANGE_PASS,
      objChangePass
    );
    return response;
  },
  login: async (username: string, password: string) => {
    const objLogin = {
      username,
      password,
      service: 'staff'
    };
    const response = ClientAPI.POST_LOGIN<IResponse<any>>(URL_LOGIN, objLogin);
    return response;
  }
};
