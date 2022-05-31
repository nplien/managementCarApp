import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {MyButton, MyButtonShadow} from '../button/MyButton';
import {MyView, MyViewShadow} from '../view/MyView';
import {MyText} from '../textview/MyText';
import {IAppNavigateProps} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

type IProps = IAppNavigateProps<'MyBottomSheetPicker'>;

interface IStates {
  isVisible: boolean;
}

export default class MyBottomSheetPicker extends PureComponent<IProps, IStates> {
  onHide = () => {
    MyNavigator.goBack();
  };

  render() {
    const {title, titleButtonCancel, arrayButton} = this.props.route.params;

    let _viewTitle = null;
    let styleContainerScroll = styles.containerScrollView;
    let styleScroll = styles.contentScrollView;
    if (title) {
      styleContainerScroll = styles.containerScrollView2;
      styleScroll = styles.contentScrollView2;
      _viewTitle = (
        <MyView transparent>
          <MyView style={styles.btnTitleAction}>
            <MyText myFontStyle="Regular" style={styles.title}>
              {title}
            </MyText>
          </MyView>
          <MyView style={styles.line} />
        </MyView>
      );
    }

    let _viewButton: any[] = [];
    for (let i = 0; i < arrayButton.length; i++) {
      const element = arrayButton[i];
      let styleActive = {};
      if (element.isActive) {
        styleActive = {color: COLOR.TEXT.NEGATIVE_BTN};
      }
      if (i === 0) {
        if (title) {
          _viewButton.push(
            <MyButton
              key={i}
              activeOpacity={1}
              style={styles.btnContentAction}
              onPress={element.onPress}>
              <MyText myFontStyle="Regular" style={[styles.textDelete, styleActive]}>
                {element.title}
              </MyText>
            </MyButton>
          );
        } else {
          _viewButton.push(
            <MyButton
              key={i}
              activeOpacity={1}
              style={styles.btnTitleAction}
              onPress={element.onPress}>
              <MyText myFontStyle="Regular" style={[styles.textDelete, styleActive]}>
                {element.title}
              </MyText>
            </MyButton>
          );
        }
      } else if (i === arrayButton.length - 1) {
        _viewButton.push(
          <MyView transparent key={i}>
            <MyView style={styles.line} />
            <MyButton activeOpacity={1} style={styles.btnDeleteAction} onPress={element.onPress}>
              <MyText myFontStyle="Regular" style={[styles.textDelete, styleActive]}>
                {element.title}
              </MyText>
            </MyButton>
          </MyView>
        );
      } else {
        _viewButton.push(
          <MyView transparent key={i}>
            <MyView style={styles.line} />
            <MyButton activeOpacity={1} style={styles.btnContentAction} onPress={element.onPress}>
              <MyText myFontStyle="Regular" style={[styles.textDelete, styleActive]}>
                {element.title}
              </MyText>
            </MyButton>
          </MyView>
        );
      }
    }

    return (
      <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
        <MyButton style={styles.container} activeOpacity={1} onPress={this.onHide} transparent>
          <MyViewShadow transparent style={styles.modalContainer}>
            {_viewTitle}

            <MyView style={styleContainerScroll}>
              <ScrollView
                style={styleScroll}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                {_viewButton}
              </ScrollView>
            </MyView>
            <MyButtonShadow activeOpacity={1} style={styles.btnClose} onPress={this.onHide}>
              <MyText myFontStyle="Bold" style={styles.textClose}>
                {titleButtonCancel}
              </MyText>
            </MyButtonShadow>
          </MyViewShadow>
        </MyButton>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  modalContainer: {
    flex: 1,
    width: Utilities.getWidthScreen(),
    justifyContent: 'flex-end',
    alignSelf: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },

  title: {
    fontSize: MY_SIZE.s_18,
    color: COLOR.TEXT.PRIMARY
  },

  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  },

  btnTitleAction: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    justifyContent: 'center',
    alignItems: 'center',
    height: MY_SIZE.s_50,
    backgroundColor: COLOR.BG.WHITE
  },

  btnContentAction: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    justifyContent: 'center',
    alignItems: 'center',
    height: MY_SIZE.s_50,
    backgroundColor: COLOR.BG.WHITE
  },

  btnDeleteAction: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12),
    justifyContent: 'center',
    alignItems: 'center',
    height: MY_SIZE.s_50,
    backgroundColor: COLOR.BG.WHITE
  },

  textDelete: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center',
    color: COLOR.TEXT.POSITIVE_BTN
  },

  btnClose: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12),
    height: MY_SIZE.s_50,
    backgroundColor: COLOR.BG.WHITE
  },

  textClose: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center',
    color: COLOR.TEXT.POSITIVE_BTN
  },

  containerScrollView: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12),
    backgroundColor: COLOR.BG.WHITE
    // maxHeight:
    //   (Utilities.getWidthScreen() / (MY_SIZE.s_50 + StyleSheet.hairlineWidth) - 2) *
    //   (MY_SIZE.s_50 + StyleSheet.hairlineWidth)
  },
  containerScrollView2: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12),
    backgroundColor: COLOR.BG.WHITE
    // maxHeight:
    //   (Utilities.getWidthScreen() / (MY_SIZE.s_50 + StyleSheet.hairlineWidth) - 3) *
    //   (MY_SIZE.s_50 + StyleSheet.hairlineWidth)
  },
  contentScrollView: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  contentScrollView2: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});
