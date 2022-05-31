import React, {Component} from 'react';
import {MyView, MyText, MyButton} from 'bases/components';
import {
  IBCBanHangState,
  getDoanhThuTheoThoiGianStackBarBCBH,
  getDoanhThuTheoStorePieChartBCBH,
  getDoanhThuLoiNhuanGiaVonLineChartBCBH,
  getStaffBestSaleBCBH
} from '../redux';
import FilterKenhban from './FilterKenhban';
import FilterPTBH from './FilterPTBH';
import MyNavigator from 'utils/MyNavigator';
import {setMargin, COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FilterBCBanHangStyles} from '../styles/BCBanHang.Styles';
import FilterTablePrice from './FilterTablePrice';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'FilterBCBanHang'> &
  IBCBanHangState & {
    getDoanhThuTheoThoiGianStackBarBCBH: typeof getDoanhThuTheoThoiGianStackBarBCBH;
    getDoanhThuTheoStorePieChartBCBH: typeof getDoanhThuTheoStorePieChartBCBH;
    getDoanhThuLoiNhuanGiaVonLineChartBCBH: typeof getDoanhThuLoiNhuanGiaVonLineChartBCBH;
    getStaffBestSaleBCBH: typeof getStaffBestSaleBCBH;
  };
class FilterBCBanHang extends Component<IProps> {
  componentDidMount() {
    try {
      this.props.navigation.setOptions({
        headerRight: () => (
          <MyButton onPress={this.onSubmitFilter} style={{...setMargin(0, 0, 0, 16)}}>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.BLUE}}>
              Áp dụng
            </MyText>
          </MyButton>
        )
      });
    } catch (error) {}
  }

  onSubmitFilter = () => {
    MyNavigator.goBack();
    this.props.getDoanhThuTheoThoiGianStackBarBCBH();
    this.props.getDoanhThuTheoStorePieChartBCBH();
    this.props.getDoanhThuLoiNhuanGiaVonLineChartBCBH();
    this.props.getStaffBestSaleBCBH();
  };

  render() {
    return (
      <MyView style={{backgroundColor: COLOR.BG.SECONDARY}}>
        <MyText style={FilterBCBanHangStyles.setMarginText}>Bảng giá</MyText>
        <FilterTablePrice />
        <MyText style={FilterBCBanHangStyles.setMarginText}>Phương thức bán hàng</MyText>
        <FilterPTBH />
        <MyText style={FilterBCBanHangStyles.setMarginText}>Kênh bán</MyText>
        <FilterKenhban />
      </MyView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getDoanhThuTheoThoiGianStackBarBCBH,
      getDoanhThuTheoStorePieChartBCBH,
      getDoanhThuLoiNhuanGiaVonLineChartBCBH,
      getStaffBestSaleBCBH
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(FilterBCBanHang);
