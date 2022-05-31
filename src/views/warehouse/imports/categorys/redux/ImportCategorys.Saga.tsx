import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {IMPORT_CATEGORY_ACTION} from './ImportCategorys.Reducer';
import {CategoryApi, ICategoryRequest} from 'services/Category.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICategoryModel} from 'models/Category.Model';
import {MY_SIZE} from 'bases/styles/Core';
import {IManagerRequest, ManagerAPI} from 'services/Manager.Api';
import {IResponse} from 'services/ClientAPI';
import {IBrands} from 'models/Brands.Model';
import {IAppAction} from 'views/app';
import {IImportCateReducerState} from '.';

function lamPhangDanhMuc(arrChaCon: ICategoryModel[], arrPhang: ICategoryModel[], dem: number) {
  dem++;
  for (let i = 0; i < arrChaCon.length; i++) {
    let element = arrChaCon[i];
    element = {...element, padding: MY_SIZE.s_16 * dem};
    arrPhang.push(element);
    lamPhangDanhMuc(element.children, arrPhang, dem);
  }
}

function* getListImportCate() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();
    const skip = rootState.ImportCateReducer.count || 0;
    const isRefresh = rootState.ImportCateReducer.isRefresh;
    let keywordCate = rootState.ImportCateReducer.keywordCate;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    let param: ICategoryRequest = {
      skip: skipTmp,
      limit: limit,
      nested: true
    };
    if (keywordCate) {
      param.keyword = keywordCate;
    }

    const response: IResponse<ICategoryModel[]> = yield CategoryApi.getListCategory(param);
    if (!response.code) {
      let lengthData = response.data.length || 0;
      let output: ICategoryModel[] = [];

      lamPhangDanhMuc(response.data, output, 0);

      yield put({
        type: IMPORT_CATEGORY_ACTION.SUCCESS,
        payload: {
          arrImportCateReducer: output,
          isStop: lengthData < limit,
          count: skip + lengthData
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: IMPORT_CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: IMPORT_CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchListImportCate() {
  yield takeLatest(IMPORT_CATEGORY_ACTION.GET, getListImportCate);
}

function* getListBrand() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();
    let keywordBrands = rootState.ImportCateReducer.keywordBrands;

    let param: IManagerRequest = {
      skip: rootState.ImportCateReducer.isRefresh
        ? 0
        : rootState.ImportCateReducer.arrBrands?.length || 0,
      limit: limit
    };
    if (keywordBrands) {
      param.keyword = keywordBrands;
    }

    const response: IResponse<IBrands[]> = yield call(() => ManagerAPI.getListBrands(param));
    if (!response.code) {
      let lengthData = response.data.length || 0;

      yield put<IAppAction<IImportCateReducerState>>({
        type: IMPORT_CATEGORY_ACTION.BRANSD_SUCCESS,
        payload: {
          arrBrands: response.data,
          isStop: lengthData < limit,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IImportCateReducerState>>({
        type: IMPORT_CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IImportCateReducerState>>({
      type: IMPORT_CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchListBrands() {
  yield takeLatest(IMPORT_CATEGORY_ACTION.GET_BRANDS, getListBrand);
}
