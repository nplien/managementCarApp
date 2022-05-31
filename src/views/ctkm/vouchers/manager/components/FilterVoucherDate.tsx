import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {voucherStyles} from '../styles/Voucher.styles';
import Utilities from 'utils/Utilities';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {getListVoucher, setOnRefresh, IVoucherState, setParamsFilterDate} from '../redux';
import MyNavigator from 'utils/MyNavigator';

interface IToolbarFilterProps extends IVoucherState {
  getListVoucher: typeof getListVoucher;
  setOnRefresh: typeof setOnRefresh;
  setParamsFilterDate: typeof setParamsFilterDate;
}

class FilterVoucherList extends PureComponent<IToolbarFilterProps> {
  showDateFromToModal = () => {
    const {convertCurrentFilterDateVC} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: convertCurrentFilterDateVC
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setParamsFilterDate(element, Utilities.getDateFilter(element.id));

      this.props.setOnRefresh(true);
      this.props.getListVoucher();
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
    this.props.getListVoucher();
  };

  render() {
    let {convertCurrentFilterDateVC, currentFilterDateVC} = this.props;
    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DAT_HANG.length; index++) {
      const element = CONFIG_DATE_FILTER.DAT_HANG[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentFilterDateVC.name
      });
    }

    let textDate = '';
    if (currentFilterDateVC.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentFilterDateVC?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentFilterDateVC?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentFilterDateVC?.name;
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
        style={voucherStyles.filterDivideLeft}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={1} style={voucherStyles.textDate}>
          {textDate}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentFilterDateVC, convertCurrentFilterDateVC} = state.VoucherReducer;
  return {currentFilterDateVC, convertCurrentFilterDateVC};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVoucher,
      setOnRefresh,
      setParamsFilterDate
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterVoucherList);
