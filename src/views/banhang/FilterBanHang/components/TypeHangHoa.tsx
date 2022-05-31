import React, {Component} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView} from 'bases/components';
import {FilterBanHangStyle} from '../styles/FilterBanHang.style';
import TypeHangHoaItem from './TypeHangHoaItem';
import {IFilterBanHangState} from '../redux';
import {TYPE_HANG_HOA} from 'configs/FilterConfig';

interface IProps extends IFilterBanHangState {}

class TypeHangHoa extends Component<IProps> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {arrType} = this.props;

    let _viewContent = [];
    for (let index = 0; index < TYPE_HANG_HOA.length; index++) {
      const element = TYPE_HANG_HOA[index];
      let indexElement = -1;
      if (arrType) {
        indexElement = arrType.findIndex(x => x.name === element.name);
      }
      _viewContent.push(<TypeHangHoaItem key={index} item={element} isCheck={indexElement > -1} />);
    }
    return <MyView style={FilterBanHangStyle.myviewLH}>{_viewContent}</MyView>;
  }
}

const mapStateToProps = (state: RootState) => {
  let {arrType} = state.FilterBanHangReducer;
  return {arrType};
};

export default connect(mapStateToProps, null)(TypeHangHoa);
