import {MyText, MyView} from 'bases/components';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {ItemLineIndicatorCustom} from 'views/app/components/items';

export default class Notification extends Component {
  render() {
    return (
      <MyView style={styles.container}>
        <ItemLineIndicatorCustom />
        <MyView style={styles.content}>
          <MyText> Chưa có thông báo nào </MyText>
        </MyView>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    marginTop: 30
  }
});
