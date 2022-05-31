import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
export const managerBranchStyles = StyleSheet.create({
  myLoading: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  containerList: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  textSum: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myTextTop: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  filterDivideRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  myButtonText: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10)
  },
  viewLoadmore: {height: 100},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  }
});

export const brandHeaderStyles = StyleSheet.create({
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },

  btnFilterContainer: {
    flex: 1,
    alignItems: 'flex-end',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  viewContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(0, MY_SIZE.s_16)
  },
  statusContainerChild: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textInput2: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
    // ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
