import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const BHCustomerandPrice = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE
  },
  txtSearch: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1
  },
  btnPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export const BHSelected = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY,
    justifyContent: 'flex-end'
  },
  txtSearch: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnAll: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  btnSelected: {
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_8, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
