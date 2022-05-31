import React, {Component} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText} from 'bases/components';
import {KenhBanStyles} from '../styles/KenhBan.Style';
import {ChannelModel} from 'models/ManagerSetting.Model';

interface IPropsStore {
  item: ChannelModel;
  isCheck: boolean;
  onPress: () => void;
}

export default class ItemKenhBan extends Component<IPropsStore> {
  render() {
    const {item, isCheck, onPress} = this.props;

    return (
      <MyButton style={KenhBanStyles.content2} onPress={onPress}>
        <MyText myFontStyle="Regular" style={KenhBanStyles.text}>
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
