import {COLOR, setPadding, setMargin, MY_SIZE, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const thanhToanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnBottomView: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewItem2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewItemSecond: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_20, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtTitle: {
    fontSize: MY_SIZE.s_16
  },
  txtCount: {
    borderRadius: 4,
    borderWidth: 1,
    ...setPadding(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_6, MY_SIZE.s_6),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_12),
    fontSize: MY_SIZE.s_12
  },
  contentRow: {
    flexDirection: 'row'
  },
  viewLine: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  textValue: {
    flex: 1
  },
  contentValue: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  viewContainerGiaoHang: {
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_20, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewGiaoHang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_14),
    alignItems: 'center'
  },
  txtTitleGiaoHang: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  switchAndroid: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textGiaoHang: {
    fontSize: MY_SIZE.s_14,
    flex: 1
  },
  contentValue2: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  }
});
