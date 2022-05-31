import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {detailStyles} from '../styles/DetailOrder.style';

interface IBotPriceProps {
  title: string;
  value: number | string;
  isStock?: boolean;
  stock_quantity?: number;
  isText?: boolean;
  color: string | null;
}

export default class BotPriceView extends PureComponent<IBotPriceProps> {
  render() {
    const {value, title, isStock, stock_quantity, isText, color} = this.props;
    return (
      <MyView style={detailStyles.eachPriceView}>
        <MyView style={detailStyles.infoPrice}>
          <MyText style={detailStyles.textTitlePrice}>{title}</MyText>
        </MyView>
        {isStock ? (
          <MyView style={detailStyles.viewStock}>
            <MyText style={detailStyles.txtStock} numberOfLines={1}>
              {stock_quantity}
            </MyText>
          </MyView>
        ) : (
          <MyView style={detailStyles.viewStockEmpty} />
        )}
        <MyView style={[detailStyles.infoPrice, {flex: 0.7}]}>
          {isText ? (
            <MyText
              myFontStyle={'Regular'}
              style={[detailStyles.priceRight, {color: color || COLOR.TEXT.BLACK}]}>
              {value}
            </MyText>
          ) : (
            <MyTextPriceMask
              numberOfLines={1}
              myFontStyle={'Regular'}
              text={value}
              style={[detailStyles.priceRight, {color: color || COLOR.TEXT.BLACK}]}
            />
          )}
        </MyView>
      </MyView>
    );
  }
}
