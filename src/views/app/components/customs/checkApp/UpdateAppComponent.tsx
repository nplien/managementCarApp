import {MyButtonText, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
interface IProps {
  url_app: string;
  content: string;
  is_required: boolean;
}
const UpdateAppComponent = (props: IProps) => {
  return (
    <MyView style={styles.modalContent}>
      <MyText style={styles.txtTitle} myFontStyle={'Bold'}>
        Cập nhật ứng dụng
      </MyText>
      <MyText style={styles.txtNote}>
        Đã có phiên bản mới trên {Utilities.isAndroid() ? 'CH Play' : 'App Store'} hãy cập nhật ngay
        bây giờ
      </MyText>
      {props.content ? <MyText style={styles.txtContent}>{props.content}</MyText> : null}

      <MyView transparent style={styles.containerFooter}>
        {!props.is_required && (
          <MyButtonText
            title={'Để sau'}
            style={styles.btnCancel}
            titleStyle={styles.txtCancel}
            onPress={() => {
              MyNavigator.goBack();
            }}
          />
        )}
        <MyButtonText
          title={'Cập nhật'}
          style={styles.btnUpdateNow}
          titleStyle={styles.txtUpdate}
          onPress={() => {
            Linking.openURL(props.url_app);
          }}
        />
      </MyView>
    </MyView>
  );
};

export default UpdateAppComponent;

const styles = StyleSheet.create({
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  modalContent: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32),
    borderRadius: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: MY_SIZE.s_20,
    color: COLOR.TEXT.BLACK
  },
  txtNote: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    textAlign: 'center',
    color: COLOR.TEXT.GRAY
  },
  txtContent: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    color: COLOR.TEXT.GRAY,
    textAlign: 'center'
  },
  btnUpdateNow: {
    flex: 1,
    borderWidth: MY_SIZE.s_1,
    borderColor: COLOR.BG.PRIMARY,
    backgroundColor: COLOR.BG.BLACK,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtUpdate: {
    color: COLOR.TEXT.WHITE
  },
  btnCancel: {
    flex: 1,
    borderWidth: MY_SIZE.s_1,
    borderColor: COLOR.BG.BLACK,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  txtCancel: {
    color: COLOR.TEXT.BLACK
  }
});
