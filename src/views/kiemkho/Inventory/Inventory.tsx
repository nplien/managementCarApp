import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {InventoryStyle} from './styles/Inventory.Style';
import {FlatList, RefreshControl} from 'react-native';
import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom
} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IIventoryState, GetInventory, DestroyInventory, showRefresh, showLoadmore} from './redux';
import {IInventoryModel} from 'models/Inventory.Model';
import {bindActionCreators} from 'redux';
import {ItemInventory} from 'views/app/components/items/ItemInventory';
import LocThoiGian from './components/LocThoiGian';
import SortButton from './components/SortButton';
import {CategoryStyle} from 'views/products/ProductHangHoa/styles/ProductHangHoa.Style';
import Utilities from 'utils/Utilities';

interface IProps extends IIventoryState {
  GetInventory: typeof GetInventory;
  DestroyInventory: typeof DestroyInventory;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class Inventory extends React.Component<IProps> {
  renderItem = ({item}: {item: IInventoryModel}) => {
    return <ItemInventory itemProduct={item} />;
  };

  keyExtractor = (item: IInventoryModel) => {
    return item.id.toString();
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={CategoryStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={InventoryStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.GetInventory()}
            title="Tải lại"
            style={InventoryStyle.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={InventoryStyle.emptyCustomer}>
          <MyText>Không có dữ liệu.</MyText>
        </MyView>
      );
    }
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return <MyLoading />;
    } else {
      return <ItemBoderBottom />;
    }
  };

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.GetInventory();
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      this.props.GetInventory();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.GetInventory();
  };

  render() {
    const {isRefresh, arrInventory, count} = this.props;

    return (
      <MyView style={InventoryStyle.container}>
        <MyView style={InventoryStyle.myViewTop}>
          <LocThoiGian />
          <SortButton />
        </MyView>
        <MyView style={InventoryStyle.viewTextKiemKhoHeader}>
          <MyText style={InventoryStyle.myTextTop} numberOfLines={1} myFontStyle="Medium">
            Tổng số {Utilities.convertCount(count)} phiếu kiểm kho
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrInventory}
          extraData={arrInventory}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
          contentContainerStyle={InventoryStyle.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrInventory, count, isLoadMore, isStop, isError} =
    state.InventoryReducer;
  return {isFirstLoading, isRefresh, arrInventory, count, isLoadMore, isStop, isError};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetInventory, DestroyInventory, showRefresh, showLoadmore}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
