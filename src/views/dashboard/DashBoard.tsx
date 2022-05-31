import {MyView} from 'bases/components';
import React, {Component} from 'react';
import {DashBoardStyles} from './styles/DashBoard.styles';

import ChonChiNhanh from './components/chonChiNhanh/ChonChiNhanh';
import LocThoiGian from './components/locThoiGian/LocThoiGian';
import {RefreshControl, ScrollView} from 'react-native';
import StackBarView from './components/bieuDoCotChong/StackBarView';
// import ViewTongDoanhThu from './components/viewTong/ViewTongDoanhThu';
import ListStoreCotChongReport from './components/bieuDoCotChong/ListStoreCotChongReport';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getBCDH,
  getBCSP,
  getDoanhThuTheoStorePieChartDashBoard,
  getDoanhThuTheoThoiGianStackBarDashBoard,
  getTop10ForQty,
  getTop10ForSale,
  IDashboardState,
  onShowFirstLoadingDashBoard,
  onShowLoadingDatHangDashBoard,
  onShowLoadingTonKhoSPDashBoard,
  onShowRefreshDashBoard
} from './redux';
// import PieDTView from './components/bieuDoTron/PieDTView';
// import ListStorePieReport from './components/bieuDoTron/ListStorePieReport';
import ReportProduct from './components/sanpham/ReportProduct';
import {RootState} from 'views/app/redux/App.Reducer';
import {DatHangAndTonKho} from './components/viewTong/DatHangAndTonKho';
import {ItemLineIndicatorCustom} from 'views/app/components/items';

interface IProps extends IDashboardState {
  getBCSP: typeof getBCSP;
  getTop10ForSale: typeof getTop10ForSale;
  getTop10ForQty: typeof getTop10ForQty;
  getBCDH: typeof getBCDH;
  onShowFirstLoadingDashBoard: typeof onShowFirstLoadingDashBoard;
  onShowRefreshDashBoard: typeof onShowRefreshDashBoard;
  onShowLoadingTonKhoSPDashBoard: typeof onShowLoadingTonKhoSPDashBoard;
  onShowLoadingDatHangDashBoard: typeof onShowLoadingDatHangDashBoard;
  getDoanhThuTheoThoiGianStackBarDashBoard: typeof getDoanhThuTheoThoiGianStackBarDashBoard;
  getDoanhThuTheoStorePieChartDashBoard: typeof getDoanhThuTheoStorePieChartDashBoard;
}

class DashBoard extends Component<IProps> {
  componentDidMount() {
    this.onLoadDataReport();
  }

  onLoadDataReport = () => {
    this.props.onShowFirstLoadingDashBoard(true);
    setTimeout(() => {
      this.props.getDoanhThuTheoThoiGianStackBarDashBoard();
      this.props.getDoanhThuTheoStorePieChartDashBoard();
      this.props.getDoanhThuTheoThoiGianStackBarDashBoard();
      this.props.getBCSP();
      this.props.getBCDH();
      this.props.getTop10ForSale();
      this.props.getTop10ForQty();
    }, 350);
  };

  onReloadDashBoard = (isReloadFCM: boolean) => {
    if (isReloadFCM) {
    }
    this.props.onShowRefreshDashBoard(true);
    this.props.onShowLoadingDatHangDashBoard(true);
    this.props.onShowLoadingTonKhoSPDashBoard(true);
    this.props.getDoanhThuTheoStorePieChartDashBoard();
    this.props.getDoanhThuTheoThoiGianStackBarDashBoard();
    this.props.getBCSP();
    this.props.getBCDH();
    this.props.getTop10ForSale();
    this.props.getTop10ForQty();
  };

  render() {
    const {isRefresh} = this.props;
    return (
      <MyView style={DashBoardStyles.container}>
        <ItemLineIndicatorCustom />
        <MyView style={DashBoardStyles.myViewTop}>
          <LocThoiGian />
          <ChonChiNhanh
            onSubmit={() => {
              this.onReloadDashBoard(false);
            }}
          />
        </MyView>
        <ScrollView
          nestedScrollEnabled
          refreshControl={
            <RefreshControl
              refreshing={isRefresh || false}
              onRefresh={() => this.onReloadDashBoard(true)}
            />
          }
          bouncesZoom={false}
          showsVerticalScrollIndicator={false}>
          {/* <ViewTongDoanhThu /> */}
          <StackBarView />
          <ListStoreCotChongReport />
          <DatHangAndTonKho />
          {/* <PieDTView /> */}
          {/* <ListStorePieReport /> */}
          <ReportProduct />
        </ScrollView>
      </MyView>
    );
  }
}

const mapPropsToState = (rootState: RootState) => {
  const {isRefresh} = rootState.DashboardReducer;

  return {isRefresh};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getTop10ForQty,
      getTop10ForSale,
      getBCSP,
      getBCDH,
      onShowFirstLoadingDashBoard,
      onShowRefreshDashBoard,
      onShowLoadingTonKhoSPDashBoard,
      onShowLoadingDatHangDashBoard,
      getDoanhThuTheoThoiGianStackBarDashBoard,
      getDoanhThuTheoStorePieChartDashBoard
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(DashBoard);
