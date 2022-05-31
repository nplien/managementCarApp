import {takeLatest, put, select} from 'redux-saga/effects';
import {IOrderRequest, OrderAPI} from 'services/Order.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {RETURN_ORDER_ACTION} from './ReturnOrder.Reducer';
import {IReturnOrderState} from './ReturnOrder.Types';
import {IResponse} from 'services/ClientAPI';
import {OrderModel, SumOrderModle} from 'models/Order.Model';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN} from 'configs/FilterConfig';

function* getListReturnOrderSaga() {
  try {
    let rootState: RootState = yield select();

    let currentDateTraHang = rootState.ReturnOrderReducer.currentDateTraHang;
    let convertCurrentDateTraHang = rootState.ReturnOrderReducer.convertCurrentDateTraHang;

    let currentSort = rootState.ReturnOrderReducer.currentSort;
    let arrStoreTraHang = rootState.ReturnOrderReducer.arrStoreTraHang;
    let arrStorePersonalTraHang = rootState.PersonalReducer.infoPersonal?.stores;

    const code = rootState.ReturnOrderReducer.code;
    const note = rootState.ReturnOrderReducer.note;
    const customer = rootState.ReturnOrderReducer.customer;
    const product_sku = rootState.ReturnOrderReducer.product_sku;
    const product_name = rootState.ReturnOrderReducer.product_name;
    const receiver = rootState.ReturnOrderReducer.receiver;

    let arrCurrentStatusTraHang = rootState.ReturnOrderReducer.arrStatusTraHang;

    let channels = rootState.ReturnOrderReducer.channels;
    let arrPTTTDaChon = rootState.ReturnOrderReducer.arrPTTTDaChon;
    let arrStaffDaChonTraHang = rootState.ReturnOrderReducer.arrStaffDaChonTraHang;
    let locationDaChon = rootState.ReturnOrderReducer.locationDaChon;
    // let created_by = rootState.FilterTraHangReducer.created_by;

    const {types} = rootState.ReturnOrderReducer;
    let params: IOrderRequest = {
      skip: rootState.ReturnOrderReducer.isRefresh
        ? 0
        : rootState.ReturnOrderReducer.arrReturnOrder?.length || 0,
      limit: 10,
      types: 'return'
    };

    if (types) {
      params.types = types;
    }
    /* ngay tao phieu */
    if (currentDateTraHang) {
      let dateQuery: any = {} as IDateRange;
      if (currentDateTraHang.id === 'TUY_CHON') {
        dateQuery = convertCurrentDateTraHang;
      } else {
        dateQuery = Utilities.getDateFilter(currentDateTraHang.id);
      }

      params.min_created_at = dateQuery?.dateFrom;
      params.max_created_at = dateQuery?.dateTo;
    }

    /* sap xep */
    if (currentSort) {
      params.sort_by = currentSort?.sort_by;
      params.order_by = currentSort?.order_by;
    }
    // Tìm kiếm list theo từ key
    if (code) {
      params.code = code;
    }
    if (note) {
      params.note = note;
    }
    if (customer) {
      params.customer = customer;
    }
    if (product_sku) {
      params.product_sku = product_sku;
    }
    if (product_name) {
      params.product_name = product_name;
    }
    if (receiver) {
      params.receiver = receiver;
    }
    // tìm kiếm theo trạng thái
    if (arrCurrentStatusTraHang && arrCurrentStatusTraHang.length > 0) {
      params.statuses = arrCurrentStatusTraHang
        .map((v: any) => {
          return v.id;
        })
        .join(',');
    }
    // if (created_by) {
    //   params.created_by = created_by;
    // }
    if (channels) {
      params.channels = channels;
    }
    if (arrPTTTDaChon?.length) {
      if (arrPTTTDaChon.length !== ARR_PT_THANHTOAN.length) {
        params.payment_methods = arrPTTTDaChon.map(x => x.method).join(',');
      }
    }

    let arrPTBHDaChon = rootState.ReturnOrderReducer.arrPTBHDaChon;
    if (arrPTBHDaChon?.length) {
      if (arrPTBHDaChon.length !== ARR_PT_BAN_HANG.length) {
        params.is_delivery = arrPTBHDaChon.map(x => String(x.isCheck)).join(',');
      }
    }

    if (arrStaffDaChonTraHang && arrStaffDaChonTraHang.length > 0) {
      params.staffs = arrStaffDaChonTraHang
        .map((v: any) => {
          return v.id;
        })
        .join(',');
    }

    if (locationDaChon && locationDaChon !== undefined) {
      // params.ci
      // Khi nao API trả lời thì ghép vào
    }

    /* danh sach chi nhanh */
    if (arrStoreTraHang && arrStoreTraHang.length > 0) {
      params.stores = arrStoreTraHang.map((v: any) => v.id).join(',');
    } else {
      params.stores = arrStorePersonalTraHang?.map((v: any) => v.id).join(',');
    }

    const response: IResponse<OrderModel[], SumOrderModle> = yield OrderAPI.getListOrder(params);
    if (response && !response.code) {
      if (response.data) {
        const currentLimit = params?.limit ? params.limit : 0;
        yield put<IAppAction<IReturnOrderState>>({
          type: RETURN_ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrReturnOrder: response.data,
            count: response.count,
            isStop: response.data.length < currentLimit,
            sum: response.sum
          }
        });
      } else {
        yield put<IAppAction<IReturnOrderState>>({
          type: RETURN_ORDER_ACTION.LIST_FAIL
        });
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IReturnOrderState>>({
        type: RETURN_ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IReturnOrderState>>({
      type: RETURN_ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchReturnOrderSaga() {
  yield takeLatest(RETURN_ORDER_ACTION.LIST, getListReturnOrderSaga);
}
