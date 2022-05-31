import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE} from 'bases/styles/Core';

export const InventoryDetailStyle = StyleSheet.create({
  myLoading: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.SECONDARY
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center',
    backgroundColor: COLOR.BG.SECONDARY
  },
  viewTextHeader: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textHeader: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    fontSize: MY_SIZE.s_16
  },
  viewTextHeader2: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_6, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textHeader2: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  lineHeight: {
    height: MY_SIZE.s_10,
    backgroundColor: COLOR.BG.SECONDARY
  },

  mytop: {
    justifyContent: 'space-between'
  },
  myCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  myViewChild2: {
    flex: 2,
    flexDirection: 'row'
  },
  myViewChild1: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});

export const itemDetailStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE
  },
  content: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentHeader: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_0),
    flex: 2
  },
  titleValue: {
    fontSize: MY_SIZE.s_16
  },
  content2: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    flex: 1,
    alignItems: 'center'
  }
});
