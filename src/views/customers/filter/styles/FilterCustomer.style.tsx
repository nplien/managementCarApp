import {StyleSheet} from 'react-native';
import {setMargin, setPadding, COLOR, setRadius, MY_SIZE} from 'bases/styles/Core';
export const FilterCustomerStyle = StyleSheet.create({
  container: {backgroundColor: COLOR.BG.SECONDARY, flex: 1},
  container3: {backgroundColor: COLOR.BG.WHITE},
  myLoading: {...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  myView: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16
  },
  myTextTow: {
    ...setMargin(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  inputSearch: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    overflow: 'hidden'
  },
  myInput: {
    height: 48
  },
  myInputTow: {
    flex: 1
  },
  myInputThree: {
    flex: 8,
    textAlign: 'right',
    backgroundColor: 'red',
    height: 48
  },
  myButtonCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  myButtonCreator: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  myText: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  myClose: {
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  borderBottom: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  borderBottomTow: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  borderDebt: {
    borderBottomWidth: 1,
    borderColor: COLOR.BG.BLACK_30
  },
  viewDebt: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    alignContent: 'space-between'
  },
  viewDebtInput: {
    flex: 8
  },
  inputDebt: {textAlign: 'right', height: 48},
  iconPurchase: {...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8)},
  textModal: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewTextSearch2: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  btnLH: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6,
    backgroundColor: COLOR.TEXT.WHITE
  },
  myTextSize: {
    fontSize: MY_SIZE.s_16
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  mycontentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myviewDM: {
    flexDirection: 'row'
  },
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_75
  },
  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row'
  },
  btnTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  btnTitle2: {
    flex: 2,
    height: '100%',
    justifyContent: 'center'
  },
  titleLeft: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE,
    textAlign: 'left'
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  },
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  }
});

export const GiaoDichCuoiStyles = StyleSheet.create({
  viewTextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  title: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
