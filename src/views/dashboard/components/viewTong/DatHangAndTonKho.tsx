import React from 'react';
import {View} from 'react-native';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import ViewDatHang from './ViewDatHang';
import ViewHangTon from './ViewHangTon';

export function DatHangAndTonKho() {
  return (
    <View>
      <ViewDatHang />
      <ItemLineIndicatorCustom lineStyle={{marginHorizontal: 16}} />
      <ViewHangTon />
    </View>
  );
}
