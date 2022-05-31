import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, 0, 0)
  },
  lineSepe: {
    height: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  lineSepeShape: {
    height: 8,
    backgroundColor: COLOR.BG.SECONDARY
  },
  lineSepePrice: {
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  icon: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  statusTop: {
    backgroundColor: COLOR.BG.SECONDARY,
    alignItems: 'center'
    // borderBottomWidth: 2,
    // borderBottomColor: COLOR.TEXT.SECONDARY
  },
  statusText: {
    textAlign: 'right',
    color: COLOR.TEXT.GREEN,
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  rowTopview: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  rowBotview: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  eachPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(16, 16, 16, 16)
  },
  infoIcon: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  infoProdCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center'
  },
  infoProdRight: {
    flex: 0.8,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0),
    justifyContent: 'center'
  },
  textRight: {
    textAlign: 'right',
    color: COLOR.TEXT.BLACK,
    alignItems: 'center',
    flex: 1,
    fontSize: MY_SIZE.s_12
  },
  textLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  textNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textNameLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14
  },
  textIconLeft: {
    color: COLOR.TEXT.SECONDARY
  },
  infoPrice: {
    flex: 6.5,
    justifyContent: 'center'
  },
  infoPriceRight: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoTitleView: {
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textTitlePrice: {},
  priceRight: {
    fontSize: MY_SIZE.s_16
  },
  viewStock: {
    height: MY_SIZE.s_20,
    flex: 0.3,
    // width: MY_SIZE.s_48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    borderRadius: MY_SIZE.s_2,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(0, 0, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  viewStockEmpty: {
    height: MY_SIZE.s_20,
    flex: 0.3,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(0, 0, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  iconPrice: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  creatView: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    color: COLOR.TEXT.SECONDARY,
    fontSize: MY_SIZE.s_12
  },
  creatText: {
    color: COLOR.TEXT.BLACK,
    fontSize: MY_SIZE.s_12
  },
  botView: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.TEXT.BLUE
  },
  productLengthtext: {
    color: COLOR.TEXT.WHITE,
    ...setPadding(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  productBotPrice: {
    color: COLOR.TEXT.WHITE
  },
  titleDelivery: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_14
  },
  senderText: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    overflow: 'hidden',
    borderRadius: 16
  },
  buttonReset: {
    backgroundColor: COLOR.BUTTON.RED,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: MY_SIZE.s_8
  },
  textReset: {
    color: COLOR.TEXT.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_32)
  },
  btnShipper: {
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewShipper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewName: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  viewTitle: {
    flexDirection: 'row',
    flex: 3.5,
    alignItems: 'center',
    backgroundColor: 'red'
    // justifyContent: 'space-between'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  }
});
