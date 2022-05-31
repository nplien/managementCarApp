import {FontType, MyButtonIcon, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';

interface IProps {
  isShowBtnLeft?: boolean;
  iconLeftFontType?: FontType;
  iconLeftProps?: IconProps;
  onPressLeft?: () => void;
  buttonLeftProps?: TouchableOpacityProps;

  isShowBtnRight?: boolean;
  iconRightFontType?: FontType;
  iconRightProps?: IconProps;
  onPressRight?: () => void;
  buttonRightProps?: TouchableOpacityProps;
}

export default class ButtonToolbarRouter extends PureComponent<IProps> {
  render() {
    const {
      isShowBtnLeft,
      iconLeftFontType,
      iconLeftProps,

      onPressLeft,
      buttonLeftProps,

      isShowBtnRight,
      iconRightFontType,
      iconRightProps,

      onPressRight,
      buttonRightProps
    } = this.props;
    let _viewLeft = null;
    if (isShowBtnLeft) {
      let leftFontType = iconLeftFontType ? iconLeftFontType : 'Octicons';
      let leftFontProps = iconLeftProps
        ? iconLeftProps
        : {name: 'plus', size: 20, color: COLOR.TEXT.WHITE};
      _viewLeft = (
        <MyButtonIcon
          iconFontType={leftFontType}
          iconProps={leftFontProps}
          style={styles.left}
          {...buttonLeftProps}
          onPress={onPressLeft}
        />
      );
    }

    let _viewRight = null;
    if (isShowBtnRight) {
      let rightFontType = iconRightFontType ? iconRightFontType : 'MaterialCommunityIcons';
      let rightFontProps = iconRightProps
        ? iconRightProps
        : {name: 'bell', size: 20, color: COLOR.TEXT.WHITE};
      _viewRight = (
        <MyButtonIcon
          iconFontType={rightFontType}
          iconProps={rightFontProps}
          style={styles.right}
          {...buttonRightProps}
          onPress={onPressRight}
        />
      );
    }
    return (
      <MyView transparent style={styles.container}>
        {_viewLeft}
        {_viewRight}
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
