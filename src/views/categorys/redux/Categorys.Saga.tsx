import {put, takeLatest, call, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {CATEGORY_ACTION} from './Categorys.Reducer';
import {CategoryApi} from 'services/Category.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICategoryModel} from 'models/Category.Model';
import {MY_SIZE} from 'bases/styles/Core';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {ICategoryState} from '.';

function lamPhangDanhMuc(arrChaCon: ICategoryModel[], arrPhang: ICategoryModel[], dem: number) {
  dem++;
  for (let i = 0; i < arrChaCon.length; i++) {
    let element = arrChaCon[i];
    element = {...element, padding: MY_SIZE.s_16 * dem};
    arrPhang.push(element);
    lamPhangDanhMuc(element.children, arrPhang, dem);
  }
}

function* getListCategory() {
  try {
    const limit = 1000;

    const rootState: RootState = yield select();
    const skip = rootState.CategoryReducer.count || 0;
    const keyword = rootState.CategoryReducer.keyword;
    const isRefresh = rootState.CategoryReducer.isRefresh;

    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    let param: any = {
      skip: skipTmp,
      limit: limit,
      nested: true
    };

    if (keyword) {
      param = {
        skip: skipTmp,
        limit: limit,
        nested: true,
        keyword: keyword
      };
    }

    const response: IResponse<ICategoryModel[]> = yield call(() =>
      CategoryApi.getListCategory(param)
    );
    if (!response.code) {
      let lengthData = response.data.length || 0;
      let output: ICategoryModel[] = [];

      lamPhangDanhMuc(response.data, output, 0);

      yield put<IAppAction<ICategoryState>>({
        type: CATEGORY_ACTION.SUCCESS,
        payload: {
          arrCategory: output,
          isStop: lengthData < limit,
          count: skip + lengthData
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ICategoryState>>({
        type: CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<ICategoryState>>({
      type: CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchListCategory() {
  yield takeLatest(CATEGORY_ACTION.GET, getListCategory);
}
