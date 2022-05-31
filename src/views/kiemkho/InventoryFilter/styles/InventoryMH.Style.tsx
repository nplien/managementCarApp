import {StyleSheet} from 'react-native';
import {COLOR, setPadding, MY_SIZE, setMargin, setRadius} from 'bases/styles/Core';
export const InventoryMHStyle = StyleSheet.create({
  myLoading: {...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});

export const FilterInventoryStyle = StyleSheet.create({
  myviewLH: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  btnLH: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myText: {
    fontSize: MY_SIZE.s_16
  },
  viewTextSearch: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  textSearch: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    overflow: 'hidden',
    height: MY_SIZE.s_38
  }
});

export const FilterCategoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  containerScroll: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.SECONDARY
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewTextSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    justifyContent: 'space-between'
  },
  viewTextSearch2: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textSearch: {
    fontSize: MY_SIZE.s_16,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRightColor: COLOR.BG.WHITE,
    flex: 1,
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  textSearch2: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    overflow: 'hidden',
    height: MY_SIZE.s_38
  },
  textHeight: {
    height: MY_SIZE.s_38
  },
  btnSearch: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    backgroundColor: COLOR.BG.BLACK,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_4)
  },
  myviewLH: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  btnLH: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myText: {
    fontSize: MY_SIZE.s_16
  },
  myviewDM: {
    flexDirection: 'row'
  },
  mycontentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnApDung: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
