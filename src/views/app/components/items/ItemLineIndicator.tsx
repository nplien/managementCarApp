import {MyView} from 'bases/components';
import {COLOR, setMargin, setRadius} from 'bases/styles/Core';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

export const ItemLineIndicator = (props: ViewProps) => {
  return <MyView {...props} style={[styles.line, props.style]} />;
};

export const ItemBoderBottom = (props: ViewProps) => {
  return <MyView {...props} style={[styles.borderBottom, props.style]} />;
};

interface IItemIndicatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  lineStyle?: StyleProp<ViewStyle>;
}
export const ItemLineIndicatorCustom = (props: IItemIndicatorProps) => {
  return (
    <MyView style={[props.containerStyle]}>
      <View style={[styles.lineCustom, props.lineStyle]} />
    </MyView>
  );
};

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.GRAY,
    ...setMargin(2, 2, 2, 2)
  },
  lineCustom: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'silver'
  },
  borderBottom: {
    ...setRadius(0, 0, 16, 16),
    height: 24,
    backgroundColor: 'white'
  }
});
