import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const BaoCaoCuoiNgayStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  myViewTop: {
    flexDirection: 'row',
    borderBottomStartRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomEndRadius: 16
  }
});

export const LocThoiGianStyle = StyleSheet.create({
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
