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

    const {isCheck} = this.state;

    return (
      <MyButton
        onPress={onPress}
        style={tw.style('flex-row p-8px items-center', isCheck ? 'bg-stone-100' : 'bg-white')}>
        <MyImage style={tw.style('w-40px h-40px')} source={{uri: thumbnail_url}} />
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
              {total_quantity}
            </MyText>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}
