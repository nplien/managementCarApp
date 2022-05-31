import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';

import {bindActionCreators} from 'redux';
import {IFilterDeliveryState, setParamsFilterTimeHT} from '../redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IFilterDeliveryState {
  setParamsFilterTimeHT: typeof setParamsFilterTimeHT;
}

interface IState {}

class ThoiGianHoanThanh extends PureComponent<IProps, IState> {
  showDateFromToModal = () => {
    const {convertCurrentFilterTimeHT} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: convertCurrentFilterTimeHT
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setParamsFilterTimeHT(element, Utilities.getDateFilter(element.id));
    }
  };

  onPressApDung = (dateRange: IDateRange) => {
    this.props.setParamsFilterTimeHT(
      {
        id: 'TUY_CHON',
        name: 'Tùy chọn...'
      },
      dateRange
    );
  };

  render() {
    let {currentFilterTimeHT, convertCurrentFilterTimeHT} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.VAN_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.VAN_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentFilterTimeHT?.name
      });
    }

    let textDate = '';
    if (currentFilterTimeHT?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentFilterTimeHT?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentFilterTimeHT?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentFilterTimeHT?.name;
    }
    return (
      <MyView transparent>
        <MyText style={styles.titleContainer}>Thời gian hoàn thành</MyText>
        <MyView style={styles.viewContainer}>
          <MyButton
            transparent
            onPress={() => {
              MyNavigator.pushModal('MyBottomSheetPicker', {
                arrayButton: arrDateSort,
                titleButtonCancel: 'Huỷ bỏ'
              });
            }}
            style={styles.filterDivideLeft}>
            <MyIcon iconFontType="MaterialCommunityIcons" name="calendar-month-outline" size={20} />
            <MyText numberOfLines={1} style={styles.textDate}>
              {textDate || 'Lựa chọn thời gian'}
            </MyText>
          </MyButton>
          <MyIcon style={styles.myIconDM} iconFontType="AntDesign" name={'right'} size={20} />
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
const mapStateToProps = (state: RootState) => {
  const {currentFilterTimeHT, convertCurrentFilterTimeHT} = state.FilterDeliveryReducer;
  const {currentSortVD} = state.DeliveryOrderReducer;
  return {currentFilterTimeHT, convertCurrentFilterTimeHT, currentSortVD};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsFilterTimeHT
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ThoiGianHoanThanh);
