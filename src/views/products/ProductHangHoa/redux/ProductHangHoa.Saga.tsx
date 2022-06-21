import {takeLatest, call, put, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {ProductAPI} from 'services/Product.Api';
import {PRODUCT_HANG_HOA_ACTION} from './ProductHangHoa.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {IResponse} from 'services/ClientAPI';
import {ProductModel, StockProduct} from 'models/Product.Model';
import {IAppAction} from 'views/app';
import {IProductHangHoaState} from '.';
import {arrrProductNameTest} from 'views/banhang/ProductBanHang/redux/ProductNameTest';

function* getListProductHangHoa() {
  try {
    const limit = 18;

    const rootState: RootState = yield select();

    // const skip = rootState.ProductHangHoaReducer.arrProduct?.length;
    // const isRefresh = rootState.ProductHangHoaReducer.isRefresh;
    // let skipTmp = skip;
    // if (isRefresh) {
    //   skipTmp = 0;
    // }

    const sortFilter = rootState.ProductHangHoaReducer.sortFilter;
    const giaHienThi = rootState.ProductHangHoaReducer.giaHienThi;
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
      limit: limit,
      sort_by: sortBy,
      order_by: orderBy
    };

    const keyword = rootState.FilterHangHoaReducer.keyword;
    if (keyword) {
      param = {...param, keyword: keyword};
    }

    const arrType = rootState.FilterHangHoaReducer.arrType;
    if (arrType && arrType.length > 0) {
      let arrTmp: string[] = [];
      for (let index = 0; index < arrType.length; index++) {
        const element = arrType[index];
        arrTmp.push(element.value);
      }
      param = {...param, types: arrTmp.join(',')};
    }

    const arrCate = rootState.FilterHangHoaReducer.arrCate;
    if (arrCate && arrCate.length > 0) {
      let arrTmp: number[] = [];
      for (let index = 0; index < arrCate.length; index++) {
        const element = arrCate[index];
        arrTmp.push(element.id);
      }
      param = {...param, categories: arrTmp.join(',')};
    }

    const tonKho = rootState.FilterHangHoaReducer.tonKho;
    if (tonKho.value > -1) {
      param = {...param, stock_value: tonKho.value};
    }

    const banTrucTiep = rootState.FilterHangHoaReducer.banTrucTiep;
    if (banTrucTiep.value !== undefined) {
      if (banTrucTiep.value) {
        param = {...param, is_visible: true};
      } else {
        param = {...param, is_visible: false};
      }
    }

    const hienThi = rootState.FilterHangHoaReducer.hienThi;
    if (hienThi.value !== undefined) {
      if (hienThi.value) {
        param = {...param, statuses: hienThi.value};
      }
    }
    param = {
      ...param,
      stock_id: rootState.ChooseStoreReducer.cuaHangDangChon?.id || 1
    };
    const response: IResponse<ProductModel[], StockProduct> = yield call(() =>
      ProductAPI.getListProductSale(param)
    );
    if (!response.code) {
      let lengthData = response.data?.length || 0;
      response.data?.forEach((item, index) => {
        const element = arrrProductNameTest.findIndex(value => value.id === item.id);
        if (element > 1) {
          response.data[index].name = arrrProductNameTest[element].name;
          response.data[index].sku = arrrProductNameTest[element].sku || '';
        }
      });
      yield put<IAppAction<IProductHangHoaState>>({
        type: PRODUCT_HANG_HOA_ACTION.SUCCESS,
        payload: {
          arrProduct: response.data,
          isStop: lengthData < limit,
          count: lengthData,
          tong_ton_kho: Number(response.sum?.total_quantity || 0)
        }
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<IProductHangHoaState>>({
        type: PRODUCT_HANG_HOA_ACTION.FAIL
      });
    }
  } catch (error) {
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<IProductHangHoaState>>({
      type: PRODUCT_HANG_HOA_ACTION.FAIL
    });
  }
}

export function* watchListProductHangHoa() {
  yield takeLatest(PRODUCT_HANG_HOA_ACTION.GET, getListProductHangHoa);
}
