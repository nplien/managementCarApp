import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {bindActionCreators} from 'redux';
import {GetCustomer, ICustomerState, setCustomerFilterDate, setCustomerSort} from '../redux';
import Utilities from 'utils/Utilities';

import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';

interface IProps extends ICustomerState {
  setCustomerFilterDate: typeof setCustomerFilterDate;
  GetCustomer: typeof GetCustomer;
  setCustomerSort: typeof setCustomerSort;
}

interface IState {}

class HeaderFilterSort extends PureComponent<IProps, IState> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {convertCurrentFilterDate} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: convertCurrentFilterDate
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.setCustomerFilterDate(element, Utilities.getDateFilter(element.id));
      this.props.GetCustomer(0, 10, true);
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.setCustomerFilterDate(dateFilterType, dateRange);
    this.props.GetCustomer(0, 10, true);
  };
  render() {
    const {currentFilterDate, convertCurrentFilterDate} = this.props;
    const {currentSort} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.VAN_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.VAN_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentFilterDate?.name
      });
    }

    let textDate: string | undefined = '';
    if (currentFilterDate?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentFilterDate?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentFilterDate?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentFilterDate?.name;
    }

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.CUSTOMER.length; index++) {
      const element = CONFIG_SORT_FILTER.CUSTOMER[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setCustomerSort(element);
          MyNavigator.goBack();
          this.props.GetCustomer(0, 10, true);
        },
        isActive: element.name === currentSort?.name
      });
    }

    return (
      <MyView style={styles.container}>
        <MyButton
          transparent
          onPress={() => {
            MyNavigator.pushModal('MyBottomSheetPicker', {
              arrayButton: arrDateSort,
              titleButtonCancel: 'Huỷ bỏ'
            });
          }}
          style={styles.viewBtnDate}>
          <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
          <MyText style={styles.tvDate}>{textDate}</MyText>
          <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
        </MyButton>
        <MyView style={styles.viewSortFilter} transparent>
          <MyButton
            transparent
            style={styles.btnIcon}
            onPress={() => {
              MyNavigator.push('FilterCustomer');
            }}>
            <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
          </MyButton>
          <MyButton
            transparent
            style={styles.btnIcon}
            onPress={() => {
              MyNavigator.pushModal('MyBottomSheetPicker', {
                arrayButton: arrSortBy,
                titleButtonCancel: 'Huỷ bỏ'
              });
            }}>
            <MyIcon iconFontType="MaterialIcons" name="sort" size={24} />
          </MyButton>
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewBtnDate: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  tvDate: {
    ...setPadding(0, 0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  viewSortFilter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});

const mapStateToProps = (state: RootState) => {
  const {currentFilterDate, convertCurrentFilterDate, currentSort} = state.CustomerReducer;
  // const {currentSort} = state.SortCustomersReducer;
  return {currentFilterDate, convertCurrentFilterDate, currentSort};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCustomerFilterDate, GetCustomer, setCustomerSort}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilterSort);
