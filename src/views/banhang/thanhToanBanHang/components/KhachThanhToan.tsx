import React, {PureComponent} from 'react';
import {MyText, MyView, MyInputPriceMask, MyIcon} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {addFormPayment, resetThanhToan, IFormPaymentState} from 'views/banhang/formPayment/redux';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {IThanhToanState} from '../redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps extends IThanhToanState, IFormPaymentState, IInforShippingState, ICreateSaleState {
  addFormPayment: typeof addFormPayment;
  resetThanhToan: typeof resetThanhToan;
}

class KhachThanhToan extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.resetThanhToan();
    const {tienGiamGia, isGiaoHang, objDoiTacGiaoHang, objInforShip, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale);
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
    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: khachCanTraTmp,
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.TIEN_MAT
    });
  }

  nhapSoTien = (text: string) => {
    this.props.resetThanhToan();
    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: parseInt(text, 10),
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.TIEN_MAT
    });
  };

  render() {
    let soTienDaTra = 0;

    const {arrFormPayment} = this.props;
    if (arrFormPayment) {
      for (let index = 0; index < arrFormPayment.length; index++) {
        const element = arrFormPayment[index];
        soTienDaTra = soTienDaTra + (element.value || 0);
      }
    }

    return (
      <MyView style={styles.viewGiamGia}>
        <MyView style={styles.viewKhachTT}>
          <MyText style={styles.titleText} myFontStyle="Regular">
            Khách thanh toán
          </MyText>
          <MyIcon
            name="money"
            size={32}
            iconFontType="FontAwesome"
            onPress={() => MyNavigator.navigate('FormPayment')}
          />
        </MyView>

        <MyView style={styles.contentViewGiamGia}>
          <MyInputPriceMask
            numberOfLines={1}
            containerStyle={styles.contentInput}
            style={styles.inputSoluong}
            placeholder={'VNĐ'}
            value={Utilities.convertCount(soTienDaTra)}
            keyboardType={'number-pad'}
            onTextCallback={this.nhapSoTien}
            returnKeyType="done"
          />
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

  return {
    arrProductSale,

    tienGiamGia,
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip,

    arrFormPayment
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addFormPayment,
      resetThanhToan
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KhachThanhToan);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setPadding(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2),
    borderRadius: MY_SIZE.s_8,
    height: MY_SIZE.s_34
  },
  btnText: {
    width: MY_SIZE.s_48,
    borderRadius: MY_SIZE.s_8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  contentViewGiamGia: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_16)
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_10),
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  },
  titleText: {
    // flex: 1.4,
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewGiamGia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },

  viewKhachTT: {
    flex: 1.4,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  }
});
