import React, {PureComponent} from 'react';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {ICreateSaleState} from 'views/banhang/createSale/redux';
import {BANG_GIA_CHUNG} from 'common/Constants';
import Utilities from 'utils/Utilities';

interface IProps extends ICreateSaleState {}

class TongTienHang extends PureComponent<IProps> {
  render() {
    const {arrProductSale} = this.props;

    let tongSo = 0;
    let tongGia = 0;

    if (arrProductSale) {
      for (let index = 0; index < arrProductSale.length; index++) {
        const item = arrProductSale[index];
        tongSo = tongSo + item.totalQty;

        const {price_books} = item.product;
        let price = item.product.price || 0;
        if (price_books) {
          let found = price_books.findIndex(x => x.id === item.price_books.id);
          if (found > -1) {
            price = price_books[found].price || item.product.price || 0;
          }
        }
        if (
          item.price_books.id === BANG_GIA_CHUNG.id &&
          item.product.discount &&
          item.product.price
        ) {
          price = item.product.price;
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
  const {arrProductSale} = state.CreateSaleReducer;
  return {
    arrProductSale
  };
};

export default connect(mapStateToProps, null)(TongTienHang);
