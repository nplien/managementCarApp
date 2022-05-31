import {VoucherModel} from 'models/Voucher.Model';
import {takeLatest, put, select} from 'redux-saga/effects';
import {IRequestVoucher, VoucherAPI} from 'services/Voucher.Api';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {VOUCHER_ACTION, getDetailVoucher} from './Voucher.Reducer';
import {IVoucherState} from './Voucher.Types';
import {IResponse} from 'services/ClientAPI';
import {IAppAction, IDateRange} from 'views/app';

function* getListVoucherSaga() {
  try {
    let rootState: RootState = yield select();
    let currentFilterDateVC = rootState.VoucherReducer.currentFilterDateVC;
    let convertCurrentFilterDateVC = rootState.VoucherReducer.convertCurrentFilterDateVC;
    let arrStoreVoucher = rootState.VoucherReducer.arrStoreVoucher;
    let code = rootState.VoucherReducer.code;
    let name = rootState.VoucherReducer.name;

    let params: IRequestVoucher = {
      skip: rootState.VoucherReducer.isRefresh
        ? 0
        : rootState.VoucherReducer.arrVoucher?.length || 0,
      limit: 10,
      statuses: rootState.VoucherReducer.status || 'active'
    };
    /* ngay tao phieu */
    if (currentFilterDateVC) {
      let dateQuery: any = {} as IDateRange;
      if (currentFilterDateVC.id === 'TUY_CHON') {
        dateQuery = convertCurrentFilterDateVC;
      } else {
        dateQuery = Utilities.getDateFilter(currentFilterDateVC.id);
      }

      params.min_created_at = dateQuery?.dateFrom || undefined;
      params.max_created_at = dateQuery?.dateTo || undefined;
    }

    /* danh sach chi nhanh */
    if (arrStoreVoucher && arrStoreVoucher.length > 0) {
      params.stores = arrStoreVoucher.map((v: any) => v.id).join(',');
    }

    // Name
    if (name) {
      params.name = name;
    }

    // Code
    if (code) {
      params.code = code;
    }

    const response: IResponse<VoucherModel[]> = yield VoucherAPI.getListVouchers(params);
    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IVoucherState>>({
          type: VOUCHER_ACTION.LIST_SUCCESS,
          payload: {
            arrVoucher: response.data,
            count: response.count,
            isStop: response.data.length < params.limit
          }
        });
      } else {
        yield put<IAppAction<IVoucherState>>({
          type: VOUCHER_ACTION.LIST_FAIL
        });
      }
    } else {
      yield put<IAppAction<IVoucherState>>({
        type: VOUCHER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IVoucherState>>({
      type: VOUCHER_ACTION.LIST_FAIL
    });
  }
}
export function* watchListVoucherSaga() {
  yield takeLatest(VOUCHER_ACTION.LIST, getListVoucherSaga);
}

function* getVoucherDetailSaga(action: ReturnType<typeof getDetailVoucher>) {
  try {
    const {id} = action.payload;
    const response: IResponse<VoucherModel> = yield VoucherAPI.getDetailVouchers(id.toString());
    if (response && !response.code) {
      yield put<IAppAction<IVoucherState>>({
        type: VOUCHER_ACTION.DETAIL_SUCCESS,
        payload: {
          detailOfVoucher: response.data
        }
      });
    } else {
      yield put({
        type: VOUCHER_ACTION.DETAIL_FAIL,
        payload: {
          detailOfVoucher: null
        }
      });
      Utilities.showToast('Chi tiết Voucher', response.message || '', 'danger', 2000);
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: VOUCHER_ACTION.DETAIL_FAIL,
      payload: {
        detailOfVoucher: null
      }
    });
  }
}
export function* watchVoucherDetailSaga() {
  yield takeLatest(VOUCHER_ACTION.DETAIL, getVoucherDetailSaga);
}
