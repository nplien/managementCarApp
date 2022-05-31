import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import HeaderSoQuy from './components/HeaderSoQuy';
import SortSoQuy from './components/SortSoQuy';
import PaymentList from './components/PaymentList';
import {paymentStyles} from './styles/Payment.style';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'PaymentHome'>;

export default class SoQuy extends PureComponent<IProps> {
  componentDidMount() {
    if (this.props.route?.params?.isFromReport) {
      this.props.navigation.setOptions({headerTitle: 'Tổng kết thu chi'});
    }
  }

  render() {
    return (
      <MyView style={paymentStyles.container}>
        <MyView style={paymentStyles.filterContainer}>
          <HeaderSoQuy />
          <SortSoQuy />
        </MyView>
        <PaymentList />
      </MyView>
    );
  }
}
