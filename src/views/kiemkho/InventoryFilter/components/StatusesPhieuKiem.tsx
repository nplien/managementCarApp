import React, {Component} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {MyView} from 'bases/components';
import StatusesPhieuKiemItem from './StatusesPhieuKiemItem';
import {TYPE_PHIEU_KIEM} from 'common/Constants';
import {FilterInventoryStyle} from '../styles/InventoryMH.Style';
import {IIventoryState} from 'views/kiemkho/Inventory/redux';

interface IProps extends IIventoryState {}

class StatusesPhieuKiem extends Component<IProps> {
  render() {
    const {arrStatus} = this.props;

    let _viewContent = [];
    for (let index = 0; index < TYPE_PHIEU_KIEM.length; index++) {
      const element = TYPE_PHIEU_KIEM[index];
      let indexElement: boolean = false;
      if (arrStatus) {
        indexElement = arrStatus.findIndex(x => x.name === element.name) > -1;
      }
      _viewContent.push(
        <StatusesPhieuKiemItem key={index} item={element} isCheck={indexElement} />
      );
    }
    return <MyView style={FilterInventoryStyle.myviewLH}>{_viewContent}</MyView>;
  }
}

const mapStateToProps = (state: RootState) => {
  let {arrStatus} = state.InventoryReducer;
  return {arrStatus};
};

export default connect(mapStateToProps, null)(StatusesPhieuKiem);
