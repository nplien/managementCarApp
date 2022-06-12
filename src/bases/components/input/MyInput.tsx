import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native';

import {MyText} from 'bases/components/textview/MyText';
import {MyView} from 'bases/components/view/MyView';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius, TYPE_OF_FONT} from 'bases/styles/Core';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import {PRICE_MASK} from 'common/Constants';
import tw from 'utils/tailwind';

interface IProps extends TextInputProps {
  label?: any | null;
  labelStyle?: StyleProp<TextStyle>;
  inputRef?: React.Ref<any>;
  myFontStyle?: 'Regular' | 'Medium' | 'Bold';
  containerStyle?: StyleProp<ViewStyle>;
}

export class MyInput extends PureComponent<IProps> {
  render() {
    const {label, inputRef, myFontStyle, containerStyle, labelStyle} = this.props;
    let textStyle = {};
    if (myFontStyle) {
      switch (myFontStyle) {
        case 'Bold':
          textStyle = {
            fontWeight: 'bold'
          };
          break;
        case 'Medium':
          textStyle = {
            fontWeight: '500'
          };
          break;
        default:
          textStyle = {
            fontWeight: 'normal'
          };
          break;
      }
    } else {
      textStyle = {
        fontWeight: 'normal'
      };
    }
    const labelView = label ? (
      <MyText style={[styles.label, textStyle, labelStyle]}>{label}</MyText>
    ) : null;
    return (
      <MyView style={containerStyle}>
        {labelView}
        <TextInput
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          {...this.props}
          placeholder={this.props.placeholder ? this.props.placeholder : 'Nhập...'}
          focusable={false}
          autoCorrect={false}
          allowFontScaling={false}
          ref={inputRef}
          style={[
            tw.style(
              'px-2 android:py-1 ios:py-2 text-[14px] rounded border border-stone-300 text-black'
            ),
            this.props.style
          ]}
        />
      </MyView>
    );
  }
}

interface IPropsInputMask extends Partial<TextInputMaskProps> {
  label?: any | null;
  inputRef?: React.Ref<any>;
  containerStyle?: StyleProp<ViewStyle>;

  currency?: 'VND' | 'USD';
  myFontStyle?: TYPE_OF_FONT;
  value?: string;
  onTextCallback: (text: string) => void;
}
/**
 ** TextSize default '14'
 ** myFontStyle default 'Regular'
 ** currency default 'VND'
 */

export class MyInputPriceMask extends React.PureComponent<IPropsInputMask> {
  state = {text: this.props.value};

  render() {
    const {currency, label, inputRef, myFontStyle, containerStyle, style, onTextCallback} =
      this.props;

    let option = PRICE_MASK.INPUT.HIDE;
    if (currency) {
      if (currency !== 'VND') {
        option = PRICE_MASK.INPUT[currency];
      } else {
        option = PRICE_MASK.INPUT.VND;
      }
    }

    let textStyle = {};
    if (myFontStyle) {
      switch (myFontStyle) {
        case 'Bold':
          textStyle = {
            fontWeight: 'bold'
          };
          break;
        case 'Medium':
          textStyle = {
            fontWeight: '500'
          };
          break;
        default:
          textStyle = {
            fontWeight: 'normal'
          };
          break;
      }
    } else {
      textStyle = {
        fontWeight: 'normal'
      };
    }
    const labelView = label ? <MyText style={[styles.label, textStyle]}>{label}</MyText> : null;
    return (
      <MyView style={containerStyle}>
        {labelView}
        <TextInputMask
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          focusable={false}
          autoCorrect={false}
          allowFontScaling={false}
          {...this.props}
          ref={inputRef}
          style={[styles.input, style, textStyle]}
          type={'money'}
          value={this.props.value ? this.props.value : this.state.text}
          includeRawValueInChangeText
          onChangeText={(text, raw) => {
            this.setState({text}, () => {
              onTextCallback(raw || '');
            });
          }}
          options={option}
        />
      </MyView>
    );
  }
}

interface IPropsNew extends TextInputProps {
  inputRef?: React.Ref<any>;
  myFontStyle?: 'Regular' | 'Medium' | 'Bold';
}
export class MyInputNew extends PureComponent<IPropsNew> {
  render() {
    const {inputRef, myFontStyle} = this.props;
    let textStyle = {};
    if (myFontStyle) {
      switch (myFontStyle) {
        case 'Bold':
          textStyle = {
            fontWeight: 'bold'
          };
          break;
        case 'Medium':
          textStyle = {
            fontWeight: '500'
          };
          break;
        default:
          textStyle = {
            fontWeight: 'normal'
          };
          break;
      }
    } else {
      textStyle = {
        fontWeight: 'normal'
      };
    }

    return (
      <TextInput
        placeholderTextColor={COLOR.TEXT.SECONDARY}
        {...this.props}
        placeholder={this.props.placeholder ? this.props.placeholder : 'Nhập...'}
        focusable={false}
        autoCorrect={false}
        allowFontScaling={false}
        ref={inputRef}
        style={[styles.inputNew, this.props.style, textStyle]}
      />
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: MY_SIZE.s_14,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  input: {
    color: COLOR.TEXT.BLACK,
    fontSize: MY_SIZE.s_14,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_10),
    minHeight: MY_SIZE.s_38,
    ...setRadius(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_6)
  },
  inputNew: {
    color: COLOR.TEXT.BLACK,
    fontSize: MY_SIZE.s_14,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    minHeight: MY_SIZE.s_38,
    backgroundColor: COLOR.BG.WHITE
  },
  inputMask: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE,
    color: COLOR.TEXT.BLACK
  }
});
