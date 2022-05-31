import {takeLatest, put, select} from 'redux-saga/effects';
import {IRequestExport, WareHouseApi} from 'services/WareHouse.Api';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {EXPORT_ORDER_ACTION} from './ExportOrder.Reducer';
import {IExportOrderState} from './ExportOrder.Types';
import {IResponse} from 'services/ClientAPI';
import {IExportModel} from 'models/ExportOrder.Model';

function* getListExportOrderSaga() {
  try {
    let rootState: RootState = yield select();
    let currentDateExport = rootState.ExportOrderReducer.currentDateExport;
    let convertCurrentDateExport = rootState.ExportOrderReducer.convertCurrentDateExport;
    let currentSort = rootState.ExportOrderReducer.currentSort;

    let code = rootState.ExportOrderReducer.code;
    let product_sku = rootState.ExportOrderReducer.product_sku;
    let product_name = rootState.ExportOrderReducer.product_name;

    let arrCurrentStatus = rootState.ExportOrderReducer.arrCurrentStatus;
    let is_match = rootState.ExportOrderReducer.is_match;

    let isChuyenDi = rootState.ExportOrderReducer.isChuyenDi;
    let isNhapVe = rootState.ExportOrderReducer.isNhapVe;
    let arrStoreChuyenDi = rootState.ExportOrderReducer.arrStoreChuyenDi;
    let arrStoreNhapVe = rootState.ExportOrderReducer.arrStoreNhapVe;

    let currentTimeNgayNhan = rootState.ExportOrderReducer.currentTimeNgayNhan;
    let convertCurrentTimeNgayNhan = rootState.ExportOrderReducer.convertCurrentTimeNgayNhan;

    let arrOwerType: any[] = [];

    let params: IRequestExport = {
      skip: rootState.ExportOrderReducer.isRefresh
        ? 0
        : rootState.ExportOrderReducer.arrExportOrder?.length || 0,
      limit: 10,
      types: 'transfer'
    };

    /* ngay tao phieu */
    if (currentDateExport) {
      let dateQuery: any = {} as IDateRange;
      if (currentDateExport.id === 'TUY_CHON') {
        dateQuery = convertCurrentDateExport;
      } else {
        dateQuery = Utilities.getDateFilter(currentDateExport.id);
      }

      params.min_confirmed_at = dateQuery?.dateFrom;
      params.max_confirmed_at = dateQuery?.dateTo;
    }

    /* sap xep */
    if (currentSort) {
      params.sort_by = currentSort?.sort_by;
      params.order_by = currentSort?.order_by;
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
    if (product_sku) {
      params.product_sku = product_sku;
    }
    /* tim theo ma */
    if (product_name) {
      params.product_name = product_name;
    }

    /* chon chi nhan chuyen di */
    if (isChuyenDi) {
      params.is_receiver = isChuyenDi;
    }

    /* chon chi nhanh nhap ve */
    if (isNhapVe) {
      params.is_sender = isNhapVe;
    }

    /* danh sach chi nhan chuyen di */
    if (arrStoreChuyenDi) {
      params.receivers = arrStoreChuyenDi.map((v: any) => v.id).join(',');
    }

    /* danh sach chi nhan nhap ve */
    if (arrStoreNhapVe) {
      params.senders = arrStoreNhapVe.map((v: any) => v.id).join(',');
    }

    /* join OwnerType */
    if (arrOwerType.length > 0) {
      params.owner_types = arrOwerType.join(',');
    }

    /* chon chi nhanh nhap ve */
    if (is_match && is_match.isCheck !== undefined) {
      params.is_match = is_match.isCheck;
    }

    /* ngay Hoàn thành */
    if (currentTimeNgayNhan && currentTimeNgayNhan.id !== 'TOAN_THOI_GIAN') {
      let dateQuery: any = {} as IDateRange;
      if (currentTimeNgayNhan.id === 'TUY_CHON') {
        dateQuery = convertCurrentTimeNgayNhan;
      } else {
        dateQuery = Utilities.getDateFilter(currentTimeNgayNhan.id);
      }

      params.min_completed_at = dateQuery?.dateFrom || undefined;
      params.max_completed_at = dateQuery?.dateTo || undefined;
    }

    const response: IResponse<IExportModel[]> = yield WareHouseApi.getListExport(params);
    if (response && !response.code) {
      if (response.data) {
        yield put<IAppAction<IExportOrderState>>({
          type: EXPORT_ORDER_ACTION.LIST_SUCCESS,
          payload: {
            arrExportOrder: response.data,
            count: response.count,
            isStop: response.data.length < params.limit
          }
        });
      } else {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        yield put<IAppAction<IExportOrderState>>({
          type: EXPORT_ORDER_ACTION.LIST_FAIL
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IExportOrderState>>({
        type: EXPORT_ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.logException('Exportorder.Saga', error);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IExportOrderState>>({
      type: EXPORT_ORDER_ACTION.LIST_FAIL
    });
  }
}
export function* watchExportOrderSaga() {
  yield takeLatest(EXPORT_ORDER_ACTION.LIST, getListExportOrderSaga);
}
