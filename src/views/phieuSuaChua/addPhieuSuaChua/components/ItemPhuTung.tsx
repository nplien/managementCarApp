import React, {PureComponent} from 'react';

import {MyImage, MyText, MyView, MyButton, MyTextPriceMask} from 'bases/components';

import {IStorePerson} from 'models/ModelBase';
import tw from 'utils/tailwind';
import {IPhuTungModel} from 'models/PhuTung.Model';

interface IProps {
  price?: number;
  itemProduct: IPhuTungModel;
  cuaHangDangChon?: IStorePerson;
  isShowDiscount?: boolean;
  onPress: () => void;
}

interface IState {
  isCheck: boolean;
}

export class ItemPhuTung extends PureComponent<IProps, IState> {
  state = {isCheck: false};

  setCheck = () => {
    this.setState({
      isCheck: !this.state.isCheck
    });
  };

  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): IPhuTungModel => {
    return this.props.itemProduct;
  };

  render() {
    const {name, sku, price, total_quantity, thumbnail_url} = this.props.itemProduct;
    const {onPress} = this.props;
    let tonKho = 0;
    if (this.props.itemProduct.stocks) {
      for (let index = 0; index < this.props.itemProduct.stocks?.length; index++) {
        const element = this.props.itemProduct.stocks[index];
        tonKho = tonKho + Number(element?.total_quantity || 0);
      }
    }
    const {isCheck} = this.state;

    return (
      <MyButton
        onPress={onPress}
        style={tw.style('flex-row p-8px items-center', isCheck ? 'bg-stone-100' : 'bg-white')}>
        <MyImage
          style={tw.style('w-40px h-40px')}
          source={{
            uri:
              thumbnail_url ||
              'https://i.pinimg.com/564x/66/2c/6d/662c6d3495af017f5f7c138f14e4efb6.jpg'
          }}
        />
        <MyView transparent style={tw.style('flex-1 ml-10px')}>
          <MyView transparent style={tw.style('flex-row justify-between')}>
            <MyText style={tw.style('font-bold flex-1 ')} myFontStyle={'Bold'}>
              {name}
            </MyText>
            <MyTextPriceMask
              text={price || 0}
              numberOfLines={1}
              myFontStyle="Regular"
              style={tw.style('')}
            />
          </MyView>
          <MyView transparent style={tw.style('flex-row justify-between items-center mt-6px ')}>
            <MyText style={tw.style('text-green-500 underline flex-1')}>{sku}</MyText>
            <MyText style={tw.style('font-bold text-green-500')} myFontStyle={'Bold'}>
              {total_quantity || tonKho}
            </MyText>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}
