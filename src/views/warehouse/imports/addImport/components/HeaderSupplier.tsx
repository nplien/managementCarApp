import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {IAddImportOrderState} from '../redux';
import {supplierStyle} from '../style/AddImport.Styles';
interface IProps extends IAddImportOrderState {}

class HeaderSupplier extends PureComponent<IProps> {
  render() {
    const {suppliers} = this.props;
    return (
      <MyButton
        onPress={() => MyNavigator.push('SuppliersImport', {type: 'IMPROT_ORDER'})}
        style={supplierStyle.container}>
        <MyView style={supplierStyle.viewLeft}>
          <MyIcon iconFontType="MaterialCommunityIcons" name={'home-group'} size={22} />
          <MyText myFontStyle="Regular" style={supplierStyle.txtSupplier}>
            {suppliers?.name || 'Chọn nhà cung cấp'}
          </MyText>
        </MyView>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name="chevron-right"
          color={COLOR.TEXT.BLACK}
          size={28}
          style={supplierStyle.icon}
        />
      </MyButton>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {suppliers} = state.AddImportOrderReducer;
  return {suppliers};
};

export default connect(mapStateToProps, null)(HeaderSupplier);
