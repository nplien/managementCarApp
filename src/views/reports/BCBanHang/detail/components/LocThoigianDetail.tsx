import {MyButton, MyIcon, MyText} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import {locThoiGianStyles} from '../../styles/BCBanHang.Styles';
import MyNavigator from 'utils/MyNavigator';
interface IProps {
  valueThoiGian: IDateFilterType;
  valueKhoangThoigian: IDateRange;
  chooseThoiGian: (value: IDateFilterType) => void;
  chooseKhoangThoigian: (value: IDateRange) => void;
}
interface IState {
  thoiGianLocDetail?: IDateFilterType;
  khoangThoiGianDetail?: IDateRange;
}
class LocThoigianDetail extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {valueThoiGian, valueKhoangThoigian} = this.props;
    this.state = {
      thoiGianLocDetail: valueThoiGian,
      khoangThoiGianDetail: valueKhoangThoigian
    };
  }

  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGianDetail} = this.state;
    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGianDetail
    });
  };

  onPressSort = (element: IDateFilterType) => {
    // this.props.changeLocThoiGianBCBH(element);
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      this.props.chooseThoiGian(element);
      this.setState({
        khoangThoiGianDetail: Utilities.getDateFilter(element.id),
        thoiGianLocDetail: element
      });
      this.props.chooseKhoangThoigian(Utilities.getDateFilter(element.id));
      MyNavigator.goBack();
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.chooseThoiGian(dateFilterType);
    this.setState({khoangThoiGianDetail: dateRange, thoiGianLocDetail: dateFilterType});
    this.props.chooseKhoangThoigian(dateRange);
  };

  render() {
    const {thoiGianLocDetail, khoangThoiGianDetail} = this.state;

    let arrButtonBottom: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.DASHBOARD.length; index++) {
      const element = CONFIG_DATE_FILTER.DASHBOARD[index];
      if (thoiGianLocDetail) {
        arrButtonBottom.push({
          title: element.name,
          onPress: () => this.onPressSort(element),
          isActive: element.name === thoiGianLocDetail.name
        });
      }
    }

    let time = thoiGianLocDetail && thoiGianLocDetail.name;
    if (thoiGianLocDetail && thoiGianLocDetail.id === 'TUY_CHON' && khoangThoiGianDetail) {
      time =
        Utilities.convertTimeByFormat(khoangThoiGianDetail.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(khoangThoiGianDetail.dateTo, 'DD/MM/YYYY');
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
  const {thoiGianLoc, khoangThoiGian} = state.BCBanHangReducer;
  return {thoiGianLoc, khoangThoiGian};
};

export default connect(mapStateToProps, null)(LocThoigianDetail);
