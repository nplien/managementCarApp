import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import React, {createRef, PureComponent} from 'react';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDateFilterType, IDateRange, IPropsButtonSheet} from 'views/app';
import Utilities from 'utils/Utilities';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  changeTGFilterCustomer,
  changeKTGFilterCustomer,
  IFilterCustomerState
} from 'views/customers/manager/redux';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IFilterCustomerState {
  changeTGFilterCustomer: typeof changeTGFilterCustomer;
  changeKTGFilterCustomer: typeof changeKTGFilterCustomer;
}

class GiaoDichCuoi extends PureComponent<IProps> {
  bottomSheetRef: any = createRef();
  dateFromToRef: any = createRef();

  showSortModal = () => {
    this.bottomSheetRef.current.onShow();
  };

  showDateFromToModal = (element: IDateFilterType) => {
    const {khoangThoiGianGDC} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      dateFilterType: element,
      khoangThoiGian: khoangThoiGianGDC
    });
  };

  onPressSort = (element: IDateFilterType) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal(element);
    } else {
      MyNavigator.goBack();

      this.props.changeTGFilterCustomer(element);
      this.props.changeKTGFilterCustomer(Utilities.getDateFilter(element.id));
    }
  };

  onPressApDung = (dateRange: IDateRange, dateFilterType?: IDateFilterType) => {
    if (dateFilterType) this.props.changeTGFilterCustomer(dateFilterType);
    this.props.changeKTGFilterCustomer(dateRange);
  };

  render() {
    const {thoiGianLocGDC, khoangThoiGianGDC} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.CUSTOMER.length; index++) {
      const element = CONFIG_DATE_FILTER.CUSTOMER[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === thoiGianLocGDC?.name
      });
    }

    let time = thoiGianLocGDC?.name;
    if (thoiGianLocGDC?.id === 'TUY_CHON') {
      time = khoangThoiGianGDC?.dateFrom + ' - ' + khoangThoiGianGDC?.dateTo;
    }

    return (
      <MyButton
        style={[
          FilterCustomerStyle.myButton,
          FilterCustomerStyle.myButtonCustomer,
          {
            backgroundColor: COLOR.BG.WHITE,
            ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
          }
        ]}
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrDateSort,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}>
        <MyView style={[FilterCustomerStyle.myButton, FilterCustomerStyle.myText]}>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name="calendar-month-outline"
            size={20}
            style={FilterCustomerStyle.iconPurchase}
          />
          <MyText>{time}</MyText>
        </MyView>
        <MyIcon
          style={FilterCustomerStyle.myIconDM}
          iconFontType="AntDesign"
          name={'right'}
          size={20}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thoiGianLocGDC, khoangThoiGianGDC} = state.CustomerReducer;
  return {thoiGianLocGDC, khoangThoiGianGDC};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeTGFilterCustomer,
      changeKTGFilterCustomer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GiaoDichCuoi);
