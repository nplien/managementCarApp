import {StyleSheet} from 'react-native';
import {setPadding, COLOR, setMargin, MY_SIZE, setRadius} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';

export const productDetailStyle = StyleSheet.create({
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textName: {
    color: COLOR.BG.BLACK,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16
  },
  myViewTop: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BG.SECONDARY,
    alignItems: 'center'
  },
  viewTongTon: {
    flexDirection: 'row'
  },

  myLoading: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  mytop: {
    justifyContent: 'space-between'
  },
  myCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  myViewChild2: {flex: 2, flexDirection: 'row'},
  myViewChild1: {flex: 1},
  myText: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.BG.BLACK
  },
  myTextChild: {},

  container: {flex: 1, backgroundColor: COLOR.BG.SECONDARY},

  styleList: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});

export const itemStoreStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  viewLeft: {
    flex: 3
  },
  viewRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  textContent: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});

export const itemTheKhoStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_6, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  viewLeft: {
    flex: 1
  },
  viewRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  textContent: {
    fontSize: MY_SIZE.s_16
  },
  textContent2: {
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});

export const componentStyles = StyleSheet.create({
  myLoading: {...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.BLACK
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewLoadmore: {height: 100},
  myViewTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  myViewBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.BLACK_TOOLBAR
  },
  viewTitleBottom: {
    backgroundColor: COLOR.BG.BLACK_TOOLBAR,
    justifyContent: 'center'
  },
  titleBottom: {
    color: COLOR.TEXT.WHITE
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myviewIcon2: {
    flex: 1,
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  myTextTop: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8),
    fontSize: MY_SIZE.s_14
  },
  sortModal: {
    zIndex: 999,
    position: 'absolute',
    backgroundColor: COLOR.BG.BLACK_30,
    top: 50,
    right: 0,
    flex: 1,
    width: '100%',
    height: '100%'
  },
  modalItem: {
    borderWidth: 0.5,
    borderColor: COLOR.BG.BLACK_10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: COLOR.BG.WHITE,
    width: Utilities.getWidthScreen() / 2,
    position: 'absolute',
    right: 0,
    top: 0
  },
  modalDateView: {
    backgroundColor: COLOR.BG.WHITE,
    flex: 1
  },
  textSort: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    textAlign: 'left',
    width: '100%',
    fontSize: MY_SIZE.s_16
  },
  textTitleSort: {
    fontSize: MY_SIZE.s_20
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  viewTextHeader: {
    justifyContent: 'center',
    flex: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewTextKiemKhoHeader: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewSafe: {
    backgroundColor: COLOR.BG.BLACK_TOOLBAR
  },
  containerList: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});
