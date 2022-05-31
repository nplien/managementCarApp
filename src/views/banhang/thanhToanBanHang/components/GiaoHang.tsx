import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {Switch} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';
import {IThanhToanState, setIsGiaoHang} from '../redux';
import {resetThanhToan, addFormPayment} from 'views/banhang/formPayment/redux';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';

interface IProps extends IThanhToanState, IInforShippingState, ICreateSaleState {
  setIsGiaoHang: typeof setIsGiaoHang;
  resetThanhToan: typeof resetThanhToan;
  addFormPayment: typeof addFormPayment;
}

class GiaoHang extends PureComponent<IProps> {
  onChangeSwitch = (value: boolean) => {
    this.props.setIsGiaoHang(value);
    this.props.resetThanhToan();

    const {tienGiamGia, objDoiTacGiaoHang, objInforShip, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    let phiShip = 0;
    if (
      value &&
      objInforShip &&
      objInforShip.payment_by === NGUOI_TRA_TIEN.NGUOI_NHAN &&
      objDoiTacGiaoHang &&
      objDoiTacGiaoHang.service_price
    ) {
      phiShip = objDoiTacGiaoHang.service_price;
    }

    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: tongTienTmp - giamGiaTmp + phiShip,
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.TIEN_MAT
    });
  };

  render() {
    const {isGiaoHang} = this.props;

    let themeColor = COLOR.SWITCH.GREEN;

    let thumbColor = 'white';
    if (Utilities.isAndroid()) {
      thumbColor = themeColor;
    }

    let trackColorTrue = themeColor;
    if (Utilities.isAndroid()) {
      trackColorTrue = COLOR.SWITCH.GREEN_LIGHT;
    }

    return (
      <MyView style={thanhToanStyles.viewContainerGiaoHang}>
        <MyView transparent style={thanhToanStyles.viewGiaoHang}>
          <MyText myFontStyle="Regular" style={thanhToanStyles.txtTitleGiaoHang}>
            Giao hàng
          </MyText>
          <Switch
            style={thanhToanStyles.switchAndroid}
            trackColor={{false: COLOR.SWITCH.PLACEHOLDER, true: trackColorTrue}}
            thumbColor={thumbColor}
            onValueChange={this.onChangeSwitch}
            value={isGiaoHang}
            ios_backgroundColor={COLOR.SWITCH.PLACEHOLDER}
          />
        </MyView>
        {isGiaoHang ? (
          <MyButton
            transparent
            style={thanhToanStyles.contentValue2}
            onPress={() => MyNavigator.navigate('InforShipping')}>
            <MyText style={thanhToanStyles.textGiaoHang} numberOfLines={2} myFontStyle="Regular">
              {'Cập nhật chi tiết đơn giao hàng'}
            </MyText>
            <MyIcon name={'chevron-right'} iconFontType="MaterialIcons" size={24} />
          </MyButton>
        ) : null}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;
  const {tienGiamGia, isGiaoHang} = state.ThanhToanReducer;
  const {objDoiTacGiaoHang, objInforShip} = state.InforShippingReducer;
  return {
    arrProductSale,

    tienGiamGia,
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setIsGiaoHang,
      addFormPayment,
      resetThanhToan
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GiaoHang);
