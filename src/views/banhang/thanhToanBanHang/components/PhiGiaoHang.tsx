import React, {PureComponent} from 'react';
import {MyText, MyView, MyButton, MyTextPriceMask, MyIcon} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import MyNavigator from 'utils/MyNavigator';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {IThanhToanState} from '../redux';
import {ItemLineIndicator} from 'views/app/components/items';
import Utilities from 'utils/Utilities';

interface IProps extends IThanhToanState, IInforShippingState {}

class PhiGiaoHang extends PureComponent<IProps> {
  render() {
    const {isGiaoHang, objDoiTacGiaoHang, objInforShip} = this.props;

    if (!isGiaoHang) {
      return null;
    }

    let paymentBY = '';

    if (objInforShip?.payment_by === NGUOI_TRA_TIEN.NGUOI_NHAN) {
      paymentBY = '(Khách hàng trả phí)';
    }
    if (objInforShip?.payment_by === NGUOI_TRA_TIEN.NGUOI_GUI) {
      paymentBY = '(Cửa hàng trả phí)';
    }

    return (
      <MyView transparent>
        <MyButton
          onPress={() => MyNavigator.navigate('ListDoiTacGiaoHang')}
          style={styles.viewDTGH}>
          <MyView>
            <MyText myFontStyle="Regular" style={thanhToanStyles.txtTitle}>
              Phí giao hàng
            </MyText>
            {paymentBY ? <MyText style={styles.txtPaymentBy}>{paymentBY}</MyText> : null}
          </MyView>
          <MyView transparent style={styles.viewRightDTGH}>
            <MyView transparent style={styles.viewPrice}>
              <MyText style={styles.txtRightDTGH} numberOfLines={2}>
                {objDoiTacGiaoHang?.provider_name || ' Chọn đối tác giao hàng'}
              </MyText>
              {objDoiTacGiaoHang && objDoiTacGiaoHang?.service_price ? (
                <MyTextPriceMask
                  style={styles.txtRightDTGH}
                  text={Utilities.convertCount(objDoiTacGiaoHang?.service_price) || 0}
                />
              ) : null}
            </MyView>
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={24} />
          </MyView>
        </MyButton>
        <ItemLineIndicator />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isGiaoHang} = state.ThanhToanReducer;
  const {objDoiTacGiaoHang, objInforShip} = state.InforShippingReducer;
  return {
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip
  };
};

export default connect(mapStateToProps, null)(PhiGiaoHang);

const styles = StyleSheet.create({
  txtPaymentBy: {
    fontSize: MY_SIZE.s_12,
    textAlign: 'center',
    color: COLOR.TEXT.RED
  },
  txtRightDTGH: {
    fontSize: MY_SIZE.s_14,
    textAlign: 'center'
  },
  viewRightDTGH: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.9,
    justifyContent: 'flex-end'
  },
  viewPrice: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDTGH: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  }
});
