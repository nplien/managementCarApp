import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SalesStyles} from './styles/BCBanHang.Styles';
import {MyView} from 'bases/components';
import ViewLocThoiGian from './components/ViewLocThoiGian';
import ChonChiNhanh from './components/ChonChiNhanh';
import StackBarView from './components/bieudocochongSales/StackBarView';
import ListStoreCotChongReport from './components/bieudocochongSales/ListStoreCotChongReport';
import PieDTView from './components/bieuDoTron/PieDTView';
import ListStorePieReport from './components/bieuDoTron/ListStorePieReport';
import StaffBestSales from './components/StaffBestSales';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  IBCBanHangState,
  getDoanhThuTheoThoiGianStackBarBCBH,
  getDoanhThuTheoStorePieChartBCBH,
  getDoanhThuLoiNhuanGiaVonLineChartBCBH,
  getStaffBestSaleBCBH
} from './redux';
import LineDTView from './components/bieudoduong/LineDTView';
import ListViewLoiNhuan from './components/bieudoduong/ListViewLoiNhuan';

interface IProps extends IBCBanHangState {
  getDoanhThuTheoThoiGianStackBarBCBH: typeof getDoanhThuTheoThoiGianStackBarBCBH;
  getDoanhThuTheoStorePieChartBCBH: typeof getDoanhThuTheoStorePieChartBCBH;
  getDoanhThuLoiNhuanGiaVonLineChartBCBH: typeof getDoanhThuLoiNhuanGiaVonLineChartBCBH;
  getStaffBestSaleBCBH: typeof getStaffBestSaleBCBH;
}

class BCBanHang extends Component<IProps> {
  componentDidMount() {
    this.onLoadDataReport();
  }

  onLoadDataReport = () => {
    this.props.getDoanhThuTheoThoiGianStackBarBCBH();
    this.props.getDoanhThuTheoStorePieChartBCBH();
    this.props.getDoanhThuLoiNhuanGiaVonLineChartBCBH();
    this.props.getStaffBestSaleBCBH();
  };

  render() {
    return (
      <SafeAreaView style={SalesStyles.container} edges={['bottom']}>
        <MyView style={SalesStyles.myViewTop}>
          <ViewLocThoiGian />
          <ChonChiNhanh />
        </MyView>
        <FlatList
          refreshControl={<RefreshControl refreshing={false} onRefresh={this.onLoadDataReport} />}
          ListHeaderComponent={() => {
            return (
              <>
                <StackBarView />
                <ListStoreCotChongReport />
                <PieDTView />
                <ListStorePieReport />
                <LineDTView />
                <ListViewLoiNhuan />
                <StaffBestSales />
              </>
            );
          }}
          data={[]}
          renderItem={() => {
            return null;
          }}
          style={SalesStyles.container}
          bouncesZoom={false}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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

export default connect(null, mapDispatchToProps)(BCBanHang);
