import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  btnSubmit: {...setMargin(MY_SIZE.s_32, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)},
  btnDate: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  text: {flex: 1, fontSize: MY_SIZE.s_16},
  textDate: {color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_16}
});
