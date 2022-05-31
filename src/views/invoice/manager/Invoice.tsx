import * as React from 'react';
import {MyLoading, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {invoiceOrdStyles} from './styles/InvoiceOrder.style';
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
  getListInvoice,
  IInvoiceOrderState,
  onFisrtLoadingInvoice,
  setOnLoadmoreInvoice,
  setOnRefreshInvoice,
  clearListDashBoardInvoice,
  onDestroyInvoiceOrder
} from './redux';
import SortInvoice from './components/SortInvoice';
import FilterDateInvoice from './components/FilterDateInvoice';
import {OrderModel} from 'models/Order.Model';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';

type IExportOrderProps = IAppNavigateProps<'Invoice'> &
  IInvoiceOrderState & {
    getListInvoice: typeof getListInvoice;
    onFisrtLoadingInvoice: typeof onFisrtLoadingInvoice;
    setOnLoadmoreInvoice: typeof setOnLoadmoreInvoice;
    setOnRefreshInvoice: typeof setOnRefreshInvoice;
    clearListDashBoardInvoice: typeof clearListDashBoardInvoice;
    onDestroyInvoiceOrder: typeof onDestroyInvoiceOrder;
  };

/**
 *  1. danh sách chuyển hàng hoặc xuất huỷ, check theo types truyền vào
 */
class Invoice extends React.PureComponent<IExportOrderProps> {
  componentDidMount() {
    if (this.props.route?.params?.isFromReport) {
      this.props.navigation.setOptions({headerTitle: 'Báo cáo hoá đơn'});
    }
    this.props.getListInvoice();
  }

  componentWillUnmount() {
    this.props.onDestroyInvoiceOrder();
  }

  resetData = () => {
    this.props.setOnRefreshInvoice(true);
    this.props.getListInvoice();
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsInvoice', {id});
  };

  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={invoiceOrdStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={invoiceOrdStyles.containerEmpty}>
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
    this.props.setOnLoadmoreInvoice(true);
    this.props.getListInvoice();
  };

  renderItem = ({item}: {item: OrderModel}) => {
    return <ItemOrder getDetailOrder={(id: string) => this.getDetailOrder(id)} itemOrder={item} />;
  };
  render() {
    return (
      <MyView style={invoiceOrdStyles.container}>
        <MyView style={invoiceOrdStyles.filterContainer}>
          <FilterDateInvoice />
          <SortInvoice />
        </MyView>
        <MyView style={invoiceOrdStyles.viewCount}>
          <MyText myFontStyle={'Medium'} style={invoiceOrdStyles.textSum}>
            {'Tổng số ' + Utilities.convertCount(this.props.count) + ' hoá đơn'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={this.props.isRefresh}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={this.props.arrInvoiceOrder}
          extraData={this.props.arrInvoiceOrder}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicator />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={invoiceOrdStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {count, isFirstLoading, isLoadMore, isRefresh, isStop, arrInvoiceOrder} =
    state.InvoiceOrderReducer;

  return {arrInvoiceOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      clearListDashBoardInvoice,
      getListInvoice,
      onFisrtLoadingInvoice,
      setOnLoadmoreInvoice,
      setOnRefreshInvoice,
      onDestroyInvoiceOrder
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
