import React, {Component} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyText, MyView} from 'bases/components';
import {ProductModel, ProductOptionsModel, StockProduct} from 'models/Product.Model';
import {ItemLineIndicator} from 'views/app/components/items';
import {FlatList} from 'react-native';
import ItemTonKho from './components/ItemTonKho';
import {componentStyles} from '../../styles/ProductDetail.style';
import {StoreModel} from 'models/ManagerSetting.Model';

interface IProps {
  productCha?: ProductModel;
  productCon?: ProductOptionsModel;
  arrStorePerson?: StoreModel[];
}

class TabTonKho extends Component<IProps> {
  renderItem = ({item}: {item: StoreModel}) => {
    const {productCha, productCon} = this.props;

    if (productCon) {
      return <ItemTonKho item={item} listStock={productCon.stocks || []} />;
    }

    if (productCha && productCha.products) {
      let listStock: StockProduct[] = [];
      for (let index = 0; index < productCha.products.length; index++) {
        const element = productCha.products[index];
        listStock = listStock.concat(element.stocks || []);
      }
      return <ItemTonKho item={item} listStock={listStock} />;
    }

    return <ItemTonKho item={item} listStock={[]} />;
  };

  keyExtractor = (item: StoreModel) => {
    return item.id.toString();
  };

  renderListEmptyComponent = () => {
    return (
      <MyView style={componentStyles.emptyCustomer}>
        <MyText>Không có dữ liệu</MyText>
      </MyView>
    );
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  render() {
    const {arrStorePerson} = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={arrStorePerson}
        extraData={arrStorePerson}
        initialNumToRender={10}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        contentContainerStyle={componentStyles.containerList}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  const arrStorePerson = infoPersonal?.stores || [];

  return {
    arrStorePerson
  };
};

export default connect(mapStateToProps, null)(TabTonKho);
