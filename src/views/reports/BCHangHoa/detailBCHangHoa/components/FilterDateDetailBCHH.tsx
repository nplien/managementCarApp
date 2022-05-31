import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getListDetailBCHH,
  setOnRefreshDetailBCHH,
  setFilterDateDetailBCHH,
  IDetailBCHHState
} from '../redux';
import Utilities from 'utils/Utilities';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {filterBCHHStyle} from '../filter/styles/FilterBCHH.styles';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IDetailBCHHState {
  view: number;
  sort_by: string;
  getListDetailBCHH: typeof getListDetailBCHH;
  setOnRefreshDetailBCHH: typeof setOnRefreshDetailBCHH;
  setFilterDateDetailBCHH: typeof setFilterDateDetailBCHH;
}

interface IState {}

class FilterDateDetailBCHH extends PureComponent<IProps, IState> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGianDetailBCHH} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGianDetailBCHH
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.setFilterDateDetailBCHH(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshDetailBCHH(true);
      this.props.getListDetailBCHH({
        view: this.props.view,
        skip: 0,
        limit: 10,
        sort_by: this.props.sort_by
      });
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    this.props.setFilterDateDetailBCHH(dateFilterType, dateRange);

    this.props.setOnRefreshDetailBCHH(true);
    this.props.getListDetailBCHH({
      view: this.props.view,
      skip: 0,
      limit: 10,
      sort_by: this.props.sort_by
    });
  };

  render() {
    let {thoiGianLocDetailBCHH, khoangThoiGianDetailBCHH} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.BAO_CAO_HANG_HOA.length; index++) {
      const element = CONFIG_DATE_FILTER.BAO_CAO_HANG_HOA[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === thoiGianLocDetailBCHH?.name
      });
    }
    let textDate = '';
    if (thoiGianLocDetailBCHH?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(khoangThoiGianDetailBCHH?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGianDetailBCHH?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = thoiGianLocDetailBCHH?.name || '';
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
        style={filterBCHHStyle.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={20} />
        <MyText numberOfLines={1} style={filterBCHHStyle.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={20} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLocDetailBCHH, khoangThoiGianDetailBCHH} = state.DetailBCHHReducer;
  return {thoiGianLocDetailBCHH, khoangThoiGianDetailBCHH};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListDetailBCHH,
      setOnRefreshDetailBCHH,
      setFilterDateDetailBCHH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateDetailBCHH);
