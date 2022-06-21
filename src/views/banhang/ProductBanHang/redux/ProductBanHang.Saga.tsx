import {takeLatest, call, put, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {ProductAPI} from 'services/Product.Api';
import {PRODUCT_BAN_HANG_ACTION} from './ProductBanHang.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {ProductOptionsModel} from 'models/Product.Model';
import {IAppAction} from 'views/app';
import {IProductBanHangState} from '.';
import {arrrProductNameTest} from './ProductNameTest';

function* getListProductBanHang() {
  try {
    const limit = 10;

    const rootState: RootState = yield select();

    // const skip = rootState.ProductBanHangReducer.arrProduct?.length;
    // const isRefresh = rootState.ProductBanHangReducer.isRefresh;
    // let skipTmp = skip;
    // if (isRefresh) {
    //   skipTmp = 0;
    // }

    const sortFilter = rootState.ProductBanHangReducer.sortFilter;
    const giaHienThi = rootState.ProductBanHangReducer.giaHienThi;
    let sortBy = '';
    let orderBy = '';
    if (sortFilter && giaHienThi) {
      if (sortFilter.sort_by !== 'price_type') {
        sortBy = sortFilter.sort_by;
      } else {
        sortBy = giaHienThi.id;
      }
      orderBy = sortFilter.order_by;
    }

    let param: any = {
      skip: 3,
      limit: 18,
      sort_by: sortBy,
      order_by: orderBy
    };

    const keyword = rootState.FilterBanHangReducer.keyword;
    if (keyword) {
      param = {...param, keyword: keyword};
    }

    const arrType = rootState.FilterBanHangReducer.arrType;
    if (arrType && arrType.length > 0) {
      let arrTmp: string[] = [];
      for (let index = 0; index < arrType.length; index++) {
        const element = arrType[index];
        arrTmp.push(element.value);
      }
      param = {...param, types: arrTmp.join(',')};
    }

    const arrCate = rootState.FilterBanHangReducer.arrCate;
    if (arrCate && arrCate.length > 0) {
      let arrTmp: number[] = [];
      for (let index = 0; index < arrCate.length; index++) {
        const element = arrCate[index];
        arrTmp.push(element.id);
      }
      param = {...param, categories: arrTmp.join(',')};
    }

    const tonKho = rootState.FilterBanHangReducer.tonKho;
    if (tonKho.value > -1) {
      param = {...param, stock_value: tonKho.value};
    }

    const banTrucTiep = rootState.FilterBanHangReducer.banTrucTiep;
    if (banTrucTiep.value !== undefined) {
      if (banTrucTiep.value) {
        param = {...param, is_visible: true};
      } else {
        param = {...param, is_visible: false};
      }
    }

    const hienThi = rootState.FilterBanHangReducer.hienThi;
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
      ProductAPI.getListProductSale(param)
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      response.data?.forEach((item, index) => {
        const element = arrrProductNameTest.findIndex(value => value.id === item.id);
        if (element > 1) {
          response.data[index].name = arrrProductNameTest[element].name;
          response.data[index].sku = arrrProductNameTest[element].sku;
        }
      });
      yield put<IAppAction<IProductBanHangState>>({
        type: PRODUCT_BAN_HANG_ACTION.SUCCESS,
        payload: {
          arrProduct: response.data,
          isStop: lengthData < limit,
          count: response.data.length
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IProductBanHangState>>({
        type: PRODUCT_BAN_HANG_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IProductBanHangState>>({
      type: PRODUCT_BAN_HANG_ACTION.FAIL
    });
  }
}

export function* watchListProductBanHang() {
  yield takeLatest(PRODUCT_BAN_HANG_ACTION.GET, getListProductBanHang);
}
