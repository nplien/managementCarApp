import React from 'react';
import {View} from 'react-native';
import tw from 'utils/tailwind';
import ViewHangTon from './ViewHangTon';

export function DatHangAndTonKho() {
  return (
    <View style={tw.style('mt-16px')}>
      {/* <ViewDatHang /> */}
      {/* <ItemLineIndicatorCustom lineStyle={{marginHorizontal: 16}} /> */}
      <ViewHangTon />
    </View>
  );
}
