import {put, takeLatest, call, select} from 'redux-saga/effects';
import {ManagerAPI} from 'services/Manager.Api';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {BANG_GIA_ACTION} from './BangGiaChung.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IBangGiaModel} from 'models/BangGia.Model';
import {IAppAction} from 'views/app';
import {IBangGiaState} from '.';

function* getList() {
  try {
    const limit = 100;

    const rootState: RootState = yield select();
    const skip = rootState.BangGiaReducer.arrBangGia?.length;
    const isRefresh = rootState.BangGiaReducer.isRefresh;
    const keyword = rootState.BangGiaReducer.keyword;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    let param: any = {
      skip: skipTmp,
      limit: limit,
      status: 'active'
    };

    if (keyword) {
      param = {...param, keyword};
    }

    const response: IResponse<IBangGiaModel[]> = yield call(() =>
      ManagerAPI.getListPriceBooks(param)
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IBangGiaState>>({
        type: BANG_GIA_ACTION.SUCCESS,
        payload: {
          arrBangGia: response.data,
          isStop: lengthData < limit,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IBangGiaState>>({
        type: BANG_GIA_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IBangGiaState>>({
      type: BANG_GIA_ACTION.FAIL
    });
  }
}

export function* watchListBangGia() {
  yield takeLatest(BANG_GIA_ACTION.GET, getList);
}
