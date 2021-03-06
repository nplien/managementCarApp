import {
  MyButton,
  MyIcon,
  MyInputPriceMask,
  MyText,
  MyTextPriceMask,
  MyView
} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFormPayment, deleteAllItem, editItemPayment, IFormPaymentState} from '../redux';
import {IProductBanHangState} from 'views/banhang/ProductBanHang/redux';
import {IPaymentOrderModel} from 'models/Payment.Model';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps
  extends IFormPaymentState,
    IThanhToanState,
    ICreateSaleState,
    IProductBanHangState,
    IInforShippingState {
  addFormPayment: typeof addFormPayment;
  deleteAllItem: typeof deleteAllItem;
  editItemPayment: typeof editItemPayment;
}

class ItemCoin extends PureComponent<IProps> {
  getSoTienCanTra = () => {
    const {tienGiamGia, isGiaoHang, objDoiTacGiaoHang, objInforShip, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    let phiShip = 0;
    if (
      isGiaoHang &&
      objInforShip &&
      objInforShip.payment_by === NGUOI_TRA_TIEN.NGUOI_NHAN &&
      objDoiTacGiaoHang &&
      objDoiTacGiaoHang.service_price
    ) {
      phiShip = objDoiTacGiaoHang.service_price;
    }

    const khachCanTraTmp = tongTienTmp - giamGiaTmp + phiShip;
    let soTienDaTra = 0;

    const {arrFormPayment, currentKhachHang} = this.props;
    if (arrFormPayment) {
      for (let index = 0; index < arrFormPayment.length; index++) {
        const element = arrFormPayment[index];
        soTienDaTra = soTienDaTra + (element.value || 0);
      }
    }

    const soTienCanTra = Math.max(khachCanTraTmp - soTienDaTra, 0);

    let soCoinHienCo = 0;
    if (currentKhachHang?.total_point) {
      soCoinHienCo = currentKhachHang?.total_point;
    }

    if (soTienCanTra < soCoinHienCo) {
      return soTienCanTra;
    } else {
      return soCoinHienCo;
    }
  };

  setCheck = () => {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.POINT;
      });
    }

    if (chuyenKhoan?.length > 0) {
      this.props.deleteAllItem(PAYMENT_METHOD.POINT);
    } else {
      this.props.addFormPayment({
        random_id: Utilities.randomNumber(),
        value: this.getSoTienCanTra(),
        type: SO_QUY_TYPE.THU,
        method: PAYMENT_METHOD.POINT
      });
    }
  };

  nhapSoTien = (text: string) => {
    const {arrFormPayment, currentKhachHang} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.POINT;
      });
    }
    if (chuyenKhoan.length > 0) {
      let numberNhap = parseInt(text || '0', 10);
      let totalPointTmp = currentKhachHang?.total_point || 0;
      if (numberNhap > totalPointTmp) {
        this.props.editItemPayment({
          ...chuyenKhoan[0],
          value: totalPointTmp
        });
      } else {
        this.props.editItemPayment({...chuyenKhoan[0], value: numberNhap});
      }
    }
  };

  render() {
    const {arrFormPayment, currentKhachHang} = this.props;

    if (!currentKhachHang || !currentKhachHang.total_point) {
      return <MyView />;
    }

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.POINT;
      });
    }

    return (
      <MyView>
        <MyButton style={styles.container} onPress={this.setCheck}>
          <MyView style={styles.content}>
            <MyIcon
              name={chuyenKhoan.length > 0 ? 'checkcircle' : 'checkcircleo'}
              color={COLOR.TEXT.GREEN}
              iconFontType="AntDesign"
              size={20}
            />
            <MyText style={styles.title}>??i???m</MyText>
          </MyView>
          <MyInputPriceMask
            editable={chuyenKhoan.length > 0}
            numberOfLines={1}
            containerStyle={styles.contentInput}
            style={styles.inputSoluong}
            placeholder={'??i???m'}
            value={Utilities.convertCount(chuyenKhoan[0]?.value || 0).toString()}
            keyboardType={'number-pad'}
            onTextCallback={this.nhapSoTien}
            returnKeyType="done"
          />
        </MyButton>
        <MyView style={styles.container2}>
          <MyText>Kh??ch h??ng ??ang c?? </MyText>
          <MyTextPriceMask
            hideCurrency
            text={currentKhachHang?.total_point || 0}
            numberOfLines={1}
            style={{color: COLOR.TEXT.RED}}
          />
          <MyText> ??i???m</MyText>
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;

  const {tienGiamGia, isGiaoHang} = state.ThanhToanReducer;
  const {objDoiTacGiaoHang, objInforShip} = state.InforShippingReducer;

  const {arrFormPayment} = state.FormPaymentReducer;
  const {currentKhachHang} = state.ProductBanHangReducer;

  return {
    arrProductSale,

    tienGiamGia,
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip,

    arrFormPayment,
    currentKhachHang
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      editItemPayment,
      addFormPayment,
      deleteAllItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCoin);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  container2: {
    backgroundColor: COLOR.BG.SECONDARY,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'flex-end'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  }
});
