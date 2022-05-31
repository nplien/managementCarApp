import {MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';

import {KIND_OF_SCREEN} from 'common/Constants';
import {OrderModel, OrderIEModel} from 'models/Order.Model';

interface IItemOrderProps {
  itemOrder: OrderModel | OrderIEModel;
}
/**
 * Item danh sách đơn hàng(lọc theo chi nhánh, loại đơn, mới nhất, cũ nhất)
 */
export class ItemSupplierHistory extends PureComponent<IItemOrderProps> {
  render() {
    const {id, created_at, status, created_by, total_quantity} = this.props.itemOrder;

    return (
      <MyView style={itemBillStyles.container}>
        <MyView style={itemBillStyles.infoProdCenter}>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textLeft}>
            {id}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textNameLeft}>
            {created_by ? created_by?.name : ''}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textNameLeft}>
            {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY HH:mm')}
          </MyText>
        </MyView>
        <MyView style={itemBillStyles.infoProdRight}>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textStatusRight}>
            Tổng cộng: {total_quantity ? total_quantity : 0}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemBillStyles.textStatusRight}>
            {Utilities.setStatusOrderContent(KIND_OF_SCREEN.INVOICE, status || '')}
          </MyText>
        </MyView>
      </MyView>
    );
  }
}

const itemBillStyles = StyleSheet.create({
  container: {
    // height: Utilities.getHeightScreen() * 0.1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(0, 0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  infoProdCenter: {
    flex: 1,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  infoProdRight: {
    flex: 0.8,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  textRight: {
    textAlign: 'right',

    color: COLOR.TEXT.BLUE
  },
  textStatusRight: {
    textAlign: 'right',
    color: COLOR.TEXT.BLACK
  },
  textLeft: {
    textAlign: 'left',
    color: COLOR.TEXT.BLUE
  },
  textNameLeft: {
    textAlign: 'left'
  }
});
