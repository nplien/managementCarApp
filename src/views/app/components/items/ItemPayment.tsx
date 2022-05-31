import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {PaymentModel} from 'models/Order.Model';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';

interface IItemPaymentProps {
  itemPayment: PaymentModel;
  getDetailPayment: (id: string) => void;
}

export class ItemPayment extends PureComponent<IItemPaymentProps> {
  render() {
    const {id, code, type, value, status_name, created_at} = this.props.itemPayment;

    return (
      <MyButton
        onPress={() => this.props.getDetailPayment(id.toString())}
        style={itemPaymentStyles.container}>
        <MyView style={itemPaymentStyles.infoProdCenter}>
          <MyText
            numberOfLines={1}
            myFontStyle="Medium"
            style={[itemPaymentStyles.textLeft, {fontSize: MY_SIZE.s_16}]}>
            {code?.toString().toUpperCase()}
          </MyText>
          <MyTextPriceMask
            myFontStyle="Medium"
            text={value || 0}
            numberOfLines={1}
            style={itemPaymentStyles.textRightBlue}
          />
        </MyView>
        <MyText
          numberOfLines={1}
          myFontStyle="Regular"
          style={[itemPaymentStyles.textLeft, {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)}]}>
          {type === SO_QUY_TYPE.THU ? 'Phiếu thu' : 'Phiếu chi'}
        </MyText>
        <MyView style={itemPaymentStyles.infoProdCenter}>
          <MyText
            numberOfLines={1}
            myFontStyle="Regular"
            style={[itemPaymentStyles.textLeft, {color: COLOR.TEXT.GRAY}]}>
            {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY HH:mm')}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemPaymentStyles.textRight}>
            {status_name}
          </MyText>
        </MyView>
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
  textRightBlue: {
    flex: 1,
    textAlign: 'right',
    color: COLOR.TEXT.BLUE
  },
  textRight: {
    flex: 1,
    textAlign: 'right'
  },
  textLeft: {
    flex: 1,
    textAlign: 'left'
  }
});
