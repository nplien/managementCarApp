import {takeLatest, select, put, call, all} from 'redux-saga/effects';
import {BC_HANG_HOA_ACTION, IBCHangHoaState} from '.';
import Utilities from 'utils/Utilities';
import {DashBoardApi, IBCSPRequest, MOI_QUAN_TAM} from 'services/DashBoard.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCSPModel, ISumBCSPModel} from 'models/DashBoard.Model';
import {IResponse} from 'services/ClientAPI';
import {IAppAction, IDateRange} from 'views/app';
import {IStorePerson} from 'models/ModelBase';
function* getListBCHangHoa() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const {
      type,
      category,
      groupCategory,
      KeyWord,
      khoangThoiGian,
      thoiGianLoc,
      arrChiNhanhDaChonBCHH
    } = rootState.BCHangHoaReducer;
    let arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    let dateQuery: any = {} as IDateRange;
    if (thoiGianLoc) {
      if (thoiGianLoc.id === 'TUY_CHON') {
        dateQuery = khoangThoiGian;
      } else {
        dateQuery = Utilities.getDateFilter(thoiGianLoc.id);
      }
    }
    /* ####################### Bắt đầu xử lý Data #####################*/
    let tongSoSanPham = 0;
    let tongGiaTriSanPhamTonKho = 0;
    let arrProductReportByInventory: IBCSPModel[] = [];

    let arrStoreMix: IStorePerson[] = [];

    if (arrChiNhanhDaChonBCHH?.length) {
      arrStoreMix = arrChiNhanhDaChonBCHH;
    } else {
      arrStoreMix = arrStoreOfUser;
    }

    /**NOTE lấy danh sách 10 sản phẩm theo số lượng tồn kho lớn nhất */
    let bcspToKhoRequest: IBCSPRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: dateQuery?.dateFrom,
      max_created_at_day: dateQuery?.dateTo,
      view: MOI_QUAN_TAM.GIA_TRI_KHO,
      order_by: 'desc',
      sort_by: 'total_quantity_3',
      stores: arrStoreMix.map(x => x.id).join(',')
    };
    // NOTE filter BCHangHoa
    if (KeyWord && KeyWord?.length > 0) {
      bcspToKhoRequest.keyword = KeyWord;
    }
    if (groupCategory) {
      bcspToKhoRequest.group_category = groupCategory;
    }
    if (category) {
      bcspToKhoRequest.categories = category.id.toString();
    }
    if (type && type.length > 0) {
      bcspToKhoRequest.types = type.map((v: any) => v.value).join(',');
    }
    // let resultBCSPTonKho: IResponse<IBCSPModel[], ISumBCSPModel> = datafakeTon;
    // let resultBCSPTonKho: IResponse<IBCSPModel[], ISumBCSPModel> = yield call(() =>
    //   DashBoardApi.getBaoCaoSanPham(bcspToKhoRequest)
    // );
    // if (resultBCSPTonKho && resultBCSPTonKho.code === 0) {
    //   arrProductReportByInventory = resultBCSPTonKho.data;
    //   tongSoSanPham += resultBCSPTonKho.count || 0;
    //   tongGiaTriSanPhamTonKho += resultBCSPTonKho.sum?.total_quantity_3 || 0;
    // }

    /*NOTE lấy danh sách 10 sản phẩm có doanh thu cao nhất  */
    let arrProductReportByRevenue: IBCSPModel[] = [];
    let count: number = 0;
    let bcspRevenueRequest: IBCSPRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: dateQuery?.dateFrom,
      max_created_at_day: dateQuery?.dateTo,
      sort_by: 'total_value_18',
      order_by: 'desc',
      view: MOI_QUAN_TAM.LOI_NHUAN,
      stores: arrStoreMix.map(x => x.id).join(',')
    };
    if (KeyWord && KeyWord?.length > 0) {
      bcspRevenueRequest.keyword = KeyWord;
    }
    if (groupCategory) {
      bcspRevenueRequest.group_category = groupCategory;
    }
    if (category) {
      bcspRevenueRequest.categories = category.id.toString();
    }
    if (type && type.length > 0) {
      let mapType = type.map((v: any) => v.value);
      bcspRevenueRequest.types = mapType.join(',');
    }
    // let resultBCSPRevenue: IResponse<IBCSPModel[], ISumBCSPModel> = datafake;
    // let resultBCSPRevenue: IResponse<IBCSPModel[], ISumBCSPModel> =
    //   yield DashBoardApi.getBaoCaoSanPham(bcspRevenueRequest);
    // if (resultBCSPRevenue && resultBCSPRevenue.code === 0) {
    //   arrProductReportByRevenue = resultBCSPRevenue.data;
    //   count = resultBCSPRevenue.count ? resultBCSPRevenue.count : 0;
    // }
    /*NOTE lấy danh sách 10 sản phẩm có lợi nhuận */
    let arrProductReportByProfit: IBCSPModel[] = [];
    let bcspProfitRequest: IBCSPRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: dateQuery?.dateFrom,
      max_created_at_day: dateQuery?.dateTo,
      view: MOI_QUAN_TAM.LOI_NHUAN,
      order_by: 'desc',
      stores: arrStoreMix.map(x => x.id).join(',')
    };
    if (KeyWord && KeyWord?.length > 0) {
      bcspProfitRequest.keyword = KeyWord;
    }
    if (groupCategory) {
      bcspProfitRequest.group_category = groupCategory;
    }
    if (category) {
      bcspProfitRequest.categories = category.id.toString();
    }
    if (type && type.length > 0) {
      let mapType = type.map((v: any) => v.value);
      bcspProfitRequest.types = mapType.join(',');
    }
    // let resultBCSPProfit: IResponse<IBCSPModel[], ISumBCSPModel> = yield call(() =>
    //   DashBoardApi.getBaoCaoSanPham(bcspProfitRequest)
    // );
    // if (resultBCSPProfit && resultBCSPProfit.code === 0) {
    //   arrProductReportByProfit = resultBCSPProfit.data;
    // }

    /*NOTE lấy danh sách 10 sản phẩm có giá trị kho */
    let arrBCHangHoaByWarehouse: IBCSPModel[] = [];
    let bcspWarehouseRequest: IBCSPRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: dateQuery?.dateFrom,
      max_created_at_day: dateQuery?.dateTo,
      view: MOI_QUAN_TAM.GIA_TRI_KHO,
      sort_by: 'total_value_14',
      order_by: 'desc',
      stores: arrStoreMix.map(x => x.id).join(',')
    };
    if (KeyWord && KeyWord?.length > 0) {
      bcspWarehouseRequest.keyword = KeyWord;
    }
    if (groupCategory) {
      bcspWarehouseRequest.group_category = groupCategory;
    }
    if (category) {
      bcspWarehouseRequest.categories = category.id.toString();
    }
    if (type && type.length > 0) {
      let mapType = type.map((v: any) => v.value);
      bcspWarehouseRequest.types = mapType.join(',');
    }

    const [BCSPWarehouse, BCReportByProfit, BCReportByInventory, BCReportByRevenue]: IResponse<
      IBCSPModel[],
      ISumBCSPModel
    >[] = yield all([
      call(() => DashBoardApi.getBaoCaoSanPham(bcspWarehouseRequest)),
      call(() => DashBoardApi.getBaoCaoSanPham(bcspProfitRequest)),
      call(() => DashBoardApi.getBaoCaoSanPham(bcspToKhoRequest)),
      call(() => DashBoardApi.getBaoCaoSanPham(bcspRevenueRequest))
    ]);
    //  check arr giá trị kho
    if (BCSPWarehouse && BCSPWarehouse.code === 0) {
      arrBCHangHoaByWarehouse = BCSPWarehouse.data;
    }
    // check arr lợi nhuận
    if (BCReportByProfit && BCReportByProfit.code === 0) {
      arrProductReportByProfit = BCReportByProfit.data;
    }
    // check arr tồn kho
    if (BCReportByInventory && BCReportByInventory.code === 0) {
      arrProductReportByInventory = BCReportByInventory.data;
      tongSoSanPham += BCReportByInventory.count || 0;
      tongGiaTriSanPhamTonKho += BCReportByInventory.sum?.total_quantity_3 || 0;
    }
    // check arr doanh thu
    if (BCReportByRevenue && BCReportByRevenue.code === 0) {
      arrProductReportByRevenue = BCReportByRevenue.data;
      count = BCReportByRevenue.count ? BCReportByRevenue.count : 0;
    }
    // let resultBCSPWarehouse: IResponse<IBCSPModel[], ISumBCSPModel> = yield call(() =>
    //   DashBoardApi.getBaoCaoSanPham(bcspWarehouseRequest)
    // );
    // if (resultBCSPWarehouse && resultBCSPWarehouse.code === 0) {
    //   arrBCHangHoaByWarehouse = resultBCSPWarehouse.data;
    // }

    Utilities.showHideRootLoading(false);
    yield put<IAppAction<IBCHangHoaState>>({
      type: BC_HANG_HOA_ACTION.SUCCESS,
      payload: {
        arrBCHangHoaRevenue: arrProductReportByRevenue,
        arrBCHangHoaByInventory: arrProductReportByInventory,
        arrBCHangHoaByWarehouse: arrBCHangHoaByWarehouse,
        arrBCHangHoaByProfit: arrProductReportByProfit,
        totalProduct: tongSoSanPham,
        totalProductValueInventory: tongGiaTriSanPhamTonKho,
        count: count
      }
    });
  } catch (error) {
    if (__DEV__) console.log(error);
    Utilities.showHideRootLoading(false);
    yield put({
      type: BC_HANG_HOA_ACTION.FAIL
    });
  }
}

export function* watchListBCHangHoa() {
  yield takeLatest(BC_HANG_HOA_ACTION.GET, getListBCHangHoa);
}
