import React, {PureComponent} from 'react';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {IThanhToanState} from '../redux';
import {IFormPaymentState} from 'views/banhang/formPayment/redux';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps
  extends IThanhToanState,
    IFormPaymentState,
    IInforShippingState,
    ICreateSaleState {}

class KhachThuaTien extends PureComponent<IProps> {
  render() {
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

export default connect(mapStateToProps, null)(KhachThuaTien);
