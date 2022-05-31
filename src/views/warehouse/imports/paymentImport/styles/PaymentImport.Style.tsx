import {
  COLOR,
  MY_SIZE,
  setMargin,
  setPadding,
  setRadius,
} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const paymentStyles = StyleSheet.create({
  container: {
    // ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    // ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
  },
  txtCount: {
    borderRadius: 4,
    borderWidth: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_6),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0),
    fontSize: 12,
    color: COLOR.TEXT.BLACK,
    borderColor: COLOR.BG.BLACK,
    textAlign: 'center',
    textAlignVertical: 'center',
    // flex: 1
  },
  containerChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: COLOR.BG.GRAY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
  },
  childflexDirection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0),
  },
  txtTotal: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
  },
  txtTitle: {
    fontSize: MY_SIZE.s_16,
    flex: 1,
  },
  viewCongNo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.GRAY,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
  },
  viewButton: {
    flexDirection: 'row',
    // ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  btnSave: {
    flex: 1,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.BLACK,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center',
    // height: MY_SIZE.s_48
  },
  btnDone: {
    flex: 1,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center',
    // height: MY_SIZE.s_48
  },
  txtBtn: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
  },
  viewPayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
  },
  txtpayment: {
    flex: 1,
  },
  viewChildPayment: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  txtCountPrice: {
    borderRadius: 4,
    borderWidth: 1,
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0),
    fontSize: 12,
    color: COLOR.TEXT.WHITE,
    borderColor: COLOR.BG.BLACK_30,
    backgroundColor: COLOR.BG.BLACK_30,
  },
  inputNote: {
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: MY_SIZE.s_140,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
  },
  lineInput: {
    height: 8,
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
  },
  viewinputNote: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
  },
});
