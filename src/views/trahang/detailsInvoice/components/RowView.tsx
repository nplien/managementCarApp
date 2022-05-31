import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {detailStyles} from '../styles/DetailTraHang.style';

interface IBotPriceProps {
  title: string;
  value: number | string;
  isStock?: boolean;
  stock_quantity?: number;
  isText?: boolean;
}

export default class RowView extends PureComponent<IBotPriceProps> {
  render() {
    const {value, title, isStock, stock_quantity, isText} = this.props;
    return (
      <MyView style={detailStyles.eachPriceView}>
        <MyView style={detailStyles.infoTitleView}>
          <MyText style={detailStyles.textTitlePrice}>{title}</MyText>
        </MyView>
        {isStock ? (
          <MyView style={detailStyles.viewStock}>
            <MyText>{stock_quantity}</MyText>
          </MyView>
        ) : (
          <MyView style={detailStyles.viewStockEmpty} />
        )}
        <MyView style={detailStyles.infoPrice}>
          {isText ? (
            <MyText numberOfLines={4} myFontStyle={'Regular'} style={detailStyles.priceRight}>
              {value}
            </MyText>
          ) : (
            <MyTextPriceMask
              numberOfLines={1}
              myFontStyle={'Regular'}
              text={value}
              style={detailStyles.priceRight}
            />
          )}
        </MyView>
      </MyView>
    );
  }
}
