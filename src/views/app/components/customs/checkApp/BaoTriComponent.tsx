import {MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React from 'react';
import {Linking, StyleSheet} from 'react-native';

interface IProps {
  content: string;
}

const BaoTriComponent = (props: IProps) => {
  return (
    <MyView style={styles.container}>
      <MyText myFontStyle={'Bold'} style={styles.txtTitle}>
        Bảo trì ứng dụng
      </MyText>

      <MyText style={styles.txtNote}>
        <MyText style={styles.app_name}>Cocolux</MyText> đang tiến hành bảo trị hệ thống, nhằm đáp
        ứng trải nghiệm mua sắm tốt hơn.
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
          1900 2003
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

export default BaoTriComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32, MY_SIZE.s_32),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: MY_SIZE.s_20,
    color: COLOR.TEXT.BLACK,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  txtNote: {
    color: COLOR.TEXT.GRAY,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  app_name: {
    fontSize: MY_SIZE.s_18,
    textTransform: 'uppercase',
    color: COLOR.TEXT.BLACK
  },
  txtEmail: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
