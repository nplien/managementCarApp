import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';

import {COLOR} from 'bases/styles/Core';
import {IProductBanHangState} from '../redux';
import {BHCustomerandPrice} from '../styles/ProductHangHoa.Style';
import {ViewStyle} from 'react-native';

interface IProps extends IProductBanHangState {
  style?: ViewStyle;
}

class ChooseKhachHang extends PureComponent<IProps> {
  render() {
    const {currentKhachHang, style} = this.props;

    return (
      <MyButton
        style={style ? style : BHCustomerandPrice.btnCustomer}
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
  const {currentKhachHang} = state.ProductBanHangReducer;
  return {
    currentKhachHang
  };
};

export default connect(mapStateToProps, null)(ChooseKhachHang);
