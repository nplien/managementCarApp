import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {MyText, MyView} from 'bases/components';

import {productDetailStyle} from '../../styles/ProductDetail.style';
import {ItemLineIndicator} from 'views/app/components/items';
import ListImageHeader from './components/ListImageHeader';
import ItemContentHeader from './components/ItemContentHeader';
import {ProductModel, ProductOptionsModel} from 'models/Product.Model';
import {InfoProduct, INFO_PRODUCT} from 'configs/ProductConfig';

interface IProps {
  productCha?: ProductModel;
  productCon?: ProductOptionsModel;
}

class TabThongTin extends PureComponent<IProps> {
  renderItem = ({item}: {item: InfoProduct}) => {
    const {productCha, productCon} = this.props;
    return <ItemContentHeader item={item} productCha={productCha} productCon={productCon} />;
  };

  keyExtractor = (item: InfoProduct) => {
    return item.id;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListHeaderComponent = () => {
    const {productCha, productCon} = this.props;
    let listImg: string[] = [];
    if (productCha?.thumbnail_url) {
      listImg = [productCha?.thumbnail_url];
    }
    if (productCon?.images) {
      listImg = productCon?.images;
    }

    return (
      <MyView transparent>
        <ListImageHeader images={listImg} />
        <MyView style={productDetailStyle.styleList}>
          <MyText style={[productDetailStyle.textName, {}]}>
            {productCon?.name || productCha?.name}
          </MyText>
        </MyView>
        <ItemLineIndicator />
      </MyView>
    );
  };

  render() {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={INFO_PRODUCT}
        extraData={INFO_PRODUCT}
        initialNumToRender={10}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListHeaderComponent={this.renderListHeaderComponent}
      />
    );
  }
}

export default TabThongTin;
