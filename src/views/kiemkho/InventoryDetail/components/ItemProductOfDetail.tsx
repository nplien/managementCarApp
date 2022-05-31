import React, {PureComponent} from 'react';
import {MyView, MyText} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {itemDetailStyles} from '../styles/InventoryDetail.style';
import {ProductOfInventory} from 'models/Inventory.Model';

interface IProps {
  item: ProductOfInventory;
}

export default class ItemProductOfDetail extends PureComponent<IProps> {
  render() {
    const {item} = this.props;

    const tonKho = item.total_quantity;
    const thucTe = item.total_actual;
    let lech: number = 0;
    if (item.total_actual && item.total_quantity) {
      lech = item.total_actual - item.total_quantity;
    }

    return (
      <MyView style={itemDetailStyles.container}>
        <MyView style={itemDetailStyles.contentHeader}>
          <MyText style={itemDetailStyles.titleValue}>{item.name}</MyText>
          <MyText myFontStyle="Medium">{item.sku}</MyText>
        </MyView>
        <MyView style={itemDetailStyles.content2}>
          <MyText style={itemDetailStyles.titleValue}>{tonKho}</MyText>
        </MyView>
        <MyView style={itemDetailStyles.content2}>
          <MyText style={[itemDetailStyles.titleValue, {color: COLOR.TEXT.BLUE}]}>{thucTe}</MyText>
        </MyView>
        <MyView style={itemDetailStyles.content2}>
          <MyText style={[itemDetailStyles.titleValue, {color: COLOR.TEXT.RED}]}>{lech}</MyText>
        </MyView>
      </MyView>
    );
  }
}
