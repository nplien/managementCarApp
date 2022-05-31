import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {COLOR} from 'bases/styles/Core';

interface IProps extends ViewProps {
  children?: React.ReactNode;
  transparent?: boolean;
}

export const MyView = (props: IProps) => {
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
    <View {...props} style={[styles.container, styleOfView, transparentStyle]}>
      {children}
    </View>
  );
};

export const MyViewShadow = (props: IProps) => {
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
    <View {...props} style={[styles.containerShadow, styleOfView, transparentStyle]}>
      {children}
    </View>
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
  }
});
