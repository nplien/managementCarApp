import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {MyView, MyText, MyTextPriceMask} from 'bases/components';
import {setPadding, MY_SIZE} from 'bases/styles/Core';
import {ProductModel, ProductOptionsModel} from 'models/Product.Model';
import Utilities from 'utils/Utilities';
import {InfoProduct} from 'configs/ProductConfig';

interface IProps {
  item: InfoProduct;
  productCha?: ProductModel | null;
  productCon?: ProductOptionsModel | null;
}

export default class ItemContentHeader extends PureComponent<IProps> {
  render() {
    const {item, productCha, productCon} = this.props;
    if (!productCha) {
      return <MyView />;
    }

    let product = {...productCha, ...productCon};
    let _viewContent = null;
    let value: any;

    if (item.key === 'stock_muc_ton') {
      _viewContent = (
        <MyText style={styles.myText}>
          {product.stock_min || 0 + ' > ' + product.stock_max || 0}
        </MyText>
      );
    } else if (item.key === 'expired_at') {
      if (value) {
        value = Utilities.convertTimeByFormat(Number(value) * 1000, 'DD/MM/YYYY');
      }
      _viewContent = <MyText style={styles.myText}>{value ? value : '-'}</MyText>;
    } else {
      if (item.key in product) {
        value = product[item.key];
        if (item.key === 'categories') {
          let arrCate = product[item.key];
          let arrCateName = [];
          for (let i = 0; i < arrCate.length; i++) {
            const element = arrCate[i];
            arrCateName.push(element.name);
          }
          _viewContent = (
            <MyText style={styles.myText}>
              {arrCateName.length ? arrCateName.join(', ') : '-'}
            </MyText>
          );
        } else if (item.key === 'stocks') {
          let totalStock = 0;
          let stocks = product[item.key] || [];
          for (let index = 0; index < stocks.length; index++) {
            const element = stocks[index];
            if (element.total_quantity >= 0) {
              totalStock = totalStock + element.total_quantity;
            }
          }
          _viewContent = <MyText style={styles.myText}>{totalStock.toString()}</MyText>;
        } else if (item.key === 'price' || item.key === 'original_price') {
          _viewContent = <MyTextPriceMask style={styles.myText} text={value} />;
        } else {
          _viewContent = <MyText style={styles.myText}>{value ? value : '-'}</MyText>;
        }
      }
    }

    return (
      <MyView style={styles.myViewDad}>
        <MyView style={styles.myViewChild1}>
          <MyText style={styles.myText} myFontStyle="Regular">
            {item.title}
          </MyText>
        </MyView>
        <MyView style={styles.myViewChild2}>{_viewContent}</MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  myViewDad: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myViewChild2: {
    flex: 2
  },
  myViewChild1: {
    flex: 1
  },
  myText: {
    fontSize: MY_SIZE.s_16
  }
});
