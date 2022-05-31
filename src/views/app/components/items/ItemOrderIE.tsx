import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {OrderIEModel} from 'models/Order.Model';
import {IExportModel} from 'models/ExportOrder.Model';

interface IItemOrderIEProps {
  itemOrder: IExportModel;
  getDetailOrder: (id: string) => void;
}
/**
 * item đơn hàng chuyển hàng, huỷ
 */
export class ItemOrderExport extends PureComponent<IItemOrderIEProps> {
  render() {
    const {id, created_at, total_export_price, status_name, sender, receiver, code} =
      this.props.itemOrder;

    return (
      <MyButton
        onPress={() => this.props.getDetailOrder(id.toString())}
        style={itemOrderStyles.container}>
        <MyView style={itemOrderStyles.infoProdCenter}>
          <MyText numberOfLines={2} style={itemOrderStyles.textLeft}>
            {String(code).toUpperCase()}
          </MyText>
          <MyTextPriceMask
            myFontStyle="Medium"
            text={total_export_price || 0}
            numberOfLines={1}
            style={itemOrderStyles.textRightBlue}
          />
        </MyView>
        <MyView
          style={[
            itemOrderStyles.infoProdCenter,
            {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)}
          ]}>
          <MyText
            numberOfLines={1}
            myFontStyle="Regular"
            style={[itemOrderStyles.textLeft, {color: COLOR.TEXT.GRAY}]}>
            {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY HH:mm')}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textRight}>
            {status_name}
          </MyText>
        </MyView>
        <MyView style={itemOrderStyles.infoProdCenter}>
          {sender && sender.name ? (
            <MyText
              numberOfLines={3}
              myFontStyle="Regular"
              style={[itemOrderStyles.textLeft, {fontSize: MY_SIZE.s_14, color: COLOR.TEXT.GRAY}]}>
              Từ
              <MyText
                numberOfLines={3}
                myFontStyle="Regular"
                style={[
                  itemOrderStyles.textLeft,
                  {fontSize: MY_SIZE.s_14, color: COLOR.TEXT.BLACK}
                ]}>
                {' ' + sender.name}
              </MyText>
              {receiver ? ' đến ' : ''}
              {receiver && (
                <MyText
                  numberOfLines={3}
                  myFontStyle="Regular"
                  style={[
                    itemOrderStyles.textLeft,
                    {fontSize: MY_SIZE.s_14, color: COLOR.TEXT.BLACK}
                  ]}>
                  {receiver.name}
                </MyText>
              )}
            </MyText>
          ) : null}
        </MyView>
      </MyButton>
    );
  }
}

/**
 * item đơn hàng nhập hàng
 */

interface IItemOrderImportProps {
  itemOrder: OrderIEModel;
  getDetailOrder: (id: string) => void;
}
export class ItemOrderImport extends PureComponent<IItemOrderImportProps> {
  render() {
    const {id, created_at, total_price, status_name, supplier, code} = this.props.itemOrder;

    return (
      <MyButton
        onPress={() => this.props.getDetailOrder(id.toString())}
        style={itemOrderStyles.container}>
        <MyView style={itemOrderStyles.infoProdCenter}>
          <MyText numberOfLines={2} style={itemOrderStyles.textLeft}>
            {String(code).toUpperCase()}
          </MyText>
          <MyTextPriceMask
            myFontStyle="Medium"
            text={total_price || 0}
            numberOfLines={1}
            style={itemOrderStyles.textRightBlue}
          />
        </MyView>
        <MyView
          style={[
            itemOrderStyles.infoProdCenter,
            {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)}
          ]}>
          <MyText
            numberOfLines={1}
            myFontStyle="Regular"
            style={[itemOrderStyles.textLeft, {color: COLOR.TEXT.GRAY}]}>
            {Utilities.convertUnixTimeByFormat(created_at, 'DD/MM/YYYY HH:mm')}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemOrderStyles.textRight}>
            {status_name}
          </MyText>
        </MyView>
        <MyView style={itemOrderStyles.infoProdCenter}>
          {supplier && supplier.name ? (
            <MyText
              numberOfLines={3}
              myFontStyle="Regular"
              style={[itemOrderStyles.textLeft, {fontSize: MY_SIZE.s_14, color: COLOR.TEXT.BLACK}]}>
              {supplier.name}
            </MyText>
          ) : null}
        </MyView>
      </MyButton>
    );
  }
}
const itemOrderStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  infoProdCenter: {justifyContent: 'space-between', flexDirection: 'row'},
  infoProdRight: {
    flex: 0.8,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  textRightBlue: {
    flex: 1,
    textAlign: 'right',
    fontSize: MY_SIZE.s_16,
    color: COLOR.TEXT.BLUE
  },
  textRight: {
    flex: 1,
    textAlign: 'right'
  },
  textLeft: {
    flex: 1,
    textAlign: 'left',
    fontSize: MY_SIZE.s_16
  }
});
