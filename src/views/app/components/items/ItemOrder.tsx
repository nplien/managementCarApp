import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {OrderModel} from 'models/Order.Model';

interface IItemOrderProps {
  itemOrder: Partial<OrderModel>;
  getDetailOrder?: (id: string) => void;
  isPress?: boolean;
}
/**
 * Item danh sách đơn hàng(lọc theo chi nhánh, loại đơn, mới nhất, cũ nhất)
 */
export class ItemOrder extends PureComponent<IItemOrderProps> {
  render() {
    const {id, customer, created_at, total_price, status_name, code} = this.props.itemOrder;

    return (
      <MyButton
        onPress={() => {
          if (this.props.isPress) return;
          this.props.getDetailOrder ? this.props.getDetailOrder(id?.toString() || '') : null;
        }}
        style={itemBillStyles.container}>
        <MyView style={itemBillStyles.infoProdCenter}>
          <MyText
            numberOfLines={1}
            myFontStyle="Medium"
            style={[itemBillStyles.textLeft, {fontSize: MY_SIZE.s_16}]}>
            {code}
          </MyText>
          <MyTextPriceMask
            myFontStyle="Medium"
            text={total_price || 0}
            numberOfLines={1}
            style={[itemBillStyles.textRight, {fontSize: MY_SIZE.s_16}]}
          />
        </MyView>

        <MyView
          style={[itemBillStyles.infoProdCenter, {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)}]}>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textNameLeft}>
            {customer?.name || '-'}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textStatusRight}>
            {status_name}
          </MyText>
        </MyView>

        <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textDateLeft}>
          {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY - HH:mm')}
        </MyText>
      </MyButton>
    );
  }
}

const itemBillStyles = StyleSheet.create({
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
    fontSize: MY_SIZE.s_12
  }
});
