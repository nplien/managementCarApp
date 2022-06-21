import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {MyImage, MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import {ProductModel, StockProduct} from 'models/Product.Model';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import {IMAGE_SIZE} from 'common/Constants';
import {IStorePerson} from 'models/ModelBase';

interface IProps {
  price?: number;
  itemProduct: ProductModel;
  cuaHangDangChon?: IStorePerson;
  onPress: () => void;
}

interface IState {
  isCheck: boolean;
}

export class ItemProduct extends PureComponent<IProps, IState> {
  state = {isCheck: false};

  setCheck = () => {
    this.setState({
      isCheck: !this.state.isCheck
    });
  };

  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): ProductModel => {
    return this.props.itemProduct;
  };

  render() {
    const {name, sku, stocks, thumbnail_url} = this.props.itemProduct;
    const {onPress, price, cuaHangDangChon} = this.props;

    let tonKho = 0;
    let listTonKho: StockProduct[] = [];
    if (stocks) {
      listTonKho = stocks.filter(element => {
        return element?.id?.toString() === cuaHangDangChon?.id?.toString();
      });
    }
    for (let index = 0; index < listTonKho.length; index++) {
      const element = listTonKho[index];
      tonKho = tonKho + Number(element?.total_quantity || 0);
    }

    let source = Utilities.convertLinkImage('');
    if (thumbnail_url) {
      source = Utilities.convertLinkImage(thumbnail_url, IMAGE_SIZE.LOW);
    }
    const {isCheck} = this.state;

    return (
      <MyButton
        style={[
          itemProductStyles.container,
          {
            backgroundColor: isCheck ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
          }
        ]}
        onPress={onPress}>
        <MyImage
          style={itemProductStyles.image}
          height={itemProductStyles.image.height}
          width={itemProductStyles.image.width}
          source={source}
        />
        <MyView transparent style={itemProductStyles.content}>
          <MyView style={itemProductStyles.infoProdCenter} transparent>
            <MyText
              numberOfLines={3}
              myFontStyle="Regular"
              style={itemProductStyles.textNameCenter}>
              {name}
            </MyText>
            <MyTextPriceMask
              text={price || 0}
              numberOfLines={1}
              myFontStyle="Regular"
              style={itemProductStyles.textPriceRight}
            />
          </MyView>

          <MyView
            style={[
              itemProductStyles.infoProdCenter,
              {...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)}
            ]}
            transparent>
            <MyText numberOfLines={1} myFontStyle="Medium" style={itemProductStyles.textIDCenter}>
              {sku}
            </MyText>
            <MyText myFontStyle="Regular" style={itemProductStyles.textStockRight}>
              {Utilities.convertCount(tonKho || this.props.itemProduct.total_quantity)}
            </MyText>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}

const itemProductStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  content: {
    flex: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  image: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    width: MY_SIZE.s_40,
    height: MY_SIZE.s_40
  },
  infoProdCenter: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textNameCenter: {
    flex: 6.5,
    textAlign: 'left',
    fontSize: MY_SIZE.s_16
  },
  textIDCenter: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.GREEN,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  infoProdRight: {
    flex: 1
  },
  textPriceRight: {
    flex: 3.5,
    textAlign: 'right',
    fontSize: MY_SIZE.s_16
  },
  textStockRight: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.GREEN,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
