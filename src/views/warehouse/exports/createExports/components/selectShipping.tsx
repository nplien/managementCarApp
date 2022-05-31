import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {CreateExportStyle} from '../styles/createExport.styles';
import MyNavigator from 'utils/MyNavigator';

interface IProps {}

export default class SelectShipping extends PureComponent<IProps> {
  render() {
    return (
      <MyView style={CreateExportStyle.myViewTop}>
        <MyButton
          style={CreateExportStyle.viewTextHeader}
          // onPress={() => MyNavigator.push('ProductCategorysExport', {type: 'XUAT_HANG'})}
          transparent>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
          <MyText numberOfLines={1} style={CreateExportStyle.txtSearch}>
            Chọn hàng chuyển
          </MyText>
        </MyButton>
        <MyButton
          transparent
          style={CreateExportStyle.myviewIcon}
          onPress={() => {
            MyNavigator.push('ExportCateAndBrands');
          }}>
          <MyIcon iconFontType="MaterialCommunityIcons" name="view-list-outline" size={24} />
        </MyButton>
        <MyButton transparent style={CreateExportStyle.myviewIcon}>
          <MyIcon iconFontType="MaterialCommunityIcons" name="barcode-scan" size={24} />
        </MyButton>
      </MyView>
    );
  }
}
