import {takeLatest, put, call, select} from 'redux-saga/effects';
import {CREATEBY_CUSTOMER_ACTION} from './QLNhanVien.Reducer';

import Utilities from 'utils/Utilities';
import {ManagerAPI} from 'services/Manager.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {ICreateByState} from '.';
import {IStaffModel} from 'models/Staff.Model';

function* getListNhanVien() {
  try {
    const limit = 10;
    const rootState: RootState = yield select();
    const skip = rootState.QLNhanVienReducer.arrStaffs?.length;
    const isRefresh = rootState.QLNhanVienReducer.isRefresh;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    const response: IResponse<IStaffModel[]> = yield call(() =>
      ManagerAPI.getListStaffs({limit: limit, skip: skipTmp})
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<ICreateByState>>({
        type: CREATEBY_CUSTOMER_ACTION.SUCCESS,
        payload: {
          arrStaffs: response.data,
          isStop: lengthData < limit
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ICreateByState>>({
        type: CREATEBY_CUSTOMER_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<ICreateByState>>({
      type: CREATEBY_CUSTOMER_ACTION.FAIL
    });
  }
}

function* getAllNhanVien() {
  try {
    const limit = 1000;
    const skip = 0;
    const statuses = 'active';

    const response: IResponse<IStaffModel[]> = yield call(() =>
      ManagerAPI.getListStaffs({limit: limit, skip: skip, statuses})
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<ICreateByState>>({
        type: CREATEBY_CUSTOMER_ACTION.SUCCESS,
        payload: {
          arrStaffs: response.data,
          isStop: lengthData < limit
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ICreateByState>>({
        type: CREATEBY_CUSTOMER_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<ICreateByState>>({
      type: CREATEBY_CUSTOMER_ACTION.FAIL
    });
  }
}

export function* watchListNhanVien() {
  yield takeLatest(CREATEBY_CUSTOMER_ACTION.GET, getListNhanVien);
}

export function* watchAllNhanVien() {
  yield takeLatest(CREATEBY_CUSTOMER_ACTION.GET_ALL, getAllNhanVien);
}
