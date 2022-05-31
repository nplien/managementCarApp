import React, {PureComponent} from 'react';

import {MyView} from 'bases/components';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDashboardState} from '../../redux';
import {stackBarStyles} from '../../styles/DashBoard.styles';
import {BarChart, ChartLegend} from 'react-native-charts-wrapper';
import {processColor} from 'react-native';

interface IPropsBarComplex extends IDashboardState {}

class StackBarView extends PureComponent<IPropsBarComplex> {
  xAxis = {
    granularityEnabled: true,
    granularity: 1,
    labelRotationAngle: 0,
    position: 'BOTTOM',
    drawGridLines: false,
    yOffset: 2
  };

  legend: ChartLegend = {
    enabled: false,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    wordWrapEnabled: true
  };

  marker = {
    enabled: true,
    markerColor: processColor('black'),
    textColor: processColor('white'),
    textSize: 14
  };

  trucY = {
    left: {
      drawAxisLine: false,
      drawValues: false,
      axisMinimum: 0,
      valueFormatter: 'largeValue'
    },
    right: {
      enabled: false,
      axisMinimum: 0,
      drawAxisLines: false,
      drawGridLines: false,
      drawLabels: false,
      drawLimitLinesBehindData: false
    }
  };

  animation = {
    durationX: 2000,
    durationY: 2000
  };

  xuLyDataSet = () => {
    try {
      const {arrCurrentStoreCotChongUnChecked, stackbarChart} = this.props;
      if (!stackbarChart) return {data: {}};
      if (stackbarChart.data.dataSets.length === 0) return {data: {}};
      if (stackbarChart.data.dataSets[0].values.length === 0) return {data: {}};
      if (arrCurrentStoreCotChongUnChecked?.length) {
        let dataSetsCopy: any = {...stackbarChart};
        let arrValuesCopy = JSON.parse(JSON.stringify(dataSetsCopy.data.dataSets[0].values));
        let arrStackLabelsCopy = [...dataSetsCopy.data.dataSets[0].config.stackLabels];
        let arrColorCopy = [...dataSetsCopy.data.dataSets[0].config.colors];
        /* xu ly khi user unckeck store */
        arrCurrentStoreCotChongUnChecked?.forEach(storeCheck => {
          let indexStoreCheck = arrStackLabelsCopy.findIndex(x => x === storeCheck.storeID);
          if (indexStoreCheck > -1) {
            arrValuesCopy.forEach((element: any) => {
              element.y.splice(indexStoreCheck, 1);
              element.marker.splice(indexStoreCheck, 1);
            });
            arrColorCopy.splice(indexStoreCheck, 1);
            arrStackLabelsCopy.splice(indexStoreCheck, 1);
          }
        });

        if (arrStackLabelsCopy.length) {
          let newDataSets = {
            ...dataSetsCopy,
            data: {
              dataSets: [
                {
                  values: arrValuesCopy,
                  label: dataSetsCopy.data.dataSets[0].label,
                  config: {
                    ...dataSetsCopy.data.dataSets[0].config,
                    stackLabels: arrStackLabelsCopy,
                    colors: arrColorCopy
                  }
                }
              ]
            }
          };
          return newDataSets;
        }
        return {data: {}};
      }
      return stackbarChart;
    } catch (error) {
      return {data: {}};
    }
  };

  render() {
    let dataChart = this.xuLyDataSet();
    return (
      <MyView style={stackBarStyles.container}>
        <BarChart
          noDataText="No Data"
          style={stackBarStyles.chart}
          xAxis={{
            ...dataChart?.xAxis,
            ...this.xAxis
          }}
          yAxis={this.trucY}
          animation={this.animation}
          data={dataChart?.data}
          legend={this.legend}
          drawValueAboveBar={false}
          pinchZoom={false}
          autoScaleMinMaxEnabled={false}
          doubleTapToZoomEnabled={false}
          chartDescription={{
            text: ''
          }}
          marker={this.marker as any} // to typescript về hàm processColor
          onSelect={() => {
            this.xuLyDataSet();
          }}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrCurrentStoreCotChongUnChecked, stackbarChart} = state.DashboardReducer;
  return {arrCurrentStoreCotChongUnChecked, stackbarChart};
};

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators({}, dispatch);
// };

export default connect(mapStateToProps, null)(StackBarView);
