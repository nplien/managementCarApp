import React, {PureComponent} from 'react';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {IThanhToanState} from '../redux';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps extends IThanhToanState, IInforShippingState, ICreateSaleState {}

class KhachCanTra extends PureComponent<IProps> {
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

    return (
      <MyView style={thanhToanStyles.viewItem2}>
        <MyText myFontStyle="Regular" style={thanhToanStyles.txtTitle}>
          Khách cần trả
        </MyText>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={Utilities.convertCount(tongTienTmp - giamGiaTmp + phiShip)}
          numberOfLines={1}
          style={[thanhToanStyles.textRight, {color: COLOR.TEXT.RED}]}
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

export default connect(mapStateToProps, null)(KhachCanTra);
