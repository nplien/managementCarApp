import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  changeKhoangThoiGianKK,
  locThoiGianKK,
  GetInventory,
  IIventoryState,
  showRefresh
} from '../redux';
import {locThoiGianStyles} from '../styles/Inventory.Style';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IIventoryState {
  locThoiGianKK: typeof locThoiGianKK;
  changeKhoangThoiGianKK: typeof changeKhoangThoiGianKK;

  GetInventory: typeof GetInventory;
  showRefresh: typeof showRefresh;
}

class LocThoiGian extends PureComponent<IProps> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGianKK} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGianKK
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      MyNavigator.goBack();

      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.locThoiGianKK(element);
      this.props.changeKhoangThoiGianKK(Utilities.getDateFilter(element.id));

      this.props.showRefresh(true);
      this.props.GetInventory();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.locThoiGianKK(dateFilterType);
    this.props.changeKhoangThoiGianKK(dateRange);

    this.props.showRefresh(true);
    this.props.GetInventory();
  };

  render() {
    const {thoiGianLocKK, khoangThoiGianKK} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.KIEM_KHO.length; index++) {
      const element = CONFIG_DATE_FILTER.KIEM_KHO[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === thoiGianLocKK?.name
      });
    }

    let time = thoiGianLocKK?.name;
    if (thoiGianLocKK?.id === 'TUY_CHON') {
      time =
        Utilities.convertTimeByFormat(khoangThoiGianKK?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGianKK?.dateTo, 'DD/MM/YYYY');
    }

    return (
      <MyButton
        style={locThoiGianStyles.viewTextHeader}
        transparent
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrDateSort,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={locThoiGianStyles.title}>
          {time}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLocKK, khoangThoiGianKK} = state.InventoryReducer;
  return {thoiGianLocKK, khoangThoiGianKK};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      locThoiGianKK,
      changeKhoangThoiGianKK,
      GetInventory,
      showRefresh
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LocThoiGian);
