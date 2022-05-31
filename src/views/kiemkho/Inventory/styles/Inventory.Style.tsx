import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';

export const InventoryStyle = StyleSheet.create({
  myLoading: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center'
  },
  BtnEmpty: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  itemSeparator: {
    height: 10,
    backgroundColor: COLOR.BG.SECONDARY
  },
  viewLoadmore: {height: 100},
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  myViewTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewTextKiemKhoHeader: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myTextTop: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  containerList: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});

export const FilterStyle = StyleSheet.create({
  myViewTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});

export const locThoiGianStyles = StyleSheet.create({
  viewTextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  title: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
