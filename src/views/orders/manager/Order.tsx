import React, {PureComponent} from 'react';
import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {orderStyles} from './styles/Order.style';
import {ItemBoderBottom, ItemLineIndicatorCustom, ItemOrder} from 'views/app/components/items';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  getListOrder,
  IOrderState,
  setOnLoadmoreDH,
  setOnRefreshDH,
  clearListDashBoardOrder,
  onDestroyOrderDH
} from './redux';
import MyNavigator from 'utils/MyNavigator';
import {OrderModel} from 'models/Order.Model';
import FilterOrderDate from './component/FilterOrderDate';
import SortOrder from './component/SortOrder';
import {IAppNavigateProps, IPropsNavigate} from 'views/app';
import Utilities from 'utils/Utilities';
type IOrderProps = IAppNavigateProps<'Order'> &
  IOrderState &
  IPropsNavigate<{isFromReport: boolean}> & {
    getListOrder: typeof getListOrder;
    setOnLoadmoreDH: typeof setOnLoadmoreDH;
    setOnRefreshDH: typeof setOnRefreshDH;
    clearListDashBoardOrder: typeof clearListDashBoardOrder;
    onDestroyOrderDH: typeof onDestroyOrderDH;
  };

/**
 *  1. danh sách hoá đơn, đặt hàng, trả hàng
 */
class Order extends PureComponent<IOrderProps> {
  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsOrder', {id});
  };

  renderItem = ({item}: {item: OrderModel}) => {
    return <ItemOrder getDetailOrder={(id: string) => this.getDetailOrder(id)} itemOrder={item} />;
  };

  keyExtractor = (item: OrderModel) => {
    return item.id.toString();
  };

  _renderEmpty = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={orderStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    } else {
      if (isError) {
        return (
          <MyView style={orderStyles.containerEmpty}>
            <MyText>Không có dữ liệu</MyText>
            <MyButtonText
              onPress={() => this.props.getListOrder()}
              title="Tải lại"
              style={orderStyles.BtnEmpty}
            />
          </MyView>
        );
      } else {
        return (
          <MyView style={orderStyles.containerEmpty}>
            <MyText>Không có dữ liệu.</MyText>
          </MyView>
        );
      }
    }
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicatorCustom containerStyle={orderStyles.separator} />;
  };

  _renderFooter = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return <MyLoading />;
    } else {
      return <ItemBoderBottom />;
    }
  };

  componentDidMount() {
    if (this.props.route?.params?.isFromReport) {
      this.props.navigation.setOptions({headerTitle: 'Báo cáo đặt hàng'});
    }
    this.props.getListOrder();
  }

  componentWillUnmount() {
    this.props.onDestroyOrderDH();
  }

  resetData = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.setOnRefreshDH(true);
      this.props.getListOrder();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.setOnLoadmoreDH(true);
    this.props.getListOrder();
  };

  render() {
    const {isRefresh, arrOrder, count} = this.props;

    return (
      <MyView style={orderStyles.container}>
        <MyView style={orderStyles.filterContainer}>
          <FilterOrderDate />
          <SortOrder />
        </MyView>

        <MyView style={orderStyles.viewTextKiemKhoHeader}>
          <MyText numberOfLines={1} myFontStyle={'Medium'} style={orderStyles.textSum}>
            {'Tổng số ' + Utilities.convertCount(count) + ' đơn đặt hàng'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isRefresh}
          onRefresh={this.resetData}
          data={arrOrder}
          extraData={arrOrder}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={orderStyles.listContainer}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, count, isLoadMore, arrOrder, isRefresh, isStop, isError} =
    state.OrderReducer;
  return {isFirstLoading, count, isLoadMore, arrOrder, isRefresh, isStop, isError};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      clearListDashBoardOrder,
      getListOrder,
      setOnLoadmoreDH,
      setOnRefreshDH,
      onDestroyOrderDH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
