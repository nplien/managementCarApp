import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';

import GiamGiaPSC from './components/GiamGiaPSC';
import KhachThanhToanPSC from './components/KhachThanhToanPSC';
import {ItemLineIndicator} from 'views/app/components/items';
import TongTienHangPSC from './components/TongTienHangPSC';
import KhachCanTraPSC from './components/KhachCanTraPSC';
import KhachThuaTienPSC from './components/KhachThuaTienPSC';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';
import ButtomThanhToanPSC from './components/ButtomThanhToanPSC';

class ThanhToanBanHang extends PureComponent {
  render() {
    return (
      <MyView style={thanhToanStyles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          style={thanhToanStyles.container}
          showsVerticalScrollIndicator={false}>
          <TongTienHangPSC />
          <ItemLineIndicator />
          <GiamGiaPSC />
          <ItemLineIndicator />
          <KhachCanTraPSC />
          <ItemLineIndicator />
          <KhachThanhToanPSC />
          <KhachThuaTienPSC />
        </ScrollView>
        <ButtomThanhToanPSC />
      </MyView>
    );
  }
}

export default ThanhToanBanHang;
