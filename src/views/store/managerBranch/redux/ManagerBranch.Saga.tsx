import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {MANAGER_BRANCH_ACTION} from './ManagerBranch.Reducer';
import {IManagerRequest, ManagerAPI} from 'services/Manager.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IStoreModel} from 'models/Store.Model';
import {IAppAction} from 'views/app';
import {IManagerBranchState} from '.';

function* getListManagerBranch() {
  try {
    const limit = 10;
    const rootState: RootState = yield select();

    let keyword = rootState.ManagerBranchReducer.keyword;
    let status = rootState.ManagerBranchReducer.status;
    let params: IManagerRequest = {
      skip: rootState.ManagerBranchReducer.isRefresh
        ? 0
        : rootState.ManagerBranchReducer.arrManagerBranch?.length || 0,
      limit: 10
    };

    // Code
    if (keyword) {
      params.keyword = keyword;
    }
    // Code
    if (status) {
      params.statuses = status;
    }

    const response: IResponse<IStoreModel[]> = yield call(() => ManagerAPI.getListStores(params));
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IManagerBranchState>>({
        type: MANAGER_BRANCH_ACTION.SUCCESS,
        payload: {
          count: response.count,
          arrManagerBranch: response.data,
          isStop: lengthData < limit
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IManagerBranchState>>({
        type: MANAGER_BRANCH_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IManagerBranchState>>({
      type: MANAGER_BRANCH_ACTION.FAIL
    });
  }
}

export function* watchListManagerBranch() {
  yield takeLatest(MANAGER_BRANCH_ACTION.GET, getListManagerBranch);
}
