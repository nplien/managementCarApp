import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IBCHangHoaState,
  changeLocThoiGianBCHH,
  getListBCHangHoa,
  changeKhoangThoiGianBCHH
} from '../redux';
import {locThoiGianStyles} from '../styles/BCHangHoa.Styles';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends Partial<IBCHangHoaState> {
  changeLocThoiGianBCHH: typeof changeLocThoiGianBCHH;
  changeKhoangThoiGianBCHH: typeof changeKhoangThoiGianBCHH;
  getListBCHangHoa: typeof getListBCHangHoa;
}

class ViewLocThoiGian extends PureComponent<IProps> {
  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGian} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGian
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();
      this.props.changeLocThoiGianBCHH(element);
      this.props.changeKhoangThoiGianBCHH(Utilities.getDateFilter(element.id));
      this.props.getListBCHangHoa();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.changeLocThoiGianBCHH(dateFilterType);
    this.props.changeKhoangThoiGianBCHH(dateRange);
    this.props.getListBCHangHoa();
  };

  render() {
    const {thoiGianLoc, khoangThoiGian} = this.props;

    let arrButtonBottom: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DASHBOARD.length; index++) {
      const element = CONFIG_DATE_FILTER.DASHBOARD[index];
      if (thoiGianLoc) {
        arrButtonBottom.push({
          title: element.name,
          onPress: () => this.onPressSort(element),
          isActive: element.name === thoiGianLoc.name
        });
      }
    }

    let time = thoiGianLoc && thoiGianLoc.name;
    if (thoiGianLoc && thoiGianLoc.id === 'TUY_CHON' && khoangThoiGian) {
      time =
        Utilities.convertTimeByFormat(khoangThoiGian.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGian.dateTo, 'DD/MM/YYYY');
    }

    return (
      <MyButton
        style={locThoiGianStyles.viewTextHeader}
        transparent
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrButtonBottom,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}>
        <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={18} />
        <MyText numberOfLines={2} style={locThoiGianStyles.title}>
          {time}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLoc, khoangThoiGian} = state.BCHangHoaReducer;
  return {thoiGianLoc, khoangThoiGian};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeLocThoiGianBCHH,
      changeKhoangThoiGianBCHH,
      getListBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLocThoiGian);
