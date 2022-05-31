import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

export const BHCustomerandPrice = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY
  },
  txtSearch: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  btnPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
    justifyContent: 'flex-end',
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16)
  },
  btnCustomer2: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});

export const BHSelected = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY,
    justifyContent: 'flex-end'
  },
  txtSearch: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnAll: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  btnSelected: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export const CategoryStyle = StyleSheet.create({
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
    backgroundColor: COLOR.BG.WHITE
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
  contentContainerStyle: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});
