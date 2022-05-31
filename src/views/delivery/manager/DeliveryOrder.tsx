import * as React from 'react';
import {MyLoading, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {deliveryStyles} from './styles/Delivery.style';
import {
  ItemBoderBottom,
  ItemDelivery,
  ItemLineIndicator,
  ItemLineIndicatorCustom
} from 'views/app/components/items';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  getListDeliveryOrder,
  onFirstLoading,
  setOnLoadmore,
  setOnRefresh,
  IDeliveryOrderState
} from './redux';
import {KIND_OF_SCREEN} from 'common/Constants';
import MyNavigator from 'utils/MyNavigator';
import FilterDateDelivery from './components/filterDateDelivery/FilterDateDelivery';
import SortDelivery from './components/sortDelivery/SortDelivery';
import {DeliveryModel} from 'models/Order.Model';
import Utilities from 'utils/Utilities';

interface IDeliveryOrderProps extends IDeliveryOrderState {
  getListDeliveryOrder: typeof getListDeliveryOrder;
  onFirstLoading: typeof onFirstLoading;
  setOnLoadmore: typeof setOnLoadmore;
  setOnRefresh: typeof setOnRefresh;
}

/**
 *  1. danh sách chuyển hàng hoặc xuất huỷ, check theo types truyền vào
 */
class DeliveryOrder extends React.PureComponent<IDeliveryOrderProps> {
  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListDeliveryOrder();
    }
  }

  resetData = () => {
    this.props.setOnRefresh(true);
    this.props.getListDeliveryOrder();
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsDelivery', {id, type: KIND_OF_SCREEN.DELIVERY});
  };

  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={deliveryStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={deliveryStyles.containerEmpty}>
        <MyText>Không có dữ liệu.</MyText>
      </MyView>
    );
  };

  _renderFooter = () => {
    if (this.props.isLoadMore) {
      return <MyLoading />;
    }
    return <ItemBoderBottom />;
  };

  onEndReached = () => {
    const {isStop, isLoadMore} = this.props;
    if (isStop) {
      return;
    }
    if (isLoadMore) return;
    this.props.setOnLoadmore(true);
    this.props.getListDeliveryOrder();
  };

  renderItem = ({item}: {item: DeliveryModel}) => {
    return (
      <ItemDelivery getDetailOrder={(id: string) => this.getDetailOrder(id)} itemOrder={item} />
    );
  };

  keyExtractor = (item: DeliveryModel, index: number) => {
    return item.id.toString() + index;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  render() {
    return (
      <MyView style={deliveryStyles.container}>
        <MyView style={deliveryStyles.filterContainer}>
          <FilterDateDelivery />
          <SortDelivery />
        </MyView>
        <MyView style={deliveryStyles.textSum}>
          <MyText myFontStyle="Medium" style={deliveryStyles.myTextTop}>
            Tổng số {Utilities.convertCount(this.props.count)} phiếu vận đơn
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={this.props.isRefresh}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={this.props.arrDeliveryOrder}
          extraData={this.props.arrDeliveryOrder}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          onEndReached={this.onEndReached}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={deliveryStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrDeliveryOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop} =
    state.DeliveryOrderReducer;
  return {arrDeliveryOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListDeliveryOrder,
      onFirstLoading,
      setOnLoadmore,
      setOnRefresh
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryOrder);
