import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import {LocThoiGianStyle} from '../../styles/BaoCaoCuoiNgay.Style';
import {
  getTongKetBanHangBCCN,
  getTongKetThuChiBCCN,
  IBCCuoiNgayState,
  onChangeKhoangThoiGianBCCN,
  onChangeLocThoiGianBCCN
} from '../../redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IBCCuoiNgayState {
  onChangeLocThoiGianBCCN: typeof onChangeLocThoiGianBCCN;
  onChangeKhoangThoiGianBCCN: typeof onChangeKhoangThoiGianBCCN;
  getTongKetThuChiBCCN: typeof getTongKetThuChiBCCN;
  getTongKetBanHangBCCN: typeof getTongKetBanHangBCCN;
}

class LocThoiGian extends PureComponent<IProps> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGian} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGian
    });
  };

  /* Submit khi User chon thoi gian loại trừ option: Tùy chọn  */
  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.getTongKetThuChiBCCN();
      this.props.onChangeLocThoiGianBCCN(element);
      this.props.onChangeKhoangThoiGianBCCN(Utilities.getDateFilter(element.id));
      this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
      this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
      this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
    }
  };

  /* Submit khi User chon 1 khoảng thời gian của modal thứ 2 */
  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.onChangeLocThoiGianBCCN(dateFilterType);
    this.props.onChangeKhoangThoiGianBCCN(dateRange);
    this.props.getTongKetThuChiBCCN();
    this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
    this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
    this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
  };

  render() {
    const {thoiGianLoc, khoangThoiGian} = this.props;

    let arrButtonBottom: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DASHBOARD.length; index++) {
      const element = CONFIG_DATE_FILTER.DASHBOARD[index];
      arrButtonBottom.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === thoiGianLoc?.name
      });
    }

    let time = thoiGianLoc?.name;
    if (thoiGianLoc?.id === 'TUY_CHON') {
      time =
        Utilities.convertTimeByFormat(khoangThoiGian?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGian?.dateTo, 'DD/MM/YYYY');
    }

    return (
      <MyButton
        style={LocThoiGianStyle.viewTextHeader}
        transparent
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrButtonBottom,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={2} style={LocThoiGianStyle.title}>
          {time}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLoc, khoangThoiGian} = state.BCCuoiNgayReducer;
  return {thoiGianLoc, khoangThoiGian};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      onChangeLocThoiGianBCCN,
      onChangeKhoangThoiGianBCCN,
      getTongKetThuChiBCCN,
      getTongKetBanHangBCCN
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LocThoiGian);
