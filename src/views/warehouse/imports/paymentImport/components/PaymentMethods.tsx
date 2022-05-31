import {MyText, MyView} from 'bases/components';
import {MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';

import {paymentStyles} from '../styles/PaymentImport.Style';

export default class PaymentMethods extends PureComponent {
  render() {
    return (
      <MyView style={paymentStyles.viewPayment}>
        <MyText myFontStyle="Regular" style={paymentStyles.txtpayment}>
          Phương thức thanh toán
        </MyText>
        <MyView transparent style={paymentStyles.viewChildPayment}>
          <MyText style={[paymentStyles.txtTotal, {marginRight: MY_SIZE.s_8}]}>
            Tiền mặt
          </MyText>
          {/* <MyIcon name="right" iconFontType="AntDesign" size={20} color={COLOR.TEXT.BLACK} /> */}
        </MyView>
      </MyView>
    );
  }
}
