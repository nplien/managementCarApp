import {takeLatest, call, put, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {ProductAPI} from 'services/Product.Api';
import {ADD_IMPORT_ORDER_ACTION} from './AddImport.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {IProductModelRequest, IProductSale} from 'models/Product.Model';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {IAddImportOrderState} from './AddImport.Types';

function* getListProductImport() {
  Utilities.showHideRootLoading(true);
  try {
    const rootState: RootState = yield select();

    let params: IProductModelRequest | any = {
      skip: 0,
      limit: 500
    };

    const categories = rootState.ImportCateReducer.cate;
    if (categories) {
      params.categories = categories.id.toString();
    }
    const brands = rootState.ImportCateReducer.brands;
    if (brands) {
      params.attributes = `1000:${brands}`;
    }
    const response: IResponse<IProductSale[]> = yield call(() =>
      ProductAPI.getListProductOptions(params)
    );
    if (!response.code) {
      Utilities.showHideRootLoading(false);
      yield put<IAppAction<IAddImportOrderState>>({
        type: ADD_IMPORT_ORDER_ACTION.SUCCESS,
        payload: {
          arrProductImport: response.data,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      Utilities.showHideRootLoading(false);
      yield put({
        type: ADD_IMPORT_ORDER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: ADD_IMPORT_ORDER_ACTION.LIST_FAIL
    });
  }
}

export function* watchListProductImport() {
  yield takeLatest(ADD_IMPORT_ORDER_ACTION.GET_LIST, getListProductImport);
}
