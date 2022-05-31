import {COLOR, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {formPaymentStyle} from './styles/FormPayment.Styles';
import ItemTienMat from './components/ItemTienMat';
import {ItemLineIndicator} from 'views/app/components/items';
import ViewChuyenKhoan from './components/chuyenKhoan/ViewChuyenKhoan';
import ItemCoin from './components/ItemCoin';
import ViewMayPos from './components/mayPos/ViewMayPos';
import Utilities from 'utils/Utilities';
import {IFormPaymentState} from './redux';
import ItemApDungVoucher from './components/ItemApDungVoucher';
import {IThanhToanState} from '../thanhToanBanHang/redux';
import SoTienCanTra from './components/SoTienCanTra';
import SoTienDaTra from './components/SoTienDaTra';

interface IProps extends IThanhToanState, IFormPaymentState {}

class FormPayment extends PureComponent<IProps> {
  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        style={formPaymentStyle.container}
        behavior={Utilities.isAndroid() ? undefined : 'padding'}>
        <ScrollView style={formPaymentStyle.container} showsVerticalScrollIndicator={false}>
          <SoTienCanTra />
          <SoTienDaTra />
          <ItemLineIndicator style={{backgroundColor: COLOR.BG.SECONDARY, height: MY_SIZE.s_20}} />
          <ItemTienMat />
          <ItemLineIndicator style={{backgroundColor: COLOR.BG.SECONDARY, height: MY_SIZE.s_10}} />
          <ItemCoin />
          <ItemLineIndicator style={{backgroundColor: COLOR.BG.SECONDARY, height: MY_SIZE.s_10}} />
          <ViewChuyenKhoan />
          <ItemLineIndicator style={{backgroundColor: COLOR.BG.SECONDARY, height: MY_SIZE.s_10}} />
          <ViewMayPos />
          <ItemLineIndicator style={{backgroundColor: COLOR.BG.SECONDARY, height: MY_SIZE.s_10}} />
          <ItemApDungVoucher />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default FormPayment;
