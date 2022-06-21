import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getBCSP,
  getBCDH,
  changeLocThoiGianDashBoard,
  changeKhoangThoiGianDashBoard,
  getDoanhThuTheoStorePieChartDashBoard,
  getDoanhThuTheoThoiGianStackBarDashBoard,
  IDashboardState,
  getTop10ForSale,
  getTop10ForQty
} from '../../redux';
import {locThoiGianStyles} from '../../styles/DashBoard.styles';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IDashboardState {
  changeLocThoiGianDashBoard: typeof changeLocThoiGianDashBoard;
  changeKhoangThoiGianDashBoard: typeof changeKhoangThoiGianDashBoard;
  getDoanhThuTheoStorePieChartDashBoard: typeof getDoanhThuTheoStorePieChartDashBoard;
  getDoanhThuTheoThoiGianStackBarDashBoard: typeof getDoanhThuTheoThoiGianStackBarDashBoard;
  getTop10ForSale: typeof getTop10ForSale;
  getTop10ForQty: typeof getTop10ForQty;
  getBCSP: typeof getBCSP;
  getBCDH: typeof getBCDH;
}

class LocThoiGian extends PureComponent<IProps> {
  bottomSheetRef: any = createRef();
  dateFromToRef: any = createRef();

  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGian} = this.props;
    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGian
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.changeLocThoiGianDashBoard(element);
      this.props.changeKhoangThoiGianDashBoard(Utilities.getDateFilter(element.id));
      this.props.getDoanhThuTheoStorePieChartDashBoard();
      this.props.getDoanhThuTheoThoiGianStackBarDashBoard();
      this.props.getBCSP();
      this.props.getBCDH();
      this.props.getTop10ForSale();
      this.props.getTop10ForQty();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.changeLocThoiGianDashBoard(dateFilterType);
    this.props.changeKhoangThoiGianDashBoard(dateRange);
    this.props.getDoanhThuTheoStorePieChartDashBoard();
    this.props.getDoanhThuTheoThoiGianStackBarDashBoard();
    this.props.getBCSP();
    this.props.getBCDH();
    this.props.getTop10ForSale();
    this.props.getTop10ForQty();
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
  const {thoiGianLoc, khoangThoiGian} = state.DashboardReducer;
  return {thoiGianLoc, khoangThoiGian};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeLocThoiGianDashBoard,
      changeKhoangThoiGianDashBoard,
      getDoanhThuTheoStorePieChartDashBoard,
      getDoanhThuTheoThoiGianStackBarDashBoard,
      getBCSP,
      getBCDH,
      getTop10ForQty,
      getTop10ForSale
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LocThoiGian);
