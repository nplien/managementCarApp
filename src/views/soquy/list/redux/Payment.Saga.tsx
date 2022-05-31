import {takeLatest, put, select} from 'redux-saga/effects';
import {IRequestSoQuy, IResponseSoQuy, PaymentAPI} from 'services/Payment.Api';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {PAYMENT_ACTION} from './Payment.Reducer';
import {IPaymentState} from './Payment.Types';

function* getListPaymentSaga() {
  try {
    let rootState: RootState = yield select();
    let convertCurrentFilterDateSQ = rootState.PaymentReducer.convertCurrentFilterDateSQ;
    let arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    let arrChiNhanhDaChonSQ = rootState.PaymentReducer.arrChiNhanhDaChonSQ || [];
    let code = rootState.FilterSoQuyReducer.code;
    let note = rootState.FilterSoQuyReducer.note;
    let status = rootState.FilterSoQuyReducer.status;
    let groups = rootState.FilterSoQuyReducer.groups;
    let types = rootState.FilterSoQuyReducer.types;
    let params: IRequestSoQuy = {
      skip: rootState.PaymentReducer.isRefresh
        ? 0
        : rootState.PaymentReducer.arrPayment?.length || 0,
      limit: 10,
      min_created_at: convertCurrentFilterDateSQ?.dateFrom || '',
      max_created_at: convertCurrentFilterDateSQ?.dateTo || ''
    };

    /* tim theo ma */
    if (code) {
      params.code = code;
    }

    /* tim theo ghi chu */
    if (note) {
      params.note = note;
    }

    /* tim theo trang thai */
    if (status) {
      params.statuses = status;
    }
    /* tim theo loai thu chi */
    if (groups) {
      params.groups = groups;
    }
    /* tim theo loai thu chi */
    if (types) {
      params.types = types;
    }

    /* danh sach chi nhanh */
    if (arrChiNhanhDaChonSQ.length) {
      params.stores = arrChiNhanhDaChonSQ.map(v => v.id).join(',');
    } else {
      params.stores = arrStoreOfUser.map(v => v.id).join(',');
    }

    /** danh sach khach hang */
    let arrCustomerDaChon = rootState.FilterSoQuyReducer.arrCustomerDaChon || [];
    if (arrCustomerDaChon?.length) {
      params.partners = arrCustomerDaChon.map(x => x.id).join(',');
    }

    /** danh sach nhan vien */
    let arrStaffDaChon = rootState.FilterSoQuyReducer.arrStaffDaChon || [];
    if (arrStaffDaChon?.length) {
      params.staffs = arrStaffDaChon.map(x => x.id).join(',');
    }

    /** danh sach phuong thuc thanh toan */
    let arrPTTTDaChon = rootState.FilterSoQuyReducer.arrPTTTDaChon || [];
    if (arrPTTTDaChon.length) {
      params.methods = arrPTTTDaChon.map(v => v.method).join(',');
    }

    const response: IResponseSoQuy = yield PaymentAPI.getListPayment(params);

    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IPaymentState>>({
          type: PAYMENT_ACTION.LIST_SUCCESS,
          payload: {
            arrPayment: response.data,
            objRevenue: response.sum,
            count: response.count,
            isStop: response.data.length < params.limit
          }
        });
      } else {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        yield put<IAppAction<IPaymentState>>({
          type: PAYMENT_ACTION.LIST_FAIL
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IPaymentState>>({
        type: PAYMENT_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    yield put<IAppAction<IPaymentState>>({
      type: PAYMENT_ACTION.LIST_FAIL
    });
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
  }
}

export function* watchPaymentSaga() {
  yield takeLatest(PAYMENT_ACTION.LIST, getListPaymentSaga);
}
