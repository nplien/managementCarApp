import {takeLatest, call, put, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {ProductAPI} from 'services/Product.Api';
import {PRODUCT_CATEGORY_ACTION} from './ProductCategory.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {ProductOptionsModel} from 'models/Product.Model';
import {IAppAction} from 'views/app';
import {IProductcategoryState} from '.';

function* getListProductCategory() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();

    const skip = rootState.ProductCategoryReducer.arrProduct?.length;
    const isRefresh = rootState.ProductCategoryReducer.isRefresh;
    let skipTmp = skip;
    if (isRefresh) {
      skipTmp = 0;
    }

    const sortFilter = rootState.SortFilterReducer.sortFilter;
    const giaHienThi = rootState.ChangeGiaBanReducer.giaHienThi;
    let sortBy = '';
    let orderBy = '';
    if (sortFilter.sort_by !== 'price_type') {
      sortBy = sortFilter.sort_by;
    } else {
      sortBy = giaHienThi.id;
    }
    orderBy = sortFilter.order_by;
    let param: any = {
      skip: skipTmp,
      limit: limit,
      sort_by: sortBy,
      order_by: orderBy
    };

    const keyword = rootState.FilterCategoryReducer.keyword;
    if (keyword) {
      param = {...param, keyword: keyword};
    }

    const arrType = rootState.FilterCategoryReducer.arrType;
    if (arrType && arrType.length > 0) {
      let arrTmp: string[] = [];
      for (let index = 0; index < arrType.length; index++) {
        const element = arrType[index];
        arrTmp.push(element.value);
      }
      param = {...param, types: arrTmp.join(',')};
    }

    const arrCate = rootState.FilterCategoryReducer.arrCate;
    if (arrCate && arrCate.length > 0) {
      let arrTmp: number[] = [];
      for (let index = 0; index < arrCate.length; index++) {
        const element = arrCate[index];
        arrTmp.push(element.id);
      }
      param = {...param, categories: arrTmp.join(',')};
    }

    const tonKho = rootState.FilterCategoryReducer.tonKho;
    if (tonKho.value > -1) {
      param = {...param, stock_value: tonKho.value};
    }

    const banTrucTiep = rootState.FilterCategoryReducer.banTrucTiep;
    if (banTrucTiep.value !== undefined) {
      if (banTrucTiep.value) {
        param = {...param, is_visible: true};
      } else {
        param = {...param, is_visible: false};
      }
    }

    const hienThi = rootState.FilterCategoryReducer.hienThi;
    if (hienThi.value !== undefined) {
      if (hienThi.value) {
        param = {...param, statuses: hienThi.value};
      }
    }
    param = {
      ...param,
      stock_id: rootState.ChooseStoreReducer.cuaHangDangChon?.id || 1
    };
    const response: IResponse<ProductOptionsModel[]> = yield call(() =>
      ProductAPI.getListProductOptions(param)
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IProductcategoryState>>({
        type: PRODUCT_CATEGORY_ACTION.SUCCESS,
        payload: {
          arrProduct: response.data,
          isStop: lengthData < limit,
          count: response.count
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IProductcategoryState>>({
        type: PRODUCT_CATEGORY_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IProductcategoryState>>({
      type: PRODUCT_CATEGORY_ACTION.FAIL
    });
  }
}

export function* watchListProductCategory() {
  yield takeLatest(PRODUCT_CATEGORY_ACTION.GET, getListProductCategory);
}
