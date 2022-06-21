import {call, put, select, takeLatest} from 'redux-saga/effects';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {THANH_TOAN_ACTION} from './ThanhToan.Reducer';
import {IDiscountInOrder, IPostOrderRequest, OrderAPI} from 'services/Order.Api';
import {IPaymentOrderModel} from 'models/Payment.Model';
import MyNavigator from 'utils/MyNavigator';
import {IResponse} from 'services/ClientAPI';
import {OrderModel} from 'models/Order.Model';
import {ARR_KENH_BAN, PAYMENT_METHOD} from 'configs/FilterConfig';
import {BANG_GIA_CHUNG, KHACH_LE, STORE_DEFAULT} from 'common/Constants';
import {KieuKhuyenMai} from 'configs/ProductConfig';
import {IProductInOrder} from 'models/Product.Model';
import {IStorePerson} from 'models/ModelBase';
import {IProductBanHangState, PRODUCT_BAN_HANG_ACTION} from 'views/banhang/ProductBanHang/redux';
import {IAppAction} from 'views/app';

function* thanhToan() {
  try {
    let postOrderRequest: IPostOrderRequest = {};
    const rootState: RootState = yield select();

    //  thong tin cua hoa don
    postOrderRequest.name = 'Hoá đơn 1';
    postOrderRequest.is_active = true;
    postOrderRequest.status = 'completed';
    postOrderRequest.type = 'retail';
    postOrderRequest.group = 'invoice';
    postOrderRequest.hashtag = rootState.CreateSaleReducer.ghiChuHoaDon || '';

    //  thong tin cua hang
    let store: IStorePerson = STORE_DEFAULT;
    if (rootState.ChooseStoreReducer.cuaHangDangChon) {
      store = rootState.ChooseStoreReducer.cuaHangDangChon;
    }
    if (
      rootState.InforShippingReducer.storeInforShip &&
      rootState.InforShippingReducer.storeInforShip.id
    ) {
      store = rootState.InforShippingReducer.storeInforShip;
    }
    postOrderRequest.store = store;
    postOrderRequest.channel = rootState.CreateSaleReducer.currentKenhBan || ARR_KENH_BAN[2];

    //  thong tin cua khach hang
    postOrderRequest.customer =
      {
        id: rootState.ProductBanHangReducer.currentKhachHang?.id,
        name: rootState.ProductBanHangReducer.currentKhachHang?.name,
        phone: rootState.ProductBanHangReducer.currentKhachHang?.phone
      } || KHACH_LE;

    //  thong tin cua san pham
    postOrderRequest.price_book = rootState.ProductBanHangReducer.currentBangGia || BANG_GIA_CHUNG;

    const products: IProductInOrder[] = [];
    const prodTmp = rootState.CreateSaleReducer.arrProductSale;
    if (!prodTmp || prodTmp.length === 0) {
      Utilities.showToast('Bạn chưa chọn sản phẩm!', '', 'warning');
      return;
    } else {
      for (let index = 0; index < prodTmp.length; index++) {
        const element = prodTmp[index].product;

        let productInOrder: IProductInOrder = {
          sku: element.sku,
          id: element.parent_id,
          option_id: element.id,
          name: element.name,
          original_price: element.original_price,
          price_books: element.price_books,
          discount: element.discount,
          total_quantity: prodTmp[index].totalQty
        };

        if (element.note) {
          productInOrder = {...productInOrder, note: element.note};
        }

        products.push(productInOrder);
        postOrderRequest.products = products;
      }
    }

    //  giam gia cho hoa don
    const discountType = rootState.ThanhToanReducer.discountType;
    const discountValue = rootState.ThanhToanReducer.discountValue;
    const discounts: IDiscountInOrder[] = [
      {
        code: 'manual',
        id: 0,
        group: 'discount',
        name: 'Thủ công',
        type: discountType || KieuKhuyenMai.GIAM_PHAN_TRAM,
        value: discountValue || 0
      }
    ];
    if (discountValue && discountValue > 0) {
      postOrderRequest.discounts = discounts;
    }

    //  thanh toan cho hoa don
    const arrFormPayment = rootState.FormPaymentReducer.arrFormPayment;
    let thanhToanHoaDon: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      thanhToanHoaDon = arrFormPayment.filter(payment => {
        return (payment.value || 0) > 0;
      });
    }
    if (thanhToanHoaDon.length <= 0) {
      postOrderRequest.is_payment = false;
    } else {
      let thanhToanInOrder: IPaymentOrderModel[] = [];
      for (let index = 0; index < thanhToanHoaDon.length; index++) {
        if (thanhToanHoaDon[index].method !== PAYMENT_METHOD.TIEN_MAT) {
          if (!thanhToanHoaDon[index].card) {
            Utilities.showToast('Bạn chưa chọn tài khoản thanh toán!', '', 'warning');
            return;
          } else {
            thanhToanInOrder.push({
              method: thanhToanHoaDon[index].method,
              partner: {
                id: postOrderRequest.customer.id,
                name: postOrderRequest.customer.name,
                phone: postOrderRequest.customer.phone
              },
              type: thanhToanHoaDon[index].type,
              value: thanhToanHoaDon[index].value,
              card: {
                ...thanhToanHoaDon[index].card,
                number: thanhToanHoaDon[index].card?.value,
                ccv: '000',
                bank: thanhToanHoaDon[index].card?.name
              }
            });
          }
        } else {
          thanhToanInOrder.push({
            method: thanhToanHoaDon[index].method,
            partner: {
              id: postOrderRequest.customer.id,
              name: postOrderRequest.customer.name,
              phone: postOrderRequest.customer.phone
            },
            type: thanhToanHoaDon[index].type,
            value: thanhToanHoaDon[index].value
          });
        }
      }
      postOrderRequest.is_payment = true;
      postOrderRequest.payments = thanhToanInOrder;
    }

    //  van don
    if (!rootState.ThanhToanReducer.isGiaoHang) {
      postOrderRequest.is_delivery = false;
    } else {
      postOrderRequest.is_delivery = true;
      if (!rootState.InforShippingReducer.objDoiTacGiaoHang) {
        Utilities.showToast('Bạn chưa chọn đối tác giao hàng!', '', 'warning');
        return;
      }
      postOrderRequest.deliveries = [rootState.InforShippingReducer.objDoiTacGiaoHang];
    }

    Utilities.showHideRootLoading(true, 'Vui lòng đợi');

    const res: IResponse<OrderModel> = yield call(() =>
      OrderAPI.postOrderBanHang(postOrderRequest)
    );
    if (res.code) {
      Utilities.showHideRootLoading(false);
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put({
        type: THANH_TOAN_ACTION.THANH_TOAN_THAT_BAI
      });
    } else {
      Utilities.showHideRootLoading(false);
      Utilities.showToast('Hoàn thành giao dịch!', '', 'success');
      yield put({
        type: THANH_TOAN_ACTION.THANH_TOAN_THANH_CONG
      });
      yield put<IAppAction<IProductBanHangState>>({
        type: PRODUCT_BAN_HANG_ACTION.IS_REFRESH,
        payload: {
          isRefresh: true
        }
      });
      yield put({
        type: PRODUCT_BAN_HANG_ACTION.GET
      });
      MyNavigator.navigate('ProductBanHang');
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put({
      type: THANH_TOAN_ACTION.THANH_TOAN_THAT_BAI
    });
  }
}

export function* watchThanhToanHoaDon() {
  yield takeLatest(THANH_TOAN_ACTION.THANH_TOAN, thanhToan);
}
