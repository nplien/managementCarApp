import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {formPaymentStyle} from '../styles/FormPayment.Styles';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps extends IThanhToanState, IInforShippingState, ICreateSaleState {}

class SoTienCanTra extends PureComponent<IProps> {
  render() {
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

    return (
      <MyView style={formPaymentStyle.viewItem}>
        <MyText myFontStyle="Regular" style={formPaymentStyle.txtTitle}>
          Khách cần trả
        </MyText>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={Utilities.convertCount(tongTienTmp - giamGiaTmp + phiShip)}
          numberOfLines={1}
          style={[formPaymentStyle.textRight, {color: COLOR.TEXT.GREEN}]}
        />
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

export default connect(mapStateToProps, null)(SoTienCanTra);
