import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {INVENTORY_ACTION} from './Inventory.Reducer';
import {InventoryApi} from 'services/Inventory.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {IInventoryModel} from 'models/Inventory.Model';
import {IAppAction} from 'views/app';
import {IIventoryState} from '.';

function* getListInventory() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();
    const skip = rootState.InventoryReducer.arrInventory?.length;
    const isRefresh = rootState.InventoryReducer.isRefresh;
    const store_id = rootState.ChooseStoreReducer.cuaHangDangChon?.id;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    const sortFilter = rootState.InventoryReducer.sortFilter;

    let param: any = {
      skip: skipTmp,
      limit: limit,
      stores: store_id,
      sort_by: sortFilter?.sort_by,
      order_by: sortFilter?.order_by
    };

    const arrStatus = rootState.InventoryReducer.arrStatus;
    if (arrStatus && arrStatus.length > 0) {
      let arrTmp: string[] = [];
      for (let index = 0; index < arrStatus.length; index++) {
        const element = arrStatus[index];
        arrTmp.push(element.value);
      }
      param = {...param, statuses: arrTmp.join(',')};
    }

    const keyword = rootState.InventoryReducer.keyword;
    if (keyword) {
      param = {...param, id: keyword};
    }

    const thoiGianLoc = rootState.InventoryReducer?.thoiGianLocKK;
    const khoangThoiGian = rootState.InventoryReducer?.khoangThoiGianKK;

    if (thoiGianLoc?.id !== 'TOAN_THOI_GIAN') {
      param = {
        ...param,
        min_created_at: khoangThoiGian?.dateFrom,
        max_created_at: khoangThoiGian?.dateTo
      };
    }

    const response: IResponse<IInventoryModel[]> = yield call(() =>
      InventoryApi.getListInventory(param)
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IIventoryState>>({
        type: INVENTORY_ACTION.SUCCESS,
        payload: {
          arrInventory: response.data,
          isStop: lengthData < limit,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IIventoryState>>({
        type: INVENTORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IIventoryState>>({
      type: INVENTORY_ACTION.FAIL
    });
  }
}

export function* watchListInventory() {
  yield takeLatest(INVENTORY_ACTION.GET, getListInventory);
}
