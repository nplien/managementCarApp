import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import {OrderModel} from 'models/Order.Model';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';

interface IItemOrderDetailCustomerProps {
  itemOrder: OrderModel;
}
/**
 * item danh sách đơn hàng trả về theo id khách hàng
 */
export class ItemOrderDetailCustomer extends PureComponent<IItemOrderDetailCustomerProps> {
  render() {
    return (
      <MyButton style={itemOrderStyles.container}>
        <MyView style={itemOrderStyles.infoProdCenter}>
          <MyTextPriceMask
            numberOfLines={1}
            myFontStyle="Medium"
            text={410410}
            style={itemOrderStyles.textPriceLeft}
          />
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textLeft}>
            SP00000000000
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textLeft}>
            Trang thai don hang
          </MyText>
        </MyView>
        <MyView style={itemOrderStyles.infoProdRight}>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textRight}>
            16/1/2021 11:53
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textRight}>
            adminsdkasjdklasjkldjsal;jdklasjoid
          </MyText>
        </MyView>
      </MyButton>
    );
  }
}

const itemOrderStyles = StyleSheet.create({
  container: {
    height: Utilities.getHeightScreen() * 0.1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(0, 0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  infoProdCenter: {
    flex: 1,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  infoProdRight: {
    flex: 0.5,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  textRight: {
    textAlign: 'right'
  },
  textLeft: {
    textAlign: 'left'
  },
  textPriceLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_16,
    color: COLOR.TEXT.BLUE
  }
});
