import {MyTextPriceMask, MyView} from 'bases/components';
import React, {PureComponent} from 'react';

import {BottomViewStyle} from '../styles/CreateSale.styles';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICreateSaleState} from '../redux';
import {BANG_GIA_CHUNG} from 'common/Constants';
import Utilities from 'utils/Utilities';

interface IProps extends ICreateSaleState {}

class GioHang extends PureComponent<IProps> {
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
      <MyView transparent style={BottomViewStyle.containerGioHang}>
        <MyTextPriceMask
          hideCurrency
          text={Utilities.convertCount(tongSo)}
          numberOfLines={1}
          style={BottomViewStyle.txtCount}
        />
        <MyTextPriceMask
          text={Utilities.convertCount(tongGia)}
          numberOfLines={1}
          myFontStyle="Regular"
          style={BottomViewStyle.priceGioHang}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;
  return {arrProductSale};
};

export default connect(mapStateToProps, null)(GioHang);
