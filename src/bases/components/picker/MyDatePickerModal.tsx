import {setPadding, setRadius, COLOR, setMargin, MY_SIZE} from 'bases/styles/Core';
import React, {useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Utilities from 'utils/Utilities';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';
import {MyButton, MyButtonShadow} from '../button/MyButton';
import {MyView} from '../view/MyView';
import {MyText} from '../textview/MyText';

const PADDING_TOP = Utilities.getStatusBarHeight() || MY_SIZE.s_30;

type IPropsDatePicker = IAppNavigateProps<'MyDatePickerModal'>;

const MyDatePickerModal = (props: IPropsDatePicker) => {
  const {title, titleButtonChange, titleButtonCancel, value, mode} = props.route.params;
  const [date, setDate] = useState(value || new Date());
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  const onChange = () => {
    MyNavigator.goBack();
    props.route.params.onChange(date);
  };

  return (
    <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
      <MyButton onPress={() => MyNavigator.goBack()} activeOpacity={0.9} style={styles.container}>
        <MyButtonShadow activeOpacity={1} transparent style={styles.modalContainer}>
          <MyView style={styles.content}>
            <MyText myFontStyle="Medium" style={styles.title}>
              {title}
            </MyText>
          </MyView>
          <MyView style={styles.line} />
          <DatePicker
            locale="vi"
            mode={mode || 'date'}
            androidVariant="iosClone"
            date={date}
            style={styles.datePicker}
            textColor={COLOR.TEXT.BLACK}
            fadeToColor={COLOR.BG.WHITE}
            onDateChange={dateValue => setDate(dateValue)}
            maximumDate={new Date()}
          />
          <MyView style={styles.line} />
          <MyButton activeOpacity={1} style={styles.btnDeleteAction} onPress={onChange}>
            <MyText myFontStyle="Bold" style={styles.textDelete}>
              {titleButtonChange}
            </MyText>
          </MyButton>

          <MyButtonShadow
            activeOpacity={1}
            style={styles.btnClose}
            onPress={() => {
              MyNavigator.goBack();
            }}>
            <MyText myFontStyle="Bold" style={styles.textClose}>
              {titleButtonCancel}
            </MyText>
          </MyButtonShadow>
        </MyButtonShadow>
      </MyButton>
    </SafeAreaView>
  );
};

export default MyDatePickerModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  modalContainer: {
    width: Utilities.getWidthScreen() - MY_SIZE.s_16,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },

  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BG.WHITE
  },
  title: {
    color: COLOR.TEXT.PRIMARY
  },
  datePicker: {
    width: Utilities.getWidthScreen() - MY_SIZE.s_16 * 2,
    height:
      Utilities.getWidthScreen() -
      MY_SIZE.s_8 * 3 -
      MY_SIZE.s_46 * 3 -
      StyleSheet.hairlineWidth * 2 -
      PADDING_TOP,
    backgroundColor: COLOR.BG.WHITE
  },

  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  },

  btnAction: {
    marginTop: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: MY_SIZE.s_46
  },
  textAction: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    textAlign: 'center',
    color: COLOR.TEXT.BLACK
  },

  btnDeleteAction: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12),
    justifyContent: 'center',
    alignItems: 'center',
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE
  },
  textDelete: {
    textAlign: 'center',
    color: COLOR.TEXT.PRIMARY
  },

  btnClose: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE
  },
  textClose: {
    textAlign: 'center',
    color: COLOR.TEXT.SECONDARY
  }
});
