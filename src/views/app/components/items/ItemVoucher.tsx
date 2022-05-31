import {MyText, MyView, MyButton, MyImage} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {VoucherModel} from 'models/Voucher.Model';
import MyNavigator from 'utils/MyNavigator';

interface IItemPaymentProps {
  itemVoucher: VoucherModel;
}

export class ItemVoucher extends PureComponent<IItemPaymentProps> {
  render() {
    const {
      id,
      name,
      status,
      content,
      applied_start_time,
      applied_stop_time,
      thumbnail_url,
      status_name
    } = this.props.itemVoucher;
    const imageVoucher = thumbnail_url || null;
    const timeNow = new Date().getTime();
    const lengthStart = applied_start_time
      ? timeNow.toString().length - applied_start_time?.toString().length
      : 0;
    const lengthExpire = applied_stop_time
      ? timeNow.toString().length - applied_stop_time?.toString().length
      : 0;
    const timeStart =
      lengthStart > 0 && (lengthStart === 3 || lengthStart === 4)
        ? Number(applied_start_time) * 1000
        : Number(applied_start_time);
    const timeExpire =
      lengthExpire > 0 && (lengthExpire === 3 || lengthExpire === 4)
        ? Number(applied_stop_time) * 1000
        : Number(applied_stop_time);
    return (
      <MyButton
        style={itemVoucherStyles.container}
        onPress={() => MyNavigator.push('VoucherDetail', {id})}>
        {imageVoucher ? (
          <MyImage
            resizeMode={'cover'}
            style={itemVoucherStyles.image}
            height={itemVoucherStyles.viewImage.height}
            width={itemVoucherStyles.viewImage.width}
            source={{
              uri: imageVoucher
            }}
          />
        ) : (
          <MyView style={itemVoucherStyles.viewImage}>
            <MyText
              numberOfLines={1}
              myFontStyle={'Medium'}
              style={itemVoucherStyles.textImageCenter}>
              Voucher
            </MyText>
          </MyView>
        )}

        <MyView style={itemVoucherStyles.infoProdCenter}>
          <MyText numberOfLines={2} myFontStyle="Regular" style={itemVoucherStyles.textVoucher}>
            {name}
          </MyText>
          {content ? (
            <MyText
              numberOfLines={1}
              myFontStyle="Regular"
              style={itemVoucherStyles.textVoucherDes}>
              {content}
            </MyText>
          ) : null}
          <MyText
            numberOfLines={1}
            myFontStyle="Regular"
            style={[
              itemVoucherStyles.textStockRight,
              {color: status === 'active' ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}
            ]}>
            {status_name}
          </MyText>
          <MyText numberOfLines={1} myFontStyle="Regular" style={itemVoucherStyles.textStockRight}>
            {'Từ: ' + Utilities.convertTimeByFormat(timeStart, 'DD/MM/YYYY')}
            {timeExpire ? ' đến ' + Utilities.convertTimeByFormat(timeExpire, 'DD/MM/YYYY') : ''}
          </MyText>
        </MyView>
      </MyButton>
    );
  }
}

const itemVoucherStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  infoProdCenter: {
    flex: 1,
    ...setMargin(0, 0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  infoProdRight: {
    flex: 0.6,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  textPriceRight: {
    textAlign: 'right'
  },
  textVoucher: {
    fontSize: MY_SIZE.s_16
  },
  textVoucherDes: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_4, 0, 0, 0)
  },
  textIDCenter: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_12,
    color: COLOR.TEXT.BLUE
  },
  textStockRight: {
    color: COLOR.TEXT.GRAY,
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_4, 0, 0, 0)
  },
  textTimeRight: {
    color: COLOR.TEXT.BLUE,
    fontSize: MY_SIZE.s_12
  },
  image: {
    ...setRadius(0, 0, 0, 0)
  },
  viewImage: {
    height: MY_SIZE.s_64,
    width: MY_SIZE.s_64,
    backgroundColor: COLOR.BG.RED,
    // ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, MY_SIZE.s_8),
    ...setRadius(0, 0, 0, 0),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textImageCenter: {
    color: COLOR.TEXT.WHITE
  }
});
