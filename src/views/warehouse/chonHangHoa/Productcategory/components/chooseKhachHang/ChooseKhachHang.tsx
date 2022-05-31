import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';

import {BHCustomerandPrice} from '../../styles/BanHang.style';
import {IChooseKhachHangState} from './redux';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IChooseKhachHangState {}

class ChooseKhachHang extends PureComponent<IProps> {
  render() {
    const {currentKhachHang} = this.props;

    return (
      <MyButton
        transparent
        style={BHCustomerandPrice.btnCustomer}
        onPress={() => MyNavigator.navigate('Customer', {type: 'CHON_KHACH_HANG'})}>
        <MyIcon name="person" iconFontType="MaterialIcons" size={20} color={COLOR.TEXT.GRAY} />
        <MyText style={BHCustomerandPrice.txtSearch} myFontStyle="Regular">
          {currentKhachHang?.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentKhachHang} = state.ChooseKhachHangReducer;
  return {
    currentKhachHang
  };
};

export default connect(mapStateToProps, null)(ChooseKhachHang);
