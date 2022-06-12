import {PersonalModel} from 'models/Personal.Model';
import {IPersonalAction, IPersonalState} from './Personal.Types';
import {StoersFake} from './StoresFake';

export const PERSONAL_ACTION = {
  GET_INFO: 'ORDER/PERSONAL/GET_INFO',
  GET_SUCCESS: 'ORDER/PERSONAL/GET_INFO_SUCCESS',
  GET_FAIL: 'ORDER/PERSONAL/GET_INFO_FAIL',

  ADD_VALUE: 'ORDER/PERSONAL/ADD_VALUE',

  UPDATE_INFO: 'ORDER/PERSONAL/UPDATE_INFO',
  UPDATE_INFO_SUCCESS: 'ORDER/PERSONAL/UPDATE_INFO/SUCCESS',
  UPDATE_INFO_FAIL: 'ORDER/PERSONAL/UPDATE_INFO/FAIL',

  CHANGE_PASS: 'ORDER/PERSONAL/CHANGE_PASS',
  CHANGE_PASS_SUCCESS: 'ORDER/PERSONAL/CHANGE_PASS/SUCCESS',
  CHANGE_PASS_FAIL: 'ORDER/PERSONAL/CHANGE_PASS/FAIL',

  CHECK_LOADING: 'ORDER/PERSONAL/CHECK_LOADING',
  INIT_USER: 'ORDER/PERSONAL/INIT_USER'
};
export function getInfo() {
  return {
    type: PERSONAL_ACTION.GET_INFO
  };
}

export function initUser(user?: PersonalModel) {
  return {
    type: PERSONAL_ACTION.INIT_USER,
    payload: {
      user
    }
  };
}
export function setInfoLoading(isPersonLoading: boolean) {
  return {
    type: PERSONAL_ACTION.CHECK_LOADING,
    payload: {
      isPersonLoading
    }
  };
}

export function addValueUpdate(key: keyof PersonalModel, value: string | null) {
  return {
    type: PERSONAL_ACTION.ADD_VALUE,
    payload: {
      key,
      value
    }
  };
}

export function updateInfo(objPerson: PersonalModel) {
  return {
    type: PERSONAL_ACTION.UPDATE_INFO,
    payload: {
      objPerson
    }
  };
}

export function changePass(oldPass: string, newPass: string) {
  return {
    type: PERSONAL_ACTION.CHANGE_PASS,
    payload: {
      oldPass,
      newPass
    }
  };
}

const PersonalReducer = (
  state: IPersonalState = {
    isPersonLoading: true,
    infoPersonal: {},
    infoUpdate: {}
  },
  action: IPersonalAction
): IPersonalState => {
  switch (action.type) {
    case PERSONAL_ACTION.CHECK_LOADING:
      return {
        ...state,
        isPersonLoading: action.payload.isPersonLoading
      };

    case PERSONAL_ACTION.GET_SUCCESS:
      return {
        ...state,
        isPersonLoading: false,
        infoPersonal: {...action.payload.info, stores: StoersFake}
      };
    case PERSONAL_ACTION.GET_FAIL:
      return {
        ...state,
        isPersonLoading: false
      };

    case PERSONAL_ACTION.ADD_VALUE:
      let obj: PersonalModel = {[action.payload.key]: action.payload.value};
      state.infoUpdate = {...state.infoUpdate, ...obj};
      return {
        ...state
      };

    case PERSONAL_ACTION.UPDATE_INFO_SUCCESS:
      //   Cập nhật thông tin người dùng thành công
      //   Làm gì đó
      return {
        ...state
      };
    case PERSONAL_ACTION.UPDATE_INFO_FAIL:
      //   Cập nhật thông tin người dùng thất bại
      //   Làm gì đó
      return {
        ...state
      };

    case PERSONAL_ACTION.CHANGE_PASS_SUCCESS:
      //   Đổi mật khẩu thành công
      //   Làm gì đó
      return {
        ...state
      };
    case PERSONAL_ACTION.CHANGE_PASS_FAIL:
      //   Đổi mật khẩu thất bại
      //   Làm gì đó
      return {
        ...state
      };

    case PERSONAL_ACTION.INIT_USER:
      return {
        ...state,
        infoPersonal: action.payload.user
      };

    default:
      return state;
  }
};

export default PersonalReducer;
