import * as React from 'react';
import {MyLoading, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {traHangOrdStyles} from './styles/TraHangOrder.style';
import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom,
  ItemOrder
} from 'views/app/components/items';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import MyNavigator from 'utils/MyNavigator';
import {
  getListTraHang,
  IReturnOrderState,
  onDestroyReturnOrder,
  onFisrtLoadingTraHang,
  setOnLoadmoreTraHang,
  setOnRefreshTraHang
} from './redux';
import SortTraHang from './components/SortTraHang';
import FilterDateTraHang from './components/FilterDateTraHang';
import {OrderModel} from 'models/Order.Model';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';

type IExportOrderProps = IReturnOrderState &
  IAppNavigateProps<'ReturnOrder'> & {
    getListTraHang: typeof getListTraHang;
    onFisrtLoadingTraHang: typeof onFisrtLoadingTraHang;
    setOnLoadmoreTraHang: typeof setOnLoadmoreTraHang;
    setOnRefreshTraHang: typeof setOnRefreshTraHang;
    onDestroyReturnOrder: typeof onDestroyReturnOrder;
  };

/**
 *  1. danh sách chuyển hàng hoặc xuất huỷ, check theo types truyền vào
 */
class ReturnOrder extends React.PureComponent<IExportOrderProps> {
  componentDidMount() {
    if (this.props.route?.params?.isFromReport) {
      this.props.navigation.setOptions({headerTitle: 'Báo cáo trả hàng'});
    }
    this.props.getListTraHang();
  }

  componentWillUnmount() {
    this.props.onDestroyReturnOrder();
  }

  resetData = () => {
    this.props.setOnRefreshTraHang(true);
    this.props.getListTraHang();
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsTraHang', {id});
  };

  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={traHangOrdStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={traHangOrdStyles.containerEmpty}>
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
    this.props.setOnLoadmoreTraHang(true);
    this.props.getListTraHang();
  };

  keyExtractor = (item: OrderModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: OrderModel}) => {
    return <ItemOrder getDetailOrder={(id: string) => this.getDetailOrder(id)} itemOrder={item} />;
  };
  render() {
    return (
      <MyView style={traHangOrdStyles.container}>
        <MyView style={traHangOrdStyles.filterContainer}>
          <FilterDateTraHang />
          <SortTraHang />
        </MyView>
        <MyView style={traHangOrdStyles.viewSum}>
          <MyText myFontStyle={'Medium'} style={traHangOrdStyles.textSum}>
            {'Tổng số ' + Utilities.convertCount(this.props.count) + ' đơn trả hàng'}
          </MyText>
          <MyTextPriceMask
            myFontStyle={'Medium'}
            style={traHangOrdStyles.textSum}
            text={this.props.sum?.total_price || ''}
          />
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={this.props.isRefresh}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={this.props.arrReturnOrder}
          extraData={this.props.arrReturnOrder}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicator />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={traHangOrdStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {count, isFirstLoading, isLoadMore, isRefresh, isStop, arrReturnOrder, sum} =
    state.ReturnOrderReducer;

  return {arrReturnOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop, sum};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListTraHang,
      onFisrtLoadingTraHang,
      setOnLoadmoreTraHang,
      setOnRefreshTraHang,
      onDestroyReturnOrder
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ReturnOrder);
