import {MyText, MyTextPriceMask, MyView} from 'bases/components';
// import { setPadding} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {detailStyles} from '../styles/DetailOrder.style';

interface IBotPriceProps {
  title: string;
  value: number | string;
  isStock?: boolean;
  stock_quantity?: number;
  isText?: boolean;
  styleRight?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default class RowView extends PureComponent<IBotPriceProps> {
  render() {
    const {value, title, isStock, stock_quantity, isText, styleRight, onPress} = this.props;
    return (
      <MyView style={detailStyles.eachPriceView}>
        <MyView style={detailStyles.viewTitle}>
          <MyView style={detailStyles.infoTitleView}>
            <MyText myFontStyle="Regular" style={detailStyles.textTitlePrice}>
              {title}
            </MyText>
          </MyView>
          {isStock ? (
            <MyView style={detailStyles.viewStock}>
              <MyText>{stock_quantity}</MyText>
            </MyView>
          ) : null}
        </MyView>
        <MyView style={detailStyles.infoPrice}>
          {isText ? (
            <MyText
              onPress={onPress}
              numberOfLines={4}
              myFontStyle={'Regular'}
              style={[detailStyles.priceRight, styleRight || {}]}>
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
