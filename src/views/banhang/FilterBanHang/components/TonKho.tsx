import React, {PureComponent} from 'react';

import {MyView} from 'bases/components';
import TonKhoItem from './TonKhoItem';
import {TON_KHO} from 'configs/FilterConfig';
import {itemCateStyles} from '../styles/FilterBanHang.style';

export default class TonKho extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < TON_KHO.length; index++) {
      const element = TON_KHO[index];
      _viewContent.push(<TonKhoItem key={index} item={element} />);
    }
    return <MyView style={itemCateStyles.containerViewChon}>{_viewContent}</MyView>;
  }
}
