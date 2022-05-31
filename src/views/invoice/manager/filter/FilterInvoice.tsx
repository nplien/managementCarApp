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
  getListInvoice,
  setOnRefreshInvoice,
  setStatusInvoice,
  setValueInvoice,
  IInvoiceOrderState
} from '../redux';
import LocThanhToanBanHang from './components/LocThanhToanBanHang';
import StaffAndLocation from './components/StaffAndLocation';
import StatusChannels from './components/StatusChannels';
import StatusInvoice from './components/StatusInvoice';
import TextSearchInvoice from './components/TextSearchInvoice';
import {styles} from './styles/filterInvoice.styles';
interface IProps extends IInvoiceOrderState {
  getListInvoice: typeof getListInvoice;
  setOnRefreshInvoice: typeof setOnRefreshInvoice;
  setStatusInvoice: typeof setStatusInvoice;
  setValueInvoice: typeof setValueInvoice;
  InvoiceOrderReducer: IInvoiceOrderState;
}

class FilterInvoice extends PureComponent<IProps> {
  StatusInvoiceRef: any = React.createRef();

  state = {isFirstLoading: true};
  timeOut: any = null;

  statusOrderRef: any = React.createRef();
  orderFilterReducerOld: IInvoiceOrderState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.InvoiceOrderReducer);
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
      this.props.setValueInvoice(this.orderFilterReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    this.props.setStatusInvoice(this.StatusInvoiceRef?.current?.state.arrCurrentStatusTmp || []);
    this.props.setOnRefreshInvoice(true);
    this.props.getListInvoice();
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
      <MyView style={styles.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={styles.titleContainer}>Tìm theo</MyText>
          <TextSearchInvoice />
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusInvoice ref={this.StatusInvoiceRef} />
          <MyText style={styles.titleContainer}>Người bán</MyText>
          <StaffAndLocation />
          <StatusChannels />
          <LocThanhToanBanHang />
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
  const {InvoiceOrderReducer} = state;
  return {InvoiceOrderReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListInvoice,
      setOnRefreshInvoice,
      setStatusInvoice,
      setValueInvoice
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterInvoice);
