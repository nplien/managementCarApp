import {put, takeLatest, call, select} from 'redux-saga/effects';
import {ManagerAPI} from 'services/Manager.Api';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {KENH_BAN_ACTION} from './KenhBan.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {IKenhBanState} from '.';
import {ChannelModel} from 'models/ManagerSetting.Model';

function* getList() {
  try {
    const limit = 100;

    const rootState: RootState = yield select();
    const skip = rootState.KenhBanReducer.arrKenhBan?.length;
    const isRefresh = rootState.KenhBanReducer.isRefresh;
    const keyword = rootState.KenhBanReducer.keyword;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    let param: any = {
      skip: skipTmp,
      limit: limit,
      attribute_code: 'order_channel'
    };

    if (keyword) {
      param = {...param, keyword};
    }

    const response: IResponse<ChannelModel[]> = yield call(() => ManagerAPI.getListChannels(param));
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IKenhBanState>>({
        type: KENH_BAN_ACTION.SUCCESS,
        payload: {
          arrKenhBan: response.data,
          isStop: lengthData < limit,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IKenhBanState>>({
        type: KENH_BAN_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IKenhBanState>>({
      type: KENH_BAN_ACTION.FAIL
    });
  }
}

export function* watchListKenhBan() {
  yield takeLatest(KENH_BAN_ACTION.GET, getList);
}
