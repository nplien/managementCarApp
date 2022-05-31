import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MyButton, MyText} from 'bases/components';

import {cateAndBrandsStyle} from '../styles/ExportCate.styles';
import {COLOR} from 'bases/styles/Core';

import {setCateObj} from '../redux';
import {ICategoryModel} from 'models/Category.Model';

interface IPropsItem {
  item: ICategoryModel;
  setCateObj: typeof setCateObj;
}

class DMViewItem extends PureComponent<IPropsItem> {
  onPress = () => {
    this.props.setCateObj(null);
  };

  render() {
    const {item} = this.props;

    return (
      <MyButton
        style={[
          cateAndBrandsStyle.btnLH,
          {
            backgroundColor: COLOR.TEXT.BLUE
          }
        ]}
        onPress={this.onPress}>
        <MyText
          myFontStyle="Regular"
          style={[
            cateAndBrandsStyle.myText,
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
  return bindActionCreators({setCateObj}, dispatch);
};

export default connect(null, mapDispatchToProps)(DMViewItem);
