import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  textInput: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK,
    borderRadius: MY_SIZE.s_8,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textInput2: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
    // ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  statusContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  statusContainerChild: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  statusListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  titleStatus: {
    fontSize: MY_SIZE.s_20
  },
  statusText: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  statusEachView: {
    borderColor: COLOR.BG.BLACK,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_8,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4)
  },
  filterContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  filterDivideLeft: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  filterDivideRight: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterDivideFlex: {
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnFilterContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  textDate: {
    color: 'gray',
    fontSize: MY_SIZE.s_12,
    ...setPadding(0, 0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  icon: {
    // backgroundColor: COLOR.BG.SECONDARY
  },
  icon2: {
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  icon3: {
    backgroundColor: COLOR.BG.WHITE
  },
  itemTouch: {
    backgroundColor: COLOR.BG.WHITE
  },
  itemView: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  lineSepe: {
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  btnApply: {
    backgroundColor: COLOR.BG.RED,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    alignItems: 'center',
    borderRadius: MY_SIZE.s_8
  },
  textApply: {
    color: COLOR.TEXT.WHITE,
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  touchBorder: {
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK,
    borderRadius: MY_SIZE.s_8,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
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
  textDateCalendar: {flexDirection: 'row', justifyContent: 'space-between'},
  dateStyle: {
    backgroundColor: COLOR.BG.WHITE
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
  touchTimeItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTimeItem: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16
  }
});
