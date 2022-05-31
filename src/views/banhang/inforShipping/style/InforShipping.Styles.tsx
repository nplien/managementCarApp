import {COLOR, FONT_FAMILY, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const inforShipStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  headerTitle: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  headerTitleShip: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnTitleShip: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtHeaderleft: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE
  },
  txtHeader: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewAddress: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.WHITE
  },
  viewAddress2: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  txtinfor: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_0)
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.GRAY
  },
  input: {
    borderBottomWidth: 1,
    flex: 1.5,
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  inputKT: {
    borderBottomWidth: 1,
    flex: 1.5
  },
  txtTitle: {
    fontSize: MY_SIZE.s_14,
    flex: 1
  },
  containerChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewInput: {
    flexDirection: 'row',
    flex: 1.5,
    justifyContent: 'space-around'
  },
  txtSearch: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnSelected: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY,
    alignItems: 'center'
    // alignSelf: 'center'
  },
  txtTotal: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    flex: 1,
    textAlign: 'right'
  },
  btnRefresh: {
    flex: 1,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.GRAY,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center'
    // height: MY_SIZE.s_48,
  },
  btnDone: {
    flex: 1,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center'
    // height: MY_SIZE.s_48
  },
  thuTienView: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  btnReset: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewFlex: {
    flexDirection: 'row'
  },
  iconLocation: {
    flex: 1
  },
  viewRightDTGH: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtRightDTGH: {
    fontSize: MY_SIZE.s_12
  },
  viewPrice: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const locationStyle = StyleSheet.create({
  container: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  containerChildADD: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BG.BLACK_30
  },
  textPhoneAdd: {
    flex: 1,
    fontSize: MY_SIZE.s_14
  },
  viewInputPhoneAdd: {
    flex: 1.5,
    borderBottomColor: COLOR.BG.BLACK,
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  viewBirthdayAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'flex-end'
  },
  contentBirthDay: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  }
});

export const selectOptions = StyleSheet.create({
  txtSearch: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  txtKhaiGia: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  btnSelected: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0),
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
    // alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30,
    justifyContent: 'center'
  },
  modalContent: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtNote: {
    textAlign: 'center',
    fontSize: MY_SIZE.s_16,
    fontFamily: FONT_FAMILY.Regular
  },
  btnCancel: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_32, MY_SIZE.s_32),
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.RED
  },
  textCancel: {
    color: COLOR.BG.WHITE,
    fontFamily: FONT_FAMILY.Regular,
    textTransform: 'uppercase',
    fontSize: MY_SIZE.s_14,
    textAlign: 'center',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewKhaigia: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewPaymentContainer: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewPayment: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  container2: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_26, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  btnIcon: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_30, MY_SIZE.s_16)
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  }
});
