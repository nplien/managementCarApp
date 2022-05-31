import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE} from 'bases/styles/Core';
export const CreatedByStyle = StyleSheet.create({
  myLoading: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  myButtonText: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10)
  },
  viewLoadmore: {height: 100},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  container: {
    backgroundColor: COLOR.BG.WHITE
  }
});
