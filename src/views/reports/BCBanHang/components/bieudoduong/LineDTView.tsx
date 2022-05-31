import React, {PureComponent} from 'react';
import {processColor} from 'react-native';
import {LineChart, xAxis} from 'react-native-charts-wrapper';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {IBCBanHangState} from 'views/reports/BCBanHang/redux';
import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {LineDTStyles} from 'views/reports/BCBanHang/styles/BCBanHang.Styles';
import {COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {DETAIL_BCBH} from 'common/Constants';

interface IProps extends IBCBanHangState {}
class LineDTView extends PureComponent<IProps> {
  marker = {
    enabled: true,
    digits: 2,
    backgroundTint: processColor('teal'),
    markerColor: processColor(COLOR.BG.BLACK_TOOLBAR),
    textColor: processColor('white'),
    textSize: 14
  };
  animation = {
    durationX: 2000,
    durationY: 2000
  };

  xAxis: xAxis = {
    granularityEnabled: true,
    granularity: 1,
    labelRotationAngle: 0,
    drawAxisLines: true,
    position: 'BOTTOM',
    yOffset: 2
  };
  trucY = {
    left: {
      drawAxisLine: false,
      drawValues: false,
      axisMinimum: 0,
      valueFormatter: 'largeValue'
    },
    right: {
      enabled: false
    }
  };

  xuLyDataSet = () => {
    const {lineChart} = this.props;
    if (!lineChart) return {data: {}};
    return lineChart;
  };

  render() {
    let dataChart = this.xuLyDataSet();
    return (
      <MyView style={LineDTStyles.container}>
        <MyButton
          transparent
          style={LineDTStyles.titleChart}
          onPress={() => {
            MyNavigator.navigate('DetailBCBanHang', {checkView: DETAIL_BCBH[1]});
          }}>
          <MyText style={LineDTStyles.myText}>Lợi nhuận</MyText>
          <MyIcon name={'keyboard-arrow-right'} iconFontType="MaterialIcons" size={16} />
        </MyButton>
        <LineChart
          noDataText="No Data"
          style={LineDTStyles.chart}
          legend={{enabled: false}}
          data={dataChart?.data}
          chartDescription={{text: ''}}
          marker={this.marker as any}
          xAxis={{
            ...dataChart?.xAxis,
            ...this.xAxis
          }}
          yAxis={this.trucY}
          animation={this.animation}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrCurrentStoreCotChongUnChecked, lineChart} = state.BCBanHangReducer;
  return {arrCurrentStoreCotChongUnChecked, lineChart};
};

export default connect(mapStateToProps, null)(LineDTView);
