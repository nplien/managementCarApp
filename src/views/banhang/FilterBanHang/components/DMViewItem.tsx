import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MyButton, MyText} from 'bases/components';

import {FilterBanHangStyle} from '../styles/FilterBanHang.style';
import {COLOR} from 'bases/styles/Core';

import {setCateObjBanHang} from '../redux';
import {ICategoryModel} from 'models/Category.Model';

interface IPropsItem {
  item: ICategoryModel;
  setCateObjBanHang: typeof setCateObjBanHang;
}

class DMViewItem extends PureComponent<IPropsItem> {
  onPress = () => {
    const {item} = this.props;
    this.props.setCateObjBanHang(item);
  };

  render() {
    const {item} = this.props;

    return (
      <MyButton
        style={[
          FilterBanHangStyle.btnLH,
          {
            backgroundColor: COLOR.TEXT.BLUE
          }
        ]}
        onPress={this.onPress}>
        <MyText
          myFontStyle="Regular"
          style={[
            FilterBanHangStyle.myText,
            {
              color: COLOR.TEXT.WHITE
            }
          ]}>
          {item.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObjBanHang}, dispatch);
};

export default connect(null, mapDispatchToProps)(DMViewItem);
