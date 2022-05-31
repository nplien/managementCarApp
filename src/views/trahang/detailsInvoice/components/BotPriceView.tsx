import {MyButton, MyIcon, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {detailStyles} from '../styles/DetailTraHang.style';

interface IBotPriceProps {
  title: string;
  value: number | string;
  isStock?: boolean;
  stock_quantity?: number;
  isText?: boolean;
  color: string | null;
  userPayment?: number | string;
  onPress?: () => void;
  disabled?: boolean;
}

export default class BotPriceView extends PureComponent<IBotPriceProps> {
  render() {
    const {value, title, isStock, stock_quantity, isText, color, onPress, userPayment, disabled} =
      this.props;

    return (
      <MyButton disabled={disabled} onPress={onPress} style={detailStyles.eachPriceView}>
        <MyView transparent style={detailStyles.infoPrice}>
          <MyText style={detailStyles.textTitlePrice}>{title}</MyText>
        </MyView>
        {isStock ? (
          <MyView style={detailStyles.viewStock}>
            <MyText numberOfLines={1}>{stock_quantity}</MyText>
          </MyView>
        ) : (
          <MyView transparent style={detailStyles.viewStockEmpty} />
        )}
        <MyView transparent style={[detailStyles.infoPriceRight]}>
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
          {userPayment && userPayment > 0 ? (
            <MyIcon
              iconFontType="SimpleLineIcons"
              name={'arrow-right'}
              color={COLOR.TEXT.BLUE}
              size={12}
              style={detailStyles.iconPrice}
            />
          ) : null}
        </MyView>
      </MyButton>
    );
  }
}
