import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {MyImage, MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';
import {ProductOptionsModel, StockProduct} from 'models/Product.Model';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import {IMAGE_SIZE} from 'common/Constants';
import {IStorePerson} from 'models/ModelBase';

interface IProps {
  price?: number;
  itemProduct: ProductOptionsModel;
  cuaHangDangChon?: IStorePerson;
  isShowDiscount?: boolean;
  onPress: () => void;
}

interface IState {
  isCheck: boolean;
}

export class ItemProductOption extends PureComponent<IProps, IState> {
  state = {isCheck: false};

  setCheck = () => {
    this.setState({
      isCheck: !this.state.isCheck
    });
  };

  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): ProductOptionsModel => {
    return this.props.itemProduct;
  };

  render() {
    const {name, images, sku, stocks, discount} = this.props.itemProduct;
    const {onPress, price, cuaHangDangChon, isShowDiscount} = this.props;

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
    if (images && images.length > 0 && images[0]) {
      source = Utilities.convertLinkImage(images[0], IMAGE_SIZE.LOW);
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
            <MyView transparent style={itemProductStyles.infoProdRight}>
              <MyTextPriceMask
                text={price || 0}
                numberOfLines={1}
                myFontStyle="Regular"
                style={itemProductStyles.textPriceRight}
              />
              {isShowDiscount && discount ? (
                <MyText style={itemProductStyles.textPriceRight2}>
                  {'-'}
                  {discount.rate}
                  {'%'}
                </MyText>
              ) : null}
            </MyView>
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
              {Utilities.convertCount(tonKho)}
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
    flex: 3.5
  },
  textPriceRight: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_16
  },
  textPriceRight2: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.RED
  },
  textStockRight: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_14,
    color: COLOR.TEXT.GREEN,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
