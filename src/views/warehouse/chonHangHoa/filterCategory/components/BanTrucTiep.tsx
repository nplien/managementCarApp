import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {BAN_TRUC_TIEP} from '../redux';
import BanTrucTiepItem from './BanTrucTiepItem';

export default class BanTrucTiep extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < BAN_TRUC_TIEP.length; index++) {
      const element = BAN_TRUC_TIEP[index];
      _viewContent.push(<BanTrucTiepItem key={index} item={element} />);
    }
    return <MyView>{_viewContent}</MyView>;
  }
}
