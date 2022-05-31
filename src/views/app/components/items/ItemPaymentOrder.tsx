import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {PaymentModel} from 'models/Order.Model';

interface IItemPaymentProps {
  itemPayment: PaymentModel;
}

export class ItemPaymentOrder extends PureComponent<IItemPaymentProps> {
  render() {
    const {created_at, created_by, value, method_name, code} = this.props.itemPayment;

    return (
      <MyButton style={itemPaymentStyles.container}>
        <MyView style={itemPaymentStyles.infoProdCenter}>
          <MyText
            numberOfLines={1}
            myFontStyle="Medium"
            style={[itemPaymentStyles.textLeft, {fontSize: MY_SIZE.s_16}]}>
            {code}
          </MyText>
          <MyTextPriceMask
            myFontStyle="Medium"
            text={value || 0}
            numberOfLines={1}
            style={[itemPaymentStyles.textRight, {fontSize: MY_SIZE.s_16}]}
          />
        </MyView>

        <MyView
          style={[
            itemPaymentStyles.infoProdCenter,
            {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)}
          ]}>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemPaymentStyles.textNameLeft}>
            {created_by?.id || ''} - {created_by?.name || '-'}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemPaymentStyles.textStatusRight}>
            {method_name}
          </MyText>
        </MyView>

        <MyText numberOfLines={1} myFontStyle="Regular" style={itemPaymentStyles.textDateLeft}>
          {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY - HH:mm')}
        </MyText>
      </MyButton>
    );
  }
}

const itemPaymentStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  infoProdCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoProdRight: {
    flex: 1,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_8, 0, 0)
  },
  textRight: {
    textAlign: 'right',
    flex: 1,
    color: COLOR.TEXT.BLUE
  },
  textStatusRight: {
    textAlign: 'right',
    color: COLOR.TEXT.BLACK,
    flex: 1
  },
  textLeft: {
    textAlign: 'left',
    flex: 1
  },
  textNameLeft: {
    textAlign: 'left',
    flex: 2
  },
  textDateLeft: {
    color: COLOR.TEXT.BLACK,
    textAlign: 'left',
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_0, 0, 0)
  }
});
