import {MyButtonText, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IVoucherState, setActive, setOnRefresh, getListVoucher, setValueVoucher} from '../redux';
import {styles} from './style/filterVoucher.styles';
import {ScrollView} from 'react-native';
import TextSearchVoucher from './TextSearchVoucher';
import StatusVoucher from './StatusVoucher';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';

interface IVoucherListProps extends Partial<IVoucherState> {
  setActive: typeof setActive;
  getListVoucher: typeof getListVoucher;
  setOnRefresh: typeof setOnRefresh;
  setValueVoucher: typeof setValueVoucher;
  VoucherReducer: IVoucherState;
}

class HeaderVoucher extends PureComponent<IVoucherListProps> {
  state = {isFirstLoading: true};
  timeOut: any = null;
  isBack: boolean = true;
  voucherFilterReducerOld: IVoucherState = {};

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.VoucherReducer);
    this.voucherFilterReducerOld = JSON.parse(oldReducer);
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
      this.props.setValueVoucher(this.voucherFilterReducerOld);
    }
  }

  submitFilter = () => {
    this.isBack = false;
    this.props.setOnRefresh(true);
    this.props.getListVoucher();
    MyNavigator.goBack();
  };

  render() {
    return (
      <MyView style={styles.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={styles.titleContainer}>Tìm theo</MyText>
          <TextSearchVoucher />
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusVoucher />
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
  const {VoucherReducer} = state;
  return {VoucherReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVoucher,
      setOnRefresh,
      setActive,
      setValueVoucher
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderVoucher);
