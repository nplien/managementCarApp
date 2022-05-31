import React, {Component} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText} from 'bases/components';
import {BangGiaChungStyles} from '../styles/BangGiaChung.Style';
import {IBangGiaModel} from 'models/BangGia.Model';

interface IPropsStore {
  item: IBangGiaModel;
  isCheck: boolean;
  onPress: () => void;
}

export default class ItemBangGia extends Component<IPropsStore> {
  render() {
    const {item, isCheck, onPress} = this.props;

    return (
      <MyButton style={BangGiaChungStyles.content2} onPress={onPress}>
        <MyText myFontStyle="Regular" style={BangGiaChungStyles.text}>
          {item.name}
        </MyText>
        <MyIcon
          name="check"
          iconFontType="AntDesign"
          size={22}
          color={isCheck ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  }
}
