import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {setMargin, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getListTraHang,
  setOnRefreshTraHang,
  setStatusTraHang,
  setValueTraHang,
  IReturnOrderState,
  onChangeStaffTraHang
} from '../redux';
import LocThanhToanTraHang from './components/LocThanhToanTraHang';
import StaffAndLocationTH from './components/StaffAndLocationTH';
import StatusChannelsTH from './components/StatusChannelsTH';
import StatusTraHang from './components/StatusTraHang';
import TextSearchTraHang from './components/TextSearchTraHang';
import {filterTraHang} from './styles/filterTraHang.styles';
interface IProps extends IReturnOrderState {
  getListTraHang: typeof getListTraHang;
  setOnRefreshTraHang: typeof setOnRefreshTraHang;
  setStatusTraHang: typeof setStatusTraHang;
  setValueTraHang: typeof setValueTraHang;
  onChangeStaffTraHang: typeof onChangeStaffTraHang;
  ReturnOrderReducer: IReturnOrderState;
}

class FilterTraHang extends PureComponent<IProps> {
  StatusTraHangRef: any = React.createRef();

  state = {isFirstLoading: true};
  timeOut: any = null;

  statusOrderRef: any = React.createRef();
  orderFilterReducerOld: IReturnOrderState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.ReturnOrderReducer);
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
      this.props.setValueTraHang(this.orderFilterReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    this.props.setStatusTraHang(this.StatusTraHangRef?.current?.state.arrCurrentStatusTmp || []);
    this.props.setOnRefreshTraHang(true);
    this.props.getListTraHang();
    MyNavigator.goBack();
  };

  render() {
    const {isFirstLoading} = this.state;
    if (isFirstLoading) {
      return (
        <MyView style={[filterTraHang.container, {marginTop: MY_SIZE.s_16}]}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={filterTraHang.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={filterTraHang.titleContainer}>Tìm theo</MyText>
          <TextSearchTraHang />
          <MyText style={filterTraHang.titleContainer}>Trạng thái</MyText>
          <StatusTraHang ref={this.StatusTraHangRef} />
          <MyText style={filterTraHang.titleContainer}>Người bán</MyText>
          <StaffAndLocationTH />
          <StatusChannelsTH />
          <LocThanhToanTraHang />
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
  const {ReturnOrderReducer} = state;
  const {arrStaffDaChonTraHang} = state.ReturnOrderReducer;
  return {ReturnOrderReducer, arrStaffDaChonTraHang};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListTraHang,
      setOnRefreshTraHang,
      setStatusTraHang,
      setValueTraHang,
      onChangeStaffTraHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTraHang);
