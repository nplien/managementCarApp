import {takeLatest, put, select} from 'redux-saga/effects';
import {IOrderRequest, OrderAPI} from 'services/Order.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {ORDER_ACTION} from './Order.Reducer';
import {OrderModel} from 'models/Order.Model';
import {IResponse} from 'services/ClientAPI';
import {IOrderState} from '.';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN} from 'configs/FilterConfig';

function* getListOrderSaga() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();

    let params: IOrderRequest = {
      skip: rootState.OrderReducer.isRefresh ? 0 : rootState.OrderReducer.arrOrder?.length || 0,
      limit: 10,
      types: 'order'
    };

    const orderSort = rootState.OrderReducer.orderSort;
    const arrStoreOrder = rootState.OrderReducer.arrStoreOrder;

    let orderFilterDate = rootState.OrderReducer.orderFilterDate;
    let convertOrderFilterDate = rootState.OrderReducer.convertOrderFilterDate;

    const code = rootState.OrderReducer.code;
    const note = rootState.OrderReducer.note;
    const customer = rootState.OrderReducer.customer;
    const receiver = rootState.OrderReducer.receiver;
    const product_sku = rootState.OrderReducer.product_sku;
    const product_name = rootState.OrderReducer.product_name;

    let arrCurrentStatus = rootState.OrderReducer.arrCurrentStatusDH;

    let channels = rootState.OrderReducer.channels;
    let arrPTTTDaChon = rootState.OrderReducer.arrPTTTDaChon;

    // const {types} = rootState.OrderReducer;
    if (orderSort) {
      params.sort_by = orderSort?.sort_by;
      params.order_by = orderSort?.order_by;
    }

    /* ngay tao phieu */
    if (orderFilterDate) {
      let dateQuery: any = {} as IDateRange;
      if (orderFilterDate.id === 'TUY_CHON') {
        dateQuery = convertOrderFilterDate;
      } else {
        dateQuery = Utilities.getDateFilter(orderFilterDate.id);
      }
      params.min_created_at = dateQuery?.dateFrom;
      params.max_created_at = dateQuery?.dateTo;
    }
    if (code) {
      params.code = code;
    }
    if (note) {
      params.note = note;
    }
    if (customer) {
      params.customer = customer;
    }
    if (receiver) {
      params.receiver = receiver;
    }
    if (product_sku) {
      params.product_sku = product_sku;
    }
    if (product_name) {
      params.product_name = product_name;
    }

    if (arrCurrentStatus && arrCurrentStatus.length > 0) {
      params.statuses = arrCurrentStatus
        .map((v: any) => {
          return v.id;
        })
        .join(',');
    }

    if (channels) {
      params.channels = channels;
    }
    if (arrPTTTDaChon?.length) {
      if (arrPTTTDaChon.length !== ARR_PT_THANHTOAN.length) {
        params.payment_methods = arrPTTTDaChon.map(x => x.method).join(',');
      }
    }

    let arrPTBHDaChon = rootState.OrderReducer.arrPTBHDaChon;
    if (arrPTBHDaChon?.length) {
      if (arrPTBHDaChon.length !== ARR_PT_BAN_HANG.length) {
        params.is_delivery = arrPTBHDaChon.map(x => String(x.isCheck)).join(',');
      }
    }

    /* danh sach chi nhanh */
    if (arrStoreOrder && arrStoreOrder.length > 0) {
      params.stores = arrStoreOrder.map((v: any) => v.id).join(',');
    }
    const response: IResponse<OrderModel[]> = yield OrderAPI.getListOrder(params);
    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IOrderState>>({
          type: ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrOrder: response.data,
            count: response.count,
            isStop: response.data.length < limit
          }
        });
      } else {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        yield put<IAppAction<IOrderState>>({
          type: ORDER_ACTION.LIST_FAIL
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IOrderState>>({
        type: ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IOrderState>>({
      type: ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchOrderSaga() {
  yield takeLatest(ORDER_ACTION.LIST, getListOrderSaga);
}
