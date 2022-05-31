import {MyText, MyView, MyButton, MyImage} from 'bases/components';
import React, {PureComponent} from 'react';
import {Linking, StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {DeliveryModel} from 'models/Order.Model';
import {DOI_TAC_GIAO_HANG} from 'configs/FilterConfig';

interface IItemDeliveryProps {
  itemOrder: DeliveryModel;
  getDetailOrder: (id: string) => void;
}
/**
 * item đơn hàng nhập hàng , chuyển hàng, huỷ
 */
export class ItemDelivery extends PureComponent<IItemDeliveryProps> {
  callReceiver = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  render() {
    if (this.props.itemOrder) {
      const {
        id,
        total_order_price,
        provider_name,
        provider_code,
        total_shipping_fee,
        created_at,
        status_name,
        order_code,
        sender_address,
        receiver_address,
        receiver_name,
        receiver_phone,
        customer_id,
        code
      } = this.props.itemOrder;

      let logo_giaohang = null;
      if (provider_code === DOI_TAC_GIAO_HANG.GHN) {
        logo_giaohang = require('../../../../assets/images/ghn.png');
      } else if (provider_code === DOI_TAC_GIAO_HANG.GHTK) {
        logo_giaohang = require('../../../../assets/images/ghtk.png');
      } else if (provider_code === DOI_TAC_GIAO_HANG.AHA_MOVE) {
        logo_giaohang = require('../../../../assets/images/ahamove.png');
      } else {
        logo_giaohang = null;
      }

      return (
        <MyButton
          onPress={() => this.props.getDetailOrder(id.toString())}
          style={itemOrderStyles.container}>
          <MyView style={itemOrderStyles.infoProdCenter}>
            <MyText numberOfLines={2} myFontStyle="Medium" style={itemOrderStyles.textLeft}>
              {code || '---'}
              {'\n' + order_code}
            </MyText>
            <MyText
              myFontStyle="Medium"
              numberOfLines={1}
              style={[itemOrderStyles.textRight, {color: COLOR.TEXT.BLUE}]}>
              {Utilities.convertCurrency(Number(total_order_price || 0))}
            </MyText>
          </MyView>
          <MyView style={[itemOrderStyles.infoProdCenter]}>
            <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textLeft}>
              {provider_name}
            </MyText>
            {logo_giaohang && (
              <MyImage
                height={24}
                width={24}
                disableRadius
                source={logo_giaohang}
                resizeMode="contain"
              />
            )}
            {/* <MyView style={itemOrderStyles.textPhiGiao}> */}
            <MyText style={itemOrderStyles.textPhiGiao} numberOfLines={1} myFontStyle="Regular">
              {'Phí: ' + Utilities.convertCurrency(Number(total_shipping_fee || 0))}
            </MyText>
            {/* </MyView> */}
          </MyView>

          <MyView style={itemOrderStyles.infoProdCenter}>
            <MyText
              numberOfLines={2}
              myFontStyle="Regular"
              style={[itemOrderStyles.textLeft, {color: COLOR.TEXT.PRIMARY}]}>
              {Utilities.convertUnixTimeByFormat(created_at || 0, 'DD/MM/YYYY HH:mm')}
            </MyText>
            <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textRight}>
              {status_name}
            </MyText>
          </MyView>

          <MyView style={[itemOrderStyles.infoProdCenter, {...setMargin(MY_SIZE.s_4, 0, 0, 0)}]}>
            <MyText
              myFontStyle="Regular"
              style={[itemOrderStyles.textLeft, {fontSize: MY_SIZE.s_12}]}>
              {sender_address}
            </MyText>
            <MyText
              onPress={() => {
                this.callReceiver(receiver_phone);
              }}
              myFontStyle="Regular"
              style={[itemOrderStyles.textRight, {fontSize: MY_SIZE.s_12, color: COLOR.TEXT.BLUE}]}>
              {receiver_address}
              {'\n'}
              {receiver_name && customer_id === 0
                ? receiver_name || ''
                : '(' + receiver_name + ' - ' + receiver_phone + ')'}
            </MyText>
          </MyView>
        </MyButton>
      );
    }
    return null;
  }
}

const itemOrderStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  infoProdCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // flex: 1,
    // ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  infoProdRight: {
    flex: 1,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  textRight: {
    flex: 1,
    textAlign: 'right'
  },

  textLeft: {
    flex: 1,
    textAlign: 'left'
  },
  textPhiGiao: {
    flex: 1,
    textAlign: 'right'
  }
});
