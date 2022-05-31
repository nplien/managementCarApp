import React, {PureComponent} from 'react';

import {ChartLegend, PieChart} from 'react-native-charts-wrapper';
import Utilities from 'utils/Utilities';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {COLOR, setPadding, MY_SIZE} from 'bases/styles/Core';
import {pieStyles} from '../../styles/BCBanHang.Styles';
import {MyText, MyView} from 'bases/components';
import {IBCBanHangState} from 'views/reports/BCBanHang/redux';

interface IPieDTViewProps extends IBCBanHangState {}

class PieDTView extends PureComponent<IPieDTViewProps> {
  state = {arrStoreUnCheck: []};
  top = 0;
  left = 0;
  viewPopupRef: any = React.createRef();

  legend: ChartLegend = {
    enabled: false,
    textSize: MY_SIZE.s_14,
    wordWrapEnabled: false,
    form: 'CIRCLE',
    horizontalAlignment: 'LEFT',
    verticalAlignment: 'CENTER',
    orientation: 'VERTICAL',
    xEntrySpace: MY_SIZE.s_16,
    yEntrySpace: MY_SIZE.s_8
  };

  animation = {
    durationX: 1000,
    durationY: 1000
  };

  styledCenterText = {
    text: '',
    // color: processColor('red'),
    size: MY_SIZE.s_14
  };

  extraOffsets = () => {
    let size = 16;
    return {
      left: size,
      top: size,
      right: size,
      bottom: size
    };
  };

  convertDataBieuDo = () => {
    try {
      const {pieChart, arrCurrentStorePieChartUnChecked} = this.props;
      if (!pieChart) return {data: {}};
      if (pieChart.data.dataSets.length === 0) return {data: {}};
      if (pieChart.data.dataSets[0].values.length === 0) return {data: {}};
      let totalPrice = 0;
      let dataSetsCopy: any = {...pieChart};
      let arrValuesCopy = JSON.parse(JSON.stringify(dataSetsCopy.data.dataSets[0].values));
      /* xu ly khi user unckeck store */
      if (arrCurrentStorePieChartUnChecked?.length) {
        arrCurrentStorePieChartUnChecked?.forEach(storeCheck => {
          let indexRemove = arrValuesCopy.findIndex((x: any) => x.label === storeCheck.storeID);
          if (indexRemove > -1) {
            arrValuesCopy.splice(indexRemove, 1);
          }
        });

        if (arrValuesCopy.length) {
          arrValuesCopy.forEach((element: any) => {
            totalPrice += element.value;
          });

          this.styledCenterText = {
            ...this.styledCenterText,
            text: 'Tổng:\n' + Utilities.convertCount(totalPrice)
          };
          let newDataSets = {
            ...dataSetsCopy,
            data: {
              dataSets: [
                {
                  values: arrValuesCopy,
                  label: dataSetsCopy.data.dataSets[0].label,
                  config: dataSetsCopy.data.dataSets[0].config
                }
              ]
            }
          };
          return newDataSets;
        }
        return {data: {}};
      }
      arrValuesCopy.forEach((element: any) => {
        totalPrice += element.value;
      });

      this.styledCenterText = {
        ...this.styledCenterText,
        text: 'Tổng:\n' + Utilities.convertCount(totalPrice)
      };

      return pieChart;
    } catch (error) {
      return {data: {}};
    }
  };

  render() {
    const pieChartFormat = this.convertDataBieuDo();
    return (
      <MyView style={pieStyles.container}>
        <MyView transparent style={pieStyles.titleChart}>
          <MyText style={pieStyles.myText}>Doanh thu theo chi nhánh</MyText>
        </MyView>

        <PieChart
          noDataText="Not Data"
          extraOffsets={this.extraOffsets()}
          style={pieStyles.chart}
          data={pieChartFormat?.data}
          legend={this.legend}
          animation={this.animation}
          drawEntryLabels={false}
          usePercentValues={true}
          styledCenterText={this.styledCenterText}
          chartDescription={{
            text: ''
          }}
          onTouchStart={e => {
            this.top = e.nativeEvent.locationY;
            this.left = e.nativeEvent.locationX;
          }}
          onSelect={(v: any) => {
            try {
              if (v.nativeEvent?.value) {
                this.viewPopupRef.current.setTopLeft(
                  this.top,
                  this.left,
                  v.nativeEvent.data.label +
                    '\n' +
                    Utilities.convertCount(v.nativeEvent.data.value),
                  true
                );
              } else {
                this.viewPopupRef.current.setTopLeft(0, 0, '0', false);
              }
            } catch (error) {}
          }}
        />

        <ViewPopup ref={this.viewPopupRef} />
      </MyView>
    );
  }
}

// "locationX": 267.5, "locationY": 85.5,
class ViewPopup extends React.Component {
  state = {
    top: 0,
    left: 0,
    value: '0',
    isShow: false
  };

  stylePopup: any = {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 100
  };

  setTopLeft = (top: number, left: number, value: string, isShow: boolean) => {
    this.setState({
      top,
      left,
      value,
      isShow
    });
  };

  render() {
    let leftXXX = {};
    if (this.state.left / Utilities.getWidthScreen() > 0.7) {
      leftXXX = {right: Utilities.getWidthScreen() - this.state.left};
    } else {
      leftXXX = {left: this.state.left};
    }
    if (this.state.isShow)
      return (
        <MyView style={[this.stylePopup, {...leftXXX, top: this.state.top}]}>
          <MyText style={{color: COLOR.TEXT.WHITE, ...setPadding(4, 4, 8, 8)}}>
            {this.state.value}
          </MyText>
        </MyView>
      );
    return null;
  }
}
const mapStateToProps = (state: RootState) => {
  const {pieChart, arrCurrentStorePieChartUnChecked} = state.BCBanHangReducer;

  return {pieChart, arrCurrentStorePieChartUnChecked};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PieDTView);
