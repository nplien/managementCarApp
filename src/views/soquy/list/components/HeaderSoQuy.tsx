import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {getListPayment, IPaymentState, setOnRefresh, setDateFilterSoQuy} from '../redux';
import {filterDatePayment} from '../styles/Payment.style';
import MyNavigator from 'utils/MyNavigator';

interface IToolbarFilterProps extends IPaymentState {
  getListPayment: typeof getListPayment;
  setOnRefresh: typeof setOnRefresh;
  setDateFilterSoQuy: typeof setDateFilterSoQuy;
}

class FilterDateSoQuy extends PureComponent<IToolbarFilterProps> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {convertCurrentFilterDateSQ} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: convertCurrentFilterDateSQ
    });
  };

  onPressDateSelected = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.setDateFilterSoQuy(element, Utilities.getDateFilter(element.id));
      this.props.setOnRefresh(true);
      this.props.getListPayment();
    }
  };

  /* User chọn 1 khoảng thời gian (TUY_CHON) trong modal Date picker */
  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.setDateFilterSoQuy(dateFilterType, dateRange);

    this.props.setOnRefresh(true);
    this.props.getListPayment();
  };

  render() {
    let {convertCurrentFilterDateSQ, currentFilterDateSQ} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.SO_QUY.length; index++) {
      const element = CONFIG_DATE_FILTER.SO_QUY[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressDateSelected(element),
        isActive: element.name === currentFilterDateSQ?.name
      });
    }

    let textDate = '';
    if (currentFilterDateSQ?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentFilterDateSQ?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentFilterDateSQ?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentFilterDateSQ?.name || '';
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
        style={filterDatePayment.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={filterDatePayment.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentFilterDateSQ, convertCurrentFilterDateSQ} = state.PaymentReducer;
  return {currentFilterDateSQ, convertCurrentFilterDateSQ};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListPayment,
      setOnRefresh,
      setDateFilterSoQuy
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateSoQuy);
