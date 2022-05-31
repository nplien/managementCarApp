import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

const MenuContentStyle = StyleSheet.create({
  containerMenuItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    ...setMargin(MY_SIZE.s_4)
  },

  contentMenuItem: {
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    backgroundColor: 'white',
    flexDirection: 'row',
    width: Utilities.getWidthScreen() / 2 - 16,
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  titleMenu: {color: COLOR.TEXT.BLACK, flex: 1, marginLeft: 8},
  //NOTE MenuComponent styles
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  content: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  touchItemDrawerOne: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  touchItemDrawer: {
    flexDirection: 'row',
    flex: 1,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  btnColumn: {
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textItemDrawer: {
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  icon: {
    alignSelf: 'center'
  },
  buttomLogout: {flex: 1, flexDirection: 'row', paddingLeft: 16},
  viewCapNhap: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLOR.BG.BLACK_30,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16)
  },
  marginText: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  // lineSepe: {
  //   height: 1,
  //   backgroundColor: COLOR.BG.BLACK_30
  // },

  // MenuLeftHeader styles
  viewheaderDrawer: {
    backgroundColor: COLOR.BG.WHITE,
    justifyContent: 'center'
  },
  textName: {
    color: COLOR.TEXT.BLACK,
    // flex: 1,
    fontSize: MY_SIZE.s_18
  },
  txtStore: {
    color: COLOR.TEXT.BLACK
  },
  btnStore: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16)
  },
  btnStore2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewItemBaoCao: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_22, MY_SIZE.s_0)
  },
  textItemStore: {
    flex: 1,
    color: COLOR.BG.BLACK
  },
  imageAvatar: {
    width: MY_SIZE.s_64,
    height: MY_SIZE.s_64,
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_10)
  },
  btnSyn: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentStoreList: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  topSafeView: {
    backgroundColor: COLOR.BG.BLACK
  },

  // bottomSheet styles
  buttomView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  btnHandleComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    borderBottomColor: COLOR.BG.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  viewLine: {
    width: 45,
    height: 5,
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewSheetScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default MenuContentStyle;
