import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, StyleSheet} from 'react-native';

import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';

interface IProps extends ActivityIndicatorProps {}

export const MyLoading = (props: IProps) => {
  return (
    <ActivityIndicator
      {...props}
      size={props.size || 'small'}
      color={props.color || COLOR.BG.BLACK}
      style={[styles.content, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
