import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getListTraHang,
  setOnRefreshTraHang,
  setFilterDateTraHang,
  IReturnOrderState
} from '../redux';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {filterTraHang} from '../filter/styles/filterTraHang.styles';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IReturnOrderState {
  getListTraHang: typeof getListTraHang;
  setOnRefreshTraHang: typeof setOnRefreshTraHang;
  setFilterDateTraHang: typeof setFilterDateTraHang;
}

interface IState {}

class FilterDateTraHang extends PureComponent<IProps, IState> {
  locDateRef: any = createRef();
  dateFromToRef: any = createRef();

  showLocDateModal = () => {
    this.locDateRef.current.onShow();
  };

  showDateFromToModal = (element: IDateFilterType) => {
    const {convertCurrentDateTraHang} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: convertCurrentDateTraHang
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.setFilterDateTraHang(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshTraHang(true);
      this.props.getListTraHang();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    this.props.setFilterDateTraHang(dateFilterType, dateRange);

    this.props.setOnRefreshTraHang(true);
    this.props.getListTraHang();
  };

  render() {
    let {currentDateTraHang, convertCurrentDateTraHang} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.HOA_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.HOA_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentDateTraHang?.name
      });
    }
    let textDate = '';
    if (currentDateTraHang?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentDateTraHang?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentDateTraHang?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentDateTraHang?.name || '';
    }
    return (
      <MyButton
        transparent
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrDateSort,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}
        style={filterTraHang.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={filterTraHang.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentDateTraHang, convertCurrentDateTraHang} = state.ReturnOrderReducer;
  return {currentDateTraHang, convertCurrentDateTraHang};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListTraHang,
      setOnRefreshTraHang,
      setFilterDateTraHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateTraHang);
