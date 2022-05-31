import {takeLatest, put, select} from 'redux-saga/effects';
import {IRequestImport, WareHouseApi} from 'services/WareHouse.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {IMPORT_ORDER_ACTION} from './ImportOrder.Reducer';
import {IImportOrderState} from './ImportOrder.Types';
import {OrderIEModel} from 'models/Order.Model';
import {IResponse} from 'services/ClientAPI';

function* getListImportOrderSaga() {
  try {
    let rootState: RootState = yield select();
    let currentDateFilter = rootState.ImportOrderReducer.currentFilterDate;
    let convertCurrentFilterDate = rootState.ImportOrderReducer.convertCurrentFilterDate;

    let currentSortIP = rootState.ImportOrderReducer.currentSortIP;
    let arrStoreDaChonImport = rootState.ImportOrderReducer.arrStoreDaChonImport;
    let arrStorePersonImport = rootState.PersonalReducer.infoPersonal?.stores;

    let arrCurrentStatus = rootState.ImportOrderReducer.arrCurrentStatus;
    let created_by = rootState.ImportOrderReducer.created_by;

    let code = rootState.ImportOrderReducer.code;
    let note = rootState.ImportOrderReducer.note;
    let product_sku = rootState.ImportOrderReducer.product_sku;
    let product_name = rootState.ImportOrderReducer.product_name;

    let params: IRequestImport = {
      skip: rootState.ImportOrderReducer.isRefresh
        ? 0
        : rootState.ImportOrderReducer.arrImportOrder?.length || 0,
      limit: 10
    };
    /* ngay tao phieu */
    if (currentDateFilter) {
      let dateQuery: any = {} as IDateRange;
      if (currentDateFilter.id === 'TUY_CHON') {
        dateQuery = convertCurrentFilterDate;
      } else {
        dateQuery = Utilities.getDateFilter(currentDateFilter.id);
      }

      params.min_created_at = dateQuery?.dateFrom || undefined;
      params.max_created_at = dateQuery?.dateTo || undefined;
    }
    /* sap xep */
    if (currentSortIP) {
      params.sort_by = currentSortIP?.sort_by || null;
      params.order_by = currentSortIP?.order_by || null;
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
    if (note) {
      params.note = note;
    }
    if (product_sku) {
      params.product_sku = product_sku;
    }
    if (product_name) {
      params.product_name = product_name;
    }

    /* danh sach chi nhan nhap ve */
    if (arrStoreDaChonImport && arrStoreDaChonImport.length > 0) {
      params.receivers = arrStoreDaChonImport.map((v: any) => v.id).join(',');
    } else {
      params.receivers = arrStorePersonImport?.map((v: any) => v.id).join(',');
    }
    if (created_by && created_by.id) {
      params.staffs = created_by?.id.toString();
    }

    const response: IResponse<OrderIEModel[]> = yield WareHouseApi.getListImport(params);
    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IImportOrderState>>({
          type: IMPORT_ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrImportOrder: response.data,
            count: response.count,
            isStop: response.data.length < params.limit
          }
        });
      } else {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        yield put<IAppAction<IImportOrderState>>({
          type: IMPORT_ORDER_ACTION.LIST_FAIL
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IImportOrderState>>({
        type: IMPORT_ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.logException('ImportOrder.saga', error);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IImportOrderState>>({
      type: IMPORT_ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchImportOrderSaga() {
  yield takeLatest(IMPORT_ORDER_ACTION.LIST, getListImportOrderSaga);
}
