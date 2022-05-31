import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {
  getListImportOrder,
  setOnRefreshImportOrder,
  setParamsFilterDateIP,
  IImportOrderState
} from '../redux';
import {filterDateImport} from '../styles/ImportOrder.style';
import MyNavigator from 'utils/MyNavigator';

interface IToolbarFilterProps extends IImportOrderState {
  setParamsFilterDateIP: typeof setParamsFilterDateIP;
  getListImportOrder: typeof getListImportOrder;
  setOnRefreshImportOrder: typeof setOnRefreshImportOrder;
}

class ImportFilterDate extends PureComponent<IToolbarFilterProps> {
  showDateFromToModal = () => {
    const {convertCurrentFilterDate} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: convertCurrentFilterDate
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setParamsFilterDateIP(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefreshImportOrder(true);
      this.props.getListImportOrder();
    }
  };

  onPressApDung = (dateRange: IDateRange) => {
    this.props.setParamsFilterDateIP(
      {
        id: 'TUY_CHON',
        name: 'Tùy chọn...',
        type: ''
      },
      dateRange
    );

    this.props.setOnRefreshImportOrder(true);
    this.props.getListImportOrder();
  };

  render() {
    let {convertCurrentFilterDate, currentFilterDate} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DAT_HANG.length; index++) {
      const element = CONFIG_DATE_FILTER.DAT_HANG[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentFilterDate?.name
      });
    }

    let textDate = '';
    if (currentFilterDate?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentFilterDate?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentFilterDate?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentFilterDate?.name || '';
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
        style={filterDateImport.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={filterDateImport.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentFilterDate, convertCurrentFilterDate} = state.ImportOrderReducer;
  return {currentFilterDate, convertCurrentFilterDate};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListImportOrder,
      setOnRefreshImportOrder,
      setParamsFilterDateIP
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportFilterDate);
