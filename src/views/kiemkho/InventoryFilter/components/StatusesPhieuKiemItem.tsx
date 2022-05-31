import React, {PureComponent} from 'react';
import {MyButton, MyText} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FilterInventoryStyle} from '../styles/InventoryMH.Style';
import {STATUS_INVENTORY_TYPE} from 'common/Constants';
import {setStatusObjKK} from 'views/kiemkho/Inventory/redux';

interface IPropsItem {
  item: {
    name: string;
    value: STATUS_INVENTORY_TYPE;
  };
  isCheck: boolean;
  setStatusObjKK: typeof setStatusObjKK;
}

interface IState {
  isCheck: boolean;
}

class StatusesPhieuKiemItem extends PureComponent<IPropsItem, IState> {
  state = {isCheck: this.props.isCheck};

  onPress = () => {
    const {item} = this.props;

    this.setState(
      {
        isCheck: !this.state.isCheck
      },
      () => {
        this.props.setStatusObjKK(item);
      }
    );
  };

  render() {
    const {item} = this.props;
    const {isCheck} = this.state;

    return (
      <MyButton
        style={[
          FilterInventoryStyle.btnLH,
          {
            backgroundColor: isCheck ? COLOR.TEXT.BLUE : COLOR.BG.WHITE
          }
        ]}
        onPress={this.onPress}>
        <MyText
          myFontStyle="Regular"
          style={[
            FilterInventoryStyle.myText,
            {
              color: isCheck ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK
            }
          ]}>
          {item.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setStatusObjKK}, dispatch);
};

export default connect(null, mapDispatchToProps)(StatusesPhieuKiemItem);
