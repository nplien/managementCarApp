import React, {PureComponent} from 'react';
import {StyleSheet, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyText, MyView} from 'bases/components';
import {MyInput} from '../input/MyInput';

interface IProps {
  onApDung: (note: string) => void;
}

interface IStates {
  isVisible: boolean;
}

class MyNotePicker extends PureComponent<IProps, IStates> {
  note: string = '';
  state = {isVisible: false};

  onShow = (note: string) => {
    this.note = note;
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  submit = () => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        this.props.onApDung(this.note);
      }
    );
  };

  setKeyword = (text: string) => {
    this.note = text;
  };

  render() {
    const {isVisible} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        // supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <MyView style={styles.container2}>
          <MyButton
            style={styles.containerToolbar}
            transparent
            onPress={this.onHide}
            activeOpacity={1}
          />

          <MyView style={styles.content}>
            <MyButton style={styles.btnTitle} transparent onPress={this.onHide}>
              <MyText myFontStyle="Regular" style={styles.titleLeft}>
                {'Huỷ bỏ'}
              </MyText>
            </MyButton>
            <MyView style={styles.btnTitle2} transparent>
              <MyText myFontStyle="Bold" style={styles.title}>
                {'Ghi chú'}
              </MyText>
            </MyView>
            <MyButton style={styles.btnTitle} transparent onPress={this.submit}>
              <MyText myFontStyle="Regular" style={styles.titleRight}>
                {'Áp dụng'}
              </MyText>
            </MyButton>
          </MyView>
          <MyView style={styles.line} />

          <ScrollView
            style={styles.modalContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <MyInput
              textAlignVertical={'top'}
              numberOfLines={10}
              multiline
              autoFocus
              defaultValue={this.note}
              placeholder={'Nhập ghi chú'}
              placeholderTextColor={COLOR.TEXT.SECONDARY}
              style={styles.textInput2}
              onChangeText={this.setKeyword}
            />
          </ScrollView>
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
      </Modal>
    );
  }
}

export default MyNotePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE
  },
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_75
  },
  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row'
  },
  btnTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  btnTitle2: {
    flex: 2,
    height: '100%',
    justifyContent: 'center'
  },
  titleLeft: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE,
    textAlign: 'left'
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  titleRight: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    color: COLOR.TEXT.BLUE,
    textAlign: 'right'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  },
  textInput2: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16),
    height: MY_SIZE.s_255,
    fontSize: MY_SIZE.s_16
  }
});
