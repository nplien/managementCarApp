import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {ARR_THU_TIEN_HO_COD} from '../redux';
import ThuTienHoCODItem from './ThuTienHoCODItem';

export default class ThuTienHoCOD extends PureComponent {
  render() {
    let _viewContent = [];
    for (let index = 0; index < ARR_THU_TIEN_HO_COD.length; index++) {
      const element = ARR_THU_TIEN_HO_COD[index];
      _viewContent.push(<ThuTienHoCODItem key={index} item={element} />);
    }
    return <MyView>{_viewContent}</MyView>;
  }
}
