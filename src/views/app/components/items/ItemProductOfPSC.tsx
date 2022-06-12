import {MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {IProductInPSC} from 'models/PhieuSuaChua.Model';
import Utilities from 'utils/Utilities';

interface IItemProductOfPSC {
  itemProduct: IProductInPSC;
}

/**
 * item sp trong đơn hàng chi tiết
 */
export class ItemProductOfPSC extends PureComponent<IItemProductOfPSC> {
  onPress = () => {
    // MyNavigator.push('ProductDetail', {
    //   idCha: this.props.itemProduct.id,
    //   idCon: this.props.itemProduct.option_id
    // });
  };
  render() {
    const {name, sku, total_quantity, total_price, price} = this.props.itemProduct;
    Utilities.log(this.props.itemProduct);
    return (
      <MyButton onPress={this.onPress} style={itemPrOrStyles.container2}>
        <MyView transparent style={itemPrOrStyles.infoProdRight}>
          <MyView transparent style={itemPrOrStyles.infoProdCenter}>
            <MyText numberOfLines={2} myFontStyle="Medium" style={itemPrOrStyles.textLeft}>
              {name}
            </MyText>
            <MyTextPriceMask
              numberOfLines={1}
              myFontStyle="Regular"
              text={total_price || 0}
              style={[itemPrOrStyles.priceRightBlue]}
            />
          </MyView>
          <MyText numberOfLines={2} myFontStyle="Regular" style={[itemPrOrStyles.textNameLeft]}>
            {sku}
          </MyText>

          <MyView transparent style={itemPrOrStyles.contentSL}>
            <MyText numberOfLines={1} myFontStyle={'Regular'}>
              SL: {total_quantity}
              {' x '}
            </MyText>
            <MyTextPriceMask
              numberOfLines={1}
              myFontStyle="Medium"
              text={price || 0}
              style={itemPrOrStyles.priceBlue}
            />
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}

const itemPrOrStyles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentSL: {
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0),
    flexDirection: 'row'
  },
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  infoProdCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoProdRight: {
    flex: 1,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textRight: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_14,
    flex: 1
  },
  textLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14,
    flex: 0.7,
    color: COLOR.TEXT.BLACK
  },
  textNameLeft: {
    textAlign: 'left',
    flex: 0.7,
    ...setMargin(MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    textTransform: 'uppercase'
  },
  textPriceLeft: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.BLACK
  },
  textPrice: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.BLUE
  },
  colorGray: {
    color: COLOR.TEXT.GRAY
  },
  priceRightBlue: {
    flex: 0.3,
    textAlign: 'right',
    color: COLOR.TEXT.BLUE
  },
  priceBlue: {
    color: COLOR.TEXT.BLUE
  },
  image: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, MY_SIZE.s_8),
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
