import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {setMargin, setPadding, MY_SIZE} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {
  getListDeliveryOrder,
  IDeliveryOrderState,
  setOnRefresh,
  setParamsFilterDate
} from '../../redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IDeliveryOrderState {
  setParamsFilterDate: typeof setParamsFilterDate;
  getListDeliveryOrder: typeof getListDeliveryOrder;
  setOnRefresh: typeof setOnRefresh; // hien thi loading screen ManagerDelivery
}

interface IState {}

class HeaderFilterSort extends PureComponent<IProps, IState> {
  showDateFromToModal = () => {
    const {khoangThoiGian} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: khoangThoiGian
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setParamsFilterDate(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefresh(true);
      this.props.getListDeliveryOrder();
    }
  };

  onPressApDung = (dateRange: IDateRange) => {
    this.props.setParamsFilterDate(
      {
        id: 'TUY_CHON',
        name: 'Tùy chọn...'
      },
      dateRange
    );

    this.props.setOnRefresh(true);
    this.props.getListDeliveryOrder();
  };

  render() {
    let {thoiGianLoc, khoangThoiGian} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.VAN_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.VAN_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === thoiGianLoc?.name
      });
    }

    let textDate = '';
    if (thoiGianLoc?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(khoangThoiGian?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGian?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = thoiGianLoc?.name || '';
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

const styles = StyleSheet.create({
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
const mapStateToProps = (state: RootState) => {
  const {thoiGianLoc, khoangThoiGian, currentSortVD} = state.DeliveryOrderReducer;
  return {thoiGianLoc, khoangThoiGian, currentSortVD};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsFilterDate,
      getListDeliveryOrder,
      setOnRefresh
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilterSort);
