import {MyInput, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';

import {paymentStyles} from '../styles/PaymentImport.Style';

export default class InputGiamGia extends PureComponent {
  render() {
    return (
      <MyView>
        <MyView style={paymentStyles.containerChild}>
          <MyView style={paymentStyles.childflexDirection}>
            <MyText myFontStyle="Regular">Giảm giá</MyText>
            <MyText style={paymentStyles.txtCountPrice}>VND</MyText>
            <MyText style={paymentStyles.txtCountPrice}>%</MyText>
          </MyView>
          <MyInput
            textAlign="right"
            keyboardType="number-pad"
            containerStyle={paymentStyles.input}
          />
        </MyView>
        <MyView style={paymentStyles.line} />
      </MyView>
    );
  }
}
