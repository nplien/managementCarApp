import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {CreateSaleStyle} from '../styles/CreateSale.styles';
import MyNavigator from 'utils/MyNavigator';
import {SCREEN_PRODUCT_TYPE} from 'common/Constants';

interface IProps {}

export default class SelectProduct extends PureComponent<IProps> {
  render() {
    return (
      <MyView style={CreateSaleStyle.myViewTop}>
        <MyButton
          style={CreateSaleStyle.viewTextHeader}
          transparent
          onPress={() => {
            MyNavigator.push('ProductBanHang', {type: SCREEN_PRODUCT_TYPE.BAN_HANG});
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
          <MyText numberOfLines={1} style={CreateSaleStyle.txtSearch}>
            Chọn hàng hoá
          </MyText>
        </MyButton>
        <MyButton transparent style={CreateSaleStyle.myviewIcon}>
          <MyIcon iconFontType="MaterialCommunityIcons" name="barcode-scan" size={24} />
        </MyButton>
      </MyView>
    );
  }
}
