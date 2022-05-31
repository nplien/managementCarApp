import * as React from 'react';
import {MyLoading, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native';
import {exportOrdStyles} from './styles/ExportOrder.style';
import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom,
  ItemOrderExport
} from 'views/app/components/items';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  getListExportOrder,
  onFirstLoadingExport,
  setOnLoadmoreExport,
  setOnRefreshExport,
  IExportOrderState
} from './redux';
import {KIND_OF_SCREEN} from 'common/Constants';
import MyNavigator from 'utils/MyNavigator';
import ExportFilterDate from './components/ExportFilterDate';
import SortExport from './components/SortExport';
import Utilities from 'utils/Utilities';

interface IExportOrderProps extends IExportOrderState {
  getListExportOrder: typeof getListExportOrder;
  onFirstLoadingExport: typeof onFirstLoadingExport;
  setOnLoadmoreExport: typeof setOnLoadmoreExport;
  setOnRefreshExport: typeof setOnRefreshExport;
}

/**
 *  1. danh sách chuyển hàng hoặc xuất huỷ, check theo types truyền vào
 */
class ExportOrder extends React.PureComponent<IExportOrderProps> {
  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListExportOrder();
    }
  }

  resetData = () => {
    this.props.setOnRefreshExport(true);
    this.props.getListExportOrder();
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsOrderExport', {id, type: KIND_OF_SCREEN.EXPORT});
  };

  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      <MyView style={exportOrdStyles.loadingContainer}>
        <MyLoading />
      </MyView>;
    }
    return (
      <MyView style={exportOrdStyles.containerEmpty}>
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
    this.props.setOnLoadmoreExport(true);
    this.props.getListExportOrder();
  };

  render() {
    return (
      <MyView style={exportOrdStyles.container}>
        <MyView style={exportOrdStyles.filterContainer}>
          <ExportFilterDate />
          <SortExport />
        </MyView>
        <MyView style={exportOrdStyles.textSum}>
          <MyText myFontStyle={'Medium'} style={exportOrdStyles.myTextTop}>
            {'Tổng số ' + Utilities.convertCount(this.props.count) + ' phiếu chuyển hàng'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          refreshing={this.props.isRefresh}
          showsVerticalScrollIndicator={false}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={this.props.arrExportOrder}
          extraData={this.props.arrExportOrder}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicator />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <ItemOrderExport
                getDetailOrder={(id: string) => this.getDetailOrder(id)}
                itemOrder={item}
              />
            );
          }}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={exportOrdStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrExportOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop} =
    state.ExportOrderReducer;
  // const objRoot = {
  //   ...state.ExportOrderReducer,
  //   objFilter
  // };
  return {arrExportOrder, count, isFirstLoading, isLoadMore, isRefresh, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListExportOrder,
      onFirstLoadingExport,
      setOnLoadmoreExport,
      setOnRefreshExport
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ExportOrder);
