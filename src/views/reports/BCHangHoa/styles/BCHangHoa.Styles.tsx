import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const BCHangHoaStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  myViewTop: {
    flexDirection: 'row',
    borderBottomStartRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomEndRadius: 16,
    borderBottomRightRadius: 16
  },
  textTitle: {
    fontSize: 14
  },
  viewListHerder: {
    borderRadius: 16,
    backgroundColor: COLOR.BG.WHITE,
    padding: 16,
    marginVertical: 16
  },
  viewContent: {
    margin: 12,
    backgroundColor: COLOR.TEXT.POSITIVE_BTN,
    padding: 16,
    justifyContent: 'center',
    borderRadius: 16
  },
  viewTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16
  },
  viewTxtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitleChange: {
    color: COLOR.TEXT.BLUE,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_8)
  },
  btnNextDetail: {
    width: 50,
    alignItems: 'flex-end'
  }
});

export const locThoiGianStyles = StyleSheet.create({
  viewTextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewTextHeader2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  title: {
    fontSize: 12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
export const BCHangHoaStyle = StyleSheet.create({
  itemView: {},
  viewProductName: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textProductName: {
    flex: 7.5
  },
  textPriceMask: {
    flex: 2.5,
    color: COLOR.TEXT.BLUE,
    alignContent: 'center',
    textAlign: 'right'
  },
  viewLineBottom: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  separator: {
    height: MY_SIZE.s_10
  }
});

export const FilterBCHangHoaStyle = StyleSheet.create({
  inputSearch: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    overflow: 'hidden'
  },
  myContentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myViewDM: {
    flexDirection: 'row',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myButtonCreator: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  myTextSize: {
    fontSize: MY_SIZE.s_16
  },
  textContent: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  viewIconCheck: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  viewIconCheckOne: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  viewItem: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  buttomView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  btnHandleComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    borderBottomColor: COLOR.BG.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  viewLine: {
    width: 45,
    height: 5,
    alignSelf: 'center',
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  setMarginText: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  separatorStyle: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK,
    height: StyleSheet.hairlineWidth
  }
});
