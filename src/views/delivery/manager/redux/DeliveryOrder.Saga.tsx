import {takeLatest, put, select} from 'redux-saga/effects';
import {IRequestDelivery, DeliveryApi} from 'services/Delivery.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {DELIVERY_ORDER_ACTION} from './DeliveryOrder.Reducer';
import {IDeliveryOrderState} from './DeliveryOrder.Types';
import {IResponse} from 'services/ClientAPI';
import {DeliveryModel} from 'models/Order.Model';

function* getListDeliveryOrderSaga() {
  try {
    let rootState: RootState = yield select();
    let currentDateFilter = rootState.DeliveryOrderReducer.thoiGianLoc;
    /* chi lay khi currentDate la TUY_CHON */
    let khoangThoiGian = rootState.DeliveryOrderReducer.khoangThoiGian;
    let currentSortVD = rootState.DeliveryOrderReducer.currentSortVD;
    let currentFilterTimeHT = rootState.FilterDeliveryReducer.currentFilterTimeHT;
    let convertCurrentFilterTimeHT = rootState.FilterDeliveryReducer.convertCurrentFilterTimeHT;
    let arrCurrentStatus = rootState.FilterDeliveryReducer.arrCurrentStatus;
    let code = rootState.FilterDeliveryReducer.code;
    let customer = rootState.FilterDeliveryReducer.customer;
    let order_code = rootState.FilterDeliveryReducer.order_code;
    let note = rootState.FilterDeliveryReducer.note;
    let thuTienHoCOD = rootState.FilterDeliveryReducer.thuTienHoCOD;
    let doiTacGiaohang = rootState.FilterDeliveryReducer.doiTacGiaohang;
    let provincesCity = rootState.FilterDeliveryReducer.provincesCity;

    let params: IRequestDelivery = {
      skip: rootState.DeliveryOrderReducer.isRefresh
        ? 0
        : rootState.DeliveryOrderReducer.arrDeliveryOrder?.length || 0,
      limit: 10
    };

    /* ngay tao phieu */
    if (currentDateFilter) {
      let dateQuery: any = {} as IDateRange;
      if (currentDateFilter.id === 'TUY_CHON') {
        dateQuery = khoangThoiGian;
      } else {
        dateQuery = Utilities.getDateFilter(currentDateFilter.id);
      }

      params.min_created_at = dateQuery?.dateFrom || undefined;
      params.max_created_at = dateQuery?.dateTo || undefined;
    }

    /* ngay Hoàn thành */
    if (currentFilterTimeHT && currentFilterTimeHT.id !== 'TOAN_THOI_GIAN') {
      let dateQuery: any = {} as IDateRange;
      if (currentFilterTimeHT.id === 'TUY_CHON') {
        dateQuery = convertCurrentFilterTimeHT;
      } else {
        dateQuery = Utilities.getDateFilter(currentFilterTimeHT.id);
      }

      params.min_completed_at = dateQuery?.dateFrom || undefined;
      params.max_completed_at = dateQuery?.dateTo || undefined;
    }

    /* sap xep */
    if (currentSortVD) {
      params.sort_by = currentSortVD?.sort_by;
      params.order_by = currentSortVD?.order_by;
    }

    /* tim theo trang thai */
    if (arrCurrentStatus && arrCurrentStatus.length > 0) {
      params.statuses = arrCurrentStatus
        .map((v: any) => {
          return v.id;
        })
        .join(',');
    }

    /* tim theo ma */
    if (code) {
      params.code = code;
    }
    /* tim theo ma */
    if (customer) {
      params.customer = customer;
    }
    /* tim theo ma */
    if (order_code) {
      params.order_code = order_code;
    }
    if (note) {
      params.note = note;
    }

    if (thuTienHoCOD.value !== undefined) {
      if (thuTienHoCOD.value) {
        params.is_cod_amount = true;
      } else {
        params.is_cod_amount = false;
      }
    }
    if (doiTacGiaohang) {
      params.providers = doiTacGiaohang.id;
    }

    /** khu vực */
    if (provincesCity && provincesCity.length > 0) {
      let stringProvinces: any = [];
      provincesCity.map((v: {code: any}) => {
        stringProvinces.push(v.code);
      });
      params.provinces = stringProvinces.toString();
    }
    const response: IResponse<DeliveryModel[]> = yield DeliveryApi.getListDelivery(params);
    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IDeliveryOrderState>>({
          type: DELIVERY_ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrDeliveryOrder: response.data,
            count: response.count,
            isStop: response.data.length < params.limit
          }
        });
      } else {
        yield put<IAppAction<IDeliveryOrderState>>({
          type: DELIVERY_ORDER_ACTION.LIST_FAIL
        });
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      }
    } else {
      yield put<IAppAction<IDeliveryOrderState>>({
        type: DELIVERY_ORDER_ACTION.LIST_FAIL
      });
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: DELIVERY_ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchDeliveryOrderSaga() {
  yield takeLatest(DELIVERY_ORDER_ACTION.LIST, getListDeliveryOrderSaga);
}
