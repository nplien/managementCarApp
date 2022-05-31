import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface IProps extends FastImageProps {
  children?: React.ReactNode;
}

export function MyImage(props: IProps) {
  const {children, style} = props;

  return (
    <FastImage resizeMode="cover" {...props} style={[style]}>
      {children}
    </FastImage>
  );
}
