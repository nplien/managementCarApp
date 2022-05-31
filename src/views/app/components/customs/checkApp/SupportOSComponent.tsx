import {MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React from 'react';
import {Linking, StyleSheet} from 'react-native';
interface IPropsSupportOS {
  content: string;
}
const SupportOSComponent = (props: IPropsSupportOS) => {
  return (
    <MyView style={styles.modalContent}>
      <MyText style={styles.txtTitle} myFontStyle={'Bold'}>
        Thông báo
      </MyText>

      <MyText style={styles.txtNote}>
        Rất xin lỗi bạn vì phiên bản hệ điều hành của bạn không được hỗ trợ
      </MyText>

      {props.content ? <MyText style={styles.txtNote}>{props.content}</MyText> : null}

      <MyText style={styles.txtNote}>Mọi ý kiến đóng góp vui lòng liên hệ:</MyText>
      <MyText style={styles.txtNote}>
        Hotline:{' '}
        <MyText
          style={styles.txtEmail}
          onPress={() => {
            Linking.openURL('tel: 19002003');
          }}>
          19002003
        </MyText>
      </MyText>
      <MyText style={styles.txtNote}>
        Email:{' '}
        <MyText
          style={styles.txtEmail}
          onPress={() => {
            // Linking.openURL('mailto:cskh@cocolux.com');
          }}>
          {' '}
        </MyText>
      </MyText>
    </MyView>
  );
};

export default SupportOSComponent;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32)
  },
  txtTitle: {
    textAlign: 'center',
    color: COLOR.TEXT.BLACK,
    fontSize: MY_SIZE.s_20,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtNote: {
    color: COLOR.TEXT.GRAY,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  txtEmail: {
    color: COLOR.TEXT.PRIMARY,
    textDecorationLine: 'underline'
  }
});
