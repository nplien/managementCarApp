import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {setMargin, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {getListOrder, setOnRefreshDH, setStatusOrder, setValueOrder, IOrderState} from '../redux';
import LocThanhToanBanHangOrder from './components/LocThanhToanBanHangOrder';
import StaffAndLocationOrder from './components/StaffAndLocationOrder';
import StatusChannelsOrder from './components/StatusChannelsOrder';
import StatusOrder from './components/StatusOrder';
import TextSearchOrder from './components/TextSearchOrder';

import {styles} from './styles/filterOrder.styles';
interface IProps {
  getListOrder: typeof getListOrder;
  setOnRefreshDH: typeof setOnRefreshDH;
  setStatusOrder: typeof setStatusOrder;
  setValueOrder: typeof setValueOrder;
  OrderReducer: IOrderState;
}
interface IStates {
  isFirstLoading: boolean;
}
class FilterOrder extends PureComponent<IProps, IStates> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  statusOrderRef: any = React.createRef();
  orderFilterReducerOld: IOrderState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.OrderReducer);
    this.orderFilterReducerOld = JSON.parse(oldReducer);
  }

  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({
        isFirstLoading: false
      });
    }, 300);
  }
  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.isBack) {
      this.props.setValueOrder(this.orderFilterReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    this.props.setStatusOrder(this.statusOrderRef?.current?.state.arrCurrentStatusTmp || []);
    this.props.setOnRefreshDH(true);
    this.props.getListOrder();
    MyNavigator.goBack();
  };

  render() {
    const {isFirstLoading} = this.state;

    if (isFirstLoading) {
      return (
        <MyView style={[styles.container, {marginTop: MY_SIZE.s_16}]}>
          <MyLoading />
        </MyView>
      );
    }

    return (
      <MyView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={styles.titleContainer}>Tìm theo</MyText>
          <TextSearchOrder />
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusOrder ref={this.statusOrderRef} />
          <MyText style={styles.titleContainer}>Người bán</MyText>
          <StaffAndLocationOrder />
          <StatusChannelsOrder />
          <LocThanhToanBanHangOrder />
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            onPress={() => {
              this.submitFilter();
            }}
            title="Áp dụng"
            style={{...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {OrderReducer} = state;
  return {OrderReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListOrder,
      setOnRefreshDH,
      setStatusOrder,
      setValueOrder
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrder);
