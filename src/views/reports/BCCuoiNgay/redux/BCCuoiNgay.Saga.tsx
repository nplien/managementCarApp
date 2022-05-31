import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN, PAYMENT_METHOD} from 'configs/FilterConfig';
import {ORDER_STATUS_INVOICE} from 'configs/StatusConfig';
import {OrderModel} from 'models/Order.Model';
import {ISoQuyModel, ISumSoQuy, SO_QUY_STATUS} from 'models/SoQuy.Model';
import {put, takeLatest, select} from 'redux-saga/effects';
import {IResponse} from 'services/ClientAPI';
import {IOrderRequest, OrderAPI} from 'services/Order.Api';
import {IRequestSoQuy, PaymentAPI} from 'services/Payment.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {BCCUOINGAY_THOIGIAN_ACTION, IBCCNAction} from '.';

function* getTongKetPTTTBCCN() {
  try {
    let rootState: RootState = yield select();
    const {
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrPTBHDaChon,
      arrCustomerDaChon
    } = rootState.BCCuoiNgayReducer;
    let arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    let requestThuChi: IRequestSoQuy = {
      limit: 1,
      skip: 0,
      statuses: SO_QUY_STATUS.COMPLETED,
      min_created_at: khoangThoiGian?.dateFrom,
      max_created_at: khoangThoiGian?.dateTo
    };

    if (arrChiNhanhDaChonBCCN?.length) {
      requestThuChi.stores = arrChiNhanhDaChonBCCN.map(x => x.id).join(',');
    } else {
      requestThuChi.stores = arrStoreOfUser.map(x => x.id).join(',');
    }

    if (arrStaffDaChon?.length) {
      requestThuChi.staffs = arrStaffDaChon.map(x => x.id).join(',');
    }

    if (arrPTBHDaChon?.length) {
      if (arrPTBHDaChon.length !== ARR_PT_BAN_HANG.length) {
        requestThuChi.is_delivery = arrPTBHDaChon.map(x => String(x.isCheck)).join(',');
      }
    }

    if (arrCustomerDaChon?.length) {
      requestThuChi.partners = arrCustomerDaChon.map(x => x.id).join(',');
    }

    let tongPTTT_TiemMat = 0;
    let tongPTTT_ChuyenKhoan = 0;
    let tongPTTT_The = 0;
    let tongPTTT_Diem = 0;
    let tongPTTT_Voucher = 0;

    if (arrPTTTDaChon?.length) {
      for (let index = 0; index < arrPTTTDaChon.length; index++) {
        const element = arrPTTTDaChon[index];
        requestThuChi.methods = element.method.toString();
        let response: IResponse<ISoQuyModel[], ISumSoQuy> = yield PaymentAPI.getListPayment(
          requestThuChi
        );
        if (response && !response.code) {
          switch (element.method) {
            case PAYMENT_METHOD.TIEN_MAT:
              tongPTTT_TiemMat = response.sum?.total_value_1 || 0;
              break;
            case PAYMENT_METHOD.CHUYEN_KHOAN:
              tongPTTT_ChuyenKhoan = response.sum?.total_value_1 || 0;
              break;
            case PAYMENT_METHOD.QUET_THE:
              tongPTTT_The = response.sum?.total_value_1 || 0;
              break;
            case PAYMENT_METHOD.POINT:
              tongPTTT_Diem = response.sum?.total_value_1 || 0;
              break;
            case PAYMENT_METHOD.VOUCHER:
              tongPTTT_Voucher = response.sum?.total_value_1 || 0;
              break;

            default:
              break;
          }
        }
      }

      yield put<IBCCNAction>({
        type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT_SUCCESS,
        payload: {
          tongPTTT_TiemMat,
          tongPTTT_ChuyenKhoan,
          tongPTTT_The,
          tongPTTT_Diem,
          tongPTTT_Voucher
        }
      });
    } else {
      yield put<IBCCNAction>({
        type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT_SUCCESS,
        payload: {
          tongPTTT_TiemMat,
          tongPTTT_ChuyenKhoan,
          tongPTTT_The,
          tongPTTT_Diem,
          tongPTTT_Voucher
        }
      });
    }
  } catch (error) {
    yield put<IBCCNAction>({
      type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT_FAIL
    });
  }
}

function* getThuChiBCCN() {
  try {
    let rootState: RootState = yield select();
    const {
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrCustomerDaChon
    } = rootState.BCCuoiNgayReducer;
    let arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    let requestThuChi: IRequestSoQuy = {
      limit: 1,
      skip: 0,
      statuses: SO_QUY_STATUS.COMPLETED,
      min_created_at: khoangThoiGian?.dateFrom,
      max_created_at: khoangThoiGian?.dateTo
    };

    if (arrChiNhanhDaChonBCCN?.length) {
      requestThuChi.stores = arrChiNhanhDaChonBCCN.map(x => x.id).join(',');
    } else {
      requestThuChi.stores = arrStoreOfUser.map(x => x.id).join(',');
    }

    if (arrStaffDaChon?.length) {
      requestThuChi.staffs = arrStaffDaChon.map(x => x.id).join(',');
    }

    if (arrPTTTDaChon?.length) {
      if (arrPTTTDaChon.length !== ARR_PT_THANHTOAN.length) {
        requestThuChi.methods = arrPTTTDaChon.map(x => x.method).join(',');
      }
    }

    if (arrCustomerDaChon?.length) {
      requestThuChi.partners = arrCustomerDaChon.map(x => x.id).join(',');
    }

    let response: IResponse<ISoQuyModel[], ISumSoQuy> = yield PaymentAPI.getListPayment(
      requestThuChi
    );
    let tongTienThu = 0;
    let tongTienChi = 0;
    let tongTienThuChi = 0;

    if (response && !response.code) {
      tongTienThu = response.sum?.total_value_1 || 0;
      tongTienChi = response.sum?.total_value_2 || 0;
      tongTienThuChi = response.sum?.total_value_3 || 0;
      yield put<IBCCNAction>({
        type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI_SUCCESS,
        payload: {
          tongTienThu,
          tongTienChi,
          tongTienThuChi
        }
      });
    } else {
      yield put<IBCCNAction>({
        type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI_FAIL
      });
    }
  } catch (error) {
    yield put<IBCCNAction>({
      type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI_FAIL
    });
  }
}

type ISumOrderlModel = {
  total_discount_value?: number;
  total_paid?: number;
  total_price?: number;
  total_price_before_discount?: number;
  total_quantity?: number;
  total_unpaid?: number;
};

function* getTongKetBanHang(action: IBCCNAction) {
  try {
    let rootState: RootState = yield select();
    const {
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrPTBHDaChon,
      arrCustomerDaChon
    } = rootState.BCCuoiNgayReducer;

    let arrStoreOfUser = rootState.PersonalReducer.infoPersonal?.stores || [];

    let requestOrder: IOrderRequest = {
      limit: 1,
      skip: 0,
      types: action.payload?.typeOfOrder,
      min_created_at: khoangThoiGian?.dateFrom,
      max_created_at: khoangThoiGian?.dateTo,
      statuses: [ORDER_STATUS_INVOICE.COMPLETED, ORDER_STATUS_INVOICE.PRODCESSING].join(',')
    };

    if (arrChiNhanhDaChonBCCN?.length) {
      requestOrder.stores = arrChiNhanhDaChonBCCN.map(x => x.id).join(',');
    } else {
      requestOrder.stores = arrStoreOfUser.map(x => x.id).join(',');
    }

    if (arrStaffDaChon?.length) {
      requestOrder.staffs = arrStaffDaChon.map(x => x.id).join(',');
    }

    if (arrPTTTDaChon?.length) {
      if (arrPTTTDaChon.length !== ARR_PT_THANHTOAN.length) {
        requestOrder.payment_methods = arrPTTTDaChon.map(x => x.method).join(',');
      }
    }

    if (arrPTBHDaChon?.length) {
      if (arrPTBHDaChon.length !== ARR_PT_BAN_HANG.length) {
        requestOrder.is_delivery = arrPTBHDaChon.map(x => String(x.isCheck)).join(',');
      }
    }

    if (arrCustomerDaChon?.length) {
      requestOrder.customer = arrCustomerDaChon[0].phone;
    }

    const response: IResponse<OrderModel[], ISumOrderlModel> = yield OrderAPI.getListOrder(
      requestOrder
    );
    if (response && !response.code) {
      switch (action.type) {
        case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_HOA_DON:
          /* variable of Tong ket hoa don */
          let tongSoHoaDonHD = 0;
          let tongSoLuongSanPhamHD = 0;
          let tongDoanhThuHD = 0;
          let tongThuKhacHD = 0;
          let tongThucThuHD = 0;
          tongSoHoaDonHD = Number(response.count || 0);
          tongSoLuongSanPhamHD = Number(response.sum?.total_quantity || 0);
          tongDoanhThuHD =
            Number(response.sum?.total_price_before_discount || 0) -
            Number(response.sum?.total_discount_value || 0);
          tongThuKhacHD = 0;
          tongThucThuHD = Number(response.sum?.total_paid || 0);
          yield put<IBCCNAction>({
            type: action.type + '/SUCCESS',
            payload: {
              tongSoHoaDonHD,
              tongSoLuongSanPhamHD,
              tongDoanhThuHD,
              tongThuKhacHD,
              tongThucThuHD
            }
          });
          break;
        case BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_DAT_HANG:
          /* variable of Tong ket hoa don */
          let tongSoHoaDonDH = 0;
          let tongSoLuongSanPhamDH = 0;
          let tongDoanhThuDH = 0;
          let tongThuKhacDH = 0;
          let tongThucThuDH = 0;
          tongSoHoaDonDH = Number(response.count || 0);
          tongSoLuongSanPhamDH = Number(response.sum?.total_quantity || 0);
          tongDoanhThuDH =
            Number(response.sum?.total_price_before_discount || 0) -
            Number(response.sum?.total_discount_value || 0);
          tongThuKhacDH = 0;
          tongThucThuDH = Number(response.sum?.total_paid || 0);
          yield put<IBCCNAction>({
            type: action.type + '/SUCCESS',
            payload: {
              tongSoHoaDonDH,
              tongSoLuongSanPhamDH,
              tongDoanhThuDH,
              tongThuKhacDH,
              tongThucThuDH
            }
          });
          break;

        default:
          let tongSoHoaDonTH = 0;
          let tongSoLuongSanPhamTH = 0;
          let tongTienTH = 0;
          let tongHoanTraThuKhacTH = 0;
          let tongPhiTraTH = 0;
          let tongThucTraTH = 0;
          tongSoHoaDonTH = Number(response.count || 0);
          tongSoLuongSanPhamTH = Number(response.sum?.total_quantity || 0);
          tongTienTH = Number(response.sum?.total_price_before_discount || 0);
          tongHoanTraThuKhacTH = Number(response.sum?.total_price || 0);
          tongPhiTraTH = 0;
          tongThucTraTH = Number(response.sum?.total_paid || 0);
          yield put<IBCCNAction>({
            type: action.type + '/SUCCESS',
            payload: {
              tongSoHoaDonTH,
              tongSoLuongSanPhamTH,
              tongTienTH,
              tongHoanTraThuKhacTH,
              tongPhiTraTH,
              tongThucTraTH
            }
          });
          break;
      }
    } else {
      yield put<IBCCNAction>({
        type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_BAN_HANG_FAIL
      });
    }
  } catch (error) {
    yield put<IBCCNAction>({
      type: BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_BAN_HANG_FAIL
    });
  }
}

export function* watchTongKetPTTT() {
  yield takeLatest(BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_PTTT, getTongKetPTTTBCCN);
}

export function* watchTongKetHoaDon() {
  yield takeLatest(BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_HOA_DON, getTongKetBanHang);
}
export function* watchTongKetDatHang() {
  yield takeLatest(BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_DAT_HANG, getTongKetBanHang);
}
export function* watchTongKetTraHang() {
  yield takeLatest(BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_TRA_HANG, getTongKetBanHang);
}

export function* watchTongKetThuChi() {
  yield takeLatest(BCCUOINGAY_THOIGIAN_ACTION.TONG_KET_THU_CHI, getThuChiBCCN);
}
