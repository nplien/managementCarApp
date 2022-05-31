import {MyButton, MyButtonIcon, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {IAddImportOrderState} from '../redux';
import {ImportHeaderSearch} from '../style/AddImport.Styles';

interface IProps extends IAddImportOrderState {}

class HeaderSearchImport extends PureComponent<IProps> {
  render() {
    return (
      <MyView style={ImportHeaderSearch.container}>
        <MyButton
          // onPress={() => MyNavigator.push('ProductCategorysImport', {type: 'NHAP_HANG'})}
          transparent
          style={ImportHeaderSearch.btnSearch}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
          <MyText style={ImportHeaderSearch.txtSearch}>Nhập tên, mã</MyText>
        </MyButton>
        <MyButtonIcon
          onPress={() => MyNavigator.push('CateAndBrands')}
          iconFontType="MaterialCommunityIcons"
          iconProps={{
            name: 'view-list-outline',
            color: COLOR.TEXT.BLACK,
            size: 24
          }}
          style={ImportHeaderSearch.myviewIcon}
        />
        <MyButtonIcon
          iconFontType="MaterialCommunityIcons"
          iconProps={{
            name: 'barcode-scan',
            color: COLOR.TEXT.BLACK,
            size: 24
          }}
          style={ImportHeaderSearch.myviewIcon}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {suppliers} = state.AddImportOrderReducer;
  return {suppliers};
};

export default connect(mapStateToProps, null)(HeaderSearchImport);
