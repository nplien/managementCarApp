import React, {PureComponent} from 'react';
import {TextStyle, TouchableOpacity, TouchableOpacityProps, StyleSheet} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';

import {FontType, MyIcon} from 'bases/components/icon/MyIcon';

import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {MyText, IPropsMyText} from '../textview/MyText';

interface IPopsMyButton extends TouchableOpacityProps {
  children?: React.ReactNode;
  transparent?: boolean;
}

export class MyButton extends PureComponent<IPopsMyButton> {
  render() {
    const {children, transparent, style} = this.props;
    let styleOfView = {};
    let transparentStyle = {};
    if (style) {
      styleOfView = style;
    }
    if (transparent) {
      transparentStyle = {backgroundColor: 'transparent'};
    }
    return (
      <TouchableOpacity
        activeOpacity={0.65}
        {...this.props}
        style={[styles.container, styleOfView, transparentStyle]}>
        {children}
      </TouchableOpacity>
    );
  }
}

export const MyButtonShadow = (props: IPopsMyButton) => {
  const {children, transparent, style} = props;
  let styleOfView = {};
  let transparentStyle = {};
  if (style) {
    styleOfView = style;
  }
  if (transparent) {
    transparentStyle = {backgroundColor: 'transparent'};
  }
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
      style={[styles.containerShadow, styleOfView, transparentStyle]}>
      {children}
    </TouchableOpacity>
  );
};

interface IPropsMyButtonText extends TouchableOpacityProps {
  title: string;
  titleStyle?: TextStyle;
  titleProps?: IPropsMyText;
}

export const MyButtonText = (props: IPropsMyButtonText) => {
  const {style, title, titleProps, titleStyle} = props;

  return (
    <TouchableOpacity activeOpacity={0.65} {...props} style={[styles.buttonText, style]}>
      <MyText {...titleProps} style={[styles.title, titleStyle]} myFontStyle="Bold">
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

export const MyButtonTextBorder = (props: IPropsMyButtonText) => {
  const {style, title, titleProps, titleStyle} = props;

  return (
    <TouchableOpacity {...props} style={[styles.buttonTextBorder, style]}>
      <MyText myFontStyle="Bold" {...titleProps} style={[styles.titleBorder, titleStyle]}>
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

interface IPropsMyButtonIcon extends TouchableOpacityProps {
  iconFontType: FontType;
  iconProps: IconProps;
}

/**
 ** size default '18'
 *
 */
export const MyButtonIcon = (props: IPropsMyButtonIcon) => {
  const {iconFontType, iconProps} = props;
  return (
    <TouchableOpacity {...props}>
      <MyIcon iconFontType={iconFontType} size={18} {...iconProps} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: COLOR.BG.PRIMARY},
  containerShadow: {
    backgroundColor: COLOR.BG.PRIMARY,
    shadowColor: COLOR.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10
  },

  buttonText: {
    backgroundColor: COLOR.BUTTON.RED,
    height: MY_SIZE.s_38,
    ...setRadius(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: COLOR.TEXT.WHITE,
    fontSize: MY_SIZE.s_14
  },

  buttonTextBorder: {
    backgroundColor: COLOR.BUTTON.WHITE,
    height: MY_SIZE.s_32,
    borderColor: COLOR.BUTTON.RED,
    borderWidth: 1,
    ...setRadius(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBorder: {
    color: COLOR.BUTTON.RED,
    fontSize: MY_SIZE.s_14
  }
});
