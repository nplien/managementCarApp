import {MyButton, MyButtonText, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utilities from '../../../../utils/Utilities';
import {IDateRange} from '../../redux/App.Types';

interface IProps {
  onSubmit: (dateRange: IDateRange) => void;
  route?: {
    params?: {
      currentDateSelected?: IDateRange;
      onSubmit: (dateRange: IDateRange) => void;
    };
  };
}

interface IState {
  isShowFrom: boolean;
  isShowTo: boolean;
  fromDate: Date;
  toDate: Date;
}

export default class SelectDateRange extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    let fromDate = new Date();
    let toDate = new Date();
    if (this.props.route?.params?.currentDateSelected) {
      fromDate = new Date(
        (this.props.route?.params?.currentDateSelected as IDateRange).dateFrom || new Date()
      );
      toDate = new Date(
        (this.props.route?.params?.currentDateSelected as IDateRange).dateTo || new Date()
      );
    }
    this.state = {fromDate, toDate, isShowFrom: false, isShowTo: false};
  }

  setDateFrom = (date: Date) => {
    this.setState({
      fromDate: date
    });
  };

  setDateTo = (date: Date) => {
    this.setState({
      toDate: date
    });
  };

  showFromDate = () => {
    this.setState({
      isShowFrom: true,
      isShowTo: false
    });
  };

  showToDate = () => {
    this.setState({
      isShowFrom: false,
      isShowTo: true
    });
  };

  onSubmit = () => {
    let {fromDate, toDate} = this.state;
    let textDateFrom = Utilities.convertTimeByFormat(fromDate, 'MM/DD/YYYY');
    let textDateTo = Utilities.convertTimeByFormat(toDate, 'MM/DD/YYYY');
    let dateRange: IDateRange = {
      dateFrom: textDateFrom,
      dateTo: textDateTo
    };
    this.props.route?.params?.onSubmit(dateRange);
  };

  render() {
    let {isShowTo, fromDate, isShowFrom, toDate} = this.state;
    let textDateFrom = Utilities.convertTimeByFormat(fromDate, 'DD/MM/YYYY');
    let textDateTo = Utilities.convertTimeByFormat(toDate, 'DD/MM/YYYY');
    return (
      <MyView style={styles.container}>
        <MyView>
          <MyButton onPress={this.showFromDate} style={styles.btnDate}>
            <MyText style={styles.text} myFontStyle="Regular">
              Từ ngày:
            </MyText>
            <MyText style={styles.textDate}>{textDateFrom}</MyText>
          </MyButton>
          {isShowFrom && (
            <DatePicker
              style={{alignSelf: 'center'}}
              mode="date"
              date={fromDate}
              onDateChange={this.setDateFrom}
            />
          )}
        </MyView>
        <MyView style={{height: StyleSheet.hairlineWidth, backgroundColor: COLOR.BG.SECONDARY}} />
        <MyView>
          <MyButton onPress={this.showToDate} style={styles.btnDate}>
            <MyText style={styles.text} myFontStyle="Regular">
              Đến ngày:
            </MyText>
            <MyText style={styles.textDate}>{textDateTo}</MyText>
          </MyButton>
          {isShowTo && (
            <DatePicker
              style={{alignSelf: 'center'}}
              mode="date"
              date={toDate}
              onDateChange={this.setDateTo}
            />
          )}
        </MyView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText onPress={this.onSubmit} style={styles.btnSubmit} title="Áp dụng" />
        </SafeAreaView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  btnSubmit: {...setMargin(MY_SIZE.s_32, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)},
  btnDate: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  text: {flex: 1, fontSize: MY_SIZE.s_16},
  textDate: {color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_16}
});
