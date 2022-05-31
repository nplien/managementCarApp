import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import {IDateRange, IPropsButtonSheet} from 'views/app';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {setParamsTimeNgayNhanExport, IExportOrderState} from '../../redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IExportOrderState {
  setParamsTimeNgayNhanExport: typeof setParamsTimeNgayNhanExport;
}

interface IState {}

class NgayNhanExport extends PureComponent<IProps, IState> {
  showDateFromToModal = () => {
    const {convertCurrentTimeNgayNhan} = this.props;

    MyNavigator.replaceModal('MyFromToDatePicker', {
      onApDung: this.onPressApDung,
      khoangThoiGian: convertCurrentTimeNgayNhan
    });
  };

  onPressSort = (element: any) => {
    if (element.id === 'TUY_CHON') {
      this.showDateFromToModal();
    } else {
      MyNavigator.goBack();

      this.props.setParamsTimeNgayNhanExport(element, Utilities.getDateFilter(element.id));
    }
  };

  onPressApDung = (dateRange: IDateRange) => {
    this.props.setParamsTimeNgayNhanExport(
      {
        id: 'TUY_CHON',
        name: 'Tùy chọn...',
        type: ''
      },
      dateRange
    );
  };

  render() {
    let {currentTimeNgayNhan, convertCurrentTimeNgayNhan} = this.props;

    let arrDateSort: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_DATE_FILTER.VAN_DON.length; index++) {
      const element = CONFIG_DATE_FILTER.VAN_DON[index];
      arrDateSort.push({
        title: element.name,
        onPress: () => this.onPressSort(element),
        isActive: element.name === currentTimeNgayNhan?.name
      });
    }

    let textDate = '';
    if (currentTimeNgayNhan?.id === 'TUY_CHON') {
      textDate =
        Utilities.convertTimeByFormat(convertCurrentTimeNgayNhan?.dateFrom, 'DD/MM/YYYY') +
        ' - ' +
        Utilities.convertTimeByFormat(convertCurrentTimeNgayNhan?.dateTo, 'DD/MM/YYYY');
    } else {
      textDate = currentTimeNgayNhan?.name || '';
    }
    return (
      <MyView>
        <MyText style={styles.titleContainer}>Ngày nhận</MyText>
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
    justifyContent: 'space-between'
  }
});
const mapStateToProps = (state: RootState) => {
  const {currentTimeNgayNhan, convertCurrentTimeNgayNhan} = state.ExportOrderReducer;
  return {currentTimeNgayNhan, convertCurrentTimeNgayNhan};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsTimeNgayNhanExport
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NgayNhanExport);
