import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const paymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  containerCenter: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerCenter2: {
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerRowView: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  containerRowView2: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  orderListContainer: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  rowViewSelectType: {flexDirection: 'row', justifyContent: 'center'},
  rowViewEach: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  rowViewEachCircle: {
    height: 12,
    width: 12,
    borderRadius: MY_SIZE.s_12,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    ...setMargin(0, 0, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  rowViewOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, 0, 0)
  },
  titleView: {
    flex: 0.5
  },
  touchStore: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  inputView: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.BG.BLACK_30
  },
  inputView2: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30
  },
  rowViewEachCircleSelected: {
    height: 8,
    width: 8,
    borderRadius: MY_SIZE.s_8,
    backgroundColor: COLOR.BG.BLACK
  },
  colorBotView: {
    backgroundColor: COLOR.TEXT.BLUE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  colorBotText: {
    color: COLOR.TEXT.WHITE
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
  lineSepeDetails: {
    height: 1,
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)
  },
  buttonReset: {
    backgroundColor: COLOR.BUTTON.RED
  },
  textReset: {
    color: COLOR.TEXT.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_32)
  },
  textSum: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0),
    backgroundColor: COLOR.TEXT.WHITE
  },
  viewTotal: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR.TEXT.BLACK
  },
  textCount: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  rowHeader: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  padding: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  itemRowTypeView: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  itemRowTypeText: {
    fontSize: MY_SIZE.s_16
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(0, 0, 16, 16)
  },
  myLoading: {...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  containerList: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});

export const sortPayment = StyleSheet.create({
  filterDivideRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});
export const filterDatePayment = StyleSheet.create({
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
