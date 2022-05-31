import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IBCBanHangState,
  changeChiNhanhBCBH,
  getDoanhThuTheoThoiGianStackBarBCBH,
  getDoanhThuTheoStorePieChartBCBH,
  getDoanhThuLoiNhuanGiaVonLineChartBCBH,
  getStaffBestSaleBCBH
} from '../redux';
import {locThoiGianStyles} from '../styles/BCBanHang.Styles';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IBCBanHangState, IPersonalState {
  changeChiNhanhBCBH: typeof changeChiNhanhBCBH;
  getDoanhThuTheoThoiGianStackBarBCBH: typeof getDoanhThuTheoThoiGianStackBarBCBH;
  getDoanhThuTheoStorePieChartBCBH: typeof getDoanhThuTheoStorePieChartBCBH;
  getDoanhThuLoiNhuanGiaVonLineChartBCBH: typeof getDoanhThuLoiNhuanGiaVonLineChartBCBH;
  getStaffBestSaleBCBH: typeof getStaffBestSaleBCBH;
}

class ChonChiNhanh extends PureComponent<IProps> {
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrChiNhanhDaChonBCBH} = this.props;
    // this.chiNhanhModalRef.current.onShow(arrChiNhanhDaChonBCBH);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDaChonBCBH || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.changeChiNhanhBCBH(arr);
    this.props.getDoanhThuTheoThoiGianStackBarBCBH();
    this.props.getDoanhThuTheoStorePieChartBCBH();
    this.props.getDoanhThuLoiNhuanGiaVonLineChartBCBH();
    this.props.getStaffBestSaleBCBH();
  };

  render() {
    const {infoPersonal, arrChiNhanhDaChonBCBH} = this.props;
    let title = '';
    if (arrChiNhanhDaChonBCBH && arrChiNhanhDaChonBCBH.length) {
      if (arrChiNhanhDaChonBCBH.length === infoPersonal?.stores?.length) {
        title = 'Tất cả chi nhánh';
      } else if (arrChiNhanhDaChonBCBH.length === 1) {
        title = arrChiNhanhDaChonBCBH[0].name || '1 chi nhánh';
      } else {
        title = 'Nhiều chi nhánh';
      }
    } else {
      title = 'Tất cả chi nhánh';
    }

    return (
      <MyButton
        style={locThoiGianStyles.viewTextHeader2}
        transparent
        onPress={this.showChiNhanhModal}>
        <MyIcon iconFontType="MaterialIcons" name="location-on" size={18} />
        <MyText numberOfLines={1} style={locThoiGianStyles.title}>
          {title}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />

        {/* <MyStoreMultiplePicker ref={this.chiNhanhModalRef} onApDung={this.apDungChiNhanh} /> */}
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  const {arrChiNhanhDaChonBCBH} = state.BCBanHangReducer;
  return {infoPersonal, arrChiNhanhDaChonBCBH};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeChiNhanhBCBH,
      getDoanhThuTheoThoiGianStackBarBCBH,
      getDoanhThuTheoStorePieChartBCBH,
      getDoanhThuLoiNhuanGiaVonLineChartBCBH,
      getStaffBestSaleBCBH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChonChiNhanh);
