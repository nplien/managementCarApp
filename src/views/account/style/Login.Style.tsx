import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  input: {
    borderWidth: 1,
    backgroundColor: COLOR.BG.PRIMARY,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK,
    height: MY_SIZE.s_46,
    justifyContent: 'center',
    ...setRadius(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  viewcontroll: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_64, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  iconSvg: {
    alignSelf: 'center',
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_64, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  btnLogin: {
    height: MY_SIZE.s_46,
    ...setMargin(MY_SIZE.s_30, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    backgroundColor: COLOR.TEXT.GREEN
  },
  contentScroll: {
    ...setMargin(MY_SIZE.s_50, 0, 0, 0),
    ...setPadding(0, 100, 0, 0)
    // justifyContent: 'center',
    // flex: 1
  }
});

export {loginStyle};
