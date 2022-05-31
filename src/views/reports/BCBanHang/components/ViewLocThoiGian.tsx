import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IBCBanHangState,
  changeLocThoiGianBCBH,
  changeKhoangThoiGianBCBH,
  getDoanhThuTheoThoiGianStackBarBCBH,
  getDoanhThuTheoStorePieChartBCBH,
  getDoanhThuLoiNhuanGiaVonLineChartBCBH,
  getStaffBestSaleBCBH
} from '../redux';
import {locThoiGianStyles} from '../styles/BCBanHang.Styles';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IBCBanHangState {
  changeLocThoiGianBCBH: typeof changeLocThoiGianBCBH;
  changeKhoangThoiGianBCBH: typeof changeKhoangThoiGianBCBH;
  getDoanhThuTheoThoiGianStackBarBCBH: typeof getDoanhThuTheoThoiGianStackBarBCBH;
  getDoanhThuTheoStorePieChartBCBH: typeof getDoanhThuTheoStorePieChartBCBH;
  getDoanhThuLoiNhuanGiaVonLineChartBCBH: typeof getDoanhThuLoiNhuanGiaVonLineChartBCBH;
  getStaffBestSaleBCBH: typeof getStaffBestSaleBCBH;
}

class ViewLocThoiGian extends PureComponent<IProps> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGian} = this.props;

    // this.dateFromToRef.current.onShow(khoangThoiGian);
    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGian
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.changeLocThoiGianBCBH(element);
      this.props.changeKhoangThoiGianBCBH(Utilities.getDateFilter(element.id));
      this.props.getDoanhThuTheoThoiGianStackBarBCBH();
      this.props.getDoanhThuTheoStorePieChartBCBH();
      this.props.getDoanhThuLoiNhuanGiaVonLineChartBCBH();
      this.props.getStaffBestSaleBCBH();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.changeLocThoiGianBCBH(dateFilterType);
    this.props.changeKhoangThoiGianBCBH(dateRange);
    this.props.getDoanhThuTheoThoiGianStackBarBCBH();
    this.props.getDoanhThuTheoStorePieChartBCBH();
    this.props.getDoanhThuLoiNhuanGiaVonLineChartBCBH();
    this.props.getStaffBestSaleBCBH();
  };

  render() {
    const {thoiGianLoc, khoangThoiGian} = this.props;

    let arrButtonBottom: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DASHBOARD.length; index++) {
      const element = CONFIG_DATE_FILTER.DASHBOARD[index];
      if (thoiGianLoc) {
        arrButtonBottom.push({
          title: element.name,
          onPress: () => this.onPressSort(element),
          isActive: element.name === thoiGianLoc.name
        });
      }
    }

    let time = thoiGianLoc && thoiGianLoc.name;
    if (thoiGianLoc && thoiGianLoc.id === 'TUY_CHON' && khoangThoiGian) {
      time =
        Utilities.convertTimeByFormat(khoangThoiGian.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGian.dateTo, 'DD/MM/YYYY');
    }

    return (
      <MyButton
        style={locThoiGianStyles.viewTextHeader}
        transparent
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrButtonBottom,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={2} style={locThoiGianStyles.title}>
          {time}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLoc, khoangThoiGian} = state.BCBanHangReducer;
  return {thoiGianLoc, khoangThoiGian};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeLocThoiGianBCBH,
      changeKhoangThoiGianBCBH,
      getDoanhThuTheoThoiGianStackBarBCBH,
      getDoanhThuTheoStorePieChartBCBH,
      getDoanhThuLoiNhuanGiaVonLineChartBCBH,
      getStaffBestSaleBCBH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLocThoiGian);
