import {MyView} from 'bases/components';
import React, {Component} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import ChonChiNhanh from './components/chonChiNhanh/ChonChiNhanh';
import LocThoiGian from './components/locThoiGian/LocThoiGian';
import PhuongThucThanhToan from './components/phuongthucthanhtoan/PhuongThucThanhToan';
import DatHang from './components/tongketbanhang/DatHang';
import HoaDon from './components/tongketbanhang/HoaDon';
import TraHang from './components/tongketbanhang/TraHang';
import TongKetThuChi from './components/tongketthuchi/TongKetThuChi';
import {
  getTongKetBanHangBCCN,
  getTongKetPTTTBCCN,
  getTongKetThuChiBCCN,
  IBCCuoiNgayState,
  onRefreshingBCCN
} from './redux';
import {BaoCaoCuoiNgayStyle} from './styles/BaoCaoCuoiNgay.Style';

type IProps = IBCCuoiNgayState & {
  getTongKetThuChiBCCN: typeof getTongKetThuChiBCCN;
  getTongKetBanHangBCCN: typeof getTongKetBanHangBCCN;
  onRefreshingBCCN: typeof onRefreshingBCCN;
  getTongKetPTTTBCCN: typeof getTongKetPTTTBCCN;
};
class BaoCaoCuoiNgay extends Component<IProps> {
  componentDidMount() {
    this.props.getTongKetThuChiBCCN();
    this.props.getTongKetPTTTBCCN();
    this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
    this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
    this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
  }

  onReload = () => {
    this.props.onRefreshingBCCN(true);
    this.props.getTongKetThuChiBCCN();
    this.props.getTongKetPTTTBCCN();
    this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
    this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
    this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
  };

  render() {
    const {isRefresh} = this.props;
    return (
      <MyView style={BaoCaoCuoiNgayStyle.container}>
        <MyView style={BaoCaoCuoiNgayStyle.myViewTop}>
          <LocThoiGian />
          <ChonChiNhanh />
        </MyView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.onReload} />
          }>
          <TongKetThuChi />
          <PhuongThucThanhToan />
          <HoaDon />
          <DatHang />
          <TraHang />
        </ScrollView>
      </MyView>
    );
  }
}

const mapPropsToState = (rootState: RootState) => {
  const {isRefresh} = rootState.BCCuoiNgayReducer;

  return {isRefresh};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      onRefreshingBCCN,
      getTongKetThuChiBCCN,
      getTongKetBanHangBCCN,
      getTongKetPTTTBCCN
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(BaoCaoCuoiNgay);
