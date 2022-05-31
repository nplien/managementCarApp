import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {StaffBestSaleStyles} from '../styles/BCBanHang.Styles';
import {IBCBanHangState} from '../redux';
import {FlatList, View} from 'react-native';
import {
  // IBCBHModel,
  IBCBHModelV2
} from 'models/DashBoard.Model';
import Utilities from 'utils/Utilities';
import {SvgXml} from 'react-native-svg';
import {svgLine} from 'assets/images/svgImage';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IBCBanHangState {}
class StaffBestSales extends PureComponent<IProps> {
  renderItem = ({item}: {item: IBCBHModelV2}) => {
    const {arrStaffsBestSales} = this.props;
    let withLine: number = 0;
    let top1 = arrStaffsBestSales ? arrStaffsBestSales[0].total_value_2 || 1 : 1;
    const value = (item.total_value_2 || 0) / top1;
    if (value) {
      withLine = Utilities.getWidthScreen() * value;
    }
    return (
      <MyView style={StaffBestSaleStyles.itemView} transparent>
        <MyView style={StaffBestSaleStyles.viewProductName} transparent>
          <MyText style={StaffBestSaleStyles.textProductName}>
            {item.staff ? item.staff.name : ''}
          </MyText>
          <MyText style={StaffBestSaleStyles.textPriceMask}>
            {Utilities.convertCount(item.total_value_2 || 0)}
          </MyText>
        </MyView>
        <SvgXml xml={svgLine(withLine)} width="100%" height="100%" />
      </MyView>
    );
  };
  render() {
    const {arrStaffsBestSales} = this.props;

    return (
      <MyView style={StaffBestSaleStyles.container}>
        <MyButton
          transparent
          style={StaffBestSaleStyles.titleChart}
          onPress={() => {
            MyNavigator.navigate('DetailBCNVBanHang');
          }}>
          <MyText style={StaffBestSaleStyles.myText}>Top nhân viên bán tốt</MyText>
          <MyIcon name={'keyboard-arrow-right'} iconFontType="MaterialIcons" size={16} />
        </MyButton>
        <FlatList
          data={arrStaffsBestSales}
          extraData={arrStaffsBestSales}
          keyExtractor={(_v, i) => i.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={{height: 16}} />}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {arrStaffsBestSales} = state.BCBanHangReducer;
  return {arrStaffsBestSales};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffBestSales);
