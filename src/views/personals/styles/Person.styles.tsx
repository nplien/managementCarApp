import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const personStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  myLoading: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  myView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myText: {
    color: COLOR.TEXT.WHITE
  },
  myIcon: {
    color: COLOR.TEXT.WHITE
  },
  MvAvatarChild: {
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  MvAvatar: {
    flex: 1,
    alignItems: 'center'
  },
  content1: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  MvInfoCustomers: {flex: 3},
  MvInfo: {
    ...setMargin(MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_24, MY_SIZE.s_0),
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_4, MY_SIZE.s_16, MY_SIZE.s_10)
  },
  secondTitle: {
    fontSize: MY_SIZE.s_14,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0)
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE
  },
  tabItem: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  tabItem2: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  myViewDad: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  myViewChild2: {flex: 2.5},
  myViewChild1: {flex: 1},
  myTextHeader: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.BG.BLACK
  },
  myTextow: {...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewLine: {
    height: 8,
    backgroundColor: COLOR.BG.SECONDARY
  }
});
