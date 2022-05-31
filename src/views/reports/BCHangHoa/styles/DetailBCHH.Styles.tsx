import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const detailBCHHStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textEmpty: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  containerList: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.BG.WHITE
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  txtName: {
    flex: 1,
    maxWidth: '75%'
  },
  txtPrice: {
    color: COLOR.TEXT.BLUE
  },
  textSum: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0),
    fontSize: MY_SIZE.s_12
  },
  viewCount: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
    // borderTopWidth: StyleSheet.hairlineWidth
  },
  viewPriceCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTotalValue: {
    color: COLOR.TEXT.BLUE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_4, MY_SIZE.s_4),
    fontSize: MY_SIZE.s_12
  }
});
