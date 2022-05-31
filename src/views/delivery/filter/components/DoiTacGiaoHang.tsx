import {MyView} from 'bases/components';
import {MY_SIZE, setRadius} from 'bases/styles/Core';

import React, {PureComponent} from 'react';
import {ARR_DOI_TAC_GIAO_HANG, IFilterDeliveryState} from '../redux';
import DoiTacGiaoHangItem from './DoiTacGiaoHangItem';
interface IProps extends IFilterDeliveryState {}

class DoiTacGiaoHang extends PureComponent<IProps> {
  render() {
    let _viewContent = [];
    for (let index = 0; index < ARR_DOI_TAC_GIAO_HANG.length; index++) {
      const element = ARR_DOI_TAC_GIAO_HANG[index];
      _viewContent.push(<DoiTacGiaoHangItem key={index} item={element} index={index} />);
    }
    return (
      <MyView
        style={{
          ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        {_viewContent}
      </MyView>
    );
  }
}

export default DoiTacGiaoHang;
