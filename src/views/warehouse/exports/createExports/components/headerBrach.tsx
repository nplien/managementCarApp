import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React from 'react';
import {HeaderBrachStyle} from '../styles/createExport.styles';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {ICreateExportState} from '../redux';
import {IChooseStoreState} from 'views/menuLeft/redux';
interface IProps extends ICreateExportState, IChooseStoreState {}
class HeaderBrach extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const {name} = this.props.objBranch;
    const {cuaHangDangChon} = this.props;
    return (
      <MyView>
        <MyView style={HeaderBrachStyle.container}>
          <MyView transparent style={HeaderBrachStyle.btnCustomer}>
            <MyIcon name="storefront" iconFontType="MaterialCommunityIcons" size={24} />
            <MyText style={HeaderBrachStyle.txtSearch} myFontStyle="Regular">
              {cuaHangDangChon?.name}
            </MyText>
          </MyView>
          {/* <MyView transparent style={HeaderBrachStyle.btnPrice}>
            <MyIcon name="chevron-right" iconFontType="MaterialCommunityIcons" size={28} />
          </MyView> */}
        </MyView>
        <MyButton
          style={HeaderBrachStyle.container}
          onPress={() => {
            MyNavigator.navigate('ManagerBranchExport', {type: 'CHUYEN_HANG'});
          }}>
          <MyView transparent style={HeaderBrachStyle.btnCustomer}>
            <MyIcon name="storefront" iconFontType="MaterialCommunityIcons" size={24} />
            <MyText style={HeaderBrachStyle.txtSearch} myFontStyle="Regular">
              {name ? name : 'Chuyển tới chi nhánh'}
            </MyText>
          </MyView>
          <MyView transparent style={HeaderBrachStyle.btnPrice}>
            <MyIcon name="chevron-right" iconFontType="MaterialCommunityIcons" size={28} />
          </MyView>
        </MyButton>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  const {objBranch} = state.CreateExportReducer;
  return {objBranch, cuaHangDangChon};
};
export default connect(mapStateToProps, null)(HeaderBrach);
