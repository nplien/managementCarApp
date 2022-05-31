import {MyView, MyText} from 'bases/components';
import {IProductSale} from 'models/Product.Model';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IAddImportOrderState} from '../redux';
import {listimportAdd} from '../style/AddImport.Styles';
import ItemAddImport from './ItemAddImport';
interface IProps extends IAddImportOrderState {}

class ListViewImport extends PureComponent<IProps> {
  mapItemSPRef: Map<string, any> = new Map();

  onPressItem = () => {};

  renderItem = ({item}: {item: IProductSale}) => {
    return (
      <ItemAddImport
        onPressItem={this.onPressItem}
        ref={node => {
          if (item.product.sku) {
            this.mapItemSPRef.set(item.product.sku, node);
          }
        }}
        itemProduct={item}
      />
    );
  };

  keyExtractor = (item: IProductSale, index: any) => {
    return item.product?.sku + index;
  };

  renderListEmptyComponent = () => {
    const {arrProductImport} = this.props;
    if (arrProductImport && arrProductImport?.length > 0) {
      return (
        <MyView style={listimportAdd.emptyCustomer}>
          <MyText>Chưa có sản phẩm nào</MyText>
        </MyView>
      );
    } else {
      return (
        <MyView style={listimportAdd.emptyCustomer}>
          <MyText>Chưa có sản phẩm nào</MyText>
        </MyView>
      );
    }
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  render() {
    const {arrProductImport} = this.props;
    return (
      <>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          data={arrProductImport}
          extraData={arrProductImport}
          initialNumToRender={10}
          style={listimportAdd.container}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          onEndReachedThreshold={0.1}
        />
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrProductImport, isLoadMore, isStop, isError, isManySelected} =
    state.AddImportOrderReducer;
  const {giaHienThi} = state.ChangeGiaBanReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrProductImport,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    isManySelected
  };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(ListViewImport);
