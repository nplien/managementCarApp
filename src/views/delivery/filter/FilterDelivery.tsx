import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {styles} from './styles/FilterDelivery.styles';
import {ScrollView} from 'react-native';
import StatusDelivery from './components/StatusDelivery';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextSearch from './components/TextSearch';
import {getListDeliveryOrder, setOnRefresh} from '../manager/redux';
import MyNavigator from 'utils/MyNavigator';
import {IFilterDeliveryState, setDoiTacGiaoHang, setStatusDelivery, setValue} from './redux';
import DoiTacGiaoHang from './components/DoiTacGiaoHang';
// import ThuTienHoCOD from './components/ThuTienHoCOD';
import {RootState} from 'views/app/redux/App.Reducer';
import ThoiGianHoanThanh from './components/ThoiGianHoanThanh';
// import LocationDelivery from './components/LocationDelivery';

interface IProps {
  getListDeliveryOrder: typeof getListDeliveryOrder;
  setOnRefresh: typeof setOnRefresh;
  setStatusDelivery: typeof setStatusDelivery;
  setDoiTacGiaoHang: typeof setDoiTacGiaoHang;
  setValue: typeof setValue;
  FilterDeliveryReducer: IFilterDeliveryState;
}
class FilterDelivery extends PureComponent<IProps> {
  StatusDeliveryRef: any = React.createRef();
  doiTacGiaoHangRef: any = React.createRef();
  state = {isFirstLoading: true};
  timeOut: any = null;

  filterCategoryReducerOld: IFilterDeliveryState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.FilterDeliveryReducer);
    this.filterCategoryReducerOld = JSON.parse(oldReducer);
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
      this.props.setValue(this.filterCategoryReducerOld);
    }
  }

  submitFilter = () => {
    this.props.setStatusDelivery(this.StatusDeliveryRef?.current?.state.arrCurrentStatusTmp || []);
    this.isBack = false;
    this.props.setOnRefresh(true);
    this.props.getListDeliveryOrder();
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
          <TextSearch />
          <MyText style={styles.titleContainer}>Trạng thái</MyText>
          <StatusDelivery ref={this.StatusDeliveryRef} />
          <MyText style={styles.titleContainer}>Đối tác giao hàng</MyText>
          <DoiTacGiaoHang />
          {/* <MyText style={styles.titleContainer}>Thu tiền hộ COD</MyText>
          <ThuTienHoCOD /> */}
          <ThoiGianHoanThanh />
          {/* <MyText style={styles.titleContainer}>Khu vực</MyText>
          <LocationDelivery /> */}
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
  const {FilterDeliveryReducer} = state;
  return {FilterDeliveryReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {getListDeliveryOrder, setOnRefresh, setStatusDelivery, setDoiTacGiaoHang, setValue},
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterDelivery);
