import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
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
    height: 2,
    backgroundColor: COLOR.BG.SECONDARY
  },
  lineSepeShape: {
    height: 8,
    backgroundColor: COLOR.BG.SECONDARY
  },
  lineSepePrice: {
    height: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  icon: {
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, MY_SIZE.s_4)
  },
  statusTop: {
    backgroundColor: COLOR.BG.SECONDARY,
    alignItems: 'center'
    // borderBottomWidth: 2,
    // borderBottomColor: COLOR.TEXT.SECONDARY
  },
  statusText: {
    color: COLOR.TEXT.BLACK,
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)
  },
  rowTopview: {
    flexDirection: 'row'
  },
  rowBotview: {
    ...setMargin(MY_SIZE.s_24, 0, 0, 0)
  },
  eachPriceView: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...setPadding(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  infoIcon: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  infoProdCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    flex: 1
  },
  textLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_12
  },
  textNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  textNameLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14,
    flex: 1
  },
  textIconLeft: {
    color: COLOR.TEXT.SECONDARY
  },
  infoPrice: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  infoTitleView: {
    flex: 0.6,
    // alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textTitlePrice: {
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  priceRight: {
    fontSize: MY_SIZE.s_16
  },
  viewStock: {
    height: MY_SIZE.s_20,
    width: MY_SIZE.s_48,
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
    width: MY_SIZE.s_48,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(0, 0, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  iconPrice: {
    position: 'absolute',
    top: 12,
    bottom: 0,
    right: 4
    // backgroundColor: 'red'
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
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_14
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
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  }
});
