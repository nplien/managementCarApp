import {StyleSheet} from 'react-native';
import {setPadding, COLOR, setMargin, setRadius, MY_SIZE} from 'bases/styles/Core';

export const BangGiaChungStyles = StyleSheet.create({
  list: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  content: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  content2: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewTextSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    justifyContent: 'space-between'
  },
  textSearch: {
    fontSize: MY_SIZE.s_16,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRightColor: COLOR.BG.WHITE,
    flex: 1,
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  btnSearch: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    backgroundColor: COLOR.BG.BLACK,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_4)
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
