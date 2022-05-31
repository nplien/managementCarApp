import * as React from 'react';
import {MyLoading, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {importOrdStyles} from './styles/ImportOrder.style';
import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom,
  ItemOrderImport
} from 'views/app/components/items';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  getListImportOrder,
  onFirstLoadingImportOrder,
  setOnLoadmoreImportOrder,
  setOnRefreshImportOrder,
  IImportOrderState
} from './redux';
import {KIND_OF_SCREEN} from 'common/Constants';
import MyNavigator from 'utils/MyNavigator';
import SortImport from './components/SortImport';
import ImportFilterDate from './components/ImportFilterDate';
import {OrderIEModel} from 'models/Order.Model';
import Utilities from 'utils/Utilities';

interface IImportOrderProps extends IImportOrderState {
  getListImportOrder: typeof getListImportOrder;
  onFirstLoadingImportOrder: typeof onFirstLoadingImportOrder;
  setOnLoadmoreImportOrder: typeof setOnLoadmoreImportOrder;
  setOnRefreshImportOrder: typeof setOnRefreshImportOrder;
}

/**
 *  1. danh sách chuyển hàng hoặc xuất huỷ, check theo types truyền vào
 */
class ImportOrder extends React.PureComponent<IImportOrderProps> {
  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListImportOrder();
    }
  }

  resetData = () => {
    this.props.setOnRefreshImportOrder(true);
    this.props.getListImportOrder();
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsOrderImport', {id, type: KIND_OF_SCREEN.IMPORT});
  };

  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      <MyView style={importOrdStyles.loadingContainer}>
        <MyLoading />
      </MyView>;
    }
    return (
      <MyView style={importOrdStyles.containerEmpty}>
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
    this.props.setOnLoadmoreImportOrder(true);
    this.props.getListImportOrder();
  };
  renderItem = ({item}: {item: OrderIEModel}) => {
    return (
      <ItemOrderImport getDetailOrder={(id: string) => this.getDetailOrder(id)} itemOrder={item} />
    );
  };

  render() {
    return (
      <MyView style={importOrdStyles.container}>
        <MyView style={importOrdStyles.filterContainer}>
          <ImportFilterDate />
          <SortImport />
        </MyView>
        <MyView style={importOrdStyles.textSum}>
          <MyText myFontStyle={'Medium'} style={importOrdStyles.myTextTop}>
            {'Tổng số ' + Utilities.convertCount(this.props.count) + ' phiếu nhập hàng'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={this.props.isRefresh}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={this.props.arrImportOrder}
          extraData={this.props.arrImportOrder}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicator />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={importOrdStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrImportOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop} =
    state.ImportOrderReducer;

  return {arrImportOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListImportOrder,
      onFirstLoadingImportOrder,
      setOnLoadmoreImportOrder,
      setOnRefreshImportOrder
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportOrder);
