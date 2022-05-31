import * as React from 'react';
import {MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {paymentStyles} from '../styles/Payment.style';
import {ItemPaymentOrder} from 'views/app/components/items/ItemPaymentOrder';
import {ItemLineIndicator} from 'views/app/components/items';
import {IAppNavigateProps} from 'views/app';

type IOrderProps = IAppNavigateProps<'PaymentOfOrder'>;

interface IOrderState {}

/**
 *  1. danh sách thanh toán của đơn hàng(từ đơn hàng chi tiết sang)
 */
export default class PaymentOfOrder extends React.PureComponent<IOrderProps, IOrderState> {
  render() {
    return (
      <MyView style={paymentStyles.container} transparent>
        {/* <MyView style={paymentStyles.viewTotal}> */}
        <MyText myFontStyle={'Regular'} style={paymentStyles.textSum}>
          {'Tổng số ' + this.props.route.params.list.length + ' phiếu thanh toán'}
        </MyText>
        {/* </MyView> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.route.params.list}
          extraData={this.props.route.params.list}
          ItemSeparatorComponent={() => <ItemLineIndicator />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <ItemPaymentOrder itemPayment={item} />;
          }}
        />
      </MyView>
    );
  }
}
