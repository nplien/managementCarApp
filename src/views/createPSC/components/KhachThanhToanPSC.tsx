import React, {PureComponent} from 'react';
import {MyText, MyView, MyInputPriceMask, MyIcon} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {addFormPayment, resetThanhToan, IFormPaymentState} from 'views/banhang/formPayment/redux';
import Utilities, {getTongTienHangPSC} from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {ICreatePSCState} from '../redux';

interface IProps extends ICreatePSCState, IFormPaymentState {
  addFormPayment: typeof addFormPayment;
  resetThanhToan: typeof resetThanhToan;
}

class KhachThanhToanPSC extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.resetThanhToan();
    const {tienGiamGia, arrProductPSC} = this.props;
    const tongTienTmp = getTongTienHangPSC(arrProductPSC);
    const giamGiaTmp = tienGiamGia || 0;

    const khachCanTraTmp = tongTienTmp - giamGiaTmp;
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
  const {tienGiamGia, arrProductPSC} = state.CreatePSCReducer;

  const {arrFormPayment} = state.FormPaymentReducer;

  return {
    arrProductPSC,

    tienGiamGia,
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

export default connect(mapStateToProps, mapDispatchToProps)(KhachThanhToanPSC);

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
