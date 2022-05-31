import React, {PureComponent} from 'react';

import {MyButton, MyText} from 'bases/components';

import {FilterCategoryStyle} from '../styles/FilterCategory.style';
import {COLOR} from 'bases/styles/Core';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setTypeObj} from '../redux';

interface IPropsItem {
  item: any;
  isCheck: boolean;
  setTypeObj: typeof setTypeObj;
}

interface IState {
  isCheck: boolean;
}

class TypeHangHoaItem extends PureComponent<IPropsItem, IState> {
  state = {isCheck: this.props.isCheck};

  onPress = () => {
    const {item} = this.props;

    this.setState(
      {
        isCheck: !this.state.isCheck
      },
      () => {
        this.props.setTypeObj(item);
      }
    );
  };

  render() {
    const {item} = this.props;
    const {isCheck} = this.state;

    return (
      <MyButton
        style={[
          FilterCategoryStyle.btnLH,
          {
            backgroundColor: isCheck ? COLOR.TEXT.BLUE : COLOR.BG.WHITE
          }
        ]}
        onPress={this.onPress}>
        <MyText
          myFontStyle="Regular"
          style={[
            FilterCategoryStyle.myText,
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
  return bindActionCreators({setTypeObj}, dispatch);
};

export default connect(null, mapDispatchToProps)(TypeHangHoaItem);
