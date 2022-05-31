import {COLOR, setMargin, MY_SIZE, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const taoVoucherStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  containerChild: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  },
  textTLHL: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textAdd: {
    flex: 1
  },
  viewInputAdd: {
    flex: 1.5,
    borderBottomColor: COLOR.BG.BLACK,
    borderBottomWidth: 1,
    height: 48,
    justifyContent: 'center'
  },
  viewPromotional: {
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'center'
  },
  btnVND: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_10, MY_SIZE.s_10),
    borderTopStartRadius: MY_SIZE.s_6,
    borderBottomStartRadius: MY_SIZE.s_6
  },
  btnPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    borderTopEndRadius: MY_SIZE.s_6,
    borderBottomEndRadius: MY_SIZE.s_6
  },
  textOpenWeb: {
    color: COLOR.TEXT.BLACK,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_4, MY_SIZE.s_8)
  }
});
