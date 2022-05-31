import {COLOR, setPadding, setMargin, MY_SIZE} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const formPaymentStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnBottomView: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center'
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  viewItemSecond: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...setMargin(MY_SIZE.s_20, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    borderBottomColor: COLOR.BG.BLACK_30,
    borderTopColor: COLOR.BG.BLACK_30
  },
  txtTitle: {
    fontSize: MY_SIZE.s_16
  }
});
