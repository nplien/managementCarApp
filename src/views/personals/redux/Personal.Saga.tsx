import {PersonalModel} from 'models/Personal.Model';
import {takeLatest, put} from 'redux-saga/effects';
import {PersonalAPI} from 'services/Personal.API';
import Utilities from 'utils/Utilities';
import {PERSONAL_ACTION, updateInfo, changePass} from './Personal.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {TYPE_MESSAGE_RESPONSE} from 'common/Constants';

function* getInfoPersonalSaga() {
  try {
    const response: IResponse<PersonalModel> = yield PersonalAPI.getInfoPersonal();
    if (response && !response.code) {
      yield put({
        type: PERSONAL_ACTION.GET_SUCCESS,
        payload: {
          info: response.data
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: PERSONAL_ACTION.GET_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: PERSONAL_ACTION.GET_FAIL
    });
  }
}
export function* watchInfoPersonalSaga() {
  yield takeLatest(PERSONAL_ACTION.GET_INFO, getInfoPersonalSaga);
}

function* updateInfoPersonalSaga(action: ReturnType<typeof updateInfo>) {
  try {
    const {objPerson} = action.payload;
    const response: IResponse<null> = yield PersonalAPI.updateInfoPersonal(objPerson);
    if (response && !response.code) {
      Utilities.showToast(
        'Cập nhật thông tin',
        TYPE_MESSAGE_RESPONSE.find(x => x.id === response.message)?.value || 'Thành công',
        'success'
      );
      yield put<IAppAction<null>>({
        type: PERSONAL_ACTION.UPDATE_INFO_SUCCESS
      });
    } else {
      Utilities.showToast(
        'Cập nhật thông tin',
        TYPE_MESSAGE_RESPONSE.find(x => x.id === response.message)?.value || 'Thất bại',
        'danger',
        2000
      );
      yield put<IAppAction<null>>({
        type: PERSONAL_ACTION.UPDATE_INFO_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<null>>({
      type: PERSONAL_ACTION.UPDATE_INFO_FAIL
    });
  }
}
export function* watchUpdateInfoPersonalSaga() {
  yield takeLatest(PERSONAL_ACTION.UPDATE_INFO, updateInfoPersonalSaga);
}

function* changePassPersonalSaga(action: ReturnType<typeof changePass>) {
  try {
    const {newPass, oldPass} = action.payload;
    Utilities.showHideRootLoading(true, 'Vui lòng chờ');
    const response: IResponse<any> = yield PersonalAPI.updatePasswordPersonal(oldPass, newPass);
    if (response && !response.code) {
      Utilities.showHideRootLoading(false);
      Utilities.showToast(
        'Cập nhật mật khẩu',
        TYPE_MESSAGE_RESPONSE.find(x => x.id === response.message)?.value || 'Thành công',
        'success',
        2000
      );
      yield put({
        type: PERSONAL_ACTION.CHANGE_PASS_SUCCESS
      });
    } else {
      Utilities.showHideRootLoading(false);
      Utilities.showToast(
        'Cập nhật mật khẩu',
        TYPE_MESSAGE_RESPONSE.find(x => x.id === response.message)?.value || 'Thất bại',
        'danger',
        2000
      );
      yield put({
        type: PERSONAL_ACTION.CHANGE_PASS_FAIL
      });
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: PERSONAL_ACTION.CHANGE_PASS_FAIL
    });
  }
}
export function* watchChangePassPersonalSaga() {
  yield takeLatest(PERSONAL_ACTION.CHANGE_PASS, changePassPersonalSaga);
}
