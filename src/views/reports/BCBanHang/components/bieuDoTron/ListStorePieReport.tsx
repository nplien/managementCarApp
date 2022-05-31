import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IStoreAndColor} from 'views/dashboard/redux';
import {IBCBanHangState, onCheckStorePieChartBCBH} from 'views/reports/BCBanHang/redux';

interface IProps extends IBCBanHangState {
  onCheckStorePieChartBCBH: typeof onCheckStorePieChartBCBH;
}

interface IState {
  arrStoreUnCheck: IStoreAndColor[];
  isCollapse: boolean;
}
class ListStorePieReport extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {arrStoreUnCheck: [], isCollapse: true};
  }

  /* store = {label, color}. Label la store ID */
  isSelectStore(store: IStoreAndColor) {
    if (this.state.arrStoreUnCheck.length === 0) {
      this.setState(
        {
          arrStoreUnCheck: [...this.state.arrStoreUnCheck, store]
        },
        () => {
          this.props.onCheckStorePieChartBCBH(store.name, store.color);
        }
      );
    } else {
      let arrTmp = this.state.arrStoreUnCheck;
      let indexRemove = arrTmp.findIndex(x => x.name === store.name);
      if (indexRemove > -1) {
        let arrRemove = arrTmp.splice(indexRemove, 1);
        this.props.onCheckStorePieChartBCBH(arrRemove[0].name, arrRemove[0].color);
        this.setState({
          arrStoreUnCheck: [...arrTmp]
        });
      } else {
        this.setState(
          {
            arrStoreUnCheck: [...this.state.arrStoreUnCheck, store]
          },
          () => {
            this.props.onCheckStorePieChartBCBH(store.name, store.color);
          }
        );
      }
    }
  }

  render() {
    const {arrStoreAndColorPieChart} = this.props;
    const {isCollapse} = this.state;
    if (isCollapse) {
      return (
        <MyView style={styles.container}>
          <MyButton
            onPress={() => {
              this.setState({
                isCollapse: false
              });
            }}
            style={styles.contentStore}>
            {arrStoreAndColorPieChart?.map((v, index) => {
              if (index >= 3) return null;
              let isChecked = true;
              if (this.state.arrStoreUnCheck.length === 0) {
                isChecked = true;
              } else {
                if (this.state.arrStoreUnCheck.findIndex(x => x.name === v.name) > -1) {
                  isChecked = false;
                } else {
                  isChecked = true;
                }
              }
              let nameICon = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

              return (
                <MyView transparent key={v.name} style={styles.containerCollapse}>
                  <MyIcon
                    name={nameICon}
                    iconFontType="MaterialCommunityIcons"
                    size={16}
                    color={v.color}
                  />
                  <MyText myFontStyle="Regular" style={styles.label}>
                    {v.name}
                  </MyText>
                </MyView>
              );
            })}
          </MyButton>
          <MyIcon
            onPress={() => {
              this.setState({
                isCollapse: false
              });
            }}
            name={isCollapse ? 'keyboard-arrow-right' : 'keyboard-arrow-down'}
            iconFontType="MaterialIcons"
            size={16}
          />
        </MyView>
      );
    }

    return (
      <MyView style={styles.container}>
        <MyButton
          onPress={() => {
            this.setState({
              isCollapse: true
            });
          }}
          transparent
          style={styles.colorView}>
          <MyIcon
            name={isCollapse ? 'keyboard-arrow-right' : 'keyboard-arrow-down'}
            iconFontType="MaterialIcons"
            size={24}
          />
        </MyButton>

        {arrStoreAndColorPieChart?.map(v => {
          let isChecked = true;
          if (this.state.arrStoreUnCheck.length === 0) {
            isChecked = true;
          } else {
            if (this.state.arrStoreUnCheck.findIndex(x => x.name === v.name) > -1) {
              isChecked = false;
            } else {
              isChecked = true;
            }
          }
          let nameICon = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

          return (
            <MyButton
              onPress={() => {
                this.isSelectStore(v);
              }}
              key={v.name}
              style={styles.btnStore}>
              <MyIcon
                name={nameICon}
                iconFontType="MaterialCommunityIcons"
                size={16}
                color={v.color}
              />
              <MyText myFontStyle="Regular" style={styles.label}>
                {v.name}
              </MyText>
            </MyButton>
          );
        })}
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(0, 10, 16, 16),
    ...setRadius(0, 0, 16, 16),
    ...setMargin(0, 16, 0, 0)
  },
  containerCollapse: {flexDirection: 'row', alignItems: 'center', ...setMargin(4, 4, 0, 10)},
  colorView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...setMargin(16, 16, 16, 0),
    right: 0,
    width: 48,
    height: 32,
    borderRadius: 32
  },
  contentStore: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  btnStore: {flexDirection: 'row', alignItems: 'center', ...setMargin(4, 4, 0, 10)},
  label: {fontSize: 12}
});

const mapStateToProps = (state: RootState) => {
  const {arrStoreAndColorPieChart, isFirstLoading, isError} = state.BCBanHangReducer;
  return {arrStoreAndColorPieChart, isFirstLoading, isError};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({onCheckStorePieChartBCBH}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ListStorePieReport
);
