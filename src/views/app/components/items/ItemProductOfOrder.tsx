import {MyText, MyView, MyButton, MyTextPriceMask, MyImage} from 'bases/components';
import {ProductOrderModel} from 'models/Product.Model';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';
import {IMAGE_SIZE} from 'common/Constants';
import {ProductOfImport} from 'models/Order.Model';
import {ProductOfExport} from 'models/ExportOrder.Model';

interface IItemProductOfOrder {
  itemProduct: ProductOrderModel;
}

interface IItemProductOfWarehouse {
  itemProduct: ProductOfImport;
}
interface IItemProductOfExport {
  itemProduct: ProductOfExport;
}
/**
 * item sp trong đơn hàng chi tiết
 */
export class ItemProductOfOrder extends PureComponent<IItemProductOfOrder> {
  onPress = () => {
    MyNavigator.push('ProductDetail', {
      idCha: this.props.itemProduct.id,
      idCon: this.props.itemProduct.option_id
    });
  };
  render() {
    const {name, sku, total_quantity, total_price, price, thumbnail_url} = this.props.itemProduct;
    return (
      <MyButton onPress={this.onPress} style={itemPrOrStyles.container2}>
        <MyImage
          style={itemPrOrStyles.image}
          height={48}
          width={48}
          source={Utilities.convertLinkImage(thumbnail_url, IMAGE_SIZE.MEDIUM)}
        />
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

export class ItemProductOfWarehouse extends PureComponent<IItemProductOfWarehouse> {
  onPress = () => {
    MyNavigator.push('ProductDetail', {
      idCha: this.props.itemProduct.id,
      idCon: this.props.itemProduct.option_id
    });
  };
  render() {
    const {name, sku, total_quantity, total_price, original_price} = this.props.itemProduct;
    return (
      <MyButton onPress={this.onPress} style={itemPrOrStyles.container}>
        {/* <MyImage
          style={itemPrOrStyles.image}
          height={48}
          width={48}
          source={Utilities.convertLinkImage(thumbnail_url, IMAGE_SIZE.MEDIUM)}
        /> */}
        {/* <MyView style={itemPrOrStyles.infoProdRight}> */}
        <MyView transparent style={itemPrOrStyles.infoProdCenter}>
          <MyText numberOfLines={2} myFontStyle="Regular" style={itemPrOrStyles.textLeft}>
            {name}
          </MyText>
          <MyTextPriceMask
            numberOfLines={1}
            myFontStyle="Medium"
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
            text={original_price || 0}
            style={itemPrOrStyles.priceBlue}
          />
        </MyView>
        {/* </MyView> */}
      </MyButton>
    );
  }
}
export class ItemProductExport extends PureComponent<IItemProductOfExport> {
  onPress = () => {
    MyNavigator.push('ProductDetail', {
      idCha: this.props.itemProduct.id,
      idCon: this.props.itemProduct.option_id
    });
  };
  render() {
    const {name, sku, total_export_quantity, total_export_price, original_price} =
      this.props.itemProduct;
    return (
      <MyButton onPress={this.onPress} style={itemPrOrStyles.container}>
        {/* <MyImage
          style={itemPrOrStyles.image}
          height={48}
          width={48}
          source={Utilities.convertLinkImage(thumbnail_url, IMAGE_SIZE.MEDIUM)}
        /> */}
        {/* <MyView style={itemPrOrStyles.infoProdRight}> */}
        <MyView transparent style={itemPrOrStyles.infoProdCenter}>
          <MyText numberOfLines={2} myFontStyle="Regular" style={itemPrOrStyles.textLeft}>
            {name}
          </MyText>
          <MyTextPriceMask
            numberOfLines={1}
            myFontStyle="Medium"
            text={total_export_price || 0}
            style={[itemPrOrStyles.priceRightBlue]}
          />
        </MyView>
        <MyText numberOfLines={2} myFontStyle="Regular" style={[itemPrOrStyles.textNameLeft]}>
          {sku}
        </MyText>

        <MyView transparent style={itemPrOrStyles.contentSL}>
          <MyText numberOfLines={1} myFontStyle={'Regular'}>
            SL: {total_export_quantity}
            {' x '}
          </MyText>
          <MyTextPriceMask
            numberOfLines={1}
            myFontStyle="Medium"
            text={original_price || 0}
            style={itemPrOrStyles.priceBlue}
          />
        </MyView>
        {/* </MyView> */}
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
