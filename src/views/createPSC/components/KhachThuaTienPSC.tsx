import React, {PureComponent} from 'react';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {ICreatePSCState} from '../redux';
import {IFormPaymentState} from 'views/banhang/formPayment/redux';
import Utilities, {getTongTienHangPSC} from 'utils/Utilities';

interface IProps extends ICreatePSCState, IFormPaymentState {}

class KhachThuaTienPSC extends PureComponent<IProps> {
  render() {
    const {tienGiamGia, arrProductPSC} = this.props;
    const tongTienTmp = getTongTienHangPSC(arrProductPSC);
    const giamGiaTmp = tienGiamGia || 0;

    const khachCanTraTmp = tongTienTmp - giamGiaTmp;
    let soTienDaTra = 0;

    const {arrFormPayment} = this.props;
    if (arrFormPayment) {
      for (let index = 0; index < arrFormPayment.length; index++) {
        const element = arrFormPayment[index];
        soTienDaTra = soTienDaTra + (element.value || 0);
      }
    }

    const tienThua = Math.max(soTienDaTra - khachCanTraTmp, 0);

    return (
      <MyView style={thanhToanStyles.viewItemSecond}>
        <MyText myFontStyle="Regular" style={thanhToanStyles.txtTitle}>
          Tiền thừa trả khách
        </MyText>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={Utilities.convertCount(tienThua)}
          numberOfLines={1}
          style={[thanhToanStyles.textRight, {color: COLOR.TEXT.BLUE}]}
        />
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

export default connect(mapStateToProps, null)(KhachThuaTienPSC);
