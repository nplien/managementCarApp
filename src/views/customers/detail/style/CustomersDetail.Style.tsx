import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
export const CustomersDetailStyle = StyleSheet.create({
  myLoading: {...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  content: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  content1: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  mybox: {
    backgroundColor: COLOR.BG.BLACK_10,
    height: 20
  },
  MvAvatar: {
    alignSelf: 'center'
  },
  MvInfoCustomers: {flex: 3},
  MvInfo: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    alignContent: 'center',
    flexDirection: 'row'
  },
  MvLinking: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  btnIconPhone: {
    backgroundColor: COLOR.TEXT.BLUE,
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6),
    borderRadius: 32
  },
  btnIconSMS: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_32, MY_SIZE.s_0)
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  secondTitle: {
    flex: 3,
    fontSize: MY_SIZE.s_14,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0)
  },
  MvAvatarChild: {
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    flex: 1
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
  containerHistory: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.SECONDARY
  },
  childContainerHitory: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewLoadmore: {height: 50}
});
