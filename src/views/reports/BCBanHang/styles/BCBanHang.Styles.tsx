import {COLOR, setMargin, setPadding, setRadius, MY_SIZE} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

export const SalesStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  myViewTop: {
    flexDirection: 'row',
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
    // backgroundColor: COLOR.BG.SECONDARY
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
export const stackBarStyles = StyleSheet.create({
  emptyCustomer: {
    justifyContent: 'center',
    height: Utilities.getHeightScreen() / 2
  },
  BtnEmpty: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignSelf: 'center'
  },
  container: {
    ...setMargin(MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  chart: {
    height: Utilities.getHeightScreen() / 4,
    backgroundColor: 'white'
  },
  myText: {
    fontSize: MY_SIZE.s_20,
    fontWeight: '700'
  },
  titleChart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginBottom: 16
  }
});
export const pieStyles = StyleSheet.create({
  emptyCustomer: {
    justifyContent: 'center',
    height: Utilities.getHeightScreen() / 4
  },
  BtnEmpty: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignSelf: 'center'
  },
  container: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(16, 16, 0, 0),
    ...setPadding(10, 10, 16, 16)
  },
  chart: {
    height: Utilities.getWidthScreen() - 32
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  textSum: {
    fontSize: MY_SIZE.s_18,
    color: COLOR.TEXT.BLUE
  },
  myText: {
    fontSize: MY_SIZE.s_20,
    fontWeight: '700'
  },
  titleChart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginBottom: 16
  }
});
export const StaffBestSaleStyles = StyleSheet.create({
  container: {
    ...setRadius(16, 16, 16, 16),
    ...setPadding(10, 24, 16, 16)
  },
  myText: {
    fontSize: MY_SIZE.s_20,
    fontWeight: '700'
  },
  titleChart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  emptyCustomer: {
    justifyContent: 'center',
    height: Utilities.getHeightScreen() / 2
  },
  BtnEmpty: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignSelf: 'center'
  },
  itemView: {
    flex: 1
    // ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  viewProductName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textProductName: {
    flex: 6,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textPriceMask: {
    flex: 4,
    alignContent: 'center',
    textAlign: 'right'
  },
  viewLineBottom: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
export const ListViewLoiNhuanStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewContent: {
    flex: 1,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setRadius(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6)
  },
  textTitle: {color: 'white', fontSize: MY_SIZE.s_12},
  textValue: {color: 'white', fontSize: MY_SIZE.s_14, ...setMargin(4)}
});
export const LineDTStyles = StyleSheet.create({
  emptyCustomer: {
    justifyContent: 'center',
    height: Utilities.getHeightScreen() / 2
  },
  myText: {
    fontSize: MY_SIZE.s_20,
    fontWeight: '700'
  },
  titleChart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  container: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(16, 16, 0, 0),
    ...setPadding(10, 10, 16, 16)
  },
  chart: {
    height: Utilities.getHeightScreen() / 3,
    backgroundColor: 'white'
  }
});
export const FilterBCBanHangStyles = StyleSheet.create({
  myViewDM: {
    flexDirection: 'row'
  },
  myContentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
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
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  viewIconCheck: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_8, MY_SIZE.s_8),
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
  separatorStyle: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK,
    height: StyleSheet.hairlineWidth
  },
  setMarginText: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
