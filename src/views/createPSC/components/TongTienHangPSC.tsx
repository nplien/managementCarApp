import React, {PureComponent} from 'react';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import Utilities from 'utils/Utilities';
import {ICreatePSCState} from '../redux';

interface IProps extends ICreatePSCState {}

class TongTienHangPSC extends PureComponent<IProps> {
  render() {
    const {arrProductPSC} = this.props;

    let tongSo = 0;
    let tongGia = 0;

    if (arrProductPSC) {
      for (let index = 0; index < arrProductPSC.length; index++) {
        const item = arrProductPSC[index];
        tongSo = tongSo + item.totalQty;

        let price = item.phuTung?.price || 0;

        if (item.phuTung?.price) {
          price = item.phuTung.price;
        }

        tongGia = tongGia + price * item.totalQty;
      }
    }

    return (
      <MyView style={thanhToanStyles.viewItem}>
        <MyView style={thanhToanStyles.contentRow}>
          <MyText myFontStyle="Regular" style={thanhToanStyles.txtTitle}>
            Tổng tiền hàng
          </MyText>
          <MyTextPriceMask
            hideCurrency
            text={Utilities.convertCount(tongSo)}
            numberOfLines={1}
            style={thanhToanStyles.txtCount}
          />
        </MyView>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={Utilities.convertCount(tongGia)}
          numberOfLines={1}
          style={[thanhToanStyles.textRight, {color: COLOR.TEXT.BLUE}]}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductPSC} = state.CreatePSCReducer;
  return {
    arrProductPSC
  };
};

export default connect(mapStateToProps, null)(TongTienHangPSC);
