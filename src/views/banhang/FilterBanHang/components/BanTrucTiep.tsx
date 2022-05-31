import {MyView} from 'bases/components';
import {BAN_TRUC_TIEP} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {itemCateStyles} from '../styles/FilterBanHang.style';
import BanTrucTiepItem from './BanTrucTiepItem';

export default class BanTrucTiep extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < BAN_TRUC_TIEP.length; index++) {
      const element = BAN_TRUC_TIEP[index];
      _viewContent.push(<BanTrucTiepItem key={index} item={element} />);
    }
    return <MyView style={itemCateStyles.containerViewChon}>{_viewContent}</MyView>;
  }
}
