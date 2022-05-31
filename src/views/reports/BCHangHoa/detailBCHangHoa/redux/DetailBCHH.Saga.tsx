import {takeLatest, put, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {IDateRange, IAppAction} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {DETAIL_BCHH_ACTION} from './DetailBCHH.Reducer';
import {IDetailBCHHState} from './DetailBCHH.Types';
import {IResponse} from 'services/ClientAPI';
import {DashBoardApi, IBCSPRequest} from 'services/DashBoard.Api';
import {IBCSPModel, ISumBCSPModel} from 'models/DashBoard.Model';
import {getListDetailBCHH} from '.';

function* getListDetailBCHHSaga(action: ReturnType<typeof getListDetailBCHH>) {
  try {
    let rootState: RootState = yield select();

    let thoiGianLocDetailBCHH = rootState.DetailBCHHReducer.thoiGianLocDetailBCHH;
    let khoangThoiGianDetailBCHH = rootState.DetailBCHHReducer.khoangThoiGianDetailBCHH;

    let currentSort = rootState.DetailBCHHReducer.currentSortDetailBCHH;
    let arrStoreDetailBCHH = rootState.DetailBCHHReducer.arrStoreDetailBCHH;
    let arrStorePersonalInvoice = rootState.PersonalReducer.infoPersonal?.stores;

    const keyword = rootState.DetailBCHHReducer.keyword;

    let statusDetailBCHH = rootState.DetailBCHHReducer.statuses;

    let categoryDetail = rootState.DetailBCHHReducer.categories;
    let stock = rootState.DetailBCHHReducer.stock;
    let typeDetail = rootState.DetailBCHHReducer.type;

    const {type, category, KeyWord} = rootState.BCHangHoaReducer;

    let params: IBCSPRequest = {
      skip: rootState.DetailBCHHReducer.isRefresh
        ? 0
        : rootState.DetailBCHHReducer.arrDetailBCHH?.length || 0,
      limit: 10,
      view: action.params.view,
      sort_by: action.params.sort_by,
      order_by: 'desc'
    };

    /* ngay tao phieu */
    if (thoiGianLocDetailBCHH) {
      let dateQuery: any = {} as IDateRange;
      if (thoiGianLocDetailBCHH.id === 'TUY_CHON') {
        dateQuery = khoangThoiGianDetailBCHH;
      } else {
        dateQuery = Utilities.getDateFilter(thoiGianLocDetailBCHH.id);
      }

      params.min_created_at_day = dateQuery?.dateFrom;
      params.max_created_at_day = dateQuery?.dateTo;
    }
    /* sap xep */
    if (currentSort) {
      params.order_by = currentSort?.order_by;
    }
    // Tìm kiếm list theo từ key
    if (keyword) {
      params.keyword = keyword;
    }
    // tìm kiếm theo trạng thái
    if (statusDetailBCHH && statusDetailBCHH !== undefined) {
      params.statuses = statusDetailBCHH;
    }

    if (categoryDetail) {
      params.categories = categoryDetail.id;
    }
    if (stock) {
      params.stock = stock;
    }

    /* danh sach chi nhanh */
    if (arrStoreDetailBCHH && arrStoreDetailBCHH.length > 0) {
      params.stores = arrStoreDetailBCHH.map((v: any) => v.id).join(',');
    } else {
      params.stores = arrStorePersonalInvoice?.map((v: any) => v.id).join(',');
    }

    if (KeyWord && KeyWord?.length > 0) {
      params.keyword = KeyWord;
    }
    if (category) {
      params.category = category.id;
    }
    if (typeDetail && typeDetail.length > 0) {
      let mapType = typeDetail.map((v: any) => v.value);
      params.types = mapType.join(',');
    } else if (type && type.length > 0) {
      let mapType = type.map((v: any) => v.value);
      params.types = mapType.join(',');
    }
    let response: IResponse<IBCSPModel[], ISumBCSPModel> = yield DashBoardApi.getBaoCaoSanPham(
      params
    );
    if (response && !response.code) {
      if (response.data) {
        const currentLimit = params?.limit ? params.limit : 0;
        yield put<IAppAction<IDetailBCHHState>>({
          type: DETAIL_BCHH_ACTION.LIST_SUCCESS,
          payload: {
            arrDetailBCHH: response.data,
            sumDetailBCHH: response.sum,
            count: response.count,
            isStop: response.data.length < currentLimit
          }
        });
      } else {
        yield put<IAppAction<IDetailBCHHState>>({
          type: DETAIL_BCHH_ACTION.LIST_FAIL
        });
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IDetailBCHHState>>({
        type: DETAIL_BCHH_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IDetailBCHHState>>({
      type: DETAIL_BCHH_ACTION.LIST_FAIL
    });
  }
}
export function* watchDetailBCHHSaga() {
  yield takeLatest(DETAIL_BCHH_ACTION.LIST, getListDetailBCHHSaga);
}
