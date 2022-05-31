import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const voucherStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  containerList: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  containerEmpty: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  toolbarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  viewFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, 0, 0)
  },
  rowCheckActiveView: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY
  },
  rowCheckActiveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textSum: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewTextHead: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textEmpty: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, 0, 0)
  },
  lineSepe: {
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  circle: {
    height: MY_SIZE.s_12,
    width: MY_SIZE.s_12,
    borderRadius: MY_SIZE.s_12,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK,
    ...setMargin(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleCheck: {
    height: MY_SIZE.s_8,
    width: MY_SIZE.s_8,
    borderRadius: MY_SIZE.s_8,
    borderWidth: 1,
    backgroundColor: COLOR.BG.BLACK,
    borderColor: COLOR.BG.BLACK,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonReset: {
    backgroundColor: COLOR.BUTTON.RED
  },
  textReset: {
    color: COLOR.TEXT.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_32)
  },
  viewBottomPrice: {
    backgroundColor: COLOR.BG.RED,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  //voucherDetails
  voucherDetailContainer: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  voucherDetailBody: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewName: {
    ...setPadding(0, 0, MY_SIZE.s_8, MY_SIZE.s_8),
    flex: 1
  },
  textInfo: {
    fontSize: MY_SIZE.s_16
  },
  textInfoSmall: {},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  viewImage: {
    height: MY_SIZE.s_75,
    width: MY_SIZE.s_75,
    backgroundColor: COLOR.BG.RED,
    // ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, MY_SIZE.s_8),
    // ...setRadius(16, 16, 16, 16),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textImageCenter: {
    color: COLOR.TEXT.WHITE
  },
  textCenter: {
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
