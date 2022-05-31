import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {styles} from './styles/FilterExport.styles';
import {ScrollView} from 'react-native';
import StatusExport from './components/StatusExport';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextSearchExport from './components/TextSearchExport';
import {
  getListExportOrder,
  setOnRefreshExport,
  IExportOrderState,
  setStatusExport,
  setValueExport,
  setStoreNhapVeExport,
  setStoreChuyenDiExport
} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import ChiNhanh from './components/ChiNhanh';

import {RootState} from 'views/app/redux/App.Reducer';
import StatusNhanHang from './components/StatusNhanHang';
import NgayNhanExport from './components/NgayNhanExport';

interface IProps extends IExportOrderState {
  getListExportOrder: typeof getListExportOrder;
  setOnRefreshExport: typeof setOnRefreshExport;
  setStatusExport: typeof setStatusExport;
  setValueExport: typeof setValueExport;
  setStoreNhapVeExport: typeof setStoreNhapVeExport;
  setStoreChuyenDiExport: typeof setStoreChuyenDiExport;
  ExportOrderReducer: IExportOrderState;
}
interface IStates {
  isFirstLoading: boolean;
}
class FilterExport extends PureComponent<IProps, IStates> {
  StatusExportRef: any = React.createRef();
  state = {isFirstLoading: true};
  timeOut: any = null;

  importFilterReducerOld: IExportOrderState = {};
  isBack: boolean = true;
  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.ExportOrderReducer);
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
      this.props.setValueExport(this.importFilterReducerOld);
    }
  }
  submitFilter = () => {
    this.isBack = false;
    const {isChuyenDi, isNhapVe} = this.props;
    if (!isChuyenDi) {
      this.props.setStoreChuyenDiExport(undefined);
    }
    if (!isNhapVe) {
      this.props.setStoreNhapVeExport(undefined);
    }
    this.props.setStatusExport(this.StatusExportRef?.current?.state.arrCurrentStatusTmp || []);
    this.props.setOnRefreshExport(true);
    this.props.getListExportOrder();
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
          <TextSearchExport />
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusExport ref={this.StatusExportRef} />
          <StatusNhanHang />
          <MyText style={styles.titleContainer}>Chi nhánh</MyText>
          <ChiNhanh />
          <NgayNhanExport />
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
  const {ExportOrderReducer} = state;
  let {isChuyenDi, isNhapVe} = state.ExportOrderReducer;
  return {ExportOrderReducer, isChuyenDi, isNhapVe};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListExportOrder,
      setOnRefreshExport,
      setStatusExport,
      setValueExport,
      setStoreNhapVeExport,
      setStoreChuyenDiExport
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterExport);
