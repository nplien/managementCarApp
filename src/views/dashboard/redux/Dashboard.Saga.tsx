import {put, takeLatest, select, call} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {DASHBOARD_ACTION} from './Dashboard.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  DashBoardApi,
  IBCBHRequest,
  IBCDHRequest,
  IBCSPRequest,
  IEndOfDayReportReq,
  Top10Request
} from 'services/DashBoard.Api';
import {IAppAction} from 'views/app';
import {IDashboardState, IStoreAndColor} from '.';
import {IResponse} from 'services/ClientAPI';
import {
  // IBCBHModel,
  IBCBHModelV2,
  IBCDHModel,
  IBCSPModel,
  ISumBCBHModel,
  // ISumBCDHModel,
  ISumBCDHModelV2,
  ISumBCSPModel
} from 'models/DashBoard.Model';
import {processColor} from 'react-native';
import {ArrayColor} from 'bases/styles/Core';
import {IStorePerson} from 'models/ModelBase';
// import {fakeRes} from './dataFake';

function* getDoanhThuTheoThoiGianStackBarDashBoard() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const thoiGianLoc = rootState.DashboardReducer.thoiGianLoc;
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ########### Variable of Stack Bar Chart ############ */
    /* giá trị của mỗi phần tử trên 1 cột biểu đồ tương ứng với từng store */
    let arrValuesStackChart: any[] = []; // gia tri cua moi store
    let arrStoreColorsStackChart: any[] = []; // mau cua moi store
    /* giá trị tên và màu đại diện cho mỗi phần tử trên 1 cột biểu đồ tương ứng với từng store */
    let arrStoreAndColorStackChart: IStoreAndColor[] = [];
    let arrLabelsStackChart: any[] = []; // store
    let arrLabelTrucXStackChart: any[] = []; // time

    /* ####################### Bắt đầu xử lý Data Report #####################*/

    /*  Mỗi 1 store ứng với một ô trên 1 cột / ngày(giờ, tháng, năm). 
    xếp chồng lên nhau theo thứ tự từng store một */
    let date_time = thoiGianLoc || {type: ''};
    // let isHours: boolean = false;
    if (
      (thoiGianLoc?.id === 'TUY_CHON' || thoiGianLoc?.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian?.dateFrom &&
      khoangThoiGian?.dateTo
    ) {
      let start = new Date(khoangThoiGian?.dateFrom).getTime();
      let END = new Date(khoangThoiGian?.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay) {
        date_time.type = 'quarter';
      }
      // isHours = false;
    }
    // else {
    //   if (thoiGianLoc?.type === 'year') {
    //     isHours = false;
    //   } else if (thoiGianLoc?.type === 'quarter') {
    //     isHours = false;
    //   } else if (thoiGianLoc?.type === 'month' || thoiGianLoc?.type === 'day') {
    //     isHours = false;
    //   } else {
    //     isHours = true;
    //   }
    // }

    /* ################ BEGIN - Xử lý data cho StackBar Chart ################### */
    let mapDoanhThuTheoKhungGioCuaMoiCuaHang: any = {};
    let newMapDT: Map<number, any[]> = new Map();

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonDashBoard.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrStoreOfUser;
    }
    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

    /* For tung chi nhanh de xu ly data StackBar */
    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];

      /* Lưu mảng name & color để hiển thị view ListStore */
      let storeAndColor: IStoreAndColor = {
        id: element.id,
        name: element.name,
        color: ArrayColor[index]
      };
      arrStoreAndColorStackChart.push(storeAndColor);

      let bcbhRequest: IBCBHRequest = {
        limit: 50,
        skip: 0,
        min_created_at_day: khoangThoiGian?.dateFrom,
        max_created_at_day: khoangThoiGian?.dateTo,
        // types: 'time',
        date_time:
          date_time && date_time.type === 'month' ? 'day' : date_time ? date_time.type : '',
        stores: element.id?.toString() || ''
      };
      // let result: IResponse<IBCBHModel[], ISumBCBHModel> = fakeRes;
      let result: IResponse<IBCBHModelV2[], ISumBCBHModel> = yield DashBoardApi.getBaoCaoBanHang(
        bcbhRequest
      );

      // repose trả về theo khung giờ
      if (result && !result.code) {
        if (result.data && result.data.length) {
          let arrDataReport = result.data;

          arrDataReport.forEach(e => {
            let keyKhungGio = '';
            if (thoiGianLoc?.type === 'quarter') {
              keyKhungGio = Utilities.convertUnixTimeByFormat(e.created_at_time, 'MM/YYYY');
            } else if (thoiGianLoc?.type === 'hour') {
              keyKhungGio = Utilities.convertUnixTimeByFormat(e.created_at_time, 'HH:mm');
            } else {
              keyKhungGio = Utilities.convertUnixTimeByFormat(e.created_at_time, 'DD/MM');
            }

            let itemDoanhThuCuaHang = {
              time: keyKhungGio,
              value: Number(e.total_value_5 || 0),
              id: element.id,
              name: element.name
            };

            // ###### BEGIN new fix #####

            if (newMapDT.size) {
              if (newMapDT.has(e.created_at_time)) {
                let arr = newMapDT.get(e.created_at_time) || [];
                arr.push(itemDoanhThuCuaHang);
                newMapDT.set(e.created_at_time, arr);
              } else {
                newMapDT.set(e.created_at_time, [itemDoanhThuCuaHang]);
              }
            } else {
              newMapDT.set(e.created_at_time, [itemDoanhThuCuaHang]);
            }

            // ###### END new fix #####

            // if (Object.keys(mapDoanhThuTheoKhungGioCuaMoiCuaHang).length) {
            //   if (mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio]?.length) {
            //     mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio] = [
            //       ...mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio],
            //       itemDoanhThuCuaHang
            //     ];
            //   } else {
            //     mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio] = [itemDoanhThuCuaHang];
            //   }
            // } else {
            //   mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio] = [itemDoanhThuCuaHang];
            // }
          });
        }
      }
    }

    // ######## BEGIN sort map #####
    const sortnewMapDT = new Map([...newMapDT].sort((a, b) => a[0] - b[0]));

    sortnewMapDT.forEach((value, key) => {
      let keyKhungGio = '';
      if (thoiGianLoc?.type === 'quarter') {
        keyKhungGio = Utilities.convertUnixTimeByFormat(key, 'MM/YYYY');
      } else if (thoiGianLoc?.type === 'hour') {
        keyKhungGio = Utilities.convertUnixTimeByFormat(key, 'HH:mm');
      } else {
        keyKhungGio = Utilities.convertUnixTimeByFormat(key, 'DD/MM');
      }

      mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio] = value;
    });

    // ####### END sort map ######

    // xu ly nhung store k co doanh thu trong mapDoanhThuTheoKhungGioCuaMoiCuaHang;
    let arrKeyLebal = Object.keys(mapDoanhThuTheoKhungGioCuaMoiCuaHang);
    arrKeyLebal.forEach(khunggio => {
      let arrStoreMarker = mapDoanhThuTheoKhungGioCuaMoiCuaHang[khunggio];
      arrStoreMix.forEach(storeMix => {
        if (arrStoreMarker.findIndex((x: any) => x.id === storeMix.id) === -1) {
          let itemDoanhThuCuaHang = {
            time: khunggio,
            value: 0,
            id: storeMix.id,
            name: storeMix.name
          };
          mapDoanhThuTheoKhungGioCuaMoiCuaHang[khunggio].push(itemDoanhThuCuaHang);
        }
      });

      mapDoanhThuTheoKhungGioCuaMoiCuaHang[khunggio].sort((x: any, y: any) => x.id - y.id);
    });

    /* ############# BEGIN - loại bỏ những store cùng index có value = 0  ###########*/
    let copyMap = {...mapDoanhThuTheoKhungGioCuaMoiCuaHang};
    let arrIndexRemove: any[] = [];
    let size = arrStoreMix.length;
    for (let index = 0; index < size; index++) {
      let store = arrStoreMix[index];
      let total = 0;
      arrKeyLebal.forEach(key => {
        total += Number(mapDoanhThuTheoKhungGioCuaMoiCuaHang[key][index].value || 0);
      });

      if (total === 0) {
        arrIndexRemove.push({
          store_id: store.id,
          store_name: store.name,
          index
        });
        let indexRemoveStoreZero = arrStoreAndColorStackChart.findIndex(x => x.id === store.id);
        arrStoreAndColorStackChart.splice(indexRemoveStoreZero, 1);
      }
    }

    /* ############# END - loại bỏ những store cùng index có value = 0  ###########*/

    /* ############# BEGIN - Xu ly danh sach màu sắc và label của Stack Chart ########*/
    arrStoreAndColorStackChart.forEach(storeAndcolor => {
      // danh sach cua hang hien thi
      arrLabelsStackChart.push(storeAndcolor.name);
      // mau ung với mỗi store
      arrStoreColorsStackChart.push(processColor(storeAndcolor.color));
    });

    /* ############# END - Xu ly danh sach màu sắc và label của Stack Chart ########*/

    /* ############# BEGIN - xóa đi mảng trong mapDoanhThuTheoKhungGioCuaMoiCuaHang có những store có value = 0  ########*/
    arrKeyLebal.forEach(key => {
      let arr = copyMap[key];
      arrIndexRemove.forEach(idxRemove => {
        let i = arr.findIndex((x: any) => x.id === idxRemove.store_id);
        if (i > -1) {
          arr.splice(i, 1);
        }
      });
      copyMap[key] = arr;
    });

    /* ############# END - xóa đi mảng trong mapDoanhThuTheoKhungGioCuaMoiCuaHang có những store có value = 0  ########*/

    /* ############# BEGIN - loop theo khung gio ########*/
    let arrKeyLebalFinal = Object.keys(copyMap);
    arrKeyLebalFinal.forEach(key => {
      // if (isHours) {
      //   arrLabelTrucXStackChart.push(key + ':00');
      // } else {
      arrLabelTrucXStackChart.push(key);
      // }
      let item: {y: any[]; marker: any[]} = {y: [], marker: []};
      // lay danh sach doanh thu theo khung gio cua moi store
      copyMap[key].forEach((DTTheoStore: any) => {
        // DTTheoStore
        item.y.push(DTTheoStore.value);
        item.marker.push(
          ' ' + DTTheoStore.name + '\n ' + Utilities.convertCurrency(DTTheoStore.value)
        );
      });
      if (item.marker.length === 1) {
        item.marker = item.marker[0];
      }
      arrValuesStackChart.push(item);
    });

    /* ############# END - loop theo khung gio ########*/

    /* ################ END - Xử lý data cho StackBar Chart ################### */

    /* xu ly data va push ve bieu do tuong ung */
    let dataFormatStackBar = {
      data: {
        dataSets: [
          {
            values: arrValuesStackChart,
            label: '',
            config: {
              colors: arrStoreColorsStackChart,
              stackLabels: arrLabelsStackChart,
              drawValues: false
            }
          }
        ]
      },
      xAxis: {
        valueFormatter: arrLabelTrucXStackChart
      }
    };

    /* ####################### Kết thúc xử lý Data Report #####################*/
    // Utilities.log('----BEGIN----');

    // Utilities.log(mapDoanhThuTheoKhungGioCuaMoiCuaHang);
    // Utilities.log(copyMap);
    // Utilities.log(dataFormatStackBar);
    // Utilities.log(arrValuesStackChart);
    // Utilities.log(arrChiNhanhDaChonDashBoard);
    // Utilities.log('----END----');
    // Utilities.showHideRootLoading(false);
    // return;
    setTimeout(() => {
      Utilities.showHideRootLoading(false);
    }, 300);
    if (arrStoreAndColorStackChart.length) {
      yield put<IAppAction<IDashboardState>>({
        type: DASHBOARD_ACTION.STACK_BAR_DASHBOARD_SUCCESS,
        payload: {
          stackbarChart: dataFormatStackBar,
          arrStoreAndColorStackChart
        }
      });
    } else {
      yield put({
        type: DASHBOARD_ACTION.STACK_BAR_DASHBOARD_FAIL
      });
    }
  } catch (error) {
    if (__DEV__) console.log(error);
    Utilities.showHideRootLoading(false);
    yield put({
      type: DASHBOARD_ACTION.STACK_BAR_DASHBOARD_FAIL
    });
  }
}
/* 
Hiển thị số đặt hàng 
*/
function* getDatHang() {
  try {
    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.IS_LOADING_DATHANG,
      payload: {
        isLoadingDatHang: true
      }
    });
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrChiNhanhOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ####################### Bắt đầu xử lý Data Report #####################*/
    let tongSoHoaDonDatHang = 0;
    let tongGiaTriHoaDonDatHang = 0;
    let arrStoreRequest = [];

    let bcspRequest: IBCDHRequest = {
      limit: 1,
      skip: 0,
      min_created_at: khoangThoiGian?.dateFrom,
      max_created_at: khoangThoiGian?.dateTo,
      statuses: 'completed',
      types: 'order'
    };

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonDashBoard?.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrChiNhanhOfUser;
    }
    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];
      arrStoreRequest.push(element.id || '');
    }
    bcspRequest.stores = arrStoreRequest.join(',');

    // let result: IResponse<IBCDHModel[], ISumBCDHModel> = fakeRes;
    let result: IResponse<IBCDHModel[], ISumBCDHModelV2> = yield DashBoardApi.getBaoCaoDatHang(
      bcspRequest
    );
    if (result && !result.code) {
      tongSoHoaDonDatHang += Number(result.count || 0);
      tongGiaTriHoaDonDatHang += Number(result.sum?.total_price || 0);
    } else {
      yield put({
        type: DASHBOARD_ACTION.BCDH_FAIL
      });
    }
    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.BCDH_SUCCESS,
      payload: {
        tongSoHoaDonDatHang,
        tongGiaTriHoaDonDatHang
      }
    });
  } catch (error) {
    yield put({
      type: DASHBOARD_ACTION.BCDH_FAIL
    });
  }
}

/* Báo cáo sản phẩm */
function* getBCSP() {
  try {
    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.IS_LOADING_TON_SP,
      payload: {
        isLoadingTonKhoSP: true
      }
    });
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrChiNhanhOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ####################### Bắt đầu xử lý #####################*/
    let tongSoSanPhamTonKho = 0;
    let tongGiaTriSanPhamTonKho = 0;
    let arrStoreRequest = [];
    let strStore;

    /*  ##### BEGIN --- lấy báo cáo tồn kho ##### */

    let bcspToKhoRequest: IBCSPRequest = {
      limit: 1,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      view: 3
    };
    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonDashBoard?.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrChiNhanhOfUser;
    }
    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];
      arrStoreRequest.push(element.id || '');
    }
    strStore = arrStoreRequest.join(',');
    bcspToKhoRequest.stores = strStore;

    let resultBCSPTonKho: IResponse<IBCSPModel[], ISumBCSPModel> =
      yield DashBoardApi.getBaoCaoSanPham(bcspToKhoRequest);
    if (resultBCSPTonKho && !resultBCSPTonKho.code) {
      tongSoSanPhamTonKho += Number(resultBCSPTonKho.sum?.total_quantity_3 || 0);
      tongGiaTriSanPhamTonKho += Number(resultBCSPTonKho.sum?.total_value_26 || 0);
    }
    /*  ##### END --- lấy báo cáo tồn kho ##### */

    /*  ##### BEGIN --- lấy danh sách 10 sản phẩm có doanh thu cao nhất ##### */
    // let arrProductReportByRevenue: IBCSPModel[] = [];
    // let bcspRevenueRequest: IBCSPRequest = {
    //   limit: 10,
    //   skip: 0,
    //   min_created_at_day: khoangThoiGian?.dateFrom,
    //   max_created_at_day: khoangThoiGian?.dateTo,
    //   view: 1,
    //   sort_by: 'total_value_18',
    //   order_by: 'desc',
    //   stores: strStore
    // };

    // let resultBCSPRevenue: IResponse<IBCSPModel[], ISumBCSPModel> =
    //   yield DashBoardApi.getBaoCaoSanPham(bcspRevenueRequest);
    // if (resultBCSPRevenue && !resultBCSPRevenue.code) {
    //   arrProductReportByRevenue = resultBCSPRevenue.data;
    // }
    /*  ##### END --- lấy danh sách 10 sản phẩm có doanh thu cao nhất ##### */

    /*  ##### BEGIN --- lấy danh sách 10 sản phẩm có số lượng bán cao nhất ##### */
    // let arrProductReportByQuantity: IBCSPModel[] = [];
    // let bcspQuantityRequest: IBCSPRequest = {
    //   limit: 10,
    //   skip: 0,
    //   min_created_at_day: khoangThoiGian?.dateFrom,
    //   max_created_at_day: khoangThoiGian?.dateTo,
    //   view: 1,
    //   sort_by: 'total_quantity_1',
    //   order_by: 'desc',
    //   stores: strStore
    // };
    // // let result: IResponse<IBCBHModel[], ISumBCSPModel> = fakeRes;
    // let resultBCSPQuantity: IResponse<IBCSPModel[], ISumBCSPModel> =
    //   yield DashBoardApi.getBaoCaoSanPham(bcspQuantityRequest);
    // if (resultBCSPQuantity && !resultBCSPQuantity.code) {
    //   arrProductReportByQuantity = resultBCSPQuantity.data;
    // }

    /*  ##### END --- lấy danh sách 10 sản phẩm có số lượng bán cao nhất ##### */

    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.BCSP_SUCCESS,
      payload: {
        tongSoSanPhamTonKho,
        tongGiaTriSanPhamTonKho
        // arrProductReportByRevenue,
        // arrProductReportByQuantity
      }
    });
  } catch (error) {
    yield put({
      type: DASHBOARD_ACTION.BCSP_FAIL
    });
  }
}

function* getDoanhThuTheoStorePieChartDashBoard() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const thoiGianLoc = rootState.DashboardReducer.thoiGianLoc;
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ########### Variable of Pie Chart ############ */
    let arrValuesPieChart: any[] = []; // gia tri cua moi store
    /* giá trị màu sắc đại diện cho mỗi phần từ trên 1 cột biểu đồ tương ứng với từng store */
    let arrStoreColorsPieChart: any[] = []; // mau cua moi store
    /* giá trị tên và màu đại diện cho mỗi phần tử trên 1 cột biểu đồ tương ứng với từng store */
    let arrStoreAndColorPieChart: IStoreAndColor[] = [];
    let arrStoreAndColorPieChartTmp: IStoreAndColor[] = [];

    /* ####################### Bắt đầu xử lý Data Report #####################*/
    let tongSoHoaDonBan: number = 0;
    let tongGiaTriHoaDonBan: number = 0;
    let tongSoHoaDonTra: number = 0;
    let tongGiaTriHoaDonTra: number = 0;

    /*  Mỗi 1 store ứng với một ô trên 1 cột / ngày(giờ, tháng, năm). 
    xếp chồng lên nhau theo thứ tự từng store một */
    let date_time = thoiGianLoc || {type: ''};
    if (
      (thoiGianLoc?.id === 'TUY_CHON' || thoiGianLoc?.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian?.dateFrom &&
      khoangThoiGian?.dateTo
    ) {
      let start = new Date(khoangThoiGian?.dateFrom).getTime();
      let END = new Date(khoangThoiGian?.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay) {
        date_time.type = 'quarter';
      }
    }

    /* ################ BEGIN - Xử lý data cho StackBar Chart ################### */

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonDashBoard.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrStoreOfUser;
    }

    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

    let bcbhRequest: IBCBHRequest = {
      limit: 50,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      types: 'stores',
      date_time: date_time?.type || '',
      stores: arrStoreMix.map(x => x.id).join(',')
    };

    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];

      /* Lưu mảng name & color để hiển thị view ListStore */
      let storeAndColor: IStoreAndColor = {
        id: element.id,
        name: element.name,
        color: ArrayColor[index]
      };
      arrStoreAndColorPieChartTmp.push(storeAndColor);
    }

    let result: IResponse<IBCBHModelV2[], ISumBCBHModel> = yield DashBoardApi.getBaoCaoBanHang(
      bcbhRequest
    );
    /* ################# BEGIN - Xử lý data cho PieChart ############*/
    // repose trả về theo khung giờ
    if (result && !result.code) {
      if (result.data && result.data.length) {
        // tong so don da ban
        tongSoHoaDonBan += Number(result.sum?.total_quantity_1 || 0);
        // tong gia tri don da ban
        tongGiaTriHoaDonBan += Number(result.sum?.total_value_5 || 0);
        // tong so don da tra
        tongSoHoaDonTra += Number(result.sum?.total_quantity_2 || 0);
        // tong gia tri don da ban
        tongGiaTriHoaDonTra += Number(result.sum?.total_value_4 || 0);
        let arrDataReport = result.data;
        arrDataReport.sort((x, y) => Number(x.store_id) - Number(y.store_id));
        arrDataReport.forEach(storeReport => {
          if (storeReport.total_value_2) {
            let item: {value: number; label: string} = {
              value: storeReport.total_value_2 || 0,
              label: storeReport.store_name || ''
            };
            arrValuesPieChart.push(item);
            let idxColor = arrStoreAndColorPieChartTmp.findIndex(
              x => String(x.id) === String(storeReport.store_id)
            );
            if (idxColor > -1) {
              arrStoreAndColorPieChart.push(arrStoreAndColorPieChartTmp[idxColor]);
            }
          }
        });
      } else {
        // tong so don da ban
        tongSoHoaDonBan += 0;
        // tong gia tri don da ban
        tongGiaTriHoaDonBan += 0;
        // tong so don da tra
        tongSoHoaDonTra += 0;
        // tong gia tri don da ban
        tongGiaTriHoaDonTra += 0;
      }

      arrStoreAndColorPieChart.sort((x: any, y: any) => Number(x.id) - Number(y.id));
      arrStoreColorsPieChart = arrStoreAndColorPieChart.map(x => processColor(x.color));

      /* xu ly data va push ve bieu do tuong ung */
      let dataFormatPieChart = {
        data: {
          dataSets: [
            {
              values: arrValuesPieChart,
              label: '',
              config: {
                colors: arrStoreColorsPieChart,
                valueTextSize: 12,
                valueTextColor: processColor('black'),
                valueFormatter: "#.#'%'",
                highlightEnabled: true,
                sliceSpace: 0,
                selectionShift: 10,
                xValuePosition: 'OUTSIDE_SLICE',
                yValuePosition: 'OUTSIDE_SLICE',
                valueLinePart1Length: 0.4,
                valueLinePart2Length: 0.3,
                valueLineColor: processColor('black'),
                valueLineWidth: 1,
                valueLinePart1OffsetPercentage: Utilities.isAndroid() ? 80 : 0.8,
                valueLineVariableLength: true,
                drawValues: true
              }
            }
          ]
        }
      };

      /* ####################### Kết thúc xử lý Data Report #####################*/
      // Utilities.log('----BEGIN----');
      // Utilities.log(mapDoanhThuTheoKhungGioCuaMoiCuaHang);
      // Utilities.log(dataFormatStackBar);
      // Utilities.log(arrValuesStackChart);
      // Utilities.log(arrChiNhanhDaChonDashBoard);
      // Utilities.log(arrColors);
      // Utilities.log(arrStoreAndColor);

      // Pie Chart
      // Utilities.log(arrValuesPieChart);
      // Utilities.log(dataFormatPieChart);
      // Utilities.log(arrStoreAndColorPieChart);
      // Utilities.log('----END----');
      // Utilities.showHideRootLoading(false);
      // return;
      setTimeout(() => {
        Utilities.showHideRootLoading(false);
      }, 300);
      if (arrStoreAndColorPieChart.length) {
        yield put<IAppAction<IDashboardState>>({
          type: DASHBOARD_ACTION.PIE_CHART_DASHBOARD_SUCCESS,
          payload: {
            pieChart: dataFormatPieChart,
            arrStoreAndColorPieChart,
            tongSoHoaDonBan,
            tongGiaTriHoaDonBan,
            tongSoHoaDonTra,
            tongGiaTriHoaDonTra
          }
        });
      } else {
        yield put({
          type: DASHBOARD_ACTION.PIE_CHART_DASHBOARD_FAIL
        });
      }
    } else {
      yield put({
        type: DASHBOARD_ACTION.PIE_CHART_DASHBOARD_FAIL
      });
    }
    /* ################# END - Xử lý data cho PieChart ############*/
  } catch (error) {
    if (__DEV__) console.log(error);
    Utilities.showHideRootLoading(false);
    yield put({
      type: DASHBOARD_ACTION.PIE_CHART_DASHBOARD_FAIL
    });
  }
}

function* getTop10ForSale() {
  try {
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrChiNhanhOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ####################### Bắt đầu xử lý #####################*/
    let arrStoreRequest = [];
    let strStore;

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonDashBoard?.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrChiNhanhOfUser;
    }
    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];
      arrStoreRequest.push(element.id || '');
    }
    strStore = arrStoreRequest.join(',');

    /* lấy danh sách 10 sản phẩm có doanh thu cao nhất  */
    let arrProductReportByRevenue: IBCSPModel[] = [];

    let top10ForSaleReq: IEndOfDayReportReq = {
      limit: 10,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      stores: strStore
    };
    let resultBCSPRevenue: IResponse<IBCSPModel[], any> = yield DashBoardApi.getTop10ProductForSale(
      top10ForSaleReq
    );

    if (resultBCSPRevenue && !resultBCSPRevenue.code) {
      arrProductReportByRevenue = resultBCSPRevenue.data.sort(
        (x, y) => Number(y.total_value_2 || 0) - Number(x.total_value_2 || 0)
      );
    }

    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.TOP_10_FOR_SALE_SUCCESS,
      payload: {
        arrProductReportByRevenue
      }
    });
  } catch (error) {
    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.TOP_10_FOR_SALE_SUCCESS,
      payload: {
        arrProductReportByRevenue: []
      }
    });
  }
}

/* Báo cáo sản phẩm */
function* getTop10ForQty() {
  try {
    const rootState: RootState = yield select();
    const arrChiNhanhDaChonDashBoard = rootState.DashboardReducer.arrChiNhanhDaChonDashBoard || [];
    const arrChiNhanhOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];
    const khoangThoiGian = rootState.DashboardReducer.khoangThoiGian;

    /* ####################### Bắt đầu xử lý #####################*/
    let arrStoreRequest = [];
    let strStore;
    let arrStoreMix: IStorePerson[] = [];

    if (arrChiNhanhDaChonDashBoard?.length) {
      arrStoreMix = arrChiNhanhDaChonDashBoard;
    } else {
      arrStoreMix = arrChiNhanhOfUser;
    }
    for (let index = 0; index < arrStoreMix?.length; index++) {
      const element = arrStoreMix[index];
      arrStoreRequest.push(element.id || '');
    }
    strStore = arrStoreRequest.join(',');

    /*  ##### BEGIN --- lấy danh sách 10 sản phẩm có số lượng bán cao nhất ##### */
    let arrProductReportByQuantity: any[] = [];
    // let bcspQuantityRequest: IBCSPRequest = {
    //   limit: 10,
    //   skip: 0,
    //   min_created_at_day: khoangThoiGian?.dateFrom,
    //   max_created_at_day: khoangThoiGian?.dateTo,
    //   view: 1,
    //   sort_by: 'total_quantity_1',
    //   order_by: 'desc',
    //   stores: strStore
    // };

    let top10ForSaleReqNew: Top10Request = {
      limit: 10,
      skip: 0,
      seller_type: 1,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      stores: strStore
    };

    let resultBCSPQuantity: IResponse<IBCDHModel[], ISumBCSPModel> = yield call(() =>
      DashBoardApi.getTop10ProductForSaleNew(top10ForSaleReqNew)
    );
    if (resultBCSPQuantity && !resultBCSPQuantity.code) {
      arrProductReportByQuantity = resultBCSPQuantity.data;
    }

    /*  ##### END --- lấy danh sách 10 sản phẩm có số lượng bán cao nhất ##### */

    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.TOP_10_FOR_QTY_SUCCESS,
      payload: {
        arrProductReportByQuantity
      }
    });
  } catch (error) {
    yield put<IAppAction<IDashboardState>>({
      type: DASHBOARD_ACTION.TOP_10_FOR_QTY_SUCCESS,
      payload: {
        arrProductReportByQuantity: []
      }
    });
  }
}

export function* watchDoanhThuTheoThoiGianStackBarDashBoard() {
  yield takeLatest(DASHBOARD_ACTION.STACK_BAR_DASHBOARD, getDoanhThuTheoThoiGianStackBarDashBoard);
}

export function* watchDoanhThuTheoStorePieChartDashBoard() {
  yield takeLatest(DASHBOARD_ACTION.PIE_CHART_DASHBOARD, getDoanhThuTheoStorePieChartDashBoard);
}

export function* watchListDatHangCuaHang() {
  yield takeLatest(DASHBOARD_ACTION.BCDH, getDatHang);
}

export function* watchListTonKhoCuaHang() {
  yield takeLatest(DASHBOARD_ACTION.BCSP, getBCSP);
}

export function* watchTop10ForSale() {
  yield takeLatest(DASHBOARD_ACTION.TOP_10_FOR_SALE, getTop10ForSale);
}

export function* watchTop10ForQty() {
  yield takeLatest(DASHBOARD_ACTION.TOP_10_FOR_QTY, getTop10ForQty);
}
