import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DatePicker from 'react-native-date-picker';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {MyButton} from '../button/MyButton';
import {MyView} from '../view/MyView';
import {MyText} from '../textview/MyText';
import {ScrollView} from 'react-native-gesture-handler';
import {IAppNavigateProps, IDateRange} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

type IProps = IAppNavigateProps<'MyFromToDatePicker'>;

interface IStates {
  stateBtn: number;
  dateRange: IDateRange;
  isApDung: boolean;
}

export default class MyFromToDatePicker extends PureComponent<IProps, IStates> {
  state = {stateBtn: 0, dateRange: {dateFrom: '', dateTo: ''}, isApDung: true};

  onPressApDung = () => {
    this.setState(
      {
        stateBtn: 0,
        isApDung: true
      },
      () => {
        const {params} = this.props.route;
        this.props.route.params.onApDung(this.state.dateRange, params?.dateFilterType);
        MyNavigator.goBack();
      }
    );
  };
  componentDidMount() {
    const {params} = this.props.route;
    if (params && params.khoangThoiGian) {
      this.setState({
        dateRange: params.khoangThoiGian
      });
    }
  }

  onHide = () => {
    this.setState(
      {
        stateBtn: 0,
        isApDung: true
      },
      () => {
        MyNavigator.goBack();
      }
    );
  };

  onPressFrom = () => {
    this.setState({
      stateBtn: 1
    });
  };

  onPressTo = () => {
    this.setState({
      stateBtn: 2
    });
  };

  changeDateFrom = (date: Date) => {
    let isApDung: boolean = true;
    if (date > new Date(this.state.dateRange.dateTo)) {
      isApDung = false;
    }

    this.setState({
      dateRange: {
        dateFrom: Utilities.convertTimeByFormat(date, 'MM/DD/YYYY'),
        dateTo: this.state.dateRange.dateTo
      },
      isApDung: isApDung
    });
  };

  changeDateTo = (date: Date) => {
    let isApDung: boolean = true;
    if (date < new Date(this.state.dateRange.dateFrom)) {
      isApDung = false;
    }

    this.setState({
      dateRange: {
        dateFrom: this.state.dateRange.dateFrom,
        dateTo: Utilities.convertTimeByFormat(date, 'MM/DD/YYYY')
      },
      isApDung: isApDung
    });
  };

  render() {
    const {stateBtn, dateRange, isApDung} = this.state;
    const {mode} = this.props.route.params;

    return (
      <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
        <MyView style={styles.container} transparent>
          <MyView style={styles.containerToolbar} transparent />

          <MyView style={styles.content}>
            <MyButton style={styles.btnTitle} transparent onPress={this.onHide}>
              <MyText myFontStyle="Regular" style={styles.titleLeft}>
                {'Huỷ bỏ'}
              </MyText>
            </MyButton>
            <MyView style={styles.btnTitle} transparent>
              <MyText myFontStyle="Bold" style={styles.title}>
                {'Tuỳ chọn'}
              </MyText>
            </MyView>
            <MyButton
              style={styles.btnTitle}
              transparent
              onPress={this.onPressApDung}
              disabled={!isApDung}>
              <MyText
                myFontStyle="Regular"
                style={[
                  styles.titleRight,
                  {color: isApDung ? COLOR.TEXT.BLUE : COLOR.TEXT.SECONDARY}
                ]}>
                {'Áp dụng'}
              </MyText>
            </MyButton>
          </MyView>
          <MyView style={styles.line} />

          <ScrollView
            style={styles.modalContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <MyText style={styles.titleTime}>{'Chọn khoảng thời gian'}</MyText>

            <MyButton onPress={this.onPressFrom} style={styles.viewTime}>
              <MyText myFontStyle="Regular" style={styles.textDate}>
                {'Từ'}
              </MyText>
              <MyText
                myFontStyle="Regular"
                style={stateBtn === 1 ? styles.textDateColor : styles.textDate}>
                {dateRange.dateFrom
                  ? Utilities.convertTimeByFormat(dateRange.dateFrom, 'DD/MM/YYYY')
                  : 'Chọn ngày'}
              </MyText>
            </MyButton>
            <MyView style={styles.line} />

            {stateBtn === 1 ? (
              <MyView transparent style={styles.datePicker}>
                <DatePicker
                  locale="vi"
                  mode={mode ? mode : 'date'}
                  androidVariant="iosClone"
                  date={dateRange.dateFrom ? new Date(dateRange.dateFrom) : new Date()}
                  style={styles.datePicker}
                  textColor={COLOR.TEXT.BLACK}
                  fadeToColor={COLOR.BG.WHITE}
                  onDateChange={this.changeDateFrom}
                />
                <MyView style={styles.line} />
              </MyView>
            ) : null}

            <MyButton onPress={this.onPressTo} style={styles.viewTime}>
              <MyText myFontStyle="Regular" style={styles.textDate}>
                {'Đến'}
              </MyText>
              <MyText
                myFontStyle="Regular"
                style={stateBtn === 2 ? styles.textDateColor : styles.textDate}>
                {dateRange.dateTo
                  ? Utilities.convertTimeByFormat(dateRange.dateTo, 'DD/MM/YYYY')
                  : null}
              </MyText>
            </MyButton>
            <MyView style={styles.line} />

            {stateBtn === 2 ? (
              <MyView transparent style={styles.datePicker}>
                <DatePicker
                  locale="vi"
                  mode={mode ? mode : 'date'}
                  androidVariant="iosClone"
                  date={dateRange.dateTo ? new Date(dateRange.dateTo) : new Date()}
                  style={styles.datePicker}
                  textColor={COLOR.TEXT.BLACK}
                  fadeToColor={COLOR.BG.WHITE}
                  onDateChange={this.changeDateTo}
                />
                <MyView style={styles.line} />
              </MyView>
            ) : null}
          </ScrollView>
        </MyView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_75
  },

  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row'
  },
  btnTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  titleLeft: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE,
    textAlign: 'left'
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  titleRight: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    color: COLOR.TEXT.BLUE,
    textAlign: 'right'
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  titleTime: {
    ...setMargin(MY_SIZE.s_12, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  textDate: {
    fontSize: MY_SIZE.s_16
  },
  textDateColor: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.TEXT.BLUE
  },
  datePicker: {
    width: Utilities.getWidthScreen(),
    backgroundColor: COLOR.BG.WHITE
  },

  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  }
});
