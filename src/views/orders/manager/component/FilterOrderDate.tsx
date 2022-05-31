import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {styles} from 'views/orders/manager/filterOrder/styles/filterOrder.styles';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {getListOrder, IOrderState, setOnRefreshDH, setOrderFilterDate} from '../redux';
import MyNavigator from 'utils/MyNavigator';

interface IToolbarFilterProps extends IOrderState {
  getListOrder: typeof getListOrder;
  setOnRefreshDH: typeof setOnRefreshDH;
  setOrderFilterDate: typeof setOrderFilterDate;
}

class FilterOrderDate extends PureComponent<IToolbarFilterProps> {
  locDateRef: any = createRef();
  dateFromToRef: any = createRef();

  showLocDateModal = () => {
    this.locDateRef.current.onShow();
  };

  showDateFromToModal = (element: IDateFilterType) => {
    const {convertOrderFilterDate} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: convertOrderFilterDate
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.setOrderFilterDate(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshDH(true);
      this.props.getListOrder();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    this.props.setOrderFilterDate(dateFilterType, dateRange);

    this.props.setOnRefreshDH(true);
    this.props.getListOrder();
  };

  render() {
    let {convertOrderFilterDate, orderFilterDate} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DAT_HANG.length; index++) {
      const element = CONFIG_DATE_FILTER.DAT_HANG[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === orderFilterDate?.name
      });
    }

    let textDate = '';
    if (orderFilterDate?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertOrderFilterDate?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertOrderFilterDate?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = orderFilterDate?.name || '';
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
  const {orderFilterDate, convertOrderFilterDate} = state.OrderReducer;
  return {orderFilterDate, convertOrderFilterDate};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListOrder,
      setOnRefreshDH,
      setOrderFilterDate
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrderDate);
