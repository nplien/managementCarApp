import {StyleSheet} from 'react-native';
import {setMargin, setPadding, COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
export const FilterSupplierStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  myText: {
    ...setMargin(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  inputSearch: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    borderRadius: 6
  },
  myInput: {
    height: 48
  },
  myView: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myButton: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  borderBottomTow: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignContent: 'space-between'
  },
  myButtonCreator: {
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textCreator: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
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
  myButtonGroup: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myGroup: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myTextSize: {
    fontSize: MY_SIZE.s_16
  },
  IconView: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8)
  }
});
