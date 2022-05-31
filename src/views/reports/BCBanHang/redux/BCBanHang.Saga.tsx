import {put, takeLatest, select} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {BC_BAN_HANG_ACTION} from './BCBanHang.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {DashBoardApi, IBCBHRequest} from 'services/DashBoard.Api';
import {IDateFilterType, IAppAction} from 'views/app';
import {IBCBanHangState} from '.';
import {IResponse} from 'services/ClientAPI';
import {
  // IBCBHModel,
  IBCBHModelV2,
  ISumBCBHModel
} from 'models/DashBoard.Model';
import {processColor} from 'react-native';
import {ArrayColor} from 'bases/styles/Core';
import {IStoreAndColor} from 'views/dashboard/redux';
import {ID_VIEW_LOI_NHUAN, VIEW_LOI_NHUAN} from 'common/Constants';
import {IStorePerson} from 'models/ModelBase';

function* getDoanhThuTheoThoiGianStackBarBCBH() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const {
      arrKenhban,
      methodSale,
      arrTablePrice,
      arrChiNhanhDaChonBCBH,
      thoiGianLoc,
      khoangThoiGian
    } = rootState.BCBanHangReducer;
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

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
    let date_time: IDateFilterType | undefined = thoiGianLoc;
    let isHours: boolean = false;
    if (
      thoiGianLoc &&
      khoangThoiGian &&
      (thoiGianLoc.id === 'TUY_CHON' || thoiGianLoc.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian.dateFrom &&
      khoangThoiGian.dateTo
    ) {
      let start = new Date(khoangThoiGian.dateFrom).getTime();
      let END = new Date(khoangThoiGian.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay && date_time) {
        date_time.type = 'quarter';
      }
      // isHours = false;
    }
    //  else {
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
    /**
     * ANCHOR các biến chung của request báo cáo bán hàng
     */
    let requestChung: IBCBHRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,

      date_time: date_time && date_time.type === 'month' ? 'day' : date_time ? date_time.type : ''
    };

    if (arrKenhban && arrKenhban.length > 0) {
      requestChung.channels = arrKenhban
        .map(element => {
          return element.id;
        })
        .join(',');
    } else {
      delete requestChung.channels;
    }
    if (methodSale) {
      requestChung.is_delivery = methodSale.isCheck;
    } else {
      delete requestChung.is_delivery;
    }
    if (arrTablePrice && arrTablePrice.length > 0) {
      requestChung.price_books = arrTablePrice.map(element => element.id).join(',');
    } else {
      delete requestChung.price_books;
    }

    /* ################ BEGIN - Xử lý data cho StackBar Chart ################### */

    let mapDoanhThuTheoKhungGioCuaMoiCuaHang: any = {};
    let newMapDT: Map<number, any[]> = new Map();

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonBCBH?.length) {
      arrStoreMix = arrChiNhanhDaChonBCBH;
    } else {
      arrStoreMix = arrStoreOfUser;
    }

    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

    for (let index = 0; index < arrStoreMix.length; index++) {
      const element = arrStoreMix[index];

      let storeAndColor: IStoreAndColor = {
        id: element.id,
        name: element.name,
        color: ArrayColor[index]
      };
      arrStoreAndColorStackChart.push(storeAndColor);

      let bcbhRequest: IBCBHRequest = {
        ...requestChung,
        limit: 50,

        stores: element.id?.toString() || ''
      };
      // let result: IResponse<IBCBHModel[], ISumBCBHModel> = fakeRes;
      let result: IResponse<IBCBHModelV2[], ISumBCBHModel> = yield DashBoardApi.getBaoCaoBanHang(
        bcbhRequest
      );
      // repose trả về theo khung giờ
      if (result && !result.code && result.data.length) {
        let arrDataReport = result.data.reverse();
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
            value: Number(e.total_value_2 || 0),
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
          //   if (mapDoanhThuTheoKhungGioCuaMoiCuaHang[keyKhungGio]) {
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

    // ####### BEGIN xu ly nhung store k co doanh thu trong mapDoanhThuTheoKhungGioCuaMoiCuaHang ######;
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

    // ####### END xu ly nhung store k co doanh thu trong mapDoanhThuTheoKhungGioCuaMoiCuaHang ######;

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

    /* ############# BEGIN - Xu ly danh sach màu sắc và label của Stack Chart #############*/
    arrStoreAndColorStackChart.forEach(storeAndcolor => {
      // danh sach cua hang hien thi
      arrLabelsStackChart.push(storeAndcolor.name);
      // mau ung với mỗi store
      arrStoreColorsStackChart.push(processColor(storeAndcolor.color));
    });
    /* ############# END - Xu ly danh sach màu sắc và label của Stack Chart #############*/

    /* ############# BEGIN - xóa đi mảng trong mapDoanhThuTheoKhungGioCuaMoiCuaHang có những store có value = 0  ############# */
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
    /* ############# END - xóa đi mảng trong mapDoanhThuTheoKhungGioCuaMoiCuaHang có những store có value = 0  ############# */

    /* ############# BEGIN - loop theo khung gio ####### */
    arrKeyLebal.forEach(key => {
      if (isHours) {
        arrLabelTrucXStackChart.push(key + ':00');
      } else {
        arrLabelTrucXStackChart.push(key);
      }

      let item: {y: any[]; marker: any[]} = {y: [], marker: []};
      // lay danh sach doanh thu theo khung gio cua moi store
      mapDoanhThuTheoKhungGioCuaMoiCuaHang[key].forEach((DTTheoStore: any) => {
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
    /* ############# END - loop theo khung gio ####### */

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
    // Utilities.log(dataFormatStackBar);
    // Utilities.log('----END----');

    // Utilities.showHideRootLoading(false);
    // return;

    Utilities.showHideRootLoading(false);

    if (arrStoreAndColorStackChart.length) {
      yield put<IAppAction<IBCBanHangState>>({
        type: BC_BAN_HANG_ACTION.STACK_BAR_BCBH_SUCCESS,
        payload: {
          stackbarChart: dataFormatStackBar,
          arrStoreAndColorStackChart
        }
      });
    } else {
      yield put({
        type: BC_BAN_HANG_ACTION.STACK_BAR_BCBH_FAIL
      });
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    yield put({
      type: BC_BAN_HANG_ACTION.STACK_BAR_BCBH_FAIL
    });
  }
}

function* getDoanhThuTheoStorePieChartBCBH() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const {
      arrKenhban,
      methodSale,
      arrTablePrice,
      arrChiNhanhDaChonBCBH,
      thoiGianLoc,
      khoangThoiGian
    } = rootState.BCBanHangReducer;
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    /* ########### Variable of Pie Chart ############ */
    let arrValuesPieChart: any[] = []; // gia tri cua moi store
    /* giá trị màu sắc đại diện cho mỗi phần từ trên 1 cột biểu đồ tương ứng với từng store */
    let arrStoreColorsPieChart: any[] = []; // mau cua moi store
    /* giá trị tên và màu đại diện cho mỗi phần tử trên 1 cột biểu đồ tương ứng với từng store */
    let arrStoreAndColorPieChart: IStoreAndColor[] = [];
    let arrStoreAndColorPieChartTmp: IStoreAndColor[] = [];

    /* ####################### Bắt đầu xử lý Data Report #####################*/

    /*  Mỗi 1 store ứng với một ô trên 1 cột / ngày(giờ, tháng, năm). 
    xếp chồng lên nhau theo thứ tự từng store một */
    let date_time: IDateFilterType | undefined = thoiGianLoc;
    if (
      thoiGianLoc &&
      khoangThoiGian &&
      (thoiGianLoc.id === 'TUY_CHON' || thoiGianLoc.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian.dateFrom &&
      khoangThoiGian.dateTo
    ) {
      let start = new Date(khoangThoiGian.dateFrom).getTime();
      let END = new Date(khoangThoiGian.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay && date_time) {
        date_time.type = 'quarter';
      }
    }

    /**
     * ANCHOR các biến chung của request báo cáo bán hàng
     */
    let requestChung: IBCBHRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      date_time: date_time ? date_time.type : ''
    };

    if (arrKenhban && arrKenhban.length > 0) {
      requestChung.channels = arrKenhban.map(element => element.id).join(',');
    } else {
      delete requestChung.channels;
    }
    if (methodSale) {
      requestChung.is_delivery = methodSale.isCheck;
    } else {
      delete requestChung.is_delivery;
    }
    if (arrTablePrice && arrTablePrice.length > 0) {
      requestChung.price_books = arrTablePrice.map(element => element.id).join(',');
    } else {
      delete requestChung.price_books;
    }

    /* ################ BEGIN - Xử lý data cho StackBar Chart ################### */

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonBCBH?.length) {
      arrStoreMix = arrChiNhanhDaChonBCBH;
    } else {
      arrStoreMix = arrStoreOfUser;
    }

    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

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

    let bcbhRequest: IBCBHRequest = {
      ...requestChung,
      limit: 50,
      types: 'stores',
      stores: arrStoreMix.map(x => x.id).join(',')
    };
    let result: IResponse<IBCBHModelV2[], ISumBCBHModel> = yield DashBoardApi.getBaoCaoBanHang(
      bcbhRequest
    );
    if (result && !result.code) {
      if (result.data && result.data.length) {
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

        arrStoreAndColorPieChart.sort((x: any, y: any) => Number(x.id) - Number(y.id));
        arrStoreColorsPieChart = arrStoreAndColorPieChart.map(x => processColor(x.color));

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
                  selectionShift: 1,
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
        // Utilities.log(arrLabelTrucXLineChart);
        // Utilities.log(dataFormatChart);
        // Utilities.log('----END----');

        // Utilities.showHideRootLoading(false);
        // return;

        Utilities.showHideRootLoading(false);

        if (arrStoreAndColorPieChart.length) {
          yield put<IAppAction<IBCBanHangState>>({
            type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH_SUCCESS,
            payload: {
              pieChart: dataFormatPieChart,
              arrStoreAndColorPieChart
            }
          });
        } else {
          yield put({
            type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH_FAIL
          });
        }
      } else {
        yield put({
          type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH_FAIL
        });
      }
    } else {
      yield put({
        type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH_FAIL
      });
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    yield put({
      type: BC_BAN_HANG_ACTION.PIE_CHART_BCBH_FAIL
    });
  }
}

function* getDoanhThuLoiNhuanGiaVonLineChartBCBH() {
  try {
    Utilities.showHideRootLoading(true);
    const rootState: RootState = yield select();
    const {
      arrKenhban,
      methodSale,
      arrTablePrice,
      arrChiNhanhDaChonBCBH,
      thoiGianLoc,
      khoangThoiGian
    } = rootState.BCBanHangReducer;
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    /* ########### Variable of Line Chart ############ */
    let arrLabelTrucXLineChart: any[] = []; // time

    /** NOTE loi nhuan*/
    let dataFormatLineBar: any[] = [];
    let tongLoiNhuan: number = 0;
    let tongDoanhThu: number = 0;
    let tongGiaVon: number = 0;

    /* ####################### Bắt đầu xử lý Data Report #####################*/

    /*  Mỗi 1 store ứng với một ô trên 1 cột / ngày(giờ, tháng, năm). 
    xếp chồng lên nhau theo thứ tự từng store một */
    let date_time: IDateFilterType | undefined = thoiGianLoc;

    if (
      thoiGianLoc &&
      khoangThoiGian &&
      (thoiGianLoc.id === 'TUY_CHON' || thoiGianLoc.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian.dateFrom &&
      khoangThoiGian.dateTo
    ) {
      let start = new Date(khoangThoiGian.dateFrom).getTime();
      let END = new Date(khoangThoiGian.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay && date_time) {
        date_time.type = 'quarter';
      }
    }

    /**
     * ANCHOR các biến chung của request báo cáo bán hàng
     */
    let requestChung: IBCBHRequest = {
      limit: 50,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      types: 'revenues',
      date_time: date_time ? date_time.type : ''
    };

    if (arrKenhban && arrKenhban.length > 0) {
      requestChung.channels = arrKenhban.map(element => element.id).join(',');
    } else {
      delete requestChung.channels;
    }
    if (methodSale) {
      requestChung.is_delivery = methodSale.isCheck;
    } else {
      delete requestChung.is_delivery;
    }
    if (arrTablePrice && arrTablePrice.length > 0) {
      requestChung.price_books = arrTablePrice.map(element => element.id).join(',');
    } else {
      delete requestChung.price_books;
    }

    /* ################ BEGIN - Xử lý data cho StackBar Chart ################### */

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonBCBH?.length) {
      arrStoreMix = arrChiNhanhDaChonBCBH;
    } else {
      arrStoreMix = arrStoreOfUser;
    }

    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

    requestChung.stores = arrStoreMix.map(x => x.id).join(',');

    // let result: IResponse<IBCBHModel[], ISumBCBHModel> = fakeRes;
    let result: IResponse<IBCBHModelV2[], ISumBCBHModel> = yield DashBoardApi.getBaoCaoBanHang(
      requestChung
    );

    /* ################ BEGIN - Xử lý data cho Line Chart ################### */

    let mapArrValueLineChart: any = {
      [ID_VIEW_LOI_NHUAN.PROFIT]: [],
      [ID_VIEW_LOI_NHUAN.REVENUE]: [],
      [ID_VIEW_LOI_NHUAN.COST_PRICE]: []
    };

    if (result && !result.code && result.data.length) {
      const arrDaoChuoi = result.data.reverse();

      arrDaoChuoi.forEach(elementValue => {
        let keyKhungGio = '';
        if (thoiGianLoc?.type === 'quarter') {
          keyKhungGio = Utilities.convertTimeByFormat(
            elementValue.created_at_time * 1000,
            'MM/YYYY'
          );
        } else {
          keyKhungGio = Utilities.convertTimeByFormat(elementValue.created_at_time * 1000, 'DD/MM');
        }
        // if (thoiGianLoc?.type === 'year') {
        //   if (elementValue.created_at_month) {
        //     keyKhungGio += elementValue.created_at_month?.toString() + '-';
        //   }
        //   keyKhungGio += elementValue.created_at_year?.toString() || '';
        // } else if (thoiGianLoc?.type === 'quarter') {
        //   keyKhungGio = elementValue.created_at_month?.toString() || '';
        // } else if (thoiGianLoc && (thoiGianLoc.type === 'month' || thoiGianLoc.type === 'day')) {
        //   keyKhungGio = Utilities.convertTimeByFormat(elementValue.created_at_day, 'DD-MM') || '';
        // } else {
        //   keyKhungGio = elementValue.created_at_hours?.toString() + ':00' || '';
        // }

        arrLabelTrucXLineChart.push(keyKhungGio);

        /** line loi nhuan */

        const parseValueLN = Number(elementValue.total_value_5 || 0);
        const converValueCurrentLoiNhuan = {
          y: parseValueLN,
          marker: ' Lợi nhuận' + '\n ' + Utilities.convertCount(parseValueLN)
        };
        tongLoiNhuan += parseValueLN;
        mapArrValueLineChart[ID_VIEW_LOI_NHUAN.PROFIT].push(converValueCurrentLoiNhuan);

        /** line doanh thu */

        const parseValueDT = Number(elementValue.total_value_2 || 0);
        const converValueCurrentDoanhThu = {
          y: parseValueDT,
          marker: ' Doanh thu' + '\n ' + Utilities.convertCount(parseValueDT)
        };
        tongDoanhThu += parseValueDT;
        mapArrValueLineChart[ID_VIEW_LOI_NHUAN.REVENUE].push(converValueCurrentDoanhThu);

        /** line gia von */

        const parseValueGV = Number(elementValue.total_value_4 || 0);
        const converValueCurrentGV = {
          y: parseValueGV,
          marker: ' Giá vốn' + '\n ' + Utilities.convertCount(parseValueGV)
        };
        tongGiaVon += parseValueGV;
        mapArrValueLineChart[ID_VIEW_LOI_NHUAN.COST_PRICE].push(converValueCurrentGV);
      });

      VIEW_LOI_NHUAN.forEach(element => {
        let DTProfitReport: any = {
          values: mapArrValueLineChart[element.id],
          label: element.name,
          config: {
            drawValues: false,
            mode: 'HORIZONTAL_BEZIER',
            drawCircles: false,
            lineWidth: 2,
            color: processColor(element.color)
          }
        };

        dataFormatLineBar.push(DTProfitReport);
      });

      let dataFormatLineChart = {
        data: {
          dataSets: dataFormatLineBar
        },
        xAxis: {
          valueFormatter: arrLabelTrucXLineChart
        }
      };

      /* ################ END - Xử lý data cho Line Chart ################### */

      /* ####################### Kết thúc xử lý Data Report #####################*/

      // Utilities.log('----BEGIN----');
      // Utilities.log(arrLabelTrucXLineChart);
      // Utilities.log(mapArrValueLineChart);
      // Utilities.log(dataFormatLineChart);
      // Utilities.log('----END----');

      // Utilities.showHideRootLoading(false);
      // return;

      Utilities.showHideRootLoading(false);

      if (arrLabelTrucXLineChart.length && dataFormatLineBar.length) {
        yield put<IAppAction<IBCBanHangState>>({
          type: BC_BAN_HANG_ACTION.LINE_CHART_BCBH_SUCCESS,
          payload: {
            lineChart: dataFormatLineChart,
            tongLoiNhuan,
            tongDoanhThu,
            tongGiaVon
          }
        });
      } else {
        yield put({
          type: BC_BAN_HANG_ACTION.LINE_CHART_BCBH_FAIL
        });
      }
    } else {
      yield put({
        type: BC_BAN_HANG_ACTION.LINE_CHART_BCBH_FAIL
      });
    }
  } catch (error) {
    if (__DEV__) console.log(error);
    Utilities.showHideRootLoading(false);
    yield put({
      type: BC_BAN_HANG_ACTION.LINE_CHART_BCBH_FAIL
    });
  }
}

function* getTopNhanVienBanHangBCBH() {
  try {
    const rootState: RootState = yield select();
    const {
      arrKenhban,
      methodSale,
      arrTablePrice,
      arrChiNhanhDaChonBCBH,
      thoiGianLoc,
      khoangThoiGian
    } = rootState.BCBanHangReducer;
    const arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    /** NOTE tạo danh sách nhan viên bán hàng tốt */
    let arrStaffsBestSales: IBCBHModelV2[] = [];

    /* ####################### Bắt đầu xử lý Data Report #####################*/

    /*  Mỗi 1 store ứng với một ô trên 1 cột / ngày(giờ, tháng, năm). 
    xếp chồng lên nhau theo thứ tự từng store một */
    let date_time: IDateFilterType | undefined = thoiGianLoc;

    if (
      thoiGianLoc &&
      khoangThoiGian &&
      (thoiGianLoc.id === 'TUY_CHON' || thoiGianLoc.id === 'TOAN_THOI_GIAN') &&
      khoangThoiGian.dateFrom &&
      khoangThoiGian.dateTo
    ) {
      let start = new Date(khoangThoiGian.dateFrom).getTime();
      let END = new Date(khoangThoiGian.dateTo).getTime();
      let _62ngay = 62 * 86400000;
      if (END - start > _62ngay && date_time) {
        date_time.type = 'quarter';
      }
    }

    /**
     * ANCHOR các biến chung của request báo cáo bán hàng
     */
    let requestChung: IBCBHRequest = {
      limit: 10,
      skip: 0,
      min_created_at_day: khoangThoiGian?.dateFrom,
      max_created_at_day: khoangThoiGian?.dateTo,
      types: 'staffs',
      date_time: date_time ? date_time.type : ''
    };

    if (arrKenhban && arrKenhban.length > 0) {
      requestChung.channels = arrKenhban.map(element => element.id).join(',');
    } else {
      delete requestChung.channels;
    }
    if (methodSale) {
      requestChung.is_delivery = methodSale.isCheck;
    } else {
      delete requestChung.is_delivery;
    }
    if (arrTablePrice && arrTablePrice.length > 0) {
      requestChung.price_books = arrTablePrice.map(element => element.id).join(',');
    } else {
      delete requestChung.price_books;
    }

    let arrStoreMix: IStorePerson[] = [];
    if (arrChiNhanhDaChonBCBH?.length) {
      arrStoreMix = arrChiNhanhDaChonBCBH;
    } else {
      arrStoreMix = arrStoreOfUser;
    }
    arrStoreMix.sort((x: any, y: any) => x.id - y.id);

    requestChung.stores = arrStoreMix.map(x => x.id).join(',');

    let resultStaffBestSale: IResponse<IBCBHModelV2[]> = yield DashBoardApi.getBaoCaoBanHang(
      requestChung
    );
    if (resultStaffBestSale && !resultStaffBestSale.code && resultStaffBestSale.data.length) {
      arrStaffsBestSales = resultStaffBestSale.data;

      yield put<IAppAction<IBCBanHangState>>({
        type: BC_BAN_HANG_ACTION.STAFF_BEST_SALE_SUCCESS,
        payload: {
          arrStaffsBestSales
        }
      });
    } else {
      yield put({
        type: BC_BAN_HANG_ACTION.STAFF_BEST_SALE_FAIL
      });
    }
  } catch (error) {
    yield put({
      type: BC_BAN_HANG_ACTION.STAFF_BEST_SALE_FAIL
    });
  }
}

export function* watchDoanhThuTheoThoiGianStackBarBCBH() {
  yield takeLatest(BC_BAN_HANG_ACTION.STACK_BAR_BCBH, getDoanhThuTheoThoiGianStackBarBCBH);
}

export function* watchDoanhThuTheoStorePieChartBCBH() {
  yield takeLatest(BC_BAN_HANG_ACTION.PIE_CHART_BCBH, getDoanhThuTheoStorePieChartBCBH);
}

export function* watchDoanhThuLoiNhuanGiaVonLineChartBCBH() {
  yield takeLatest(BC_BAN_HANG_ACTION.LINE_CHART_BCBH, getDoanhThuLoiNhuanGiaVonLineChartBCBH);
}

export function* watchStaffBestSaleBCBH() {
  yield takeLatest(BC_BAN_HANG_ACTION.STAFF_BEST_SALE, getTopNhanVienBanHangBCBH);
}
