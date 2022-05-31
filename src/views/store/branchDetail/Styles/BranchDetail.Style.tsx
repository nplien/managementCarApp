import {StyleSheet} from 'react-native';
import {COLOR, setMargin, setPadding, setRadius, MY_SIZE} from 'bases/styles/Core';

export const styles = StyleSheet.create({
  myLoading: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  title: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    flex: 3.5
  },
  value: {
    flex: 6.5
  },
  tittleAddress: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0),
    fontSize: MY_SIZE.s_12,
    flex: 1
  },
  logo: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  container2: {
    backgroundColor: COLOR.BG.WHITE
  },
  viewList: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_20, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
