import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {
  getListExportOrder,
  setOnRefreshExport,
  setFilterDateExport,
  IExportOrderState
} from '../redux';
import {filterDateExport} from '../styles/ExportOrder.style';
import MyNavigator from 'utils/MyNavigator';

interface IToolbarFilterProps extends IExportOrderState {
  setFilterDateExport: typeof setFilterDateExport;
  getListExportOrder: typeof getListExportOrder;
  setOnRefreshExport: typeof setOnRefreshExport;
}

class ExportFilterDate extends PureComponent<IToolbarFilterProps> {
  showDateFromToModal = () => {
    const {convertCurrentDateExport} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: convertCurrentDateExport
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setFilterDateExport(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshExport(true);
      this.props.getListExportOrder();
    }
  };

  onPressApDung = (dateRange: IDateRange) => {
    this.props.setFilterDateExport(
      {
        id: 'TUY_CHON',
        name: 'Tùy chọn...',
        type: ''
      },
      dateRange
    );

    this.props.setOnRefreshExport(true);
    this.props.getListExportOrder();
  };

  render() {
    let {convertCurrentDateExport, currentDateExport} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.CHUYEN_HANG.length; index++) {
      const element = CONFIG_DATE_FILTER.CHUYEN_HANG[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentDateExport?.name
      });
    }

    let textDate = '';
    if (currentDateExport?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentDateExport?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentDateExport?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentDateExport?.name || '';
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
        style={filterDateExport.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={filterDateExport.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentDateExport, convertCurrentDateExport} = state.ExportOrderReducer;
  return {currentDateExport, convertCurrentDateExport};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListExportOrder,
      setOnRefreshExport,
      setFilterDateExport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportFilterDate);
