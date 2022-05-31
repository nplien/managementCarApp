import React from 'react';
import {StyleSheet, TouchableOpacityProps, TextProps, TextStyle} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {IconProps} from 'react-native-vector-icons/Icon';

import {MyText} from 'bases/components/textview/MyText';

import {FontType, MyIcon} from 'bases/components/icon/MyIcon';
import {MyButtonIcon} from 'bases/components/button/MyButton';

import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {MyView} from '../view/MyView';

interface IToolbarProps {
  isShowBtnLeft?: boolean;
  iconLeftFontType?: FontType;
  iconLeftProps?: IconProps;
  onPressLeft?: () => void;
  buttonLeftProps?: TouchableOpacityProps;

  title?: string;
  titleStyle?: TextStyle;
  titleProps?: TextProps;
  isLongTitle?: boolean;

  isShowIconTitle?: boolean;
  iconTitleFontType?: FontType;
  iconTitleProps?: IconProps;

  isShowBtnRight?: boolean;
  iconRightFontType?: FontType;
  iconRightProps?: IconProps;
  onPressRight?: () => void;
  buttonRightProps?: TouchableOpacityProps;
}

export const MyToolbarPrimary = (props: IToolbarProps) => {
  const {
    isShowBtnLeft,
    iconLeftFontType,
    iconLeftProps,

    onPressLeft,
    buttonLeftProps,

    title,
    titleStyle,
    titleProps,
    isLongTitle,

    isShowIconTitle,
    iconTitleFontType,
    iconTitleProps,

    isShowBtnRight,
    iconRightFontType,
    iconRightProps,

    onPressRight,
    buttonRightProps
  } = props;

  let _viewLeft = <MyView style={ToolbarCss.left} />;
  if (isShowBtnLeft) {
    let leftFontType = iconLeftFontType ? iconLeftFontType : 'SimpleLineIcons';
    let leftFontProps = iconLeftProps
      ? iconLeftProps
      : {name: 'menu', size: 26, color: COLOR.TEXT.WHITE};
    let pressLeft = onPressLeft ? onPressLeft : () => MyNavigator.goBack();
    _viewLeft = (
      <MyButtonIcon
        iconFontType={leftFontType}
        iconProps={leftFontProps}
        style={ToolbarCss.left}
        {...buttonLeftProps}
        onPress={pressLeft}
      />
    );
  }

  let _viewIconTitle = null;
  if (isShowIconTitle) {
    let titleFontType = iconTitleFontType ? iconTitleFontType : 'AntDesign';
    let titleFontProps = iconTitleProps
      ? iconTitleProps
      : {name: 'checkcircleo', size: 20, color: COLOR.TEXT.GREEN};
    _viewIconTitle = <MyIcon iconFontType={titleFontType} {...titleFontProps} />;
  }

  let _viewRight = null;
  if (!isLongTitle) {
    _viewRight = <MyView style={ToolbarCss.right} />;
  }
  if (isShowBtnRight) {
    let rightFontType = iconRightFontType ? iconRightFontType : 'AntDesign';
    let rightFontProps = iconRightProps
      ? iconRightProps
      : {name: 'filter', size: 26, color: COLOR.TEXT.WHITE};
    _viewRight = (
      <MyButtonIcon
        iconFontType={rightFontType}
        iconProps={rightFontProps}
        style={ToolbarCss.right}
        {...buttonRightProps}
        onPress={onPressRight}
      />
    );
  }
  return (
    <SafeAreaView style={ToolbarCss.container} edges={['top']}>
      <MyView style={ToolbarCss.content} transparent>
        {_viewLeft}

        <MyText
          {...titleProps}
          numberOfLines={2}
          style={[isLongTitle ? ToolbarCss.titleLong : ToolbarCss.title, titleStyle]}
          myFontStyle="Bold">
          {_viewIconTitle}
          {title}
        </MyText>

        {_viewRight}
      </MyView>
    </SafeAreaView>
  );
};

// export const MyToolbarTitle = (props: IToolbarTitle) => {
//   const {
//     iconLeftFontType,
//     iconLeftProps,

//     title,
//     titleStyle,
//     titleProps,

//     onPress
//   } = props;

//   return (
//     <SafeAreaView style={ToolbarCss.containerTitle} edges={['top']}>
//       <MyButton style={ToolbarCss.contentTitle} onPress={onPress}>
//         <MyIcon iconFontType={iconLeftFontType} {...iconLeftProps} />
//         <MyText
//           {...titleProps}
//           numberOfLines={1}
//           style={[ToolbarCss.titleSmall, titleStyle]}
//           myFontStyle="Regular">
//           {title}
//         </MyText>
//       </MyButton>
//     </SafeAreaView>
//   );
// };

// interface IToolbarSearchProps {
//   isShowBtnLeft?: boolean;
//   iconLeftFontType?: FontType;
//   iconLeftProps?: IconProps;
//   onPressLeft?: () => void;
//   buttonLeftProps?: TouchableOpacityProps;
// }

const ToolbarCss = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.BLACK,
    shadowColor: COLOR.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10
  },
  content: {
    height: MY_SIZE.s_50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    backgroundColor: COLOR.BG.BLACK,
    width: MY_SIZE.s_56,
    height: MY_SIZE.s_50,
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0)
  },
  title: {
    color: COLOR.TEXT.WHITE,
    flex: 1,
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  titleLong: {
    flex: 1,
    fontSize: MY_SIZE.s_18,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0)
  },
  right: {
    backgroundColor: COLOR.BG.BLACK,
    width: MY_SIZE.s_56,
    height: MY_SIZE.s_50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12)
  },

  containerTitle: {
    backgroundColor: COLOR.BG.WHITE
  },
  contentTitle: {
    backgroundColor: COLOR.BG.WHITE,
    height: MY_SIZE.s_30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  titleSmall: {
    fontSize: MY_SIZE.s_12,
    textAlign: 'center',
    color: COLOR.TEXT.PRIMARY,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
