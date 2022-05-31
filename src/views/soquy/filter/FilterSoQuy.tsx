import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {styles} from './styles/FilterSoQuy.styles';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextSearch from './components/TextSearch';
import {getListPayment, setOnRefresh} from '../list/redux';
import MyNavigator from 'utils/MyNavigator';
import {setValueSoQuy, IFilterSoQuyState} from './redux';
import {RootState} from 'views/app/redux/App.Reducer';
import StatusSoQuy from './components/StatusSoQuy';
import BoLocChonSoQuy from './components/BoLocChonSoQuy';

interface IProps {
  getListPayment: typeof getListPayment;
  setOnRefresh: typeof setOnRefresh;
  setValueSoQuy: typeof setValueSoQuy;
  FilterSoQuyReducer: IFilterSoQuyState;
}
interface IStates {
  isFirstLoading: boolean;
}
class FilterSoQuy extends PureComponent<IProps, IStates> {
  StatusSoQuyRef = React.createRef();
  state = {isFirstLoading: true};
  timeOut: any = null;

  filterSoQuyReducerOld: IFilterSoQuyState = {};
  isBack: boolean = true;

  constructor(props: IProps) {
    super(props);
    let oldReducer = JSON.stringify(this.props.FilterSoQuyReducer);
    this.filterSoQuyReducerOld = JSON.parse(oldReducer);
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
      this.props.setValueSoQuy(this.filterSoQuyReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    this.props.setOnRefresh(true);
    this.props.getListPayment();
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <MyText style={styles.titleContainer}>Tìm theo</MyText>
          <TextSearch />
          <BoLocChonSoQuy />
          <StatusSoQuy />
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
  const {FilterSoQuyReducer} = state;
  return {FilterSoQuyReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({getListPayment, setOnRefresh, setValueSoQuy}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterSoQuy);
