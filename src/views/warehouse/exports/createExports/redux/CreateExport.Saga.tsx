import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {CREATE_EXPORT_ACTION} from './CreateExport.Reducer';
import {ProductAPI} from 'services/Product.Api';
import {IProductModelRequest, ProductModel} from 'models/Product.Model';
import {IResponse} from 'services/ClientAPI';
function* getListCreate() {
  try {
    const rootState: RootState = yield select();
    const {brands, cate} = rootState.ExportCateReducer;
    let param: IProductModelRequest = {skip: 0, limit: 500};
    if (brands) {
      param.attributes = '1000:' + brands;
    }
    if (cate && cate.id) {
      param.categories = cate?.id.toString();
    }
    const response: IResponse<ProductModel[]> = yield call(() =>
      ProductAPI.getListProductOptions(param)
    );
    if (response && response.code === 0) {
      yield put({
        type: CREATE_EXPORT_ACTION.SUCCESS,
        payload: {
          arrExport: response.data
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: CREATE_EXPORT_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: CREATE_EXPORT_ACTION.FAIL
    });
  }
}

export function* watchExportListCreate() {
  yield takeLatest(CREATE_EXPORT_ACTION.GET_LIST_CREATE, getListCreate);
}
