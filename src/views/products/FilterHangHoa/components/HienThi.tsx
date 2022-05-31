import {MyView} from 'bases/components';
import {HIEN_THI} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {itemCateStyles} from '../styles/FilterHangHoa.style';
import HienThiItem from './HienThiItem';

export default class HienThi extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < HIEN_THI.length; index++) {
      const element = HIEN_THI[index];
      _viewContent.push(<HienThiItem key={index} item={element} />);
    }
    return <MyView style={itemCateStyles.containerViewChon}>{_viewContent}</MyView>;
  }
}
