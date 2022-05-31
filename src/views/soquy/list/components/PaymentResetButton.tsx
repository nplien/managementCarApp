import * as React from 'react';
import {MyButton, MyText, MyView} from 'bases/components';
import {paymentStyles} from '../styles/Payment.style';

interface IOrderProps {
  getPress: () => void;
}

interface IOrderState {}

export default class PaymentResetButton extends React.PureComponent<IOrderProps, IOrderState> {
  render() {
    return (
      <MyView style={paymentStyles.containerCenter}>
        <MyButton style={paymentStyles.buttonReset} onPress={() => this.props.getPress()}>
          <MyText style={paymentStyles.textReset}>Tải lại</MyText>
        </MyButton>
      </MyView>
    );
  }
}
