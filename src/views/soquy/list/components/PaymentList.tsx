import {MyLoading, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {ItemBoderBottom, ItemLineIndicatorCustom, ItemPayment} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import Revenue from './Revenue';
import {
  IPaymentState,
  getListPayment,
  onFirstLoading,
  setOnLoadmore,
  setOnRefresh,
  onDestroySoQuy
} from '../redux';
import {paymentStyles} from '../styles/Payment.style';
import Utilities from 'utils/Utilities';
import {COLOR} from 'bases/styles/Core';

interface IPaymentHomeProps extends IPaymentState {
  getListPayment: typeof getListPayment;
  onFirstLoading: typeof onFirstLoading;
  setOnLoadmore: typeof setOnLoadmore;
  setOnRefresh: typeof setOnRefresh;
  onDestroySoQuy: typeof onDestroySoQuy;
}
interface IPaymentHomeState {
  isModalSelected: boolean;
}
/**
 * Danh sách phiếu thu/chi của mục sổ quỹ, dùng chung lọc với phần đơn,
 *  truyền type payment sang phần đơn để lọc view.
 */
class SoQuy extends PureComponent<IPaymentHomeProps, IPaymentHomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalSelected: false
    };
  }

  componentDidMount() {
    this.props.getListPayment();
  }

  componentWillUnmount() {
    this.props.onDestroySoQuy();
  }

  resetData = () => {
    this.props.setOnRefresh(true);
    this.props.getListPayment();
  };

  getDetailPayment = (id: string) => {
    MyNavigator.push('PaymentDetails', {id});
  };

  onEndReached = () => {
    const {isStop, isLoadMore} = this.props;
    if (isStop) {
      return;
    }
    if (isLoadMore) return;
    this.props.setOnLoadmore(true);
    this.props.getListPayment();
  };

  _renderFooter = () => {
    if (this.props.isLoadMore) {
      return <MyLoading />;
    }
    return <ItemBoderBottom />;
  };

  _renderHeader = () => (
    <MyView style={{backgroundColor: COLOR.BG.SECONDARY}}>
      <Revenue />
      <MyText style={paymentStyles.textCount} myFontStyle={'Medium'}>
        {`Danh sách phiếu thu chi (${Utilities.convertCount(this.props.count)})`}
      </MyText>
    </MyView>
  );

  render() {
    let {arrPayment, isRefresh} = this.props;

    return (
      <FlatList
        refreshing={isRefresh}
        onRefresh={this.resetData}
        data={arrPayment}
        extraData={arrPayment}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => {
          return (
            <ItemPayment
              getDetailPayment={(id: string) => this.getDetailPayment(id)}
              itemPayment={item}
            />
          );
        }}
        ItemSeparatorComponent={() => {
          return <ItemLineIndicatorCustom />;
        }}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        contentContainerStyle={paymentStyles.containerList}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrPayment, isFirstLoading, isLoadMore, isRefresh, isStop, count} = state.PaymentReducer;
  return {arrPayment, isFirstLoading, isLoadMore, isRefresh, isStop, count};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListPayment,
      onFirstLoading,
      setOnLoadmore,
      setOnRefresh,
      onDestroySoQuy
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SoQuy);
