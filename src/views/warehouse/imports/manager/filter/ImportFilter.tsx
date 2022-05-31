import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {styles} from './styles/ImportFilter.styles';
import {ScrollView} from 'react-native';
import StatusImport from './components/StatusImport';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextSearch from './components/TextSearch';
import {
  getListImportOrder,
  IImportOrderState,
  setOnRefreshImportOrder,
  setStatusImport,
  setValueImport
} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import ViewCreatorImport from './components/ViewCreatorImport';

interface IProps {
  getListImportOrder: typeof getListImportOrder;
  setOnRefreshImportOrder: typeof setOnRefreshImportOrder;
  setStatusImport: typeof setStatusImport;
  ImportOrderReducer: IImportOrderState;
  setValueImport: typeof setValueImport;
}
interface IStates {
  isFirstLoading: boolean;
}
class FilterImport extends PureComponent<IProps, IStates> {
  StatusImportRef: any = React.createRef();
  state = {isFirstLoading: true};
  timeOut: any = null;

  importFilterReducerOld: IImportOrderState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.ImportOrderReducer);
    this.importFilterReducerOld = JSON.parse(oldReducer);
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
      this.props.setValueImport(this.importFilterReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    this.props.setStatusImport(this.StatusImportRef?.current?.state.arrCurrentStatusTmp || []);
    this.props.setOnRefreshImportOrder(true);
    this.props.getListImportOrder();
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
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusImport ref={this.StatusImportRef} />
          <MyText style={styles.titleContainer}>Người tạo</MyText>
          <ViewCreatorImport />
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
  const {ImportOrderReducer} = state;
  return {ImportOrderReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {getListImportOrder, setOnRefreshImportOrder, setStatusImport, setValueImport},
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterImport);
