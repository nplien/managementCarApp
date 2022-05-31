import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {EXPORT_CATEGORY_ACTION} from './ExportCategorys.Reducer';
import {CategoryApi} from 'services/Category.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICategoryModel} from 'models/Category.Model';
import {MY_SIZE} from 'bases/styles/Core';
import {IManagerRequest, ManagerAPI} from 'services/Manager.Api';
import {IRequestCate, IBrands} from 'models/Brands.Model';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {IExportCateReducerState} from '.';

function lamPhangDanhMuc(arrChaCon: ICategoryModel[], arrPhang: ICategoryModel[], dem: number) {
  dem++;
  for (let i = 0; i < arrChaCon.length; i++) {
    let element = arrChaCon[i];
    element = {...element, padding: MY_SIZE.s_16 * dem};
    arrPhang.push(element);
    lamPhangDanhMuc(element.children, arrPhang, dem);
  }
}
function* getListExportCate() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();
    const skip: number | any = rootState.ExportCateReducer.count;
    const isRefresh = rootState.ExportCateReducer.isRefresh;
    const keyword = rootState.ExportCateReducer.keyword;
    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    let param: IRequestCate = {
      skip: skipTmp,
      limit: limit,
      nested: true
    };

    if (keyword) {
      param = {...param, keyword: keyword};
    }
    const response: IResponse<any> = yield call(() => CategoryApi.getListCategory(param));
    if (!response.code) {
      let lengthData = response.data.length || 0;
      let output: ICategoryModel[] = [];

      lamPhangDanhMuc(response.data, output, 0);

      yield put({
        type: EXPORT_CATEGORY_ACTION.SUCCESS,
        payload: {
          arrExportCateReducer: output,
          isStop: lengthData < limit,
          count: skip + lengthData
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: EXPORT_CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: EXPORT_CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchListExportCate() {
  yield takeLatest(EXPORT_CATEGORY_ACTION.GET, getListExportCate);
}

function* getListBrand() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();
    let keywordBrands = rootState.ExportCateReducer.keywordBrands;

    let param: IManagerRequest = {
      skip: rootState.ExportCateReducer.isRefresh
        ? 0
        : rootState.ExportCateReducer.arrBrands?.length || 0,
      limit: limit
    };
    if (keywordBrands) {
      param.keyword = keywordBrands;
    }

    const response: IResponse<IBrands[]> = yield call(() => ManagerAPI.getListBrands(param));
    if (!response.code) {
      let lengthData = response.data.length || 0;

      yield put<IAppAction<IExportCateReducerState>>({
        type: EXPORT_CATEGORY_ACTION.BRANSD_SUCCESS,
        payload: {
          arrBrands: response.data,
          isStop: lengthData < limit,
          count: response.data.length
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: EXPORT_CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: EXPORT_CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchExportListBrands() {
  yield takeLatest(EXPORT_CATEGORY_ACTION.GET_BRANDS, getListBrand);
}
