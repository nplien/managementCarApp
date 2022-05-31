import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {paymentStyles} from '../../list/styles/Payment.style';

interface IRowViewPaymentProps {
  color: string;
  title: string;
  value: string;
  isText?: boolean;
  isSpaceBetween: boolean;
}

export default class PaymentRowView extends PureComponent<IRowViewPaymentProps> {
  render() {
    const {color, title, value, isText, isSpaceBetween} = this.props;
    if (isSpaceBetween) {
      return (
        <MyView style={paymentStyles.containerRowView2} transparent>
          <MyText numberOfLines={1} myFontStyle={'Bold'}>
            {title}
          </MyText>
          {isText ? (
            <MyText numberOfLines={1} style={{color}}>
              {value}
            </MyText>
          ) : (
            <MyTextPriceMask myFontStyle={'Bold'} style={{color}} text={value} />
          )}
        </MyView>
      );
    }
    return (
      <MyView style={[paymentStyles.containerRowView, paymentStyles.padding]} transparent>
        <MyText style={{flex: 1}} numberOfLines={1} myFontStyle={'Bold'}>
          {title}
        </MyText>
        {isText ? (
          <MyText numberOfLines={1} style={{color, flex: 1}}>
            {value}
          </MyText>
        ) : (
          <MyTextPriceMask myFontStyle={'Bold'} style={{color, flex: 1}} text={value} />
        )}
      </MyView>
    );
  }
}
