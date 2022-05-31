import {MyButtonText, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IManagerBranchState,
  setActive,
  showRefresh,
  GetManagerBranch,
  setValueBrand
} from '../redux';
import {brandHeaderStyles} from '../styles/ManagerBranch.Style';
import {ScrollView} from 'react-native';
import TextSearchVoucher from './TextSearchBrand';
import StatusVoucher from './StatusBrand';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';

interface IVoucherListProps extends Partial<IManagerBranchState> {
  setActive: typeof setActive;
  GetManagerBranch: typeof GetManagerBranch;
  showRefresh: typeof showRefresh;
  setValueBrand: typeof setValueBrand;
  ManagerBranchReducer: IManagerBranchState;
}

class HeaderVoucher extends PureComponent<IVoucherListProps> {
  state = {isFirstLoading: true};
  timeOut: any = null;
  isBack: boolean = true;
  voucherFilterReducerOld: IManagerBranchState = {};

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.ManagerBranchReducer);
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
      this.props.setValueBrand(this.voucherFilterReducerOld);
    }
  }

  submitFilter = () => {
    this.isBack = false;
    this.props.showRefresh(true);
    this.props.GetManagerBranch();
    MyNavigator.goBack();
  };

  render() {
    return (
      <MyView style={brandHeaderStyles.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={brandHeaderStyles.titleContainer}>Tìm theo</MyText>
          <TextSearchVoucher />
          <MyText style={brandHeaderStyles.titleContainer}>Trạng thái</MyText>
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
  const {ManagerBranchReducer} = state;
  return {ManagerBranchReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetManagerBranch,
      showRefresh,
      setActive,
      setValueBrand
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderVoucher);
