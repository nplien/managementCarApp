import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {HIEN_THI} from '../redux';
import HienThiItem from './HienThiItem';

export default class HienThi extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < HIEN_THI.length; index++) {
      const element = HIEN_THI[index];
      _viewContent.push(<HienThiItem key={index} item={element} />);
    }
    return <MyView>{_viewContent}</MyView>;
  }
}
