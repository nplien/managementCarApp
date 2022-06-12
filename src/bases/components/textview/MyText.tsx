import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

import {TextMask, TextInputMaskProps} from 'react-native-masked-text';

import {PRICE_MASK} from 'common/Constants';
import {COLOR, MY_SIZE} from 'bases/styles/Core';

export interface IPropsMyText extends TextProps {
  myFontStyle?:
    | 'Regular'
    | 'Medium'
    | 'Bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 *
 */
export const MyText = (props: IPropsMyText) => {
  const {children, myFontStyle} = props;
  let textStyle = {};
  if (myFontStyle) {
    switch (myFontStyle) {
      case 'Bold':
        textStyle = {
          fontWeight: 'bold'
        };
        break;
      case 'Medium':
        textStyle = {
          fontWeight: '500'
        };
        break;
      case 'Regular':
        textStyle = {
          fontWeight: 'normal'
        };
        break;
      default:
        textStyle = {
          fontWeight: myFontStyle
        };
        break;
    }
  } else {
    textStyle = {
      fontWeight: 'normal'
    };
  }

  return (
    <Text {...props} style={[styles.text, textStyle, props.style]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

interface IPropsMask extends Partial<TextInputMaskProps>, IPropsMyText {
  text: number | string | 0;
  currency?: 'VND' | 'USD';
  hideCurrency?: boolean;
}

/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 ** currency default 'VND'
 */
export const MyTextPriceMask = (props: IPropsMask) => {
  const {text, currency, myFontStyle, style, hideCurrency} = props;
  let money = String(text);
  let option = null;
  if (currency && currency !== 'VND') {
    /* cau hinh don vi sau dau phay la 2 ~ 100, 3 ~ 1000 */
    money = String(Number(text) * 100);
    option = PRICE_MASK[currency];
  } else {
    option = PRICE_MASK.VND;
  }
  if (hideCurrency) {
    option = PRICE_MASK.HIDE;
  }
  let textStyle = {};
  if (myFontStyle) {
    switch (myFontStyle) {
      case 'Bold':
        textStyle = {
          fontWeight: 'bold'
        };
        break;
      case 'Medium':
        textStyle = {
          fontWeight: '500'
        };
        break;
      default:
        textStyle = {
          fontWeight: 'normal'
        };
        break;
    }
  } else {
    textStyle = {
      fontWeight: 'normal'
    };
  }

  return (
    <TextMask
      {...props}
      numberOfLines={1}
      allowFontScaling={false}
      value={money}
      style={[styles.text, style, textStyle]}
      type="money"
      options={option}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLOR.TEXT.PRIMARY,
    fontSize: MY_SIZE.s_14
  }
});
