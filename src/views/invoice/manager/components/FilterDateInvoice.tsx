import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getListInvoice,
  setOnRefreshInvoice,
  setFilterDateInvoice,
  IInvoiceOrderState
} from '../redux';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {styles} from 'views/invoice/manager/filter/styles/filterInvoice.styles';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IInvoiceOrderState {
  getListInvoice: typeof getListInvoice;
  setOnRefreshInvoice: typeof setOnRefreshInvoice;
  setFilterDateInvoice: typeof setFilterDateInvoice;
}

interface IState {}

class FilterDateInvoice extends PureComponent<IProps, IState> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {convertCurrentDateInvoice} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: convertCurrentDateInvoice
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.setFilterDateInvoice(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshInvoice(true);
      this.props.getListInvoice();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    this.props.setFilterDateInvoice(dateFilterType, dateRange);

    this.props.setOnRefreshInvoice(true);
    this.props.getListInvoice();
  };

  render() {
    let {currentDateInvoice, convertCurrentDateInvoice} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.HOA_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.HOA_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentDateInvoice?.name
      });
    }
    let textDate = '';
    if (currentDateInvoice?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentDateInvoice?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentDateInvoice?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentDateInvoice?.name || '';
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
        style={styles.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={styles.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentDateInvoice, convertCurrentDateInvoice} = state.InvoiceOrderReducer;
  return {currentDateInvoice, convertCurrentDateInvoice};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListInvoice,
      setOnRefreshInvoice,
      setFilterDateInvoice
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateInvoice);
