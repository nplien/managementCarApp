import {takeLatest, put, select} from 'redux-saga/effects';
import {IOrderRequest, OrderAPI} from 'services/Order.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {INVOICE_ORDER_ACTION} from './InvoiceOrder.Reducer';
import {IInvoiceOrderState} from './InvoiceOrder.Types';
import {IResponse} from 'services/ClientAPI';
import {OrderModel} from 'models/Order.Model';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN} from 'configs/FilterConfig';

function* getListInvoiceOrderSaga() {
  try {
    let rootState: RootState = yield select();

    let currentDateInvoice = rootState.InvoiceOrderReducer.currentDateInvoice;
    let convertCurrentDateInvoice = rootState.InvoiceOrderReducer.convertCurrentDateInvoice;

    let currentSort = rootState.InvoiceOrderReducer.currentSort;
    let arrStoreInvoice = rootState.InvoiceOrderReducer.arrStoreInvoice;
    let arrStorePersonalInvoice = rootState.PersonalReducer.infoPersonal?.stores;

    const code = rootState.InvoiceOrderReducer.code;
    const note = rootState.InvoiceOrderReducer.note;
    const customer = rootState.InvoiceOrderReducer.customer;
    const product_sku = rootState.InvoiceOrderReducer.product_sku;
    const product_name = rootState.InvoiceOrderReducer.product_name;
    const receiver = rootState.InvoiceOrderReducer.receiver;

    let arrCurrentStatusInvoice = rootState.InvoiceOrderReducer.arrCurrentStatusInvoice;

    let channels = rootState.InvoiceOrderReducer.channels;
    let arrPTTTDaChon = rootState.InvoiceOrderReducer.arrPTTTDaChon;
    let arrStaffDaChonInvoice = rootState.InvoiceOrderReducer.arrStaffDaChonInvoice;
    let locationDaChon = rootState.InvoiceOrderReducer.locationDaChon;
    // let created_by = rootState.FilterInvoiceReducer.created_by;

    const {types} = rootState.InvoiceOrderReducer;
    let params: IOrderRequest = {
      skip: rootState.InvoiceOrderReducer.isRefresh
        ? 0
        : rootState.InvoiceOrderReducer.arrInvoiceOrder?.length || 0,
      limit: 10,
      types: 'retail'
    };

    if (types) {
      params.types = types;
    }
    /* ngay tao phieu */
    if (currentDateInvoice && currentDateInvoice.id) {
      let dateQuery: any = {} as IDateRange;
      if (currentDateInvoice.id === 'TUY_CHON') {
        dateQuery = convertCurrentDateInvoice;
      } else {
        dateQuery = Utilities.getDateFilter(currentDateInvoice.id);
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
    if (arrCurrentStatusInvoice && arrCurrentStatusInvoice.length > 0) {
      params.statuses = arrCurrentStatusInvoice
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

    let arrPTBHDaChon = rootState.InvoiceOrderReducer.arrPTBHDaChon;
    if (arrPTBHDaChon?.length) {
      if (arrPTBHDaChon.length !== ARR_PT_BAN_HANG.length) {
        params.is_delivery = arrPTBHDaChon.map(x => String(x.isCheck)).join(',');
      }
    }

    if (arrStaffDaChonInvoice && arrStaffDaChonInvoice.length > 0) {
      params.staffs = arrStaffDaChonInvoice
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
    if (arrStoreInvoice && arrStoreInvoice.length > 0) {
      params.stores = arrStoreInvoice.map((v: any) => v.id).join(',');
    } else {
      params.stores = arrStorePersonalInvoice?.map((v: any) => v.id).join(',');
    }

    const response: IResponse<OrderModel[]> = yield OrderAPI.getListOrder(params);
    if (response && !response.code) {
      if (response.data) {
        const currentLimit = params?.limit ? params.limit : 0;
        yield put<IAppAction<IInvoiceOrderState>>({
          type: INVOICE_ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrInvoiceOrder: response.data,
            count: response.count,
            isStop: response.data.length < currentLimit
          }
        });
      } else {
        yield put<IAppAction<IInvoiceOrderState>>({
          type: INVOICE_ORDER_ACTION.LIST_FAIL
        });
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IInvoiceOrderState>>({
        type: INVOICE_ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IInvoiceOrderState>>({
      type: INVOICE_ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchInvoiceOrderSaga() {
  yield takeLatest(INVOICE_ORDER_ACTION.LIST, getListInvoiceOrderSaga);
}
