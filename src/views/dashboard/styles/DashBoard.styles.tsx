import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

export const DashBoardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  myViewTop: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
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
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_8)
  },
  chart: {
    height: Utilities.getHeightScreen() / 4,
    backgroundColor: 'white'
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
    fontSize: MY_SIZE.s_16
  },
  titleChart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginBottom: 16
  }
});

export const groupBarStyles = StyleSheet.create({
  emptyCustomer: {
    justifyContent: 'center',
    height: Utilities.getHeightScreen() / 4
  },
  BtnEmpty: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  chart: {
    height: Utilities.getHeightScreen() / 3
  },
  viewText: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textSum: {
    fontSize: MY_SIZE.s_18,
    color: COLOR.TEXT.BLUE
  },
  myText: {
    fontSize: MY_SIZE.s_16
  },
  selectForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectFormTouchItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  circle: {
    height: MY_SIZE.s_12,
    width: MY_SIZE.s_12,
    borderRadius: MY_SIZE.s_12,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK,
    ...setMargin(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_8),
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleCheck: {
    height: MY_SIZE.s_8,
    width: MY_SIZE.s_8,
    borderRadius: MY_SIZE.s_8,
    borderWidth: 1,
    backgroundColor: COLOR.BG.BLACK,
    borderColor: COLOR.BG.BLACK,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
